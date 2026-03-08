import Link from "next/link";

import { BILIBILI_SPACE_URL } from "@/lib/bilibili";

export function SiteNav() {
  return (
    <div className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-5 sm:flex-nowrap sm:py-6">
        <Link href="/" className="font-serif text-xl font-semibold tracking-tight">
          HiWhiskey
        </Link>
        <div className="flex w-full items-center justify-between gap-4 text-[14px] text-muted sm:w-auto sm:justify-end sm:gap-8 sm:text-[15px]">
          <Link href="/drake-library" className="transition-colors duration-200 hover:text-foreground">
            Drake音乐库
          </Link>
          <Link href="/#drops" className="transition-colors duration-200 hover:text-foreground">
            我的发布
          </Link>
          <Link href="/message-box" className="transition-colors duration-200 hover:text-foreground">
            匿名社区
          </Link>
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
    </div>
  );
}
