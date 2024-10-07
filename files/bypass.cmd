@ECHO OFF
SETLOCAL
:cmdloop
@set /p USERCMD=%CD%! 
%USERCMD%
@GOTO cmdloop
:end
@ENDLOCAL
@pause