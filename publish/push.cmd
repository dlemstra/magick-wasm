@echo off

echo Are you sure?
pause

set VERSION=0.0.37
call npm config set prefix %~dp0
call npm publish imagemagick-magick-wasm-%VERSION%.tgz --access public
call npm config set prefix %APPDATA%\npm
pause
