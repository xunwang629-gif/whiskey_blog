export default function Home() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-12 text-stone-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        <section className="rounded-3xl border border-amber-200/15 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.22),_rgba(28,25,23,0.95)_50%)] p-8 shadow-2xl shadow-amber-950/20 sm:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">
            Whiskey Blog
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-stone-50 sm:text-6xl">
            一个 Java 工程师的个人网站起点。
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
            这个项目已经用 Next.js、TypeScript 和 Tailwind CSS 初始化完成。
            你接下来可以把它扩展成个人博客、项目展示页和技术笔记站。
          </p>
          <div className="mt-10 flex flex-wrap gap-4 text-sm">
            <span className="rounded-full border border-stone-700 px-4 py-2 text-stone-200">
              Next.js 16
            </span>
            <span className="rounded-full border border-stone-700 px-4 py-2 text-stone-200">
              TypeScript
            </span>
            <span className="rounded-full border border-stone-700 px-4 py-2 text-stone-200">
              Tailwind CSS 4
            </span>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6">
            <h2 className="text-xl font-semibold text-stone-50">下一步 1</h2>
            <p className="mt-3 leading-7 text-stone-300">
              把首页文案改成你的个人介绍，确定你想展示的方向。
            </p>
          </article>
          <article className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6">
            <h2 className="text-xl font-semibold text-stone-50">下一步 2</h2>
            <p className="mt-3 leading-7 text-stone-300">
              新增 blog、about、projects 页面，逐步形成完整站点结构。
            </p>
          </article>
          <article className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6">
            <h2 className="text-xl font-semibold text-stone-50">下一步 3</h2>
            <p className="mt-3 leading-7 text-stone-300">
              连接 Vercel 部署，后续每次 push 到 GitHub 都能自动发布。
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
