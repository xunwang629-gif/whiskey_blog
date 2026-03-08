import { MoreWaysIn } from "@/components/more-ways-in";
import { SiteNav } from "@/components/site-nav";
import { WechatCard } from "@/components/wechat-card";
import { BILIBILI_SPACE_URL, BILIBILI_VIDEO_URL, getBilibiliFeed } from "@/lib/bilibili";

export default async function Home() {
  const feed = await getBilibiliFeed();
  const archiveItems = feed.items.slice(3, 8);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* ── Hero ── */}
      <section className="mx-auto flex min-h-[calc(100svh-73px)] max-w-4xl flex-col justify-center px-6 py-12 sm:min-h-[calc(100svh-85px)] sm:py-16">
        <p className="animate-in stagger-1 text-[11px] tracking-[0.22em] text-muted uppercase sm:text-sm sm:tracking-[0.3em]">
          Hip-Hop 歌词解析&ensp;·&ensp;Culture&ensp;·&ensp;Code
        </p>

        <h1 className="animate-in stagger-2 mt-5 font-serif text-[clamp(2.4rem,10vw,5rem)] font-medium leading-[1.04] tracking-tight sm:mt-6 sm:leading-[1.08]">
          All for love,
          <br />
          All for the culture.
        </h1>

        <p className="animate-in stagger-3 mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:mt-8 sm:text-[17px]">
          HiWhiskey，
          歌词深度解析，偶尔会归纳一些喜欢的泄曲～
          全部为了爱。
        </p>
      </section>

      {/* ── Archive ── */}
      <section
        id="drops"
        className="mx-auto max-w-4xl border-t border-border px-6 py-16 scroll-mt-20"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-2xl font-medium tracking-tight">
            Archive
          </h2>
          <div className="flex flex-col items-start gap-1 text-sm sm:items-end">
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
        <div className="mt-8 flex flex-col">
          {archiveItems.map((video) => (
            <a
              key={`${video.title}-${video.publishedLabel}`}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group -mx-3 flex flex-col items-start gap-2 rounded-lg px-3 py-5 transition-colors duration-200 hover:bg-card sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <div className="min-w-0">
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
        {feed.source === "fallback" ? (
          <p className="mt-6 text-sm text-muted">当前展示手动精选内容。</p>
        ) : null}
      </section>

      <MoreWaysIn />

      {/* ── Connect ── */}
      <section
        id="connect"
        className="mx-auto max-w-4xl border-t border-border px-6 py-16 scroll-mt-20"
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
            className="card-lift group rounded-xl border border-border bg-card px-5 py-4"
          >
            <p className="font-medium tracking-tight transition-colors duration-200 group-hover:text-accent">
              Bilibili
            </p>
            <p className="mt-1 text-sm text-muted">歌词解析视频</p>
          </a>
          <div className="card-lift cursor-default rounded-xl border border-border bg-card px-5 py-4">
            <p className="font-medium tracking-tight text-muted/60">
              抖音
            </p>
            <p className="mt-1 text-sm text-muted/50">即将上线</p>
          </div>
          <div className="card-lift cursor-default rounded-xl border border-border bg-card px-5 py-4">
            <p className="font-medium tracking-tight text-muted/60">
              GitHub
            </p>
            <p className="mt-1 text-sm text-muted/50">即将上线</p>
          </div>
          <WechatCard />
        </div>
      </section>
      {/* ── Footer ── */}
      <footer className="mx-auto max-w-4xl border-t border-border px-6 py-8">
        <div className="flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} HiWhiskey</p>
          <p className="font-serif italic">All for the culture.</p>
        </div>
      </footer>
    </main>
  );
}
