import Link from "next/link";

import { BILIBILI_SPACE_URL, BILIBILI_VIDEO_URL, getBilibiliFeed } from "@/lib/bilibili";

export default async function Home() {
  const feed = await getBilibiliFeed();
  const latestDrops = feed.items.slice(0, 3);
  const archiveItems = feed.items.slice(3, 8);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ── Navigation ── */}
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-8">
        <Link href="/" className="font-serif text-xl font-semibold tracking-tight">
          HiWhiskey
        </Link>
        <div className="flex items-center gap-8 text-[15px] text-muted">
          <a
            href="#drops"
            className="transition-colors duration-200 hover:text-foreground"
          >
            Drops
          </a>
          <a
            href="#about"
            className="transition-colors duration-200 hover:text-foreground"
          >
            About
          </a>
          <a
            href={BILIBILI_SPACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-4 py-1.5 text-sm transition-all duration-200 hover:border-foreground hover:text-foreground"
          >
            B 站
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <p className="animate-in stagger-1 text-sm tracking-[0.3em] text-muted uppercase">
          Hip-Hop 歌词解析&ensp;·&ensp;Culture&ensp;·&ensp;Code
        </p>

        <h1 className="animate-in stagger-2 mt-6 font-serif text-[clamp(2.8rem,7vw,5rem)] font-medium leading-[1.08] tracking-tight">
          All for love,
          <br />
          All for the culture.
        </h1>

        <p className="animate-in stagger-3 mt-8 max-w-xl text-[17px] leading-relaxed text-muted">
          我是 HiWhiskey，专注欧美 Hip-Hop
          歌词深度解析，偶尔会归纳一些喜欢的泄曲～
          全部为了爱。
        </p>

        {/* accent bar */}
        <div className="animate-in stagger-4 mt-10 h-px w-16 bg-accent/40" />
      </section>

      {/* ── Latest Drops (Analysis) ── */}
      <section id="drops" className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-2xl font-medium tracking-tight">
            Latest Drops
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted">{feed.lastSyncedLabel}</span>
            <a
              href={BILIBILI_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors duration-200 hover:text-accent"
            >
              查看全部 &rarr;
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {latestDrops.map((video) => (
            <a
              key={`${video.title}-${video.publishedAt}`}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div
                className={`aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br ${video.accentClass} p-6 transition-transform duration-300 group-hover:scale-[1.02]`}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
                      {video.badge}
                    </span>
                    <span className="text-xs text-white/50">
                      {video.publishedLabel}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/50">
                      {video.subtitle}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold leading-snug text-white">
                      {video.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">
                      {video.summary}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {feed.source === "fallback" ? (
          <p className="mt-6 text-sm text-muted">
            当前还是手动精选内容。等你在 Vercel 配好 `BILIBILI_RSS_URL` 和
            `CRON_SECRET` 后，这里会改成每天自动同步。
          </p>
        ) : null}
      </section>

      {/* ── More Episodes (list style) ── */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="font-serif text-2xl font-medium tracking-tight">
          Archive
        </h2>
        <div className="mt-8 flex flex-col divide-y divide-border">
          {archiveItems.map((video) => (
            <a
              key={`${video.title}-${video.publishedLabel}`}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 py-5"
            >
              <div>
                <h3 className="font-medium tracking-tight transition-colors duration-200 group-hover:text-accent">
                  {video.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{video.subtitle}</p>
              </div>
              <span className="shrink-0 text-sm text-muted">
                {video.publishedLabel}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        className="mx-auto max-w-4xl border-t border-border px-6 py-16"
      >
        <div className="grid gap-12 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] sm:items-start">
          <div className="max-w-md">
            <h2 className="font-serif text-2xl font-medium tracking-tight">
              About
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-muted">
              HiWhiskey，
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              专注 Drake、Kanye West 等欧美说唱歌手的歌词深度解析。
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              清淡饮食加早睡
            </p>
          </div>
          <div className="sm:justify-self-end">
            <div className="max-w-lg rounded-xl border border-border bg-card p-5">
              <p className="text-xs tracking-widest text-muted uppercase">
                常驻解析
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Drake",
                  "Kanye West",
                  "歌词翻译",
                  "深度解析",
                  "文化背景",
                  "欧美说唱",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-sm text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Connect ── */}
      <section
        id="connect"
        className="mx-auto max-w-4xl border-t border-border px-6 py-16"
      >
        <h2 className="font-serif text-2xl font-medium tracking-tight">
          Connect
        </h2>
        <p className="mt-4 text-[15px] text-muted">
          我在哪里发布？主要是抖音和bilibili，点击支持哟
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <a
            href={BILIBILI_SPACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-border bg-card px-5 py-4 transition-all duration-200 hover:bg-card-hover hover:shadow-sm"
          >
            <p className="font-medium tracking-tight transition-colors duration-200 group-hover:text-accent">
              Bilibili
            </p>
            <p className="mt-1 text-sm text-muted">歌词解析视频</p>
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-border bg-card px-5 py-4 transition-all duration-200 hover:bg-card-hover hover:shadow-sm"
          >
            {/* TODO: 替换为你的抖音公开链接 */}
            <p className="font-medium tracking-tight transition-colors duration-200 group-hover:text-accent">
              抖音
            </p>
            <p className="mt-1 text-sm text-muted">短视频版解析</p>
          </a>
          <a
            href="#"
            className="group rounded-xl border border-border bg-card px-5 py-4 transition-all duration-200 hover:bg-card-hover hover:shadow-sm"
          >
            <p className="font-medium tracking-tight transition-colors duration-200 group-hover:text-accent">
              GitHub
            </p>
            <p className="mt-1 text-sm text-muted">开源项目</p>
          </a>
          <a
            href="#"
            className="group rounded-xl border border-border bg-card px-5 py-4 transition-all duration-200 hover:bg-card-hover hover:shadow-sm"
          >
            <p className="font-medium tracking-tight transition-colors duration-200 group-hover:text-accent">
              微信群
            </p>
            <p className="mt-1 text-sm text-muted">linewitblack</p>
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mx-auto max-w-4xl border-t border-border px-6 py-8">
        <div className="flex items-center justify-between text-sm text-muted">
          <p>&copy; 2026 HiWhiskey</p>
          <p className="font-serif italic">All for the culture.</p>
        </div>
      </footer>
    </main>
  );
}
