@echo off
cd /d "%~dp0"

rem 若 Git 装在其他位置，改下面这一行路径即可
set "GIT_EXE=C:\Program Files\Git\bin\git.exe"
if not exist "%GIT_EXE%" set "GIT_EXE=git"

echo [1/3] git add -A
"%GIT_EXE%" add -A

echo [2/3] git commit (only if there are staged changes)
"%GIT_EXE%" diff --cached --quiet
if errorlevel 1 (
  "%GIT_EXE%" commit -m "sync"
  if errorlevel 1 (
    echo Commit failed. See messages above.
    pause
    exit /b 1
  )
) else (
  echo No changes to commit.
)

echo [3/3] git push github master
"%GIT_EXE%" push github master
if errorlevel 1 (
  echo.
  echo Push failed. Check network or credentials.
  pause
  exit /b 1
)

echo.
echo Done. Pushed to github master.
pause
