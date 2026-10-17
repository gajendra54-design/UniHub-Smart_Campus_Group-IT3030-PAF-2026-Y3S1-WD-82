@echo off
setlocal
cd /d "%~dp0backend"
call mvnw.cmd -B test
if errorlevel 1 exit /b 1
cd /d "%~dp0frontend"
if not exist node_modules (
    call npm ci
    if errorlevel 1 exit /b 1
)
call npm run lint
if errorlevel 1 exit /b 1
call npm run build
if errorlevel 1 exit /b 1
echo All checks passed.
exit /b 0
