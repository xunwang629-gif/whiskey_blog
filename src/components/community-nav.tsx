import Link from "next/link";

export function CommunityNav() {
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex size-10 items-center justify-center rounded-2xl border border-border bg-card text-sm text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent"
          >
            H
          </Link>
          <div>
            <p className="text-[11px] tracking-[0.24em] text-muted uppercase">Community</p>
            <p className="font-serif text-xl tracking-tight text-foreground">匿名社区</p>
          </div>
        </div>

        <div className="hidden items-center gap-6 text-sm text-muted md:flex">
          <Link href="/" className="transition-colors duration-200 hover:text-foreground">
            首页
          </Link>
          <Link href="/drake-library" className="transition-colors duration-200 hover:text-foreground">
            Drake音乐库
          </Link>
        </div>
      </nav>
    </div>
  );
}
