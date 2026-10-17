@echo off
setlocal
cd /d "%~dp0frontend"
call npm run dev
exit /b %errorlevel%
