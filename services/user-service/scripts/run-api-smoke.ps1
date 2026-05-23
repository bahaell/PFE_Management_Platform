param(
    [string]$BaseUrl = "http://localhost:8080",
    [string]$AdminEmail = "admin@pfe-platform.com",
    [string]$AdminPassword = "Admin1234!",
    [switch]$SeedMockData
)

$ErrorActionPreference = "Stop"

function Write-Step { param([string]$Message) Write-Host ""; Write-Host "=== $Message ===" -ForegroundColor Cyan }

function Invoke-JsonRequest {
    param(
        [string]$Method,
        [string]$Url,
        [hashtable]$Headers = @{},
        [object]$Body = $null
    )

    $params = @{
        Method      = $Method
        Uri         = $Url
        Headers     = $Headers
        ContentType = "application/json"
    }

    if ($null -ne $Body) {
        $params.Body = ($Body | ConvertTo-Json -Depth 10)
    }

    return Invoke-RestMethod @params
}

function Register-OrIgnore {
    param([hashtable]$Payload)
    try {
        $res = Invoke-JsonRequest -Method "POST" -Url "$BaseUrl/api/auth/register" -Body $Payload
        Write-Host "Registered: $($Payload.email)" -ForegroundColor Green
        return $res
    } catch {
        Write-Host "Already exists or register skipped: $($Payload.email)" -ForegroundColor Yellow
        return $null
    }
}

function Login {
    param([string]$Email, [string]$Password)
    $loginRes = Invoke-JsonRequest -Method "POST" -Url "$BaseUrl/api/auth/login" -Body @{ email = $Email; password = $Password }
    if ([string]::IsNullOrWhiteSpace($loginRes.token)) { throw "Token not returned for $Email" }
    return @{ Authorization = "Bearer $($loginRes.token)" }
}

function Replace-CurrentUserSkills {
    param([hashtable]$Headers, [array]$Skills)
    $existing = Invoke-JsonRequest -Method "GET" -Url "$BaseUrl/api/users/me/skills" -Headers $Headers
    foreach ($s in $existing) {
        Invoke-RestMethod -Method "DELETE" -Uri "$BaseUrl/api/users/me/skills/$($s.id)" -Headers $Headers
    }
    foreach ($s in $Skills) {
        Invoke-JsonRequest -Method "POST" -Url "$BaseUrl/api/users/me/skills" -Headers $Headers -Body $s | Out-Null
    }
}

function Seed-ProfileByApi {
    param(
        [hashtable]$UserRegisterPayload,
        [hashtable]$ProfilePayload,
        [array]$SkillsPayload
    )
    Register-OrIgnore -Payload $UserRegisterPayload | Out-Null
    $headers = Login -Email $UserRegisterPayload.email -Password $UserRegisterPayload.password
    Invoke-JsonRequest -Method "PUT" -Url "$BaseUrl/api/users/me/profile" -Headers $headers -Body $ProfilePayload | Out-Null
    Replace-CurrentUserSkills -Headers $headers -Skills $SkillsPayload
    $profile = Invoke-JsonRequest -Method "GET" -Url "$BaseUrl/api/users/me/profile" -Headers $headers
    Write-Host "Seeded profile for $($UserRegisterPayload.email)" -ForegroundColor Green
    return $profile
}

Write-Step "1) Ensure coordinator admin"
Register-OrIgnore -Payload @{
    name      = "Admin Principal"
    email     = $AdminEmail
    password  = $AdminPassword
    phone     = "+216600000001"
    gender    = "Female"
    birthdate = "1990-01-01"
    avatar    = $null
    role      = "coordinator"
} | Out-Null

Write-Step "2) Smoke check admin auth/profile routes"
$adminHeaders = Login -Email $AdminEmail -Password $AdminPassword
Invoke-JsonRequest -Method "GET" -Url "$BaseUrl/api/users/me" -Headers $adminHeaders | Out-Null
Invoke-JsonRequest -Method "GET" -Url "$BaseUrl/api/users/me/profile" -Headers $adminHeaders | Out-Null
Invoke-JsonRequest -Method "GET" -Url "$BaseUrl/api/users/me/skills/meta" -Headers $adminHeaders | Out-Null
Write-Host "Smoke OK on admin APIs" -ForegroundColor Green

if ($SeedMockData) {
    Write-Step "3) Seed mock data via backend APIs"

    Seed-ProfileByApi -UserRegisterPayload @{
        name      = "Ahmed Youssef"; email = "ahmed.youssef@student.edu"; password = "Password123!"
        phone     = "+216 20 123 456"; gender = "Male"; birthdate = "2002-03-15"; avatar = "AY"; role = "student"
    } -ProfilePayload @{
        level = "M2"; department = "Software Engineering"; studentId = "ST20001"; academicYear = "2024-2025"
        interests = "AI, Machine Learning, Computer Vision"
    } -SkillsPayload @(
        @{ name = "Python"; category = "Language"; relevance = 90 },
        @{ name = "TensorFlow"; category = "ML Framework"; relevance = 85 },
        @{ name = "OpenCV"; category = "Computer Vision"; relevance = 80 }
    ) | Out-Null

    Seed-ProfileByApi -UserRegisterPayload @{
        name      = "Mariem Khaled"; email = "mariem.khaled@student.edu"; password = "Password123!"
        phone     = "+216 21 234 567"; gender = "Female"; birthdate = "2002-07-22"; avatar = "MK"; role = "student"
    } -ProfilePayload @{
        level = "M2"; department = "Software Engineering"; studentId = "ST20002"; academicYear = "2024-2025"
        interests = "Blockchain, Web3, Security"
    } -SkillsPayload @(
        @{ name = "Solidity"; category = "Language"; relevance = 85 },
        @{ name = "Blockchain"; category = "Crypto"; relevance = 88 },
        @{ name = "Web3.js"; category = "Framework"; relevance = 80 }
    ) | Out-Null

    Seed-ProfileByApi -UserRegisterPayload @{
        name      = "Dr. Sami Ahmed"; email = "sami.ahmed@university.edu"; password = "Password123!"
        phone     = "+216 98 123 456"; gender = "Male"; birthdate = "1975-03-20"; avatar = "SA"; role = "teacher"
    } -ProfilePayload @{
        grade = "Professor"; speciality = "Artificial Intelligence"; department = "Computer Science"
        bio = "Passionate about AI research and teaching."
        researchInterests = "Deep Learning, NLP, Computer Vision"; yearsOfExperience = 20
    } -SkillsPayload @(
        @{ name = "Python"; category = "Language"; relevance = 95 },
        @{ name = "TensorFlow"; category = "ML Framework"; relevance = 90 }
    ) | Out-Null

    Seed-ProfileByApi -UserRegisterPayload @{
        name      = "Dr. Mariem Ben Ali"; email = "mariem.benali@university.edu"; password = "Password123!"
        phone     = "+216 97 234 567"; gender = "Female"; birthdate = "1985-06-10"; avatar = "MB"; role = "teacher"
    } -ProfilePayload @{
        grade = "Associate Professor"; speciality = "Software Engineering"; department = "Computer Science"
        bio = "Expert in software architecture and web development."
        researchInterests = "DevOps, Microservices, Cloud Computing"; yearsOfExperience = 12
    } -SkillsPayload @(
        @{ name = "JavaScript"; category = "Language"; relevance = 90 },
        @{ name = "Node.js"; category = "Backend"; relevance = 88 }
    ) | Out-Null

    Seed-ProfileByApi -UserRegisterPayload @{
        name      = "Mme Mariem K."; email = "mariem.k@university.tn"; password = "Password123!"
        phone     = "+216 71 123 456"; gender = "Female"; birthdate = "1980-11-10"; avatar = $null; role = "coordinator"
    } -ProfilePayload @{
        department = "Computer Science"; office = "B12"
        responsibilities = "Oversee all PFE projects, schedule defenses, manage resources"; yearsOfService = 5
    } -SkillsPayload @(
        @{ name = "Administration"; category = "Management"; relevance = 95 },
        @{ name = "Planning"; category = "Management"; relevance = 90 },
        @{ name = "Communication"; category = "Soft Skills"; relevance = 90 }
    ) | Out-Null

    Write-Step "4) Validate seeded lists"
    $students = Invoke-JsonRequest -Method "GET" -Url "$BaseUrl/api/users/students?level=M2&department=Software%20Engineering&academicYear=2024-2025" -Headers $adminHeaders
    $teachers = Invoke-JsonRequest -Method "GET" -Url "$BaseUrl/api/users/teachers?minYears=10&department=Computer%20Science" -Headers $adminHeaders
    Write-Host "Students count (M2/SE/2024-2025): $($students.Count)"
    Write-Host "Teachers count (>=10 years/CS): $($teachers.Count)"
}

Write-Step "Done"
if ($SeedMockData) {
    Write-Host "Smoke + mock data seeding executed successfully via backend APIs." -ForegroundColor Green
} else {
    Write-Host "Smoke requests executed successfully. Use -SeedMockData to create mock dataset via APIs." -ForegroundColor Green
}
