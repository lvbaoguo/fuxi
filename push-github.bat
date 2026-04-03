@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"

rem Edit path if Git is installed elsewhere
set "GIT_EXE=C:\Program Files\Git\bin\git.exe"
if not exist "%GIT_EXE%" set "GIT_EXE=git"

set "COMMITDONE=0"

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
  set "COMMITDONE=1"
) else (
  echo No changes to commit.
)

echo [3/3] git push github master
echo.
echo If this step hangs: GitHub may be slow or blocked. Check taskbar for Git login window.
echo Using HTTP/1.1 may help on some networks.
echo.
"%GIT_EXE%" -c http.version=HTTP/1.1 push --progress github master
if errorlevel 1 (
  echo Push failed.
  pause
  exit /b 1
)

echo.
if "!COMMITDONE!"=="1" (
  echo OK: A new commit was pushed. GitHub Pages often needs 1-2 minutes. On phone: pull to refresh or clear site cache.
) else (
  echo NOTE: No new commit. Your files match the last commit. Save in Cursor (Ctrl+S) then run this bat again to upload.
  echo If you already pushed before: the site is up to date. On phone try refresh or wait for CDN cache.
)
echo.
echo Press Enter to close, or close this window with X.
pause
endlocal
