export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ── Navigation ── */}
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-8">
        <a
          href="/"
          className="font-serif text-xl font-semibold tracking-tight"
        >
          HiWhiskey
        </a>
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
            href="https://space.bilibili.com/7858870"
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
          <a
            href="https://space.bilibili.com/7858870/video"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors duration-200 hover:text-accent"
          >
            查看全部 &rarr;
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {/* Card 1 — Drake Top 10 (biggest hit) */}
          <a
            href="https://space.bilibili.com/7858870/video"
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-zinc-800 to-stone-900 p-6 transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
                    92w 播放
                  </span>
                  <span className="text-xs text-white/40">18:56</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/50">Drake</p>
                  <h3 className="mt-1 text-lg font-semibold leading-snug text-white">
                    Drake&apos;s Top 10 Songs
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    全网最全 Drake 十佳歌曲歌词深度解析
                  </p>
                </div>
              </div>
            </div>
          </a>

          {/* Card 2 — Kanye */}
          <a
            href="https://space.bilibili.com/7858870/video"
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950 via-orange-900 to-yellow-950 p-6 transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
                    3.6w 播放
                  </span>
                  <span className="text-xs text-white/40">4:32</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/50">
                    Kanye West
                  </p>
                  <h3 className="mt-1 text-lg font-semibold leading-snug text-white">
                    Ghost Town
                    <br />
                    歌词解析
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    Ye 最被低估的一首歌，孤独、自由与救赎
                  </p>
                </div>
              </div>
            </div>
          </a>

          {/* Card 3 — Drake */}
          <a
            href="https://space.bilibili.com/7858870/video"
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-violet-950 via-indigo-900 to-purple-900 p-6 transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
                    7.8w 播放
                  </span>
                  <span className="text-xs text-white/40">3:15</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white/50">Drake</p>
                  <h3 className="mt-1 text-lg font-semibold leading-snug text-white">
                    What Did I Miss?
                    <br />
                    歌词解析
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    Drake 的反击，每一句都有所指
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ── More Episodes (list style) ── */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="font-serif text-2xl font-medium tracking-tight">
          Archive
        </h2>
        <div className="mt-8 flex flex-col divide-y divide-border">
          <a
            href="https://space.bilibili.com/7858870/video"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-5"
          >
            <div>
              <h3 className="font-medium tracking-tight transition-colors duration-200 group-hover:text-accent">
                Family Matters - Drake 歌词解析
              </h3>
              <p className="mt-1 text-sm text-muted">Drake · 歌词解析</p>
            </div>
            <span className="shrink-0 text-sm text-muted">1,140 播放</span>
          </a>
          <a
            href="https://space.bilibili.com/7858870/video"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-5"
          >
            <div>
              <h3 className="font-medium tracking-tight transition-colors duration-200 group-hover:text-accent">
                5am in Toronto - Drake 歌词解析
              </h3>
              <p className="mt-1 text-sm text-muted">Drake · 歌词解析</p>
            </div>
            <span className="shrink-0 text-sm text-muted">748 播放</span>
          </a>
          <a
            href="https://space.bilibili.com/7858870/video"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-5"
          >
            <div>
              <h3 className="font-medium tracking-tight transition-colors duration-200 group-hover:text-accent">
                Emotionless - Drake 歌词解析
              </h3>
              <p className="mt-1 text-sm text-muted">Drake · 歌词解析</p>
            </div>
            <span className="shrink-0 text-sm text-muted">1,257 播放</span>
          </a>
          <a
            href="https://space.bilibili.com/7858870/video"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-5"
          >
            <div>
              <h3 className="font-medium tracking-tight transition-colors duration-200 group-hover:text-accent">
                Fireworks - Drake 歌词解析
              </h3>
              <p className="mt-1 text-sm text-muted">Drake · 歌词解析</p>
            </div>
            <span className="shrink-0 text-sm text-muted">1,214 播放</span>
          </a>
        </div>
      </section>

      {/* ── About ── */}
      <section
        id="about"
        className="mx-auto max-w-4xl border-t border-border px-6 py-16"
      >
        <div className="grid gap-10 sm:grid-cols-[1fr_1.2fr]">
          <div>
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
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-card p-5">
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
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs tracking-widest text-muted uppercase">
                Tech Stack
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Java", "Spring Boot", "Next.js", "TypeScript"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent/10 px-3 py-1 text-sm text-accent"
                    >
                      {tag}
                    </span>
                  ),
                )}
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
            href="https://space.bilibili.com/7858870"
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
