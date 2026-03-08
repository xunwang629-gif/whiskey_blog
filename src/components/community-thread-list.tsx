"use client";

import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

import type { CommunityPostSummary } from "@/lib/notion-community";

export function CommunityThreadList({
  posts,
  selectedPostId,
  actionLabel,
  actionHref,
  onActionClick,
  inlineComposer,
}: {
  posts: CommunityPostSummary[];
  selectedPostId?: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: MouseEventHandler<HTMLButtonElement>;
  inlineComposer?: ReactNode;
}) {
  const actionClassName =
    "inline-flex items-center justify-center rounded-full border border-accent/28 bg-accent/8 px-4 py-2.5 text-sm text-foreground transition-colors duration-200 hover:bg-accent/14";

  return (
    <aside className="community-panel flex min-h-[calc(100svh-73px)] flex-col overflow-hidden md:min-h-[calc(100svh-81px)]">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/90 px-4 py-4 sm:px-5">
        <div className="pt-1 text-sm text-muted">点开帖子向右展开</div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-sm text-muted">{posts.length} 帖</span>
          {actionHref ? (
            <Link href={actionHref} className={actionClassName}>
              {actionLabel}
            </Link>
          ) : onActionClick ? (
            <button type="button" onClick={onActionClick} className={actionClassName}>
              {actionLabel}
            </button>
          ) : null}
        </div>
      </div>

      {inlineComposer ? (
        <div className="border-b border-border/90 px-4 py-4 sm:px-5">{inlineComposer}</div>
      ) : null}

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 sm:p-5">
        {posts.map((post) => {
          const isActive = post.id === selectedPostId;

          return (
            <Link
              key={post.id}
              href={`/message-box/${post.id}`}
              className={`group block rounded-3xl border p-4 transition-all duration-200 ${
                isActive
                  ? "border-accent/35 bg-card shadow-[0_18px_38px_rgba(217,119,87,0.12)]"
                  : "border-border bg-card/80 hover:border-accent/22 hover:bg-card-hover"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-background text-lg text-foreground/72 shadow-[0_10px_26px_rgba(31,30,29,0.04)]">
                  匿
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted">
                      日常
                    </span>
                    <span className="text-[11px] text-muted">{post.createdAtLabel}</span>
                  </div>

                  <h3 className="mt-3 line-clamp-2 text-[1.55rem] leading-tight font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent">
                    {post.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">{post.preview}</p>

                  <div className="mt-4 flex items-center gap-4 text-sm text-muted">
                    <span>{post.replyCount} 条回复</span>
                    <span className={isActive ? "text-accent" : "text-foreground/68"}>
                      {isActive ? "正在展开" : "点开向右展开"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
