@echo off
SETLOCAL

echo delete dist folder
if exist dist rmdir /s /q dist

echo delete lib folder
if exist src\lib rmdir /s /q src\lib

echo create lib folder
mkdir src\lib

echo copy lib folder
robocopy "../serious-game-library/src" "src/lib" /E >nul

