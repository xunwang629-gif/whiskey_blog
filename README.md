## HiWhiskey

个人网站，部署在 Vercel，首页会展示 B 站最新内容。

## 本地开发

先安装依赖并启动开发环境：

```bash
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

## 自动同步 B 站

当前项目已经预留了 `Vercel Hobby` 的每日同步结构：

- 首页会尝试读取 `BILIBILI_RSS_URL`
- 如果 RSS 可用，首页 `Latest Drops / Archive` 会自动显示最新视频
- 如果 RSS 未配置或抓取失败，页面会自动回退到手动精选内容
- `vercel.json` 已配置每日 cron，触发路径为 `/api/cron/bilibili`

### 需要配置的环境变量

参考 [.env.example](./.env.example)：

```bash
BILIBILI_RSS_URL=https://your-rsshub-domain.example.com/bilibili/user/video/7858870
CRON_SECRET=replace-with-a-random-string
```

说明：

- `BILIBILI_RSS_URL`：你自己部署的 RSSHub 路由
- `CRON_SECRET`：Vercel Cron 调用 `/api/cron/bilibili` 时使用的校验密钥

### Vercel Hobby 限制

- 只能每天同步一次
- 触发时间是“该小时内”，不是精确到分钟

## 部署

建议直接连接 GitHub 仓库部署到 Vercel。

每次推送到 `main` 后，Vercel 会自动重新部署。
