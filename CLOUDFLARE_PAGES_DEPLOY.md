# Cloudflare Pages 部署指南

这是一个适合你当前 Web 端项目的低成本部署方案，适合不想备案但希望在国内访问尽量快的场景。

## 1. 准备工作

1. 注册一个 GitHub 账号。
2. 新建一个 GitHub 仓库，例如 `cutout-web`。
3. 将 `h:\tool` 目录下的文件推送到该仓库：

```bash
cd H:\tool
git init
git add .
git commit -m "Initial web deploy"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

## 2. 注册 Cloudflare Pages

1. 打开 https://pages.cloudflare.com/ 并登录。  
2. 点击“Create a project”。
3. 选择你的 GitHub 仓库。  
4. 分支选择 `main`。  
5. 构建设置：
   - Framework preset: `None`  
   - Build command: 留空  
   - Build output directory: `.`  
6. 点击“Save and Deploy”。

## 3. 部署完成后

部署完成后你会得到一个默认域名，例如：

```
https://<项目名>.<用户名>.pages.dev
```

这个地址就是可以访问的 Web 端。

## 4. 进一步优化国内访问

1. 在 Cloudflare Pages 设置里开启缓存。  
2. 如果你有自定义域名，绑定域名并在 Cloudflare DNS 中配置。  
3. 你也可以在 Domains 设置里启用 “Always Online” 和 “Auto Minify”。

## 5. 访问说明

- 你现在的项目是纯静态页面，所以直接部署即可。  
- 由于你不备案，Cloudflare Pages 会走国际线路，但它会尽量使用亚洲节点，国内访问通常比直接海外主机更好。

## 6. 后续如果需要

如果你以后想要：
- `自定义域名`  
- `HTTPS`  
- `页面加速`  
- `CDN 缓存策略`  

Cloudflare Pages 都可以直接配置。

---

## 本地测试方式

如果你想先在本地测试：

```powershell
cd H:\tool
python -m http.server 8000
```

然后打开：

```
http://127.0.0.1:8000/index.html
```
