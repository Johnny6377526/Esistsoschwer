部署说明 — 将本地静态站点发布为可访问链接

下面提供三种快速可行的方式：A) 使用本地隧道（ngrok）临时生成公网链接；B) 部署到 GitHub Pages 以获得长期托管；C) 直接使用 Netlify Drop（无需命令，拖拽上传）。

A. 快速临时链接（推荐用于演示）
1. 要求：在 Windows 上安装 Python（可用 `python --version` 检查）及 ngrok（下载并将 `ngrok.exe` 放到本项目根目录或 PATH 中）。
2. 在项目根目录（本仓库）运行：

```powershell
# 在仓库根目录运行（PowerShell）
python -m http.server 8000
# 在另一终端中启动 ngrok（如果 ngrok.exe 在根目录）：
.\ngrok.exe http 8000
```

3. 启动后，ngrok 会在控制台显示一个 `https://...` 的公网 URL，访问该 URL 即可看到本地网站。

补充：仓库中已添加 `serve-and-ngrok.ps1`（Windows PowerShell 脚本），可自动启动本地服务器并尝试读取 ngrok 的本地 API 来打印公网地址。用法：

```powershell
# 在项目根目录运行（确保 ngrok.exe 在同一目录或已加入 PATH）
.\serve-and-ngrok.ps1
```

B. 长期公开访问（推荐用于正式共享）—— GitHub Pages（自动化）
1. 在 GitHub 上创建一个新的仓库（例如：`kent-site`），或在本地已有仓库的基础上推送到远程仓库。
2. 本地操作（PowerShell 示例）：

```powershell
# 在项目根目录执行一次：
git init
git add .
git commit -m "Initial site"
# 将 <YOUR_REMOTE_URL> 替换为你的 GitHub 仓库地址（例如 https://github.com/you/kent-site.git）
git remote add origin <YOUR_REMOTE_URL>
git branch -M main
git push -u origin main
```

3. 我已为你添加了一个 GitHub Actions 工作流（.github/workflows/pages.yml），它会在你将代码推送到 `main` 分支时自动把仓库根目录内容发布到 GitHub Pages（无需额外 token）。
4. 推送成功并且 Actions 运行完后，几分钟内你可以访问 `https://<your-username>.github.io/<repo>/`，或在仓库 Settings → Pages 查看分配的 URL。

C. 最快（无命令） — Netlify Drop
1. 打开 https://app.netlify.com/drop
2. 将整个项目文件夹拖到页面上，Netlify 会上传并给出一个公网 URL（适合临时演示）。

注意与安全：
- ngrok 临时公网链接对任何人可见，请在演示结束后关闭 ngrok。  
- GitHub Pages 与 Netlify 为公开托管，仓库中含敏感信息请先移除。

我可以为你：
- 生成并提交一个 GitHub Actions 工作流（已添加），你只需把代码推到 GitHub；
- 或者按你当前网络环境继续帮助排查 ngrok/localtunnel 的无法访问问题；
- 或者指导你使用 Netlify Drop 上传并获取链接。
