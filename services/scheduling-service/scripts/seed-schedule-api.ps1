param(
    [string]$UserServiceUrl = "http://localhost:8082",
    [string]$ProjectsServiceUrl = "http://localhost:8081",
    [string]$ResourceServiceUrl = "http://localhost:8083",
    [string]$SchedulingServiceUrl = "http://localhost:8084",
    [string]$AcademicYear = "2025-2026",
    [switch]$RunSolver
)

$ErrorActionPreference = "Stop"

function Invoke-Json {
    param(
        [ValidateSet("GET", "POST", "PUT", "PATCH", "DELETE")]
        [string]$Method,
        [string]$Uri,
        [object]$Body = $null,
        [hashtable]$Headers = @{}
    )

    $params = @{
        Method = $Method
        Uri = $Uri
        Headers = $Headers
    }

    if ($null -ne $Body) {
        $params.ContentType = "application/json"
        $params.Body = ($Body | ConvertTo-Json -Depth 20)
    }

    Invoke-RestMethod @params
}

function Ensure-User {
    param(
        [string]$Name,
        [string]$Email,
        [string]$Phone,
        [string]$Gender,
        [string]$Birthdate,
        [string]$Avatar,
        [string]$Role
    )

    $password = "Password123!"
    $payload = @{
        name = $Name
        email = $Email
        password = $password
        phone = $Phone
        gender = $Gender
        birthdate = $Birthdate
        avatar = $Avatar
        role = $Role
    }

    try {
        $auth = Invoke-Json POST "$UserServiceUrl/api/auth/register" $payload
        Write-Host "Created user $Email" -ForegroundColor Green
    } catch {
        $auth = Invoke-Json POST "$UserServiceUrl/api/auth/login" @{
            email = $Email
            password = $password
        }
        Write-Host "Reused user $Email" -ForegroundColor Yellow
    }

    [pscustomobject]@{
        Id = $auth.user.id
        Token = $auth.token
        Name = $auth.user.name
        Email = $auth.user.email
        Role = $auth.user.role
    }
}

function Ensure-TeacherAvailability {
    param(
        [object]$Teacher,
        [string]$Start,
        [string]$End
    )

    $headers = @{ Authorization = "Bearer $($Teacher.Token)" }
    $existing = Invoke-Json GET "$UserServiceUrl/api/users/$($Teacher.Id)/availability"
    $match = $existing | Where-Object { $_.start -eq $Start -and $_.end -eq $End } | Select-Object -First 1

    if ($null -eq $match) {
        Invoke-Json POST "$UserServiceUrl/api/users/me/availability" @{
            start = $Start
            end = $End
            isRecurrent = $true
            onlyDuringPFE = $true
        } $headers | Out-Null
        Write-Host "Added availability $Start-$End for $($Teacher.Email)" -ForegroundColor Green
    } else {
        Write-Host "Reused availability $Start-$End for $($Teacher.Email)" -ForegroundColor Yellow
    }
}

function Ensure-Room {
    param(
        [string]$Code,
        [string]$Name,
        [string]$Building,
        [string]$Floor,
        [int]$Capacity,
        [bool]$HasProjector
    )

    $rooms = Invoke-Json GET "$ResourceServiceUrl/api/rooms"
    $room = $rooms | Where-Object { $_.code -eq $Code } | Select-Object -First 1

    if ($null -eq $room) {
        $room = Invoke-Json POST "$ResourceServiceUrl/api/rooms" @{
            name = $Name
            code = $Code
            capacity = $Capacity
            location = "$Building - $Floor"
            building = $Building
            floor = $Floor
            type = "CLASSROOM"
            status = "AVAILABLE"
            hasProjector = $HasProjector
            hasComputers = $false
            hasInternet = $true
            description = "Salle de test pour scheduling-service"
        }
        Write-Host "Created room $Code" -ForegroundColor Green
    } else {
        Write-Host "Reused room $Code" -ForegroundColor Yellow
    }

    foreach ($day in @("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY")) {
        Ensure-RoomAvailability $room.id $day "08:00:00" "12:00:00"
        Ensure-RoomAvailability $room.id $day "14:00:00" "18:00:00"
    }

    $room
}

function Ensure-RoomAvailability {
    param(
        [long]$RoomId,
        [string]$DayOfWeek,
        [string]$StartTime,
        [string]$EndTime
    )

    $existing = Invoke-Json GET "$ResourceServiceUrl/api/rooms/$RoomId/availabilities?academicYear=$AcademicYear"
    $match = $existing | Where-Object {
        $_.dayOfWeek -eq $DayOfWeek -and
        $_.startTime -eq $StartTime -and
        $_.endTime -eq $EndTime
    } | Select-Object -First 1

    if ($null -eq $match) {
        Invoke-Json POST "$ResourceServiceUrl/api/rooms/$RoomId/availabilities" @{
            dayOfWeek = $DayOfWeek
            startTime = $StartTime
            endTime = $EndTime
            available = $true
            academicYear = $AcademicYear
        } | Out-Null
    }
}

function Ensure-Project {
    param(
        [string]$Title,
        [string]$Description,
        [string]$SupervisorId,
        [string[]]$StudentIds,
        [string[]]$Skills
    )

    $projects = Invoke-Json GET "$ProjectsServiceUrl/api/projects"
    $project = $projects | Where-Object { $_.title -eq $Title } | Select-Object -First 1

    if ($null -eq $project) {
        $project = Invoke-Json POST "$ProjectsServiceUrl/api/projects" @{
            title = $Title
            description = $Description
            status = "IN_PROGRESS"
            academicYear = $AcademicYear
            requiredSkills = $Skills
            startDate = "2026-02-01T09:00:00"
            endDate = "2026-05-20T17:00:00"
        }
        Write-Host "Created project $Title" -ForegroundColor Green
    } else {
        Write-Host "Reused project $Title" -ForegroundColor Yellow
    }

    $supervisors = Invoke-Json GET "$ProjectsServiceUrl/api/projects/$($project.id)/supervisors"
    $supervisorMatch = $supervisors | Where-Object { $_.teacherId -eq $SupervisorId -and $_.role -eq "MAIN_SUPERVISOR" } | Select-Object -First 1
    if ($null -eq $supervisorMatch) {
        Invoke-Json POST "$ProjectsServiceUrl/api/projects/$($project.id)/supervisors" @{
            teacherId = $SupervisorId
            role = "MAIN_SUPERVISOR"
        } | Out-Null
    }

    $members = Invoke-Json GET "$ProjectsServiceUrl/api/projects/$($project.id)/members"
    foreach ($studentId in $StudentIds) {
        $memberMatch = $members | Where-Object { $_.studentId -eq $studentId } | Select-Object -First 1
        if ($null -eq $memberMatch) {
            Invoke-Json POST "$ProjectsServiceUrl/api/projects/$($project.id)/members" @{
                studentId = $studentId
                role = "MEMBER"
            } | Out-Null
        }
    }

    $project
}

function Ensure-AcademicPeriod {
    $periods = Invoke-Json GET "$SchedulingServiceUrl/api/schedule/periods"
    $period = $periods | Where-Object { $_.academicYear -eq $AcademicYear -and $_.semester -eq "PFE" } | Select-Object -First 1

    if ($null -eq $period) {
        $period = Invoke-Json POST "$SchedulingServiceUrl/api/schedule/periods" @{
            academicYear = $AcademicYear
            semester = "PFE"
            defenseStartDate = "2026-05-25"
            defenseEndDate = "2026-06-07"
            submissionDeadline = "2026-05-20"
        }
        Write-Host "Created academic period $AcademicYear" -ForegroundColor Green
    } else {
        Write-Host "Reused academic period $AcademicYear" -ForegroundColor Yellow
    }

    Invoke-Json PUT "$SchedulingServiceUrl/api/schedule/periods/$($period.id)/activate" | Out-Null
    Write-Host "Activated academic period $AcademicYear" -ForegroundColor Green
}

function Ensure-Defense {
    param(
        [object]$Project,
        [object]$Room,
        [string]$Date,
        [string]$StartTime,
        [string]$EndTime,
        [object[]]$Jury
    )

    $defenses = Invoke-Json GET "$SchedulingServiceUrl/api/schedule/defenses"
    $defense = $defenses | Where-Object { $_.projectId -eq "$($Project.id)" } | Select-Object -First 1

    if ($null -eq $defense) {
        $defense = Invoke-Json POST "$SchedulingServiceUrl/api/schedule/defenses" @{
            projectId = "$($Project.id)"
            roomId = $Room.id
            roomNameSnapshot = $Room.name
            date = $Date
            startTime = $StartTime
            endTime = $EndTime
            status = "SCHEDULED"
            manuallyScheduled = $true
        }
        Write-Host "Created defense for $($Project.title)" -ForegroundColor Green
    } else {
        Write-Host "Reused defense for $($Project.title)" -ForegroundColor Yellow
    }

    $existingJury = Invoke-Json GET "$SchedulingServiceUrl/api/schedule/defenses/$($defense.id)/jury"
    foreach ($member in $Jury) {
        $match = $existingJury | Where-Object { $_.teacherId -eq $member.teacherId -and $_.role -eq $member.role } | Select-Object -First 1
        if ($null -eq $match) {
            Invoke-Json POST "$SchedulingServiceUrl/api/schedule/defenses/$($defense.id)/jury?teacherId=$($member.teacherId)&role=$($member.role)&forceOverride=true" | Out-Null
        }
    }

    $defense
}

Write-Host "Seeding schedule integration data..." -ForegroundColor Cyan

$teacherSami = Ensure-User "Dr. Sami Ahmed" "seed.sami.ahmed@university.test" "+216 98 123 456" "Male" "1975-03-20" "SA" "teacher"
$teacherHatem = Ensure-User "Dr. Hatem Hassan" "seed.hatem.hassan@university.test" "+216 98 765 432" "Male" "1980-06-15" "HH" "teacher"
$teacherMariem = Ensure-User "Dr. Mariem Ben Ali" "seed.mariem.benali@university.test" "+216 97 234 567" "Female" "1985-06-10" "MB" "teacher"
$studentAhmed = Ensure-User "Ahmed Youssef" "seed.ahmed.youssef@student.test" "+216 20 123 456" "Male" "2002-03-15" "AY" "student"
$studentMariem = Ensure-User "Mariem Khaled" "seed.mariem.khaled@student.test" "+216 21 234 567" "Female" "2002-07-22" "MK" "student"
$coordinator = Ensure-User "Mme Ines Coordinator" "seed.coordinator@university.test" "+216 71 123 456" "Female" "1980-11-10" "IC" "coordinator"

Ensure-TeacherAvailability $teacherSami "08:00" "12:00"
Ensure-TeacherAvailability $teacherSami "14:00" "18:00"
Ensure-TeacherAvailability $teacherHatem "08:00" "18:00"
Ensure-TeacherAvailability $teacherMariem "10:00" "12:00"
Ensure-TeacherAvailability $teacherMariem "14:00" "18:00"

$roomA101 = Ensure-Room "A101" "Salle A101" "Bloc A" "1er etage" 24 $true
$roomB202 = Ensure-Room "B202" "Salle B202" "Bloc B" "2eme etage" 18 $true
$roomC303 = Ensure-Room "C303" "Salle C303" "Bloc C" "3eme etage" 30 $false

$projectTraffic = Ensure-Project "AI Traffic System" "Detection et prediction du trafic urbain avec computer vision." $teacherSami.Id @($studentAhmed.Id) @("AI", "Computer Vision", "Python")
$projectVoting = Ensure-Project "Blockchain Voting Platform" "Plateforme de vote securisee basee sur blockchain." $teacherHatem.Id @($studentMariem.Id) @("Blockchain", "Security", "Web3")

Ensure-AcademicPeriod

Ensure-Defense $projectTraffic $roomA101 "2026-05-25" "08:00:00" "09:00:00" @(
    @{ teacherId = $teacherSami.Id; role = "SUPERVISOR" },
    @{ teacherId = $teacherHatem.Id; role = "PRESIDENT" },
    @{ teacherId = $teacherMariem.Id; role = "RAPPORTEUR" }
) | Out-Null

Ensure-Defense $projectVoting $roomB202 "2026-05-25" "10:00:00" "11:00:00" @(
    @{ teacherId = $teacherHatem.Id; role = "SUPERVISOR" },
    @{ teacherId = $teacherSami.Id; role = "PRESIDENT" },
    @{ teacherId = $teacherMariem.Id; role = "RAPPORTEUR" }
) | Out-Null

$solvePayload = @(
    @{
        projectId = "$($projectTraffic.id)"
        juryMemberIds = @($teacherSami.Id, $teacherHatem.Id, $teacherMariem.Id)
        preferredRoomId = $roomA101.id
        durationMinutes = 60
        notBefore = "2026-05-25T08:00:00"
        notAfter = "2026-06-07T18:00:00"
    },
    @{
        projectId = "$($projectVoting.id)"
        juryMemberIds = @($teacherHatem.Id, $teacherSami.Id, $teacherMariem.Id)
        preferredRoomId = $roomB202.id
        durationMinutes = 60
        notBefore = "2026-05-25T08:00:00"
        notAfter = "2026-06-07T18:00:00"
    }
)

Write-Host ""
Write-Host "Seed completed." -ForegroundColor Green
Write-Host "Important IDs:" -ForegroundColor Cyan
Write-Host "  Teacher Sami   : $($teacherSami.Id)"
Write-Host "  Teacher Hatem  : $($teacherHatem.Id)"
Write-Host "  Teacher Mariem : $($teacherMariem.Id)"
Write-Host "  Room A101      : $($roomA101.id)"
Write-Host "  Room B202      : $($roomB202.id)"
Write-Host "  Project Traffic: $($projectTraffic.id)"
Write-Host "  Project Voting : $($projectVoting.id)"
Write-Host ""
Write-Host "Solver payload:" -ForegroundColor Cyan
$solvePayload | ConvertTo-Json -Depth 20

if ($RunSolver) {
    $job = Invoke-Json POST "$SchedulingServiceUrl/api/schedule/solve" $solvePayload
    Write-Host "Solver job started: $($job.jobId). Waiting 35 seconds..." -ForegroundColor Cyan
    Start-Sleep -Seconds 35
    Invoke-Json GET "$SchedulingServiceUrl/api/schedule/result/$($job.jobId)" | ConvertTo-Json -Depth 30
}
