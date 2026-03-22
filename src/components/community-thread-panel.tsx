import Link from "next/link";

import { CommunityReplyForm } from "@/components/community-reply-form";
import type { CommunityThread } from "@/lib/notion-community";

export function CommunityThreadPanel({ thread }: { thread: CommunityThread }) {
  return (
    <section className="community-detail-shell community-panel-enter flex min-h-0 flex-col">
      <div className="community-detail-scroll min-h-0 flex-1 overflow-y-auto">
        <div className="px-5 py-5 sm:px-7">
          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <span className="rounded-full border border-border bg-background px-3 py-1.5">
                匿名社区
              </span>
              <span>{thread.createdAtLabel}</span>
              <span>{thread.replies.length} 条回复</span>
            </div>

            <Link
              href="/message-box"
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors duration-200 hover:border-accent/35 hover:text-accent"
            >
              关闭
            </Link>
          </div>

          <h1 className="mt-5 max-w-4xl font-serif text-2xl leading-tight tracking-tight text-foreground sm:text-3xl">
            {thread.title}
          </h1>

          <p className="mt-6 max-w-3xl text-[16px] leading-8 text-muted sm:text-[18px]">
            {thread.content}
          </p>
        </div>

        <div className="border-t border-border/90 px-5 py-5 sm:px-7">
          <div className="space-y-4">
            {thread.replies.length ? (
              thread.replies.map((reply, index) => (
                <article
                  key={reply.id}
                  className="rounded-[1.6rem] border border-border bg-card/90 px-5 py-5 shadow-[0_14px_30px_rgba(31,30,29,0.04)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-xs text-muted">
                      reply {String(index + 1).padStart(2, "0")}
                    </p>
                    <span className="text-xs text-muted">{reply.createdAtLabel}</span>
                  </div>
                  <p className="mt-3 text-[15px] leading-7 text-foreground/88">{reply.content}</p>
                </article>
              ))
            ) : (
              <div className="rounded-[1.6rem] border border-dashed border-border px-5 py-6 text-sm text-muted">
                这条帖子还没有回复，你来开第一层。
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="community-detail-composer border-t border-border/90 bg-background/94 px-5 py-4 backdrop-blur-sm sm:px-7">
        <CommunityReplyForm postId={thread.id} />
      </div>
    </section>
  );
}
