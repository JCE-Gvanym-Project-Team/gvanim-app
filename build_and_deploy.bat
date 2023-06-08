@echo off

call npm run build
@REM setlocal enabledelayedexpansion

@REM set search=/gvanim-app/
@REM set replacement=

@REM cd build

@REM set inputfile=index.html
@REM set outputfile=index_modified.html

@REM if exist %outputfile% del %outputfile%

@REM for /f "tokens=*" %%a in ('type "%inputfile%" ^| find /v ""') do (
@REM   set "line=%%a"
@REM   set "line=!line:%search%=%replacement%!"
@REM   echo !line!>>%outputfile%
@REM )

@REM del %inputfile%
@REM ren %outputfile% %inputfile%

@REM cd ..

call firebase deploy

echo deployed!
pause