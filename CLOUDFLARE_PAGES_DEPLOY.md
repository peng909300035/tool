# Cloudflare Workers 部署指南

当前站点使用 Cloudflare Workers Static Assets。Worker 只处理兜底响应和响应头，不读取上传图片，也不写入 KV/R2/D1。

## 1. 构建

```bash
cd F:/project/tool
node scripts/build.mjs
```

产物在 `dist/`，包含全部 HTML、样式、脚本、模型文件、sitemap、robots、ads.txt、`_headers` 和 `_redirects`。

## 2. 本地预览

```bash
cd F:/project/tool
npx wrangler dev
```

打开终端给出的本地地址。注意：Service Worker 只在 HTTPS 或 localhost 环境注册。

## 3. 部署

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

## 4. 绑定域名

在 Cloudflare Workers 的 Settings → Domains & Routes 添加 `toolorial.xyz` 和 `www.toolorial.xyz`，并确认 DNS 记录由 Cloudflare 代理。

绑定后检查：

- `https://toolorial.xyz/` 返回首页
- `https://toolorial.xyz/robots.txt` 可访问
- `https://toolorial.xyz/sitemap.xml` 可访问
- `https://toolorial.xyz/vendor/mediapipe/selfie_segmentation.tflite` 可访问
- `*.workers.dev` 返回 `X-Robots-Tag: noindex, nofollow`

## 5. AdSense 申请前必须替换

1. `src/site/content.mjs` 中的 `SITE.origin`、`SITE.domain`、`SITE.email`
2. `dist/ads.txt` 会由构建脚本生成，拿到 AdSense 发布商 ID 后修改 `scripts/build.mjs` 里的 `adsTxt` 常量
3. 确认 `hello@toolorial.xyz` 是可收信邮箱
4. 申请通过后，再把 AdSense 脚本加入页面模板的 `<head>` 或内容区

## 6. 注意

- 一期模型只适合人像、头像和证件照风格照片。
- 广告脚本可能使用 Cookie，但不会读取用户处理的图片像素。
- 不要把用户上传目录写进 `dist/`，也不要新增读取 request body 的 Worker 接口。
