param(
    [string]$Host = "localhost",
    [int]$Port = 3306,
    [string]$Database = "user_db",
    [string]$User = "root",
    [string]$Password = ""
)

$ErrorActionPreference = "Stop"

$scriptPath = Join-Path $PSScriptRoot "..\src\main\resources\db\mock-data.sql"
$scriptPath = [System.IO.Path]::GetFullPath($scriptPath)

if (-not (Test-Path $scriptPath)) {
    throw "SQL file not found: $scriptPath"
}

if (-not (Get-Command mysql -ErrorAction SilentlyContinue)) {
    throw "mysql command not found. Install MySQL client or run seed with your DB tool using: $scriptPath"
}

$env:MYSQL_PWD = $Password

Write-Host "Seeding database '$Database' on ${Host}:${Port}..." -ForegroundColor Cyan
Get-Content -Raw $scriptPath | mysql -h $Host -P $Port -u $User $Database

if ($LASTEXITCODE -ne 0) {
    throw "MySQL seed failed with exit code $LASTEXITCODE"
}

Write-Host "Database seed completed successfully." -ForegroundColor Green
