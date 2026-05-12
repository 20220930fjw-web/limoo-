@echo off
chcp 65001 >nul
echo ========================================
echo   HUGO Portfolio - 一键部署到 GitHub
echo ========================================
echo.

cd /d "C:\Users\EDY\AppData\Roaming\TRAE SOLO CN\ModularData\ai-agent\work-mode-projects\69fd4f667a98520eb1922482"

echo [1/3] 检查文件状态...
git status --short
echo.

echo [2/3] 添加并提交所有更改...
git add -A
git commit -m "update: %date% %time:0,8%"
echo.

echo [3/3] 推送到 GitHub...
git push origin main --force
echo.

if %errorlevel% equ 0 (
    echo ========================================
    echo   部署成功！
    echo   网站地址: https://20220930fjw-web.github.io/limoo-/
    echo   1-2分钟后生效
    echo ========================================
) else (
    echo ========================================
    echo   部署失败，请检查网络连接
    echo ========================================
)

pause
