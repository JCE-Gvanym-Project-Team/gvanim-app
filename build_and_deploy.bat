@echo off
npm run build
setlocal enabledelayedexpansion

set search=/gvanim-app/
set replacement=

set inputfile=build/index.html
set outputfile=build/index_modified.html

if exist %outputfile% del %outputfile%

for /f "tokens=*" %%a in ('type "%inputfile%" ^| find /v ""') do (
  set "line=%%a"
  set "line=!line:%search%=%replacement%!"
  echo !line!>>%outputfile%
)

del %inputfile%
ren %outputfile% %inputfile%

firebase deploy

echo deployed!
pause
