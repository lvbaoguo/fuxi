@echo off
cd /d "%~dp0"

rem Edit path if Git is installed elsewhere
set "GIT_EXE=C:\Program Files\Git\bin\git.exe"
if not exist "%GIT_EXE%" set "GIT_EXE=git"

echo [1/3] git add -A
"%GIT_EXE%" add -A

echo [2/3] git commit (if needed)
"%GIT_EXE%" diff --cached --quiet
if errorlevel 1 (
  "%GIT_EXE%" commit -m "sync"
  if errorlevel 1 (
    echo Commit failed.
    pause
    exit /b 1
  )
) else (
  echo No changes to commit.
)

echo [3/3] git push github master
"%GIT_EXE%" push github master
if errorlevel 1 (
  echo Push failed.
  pause
  exit /b 1
)

echo.
echo OK - pushed to github master.
echo Press Enter to close, or close this window with X.
pause
