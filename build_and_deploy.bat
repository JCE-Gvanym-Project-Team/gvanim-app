@echo off
call npm run build
setlocal enabledelayedexpansion

set search=/gvanim-app/
set replacement=

cd build

set inputfile=index.html
set outputfile=index_modified.html

if exist %outputfile% del %outputfile%

for /f "tokens=*" %%a in ('type "%inputfile%" ^| find /v ""') do (
  set "line=%%a"
  set "line=!line:%search%=%replacement%!"
  echo !line!>>%outputfile%
)

del %inputfile%
ren %outputfile% %inputfile%

cd ..

call firebase deploy

echo deployed!
pause
