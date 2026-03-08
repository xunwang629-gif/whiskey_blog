"use client";

import { CommunityPostForm } from "@/components/community-post-form";

export function CommunityIntroPanel({
  sampleMode,
  onClose,
}: {
  sampleMode: boolean;
  onClose?: () => void;
}) {
  return (
    <section className="community-detail-shell community-panel-enter min-h-[calc(100svh-73px)] md:min-h-[calc(100svh-81px)]">
      <div className="border-b border-border/90 px-5 py-5 sm:px-7">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.24em] text-muted uppercase">Composer</p>
            <h1 className="mt-2 font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
              把帖子发到右侧，
              <br />
              再让左边慢慢把讨论堆起来。
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
              入口放在左栏上方，写作面板只在需要时展开。关掉它之后，左边的话题流会重新占满主体区域。
            </p>
          </div>

          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors duration-200 hover:border-accent/35 hover:text-accent"
            >
              关闭
            </button>
          ) : null}
        </div>
      </div>

      <div className="px-5 py-5 sm:px-7">
        <CommunityPostForm sampleMode={sampleMode} />
      </div>
    </section>
  );
}
