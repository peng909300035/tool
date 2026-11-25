# Cloudflare Workers 部署指南

当前站点使用 Cloudflare Workers Static Assets。Worker 只处理兜底响应和响应头，不读取上传图片，也不写入 KV/R2/D1。

**二选一，不要同时开两套自动部署：**

- 方案 A：Cloudflare Workers 的 Git 集成（你现在已经连着 GitHub，推荐继续用这个）
- 方案 B：GitHub Actions（本仓库也准备了工作流，但需要配置 Secrets）

如果你继续用 Cloudflare 的 Git 集成，就在 Cloudflare Worker 的 Build settings 里配置：

```txt
Build command: node scripts/build.mjs
Build output directory: dist
Root directory: /
```

然后正常 push 即可，不需要 GitHub Actions Secrets。

如果使用 GitHub Actions，则关掉 Cloudflare Git 集成的自动部署，按下面第 1、2 节配置 Secrets。

## 1. GitHub 自动部署（备选）

已添加工作流：

```txt
.github/workflows/deploy.yml
```

行为：

- 推送到 `master` 或 `main` 时自动构建并部署
- 也可以从 GitHub Actions 页面手动触发
- 构建命令：`node scripts/build.mjs`
- 部署命令：`wrangler deploy`

你的流程以后就是：

```bash
# 改完代码
git add .
git commit -m "Update site"
git push
```

推送完成后 GitHub 会自动构建并发布到 Cloudflare Workers。

## 2. 配置 GitHub Secrets

在 GitHub 仓库：

```txt
Settings → Secrets and variables → Actions → New repository secret
```

添加两个 Secret：

| Secret | 值 | 说明 |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token | 需要 Workers Script 编辑权限 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID | 在 Workers 页面右侧可找到 |

API Token 建议权限：

```txt
Workers Script: Edit
Account Settings: Read
```

不要把这个 Token 写进代码或 `wrangler.toml`。

## 3. 构建产物

```bash
cd F:/project/tool
node scripts/build.mjs
```

产物在 `dist/`，同时会镜像一份到项目根目录。这样 Workers 用 `./dist` 部署，Pages 用 `.` 作为输出目录也能正常访问全部页面和资源。

## 4. 本地预览

```bash
cd F:/project/tool
npx wrangler dev
```

打开终端给出的本地地址。注意：Service Worker 只在 HTTPS 或 localhost 环境注册。

## 5. 手动部署

```bash
cd F:/project/tool
npx wrangler deploy
```

`wrangler.toml` 已配置：

```toml
name = "toolorial-cutout"
main = "src/worker/worker.js"

[assets]
directory = "./dist"
binding = "ASSETS"
not_found_handling = "404-page"
html_handling = "auto-trailing-slash"
```

## 6. 绑定域名

当前配置里的域名是 `api.tooloralab.xyz`，域名配置源在：

```txt
src/site/content.mjs
```

如果以后更换域名，改这里后提交 GitHub，会自动重新生成 canonical、sitemap、Open Graph 和全部页面。

绑定后检查：

- `https://api.tooloralab.xyz/` 返回首页
- `https://api.tooloralab.xyz/assets/sample-portrait.svg` 返回图片
- `https://api.tooloralab.xyz/remove-background/` 返回工具页
- `https://api.tooloralab.xyz/robots.txt` 可访问
- `https://api.tooloralab.xyz/sitemap.xml` 可访问
- `https://api.tooloralab.xyz/vendor/mediapipe/selfie_segmentation.tflite` 可访问
- `*.workers.dev` 返回 `X-Robots-Tag: noindex, nofollow`

## 7. AdSense 申请前必须替换

1. `src/site/content.mjs` 中的 `SITE.origin`、`SITE.domain`、`SITE.email`
2. `dist/ads.txt` 会由构建脚本生成，拿到 AdSense 发布商 ID 后修改 `scripts/build.mjs` 里的 `adsTxt` 常量
3. 确认联系邮箱是可收信邮箱
4. 申请通过后，再把 AdSense 脚本加入页面模板的 `<head>` 或内容区

## 8. 注意

- 一期模型只适合人像、头像和证件照风格照片。
- 广告脚本可能使用 Cookie，但不会读取用户处理的图片像素。
- 不要把用户上传目录写进 `dist/`，也不要新增读取 request body 的 Worker 接口。
