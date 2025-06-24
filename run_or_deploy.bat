@echo off
REM filepath: c:\Users\Siamax\Desktop\meezan-statement-parser-and-expense-tracker\run_or_deploy.bat

echo.
echo Select an option:
echo 1. Run development server
echo 2. Deploy to GitHub Pages
echo 3. Exit
set /p choice=Enter your choice (1/2/3): 

if "%choice%"=="1" (
    npm run dev
) else if "%choice%"=="2" (
    npm run deploy
) else (
    echo Exiting...
)
pause