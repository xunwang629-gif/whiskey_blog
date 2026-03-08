"use client";

import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function CommunityPostForm({
  sampleMode,
  compact = false,
  onClose,
}: {
  sampleMode: boolean;
  compact?: boolean;
  onClose?: () => void;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (trimmedTitle.length < 4) {
      setSubmitState("error");
      setFeedback("标题至少写 4 个字。");
      return;
    }

    if (trimmedContent.length < 6) {
      setSubmitState("error");
      setFeedback("正文至少写 6 个字。");
      return;
    }

    setSubmitState("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/community/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedTitle,
          content: trimmedContent,
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        postId?: string;
      };

      if (!response.ok || !payload.ok || !payload.postId) {
        throw new Error(payload.error || "发帖失败，请稍后再试。");
      }

      setSubmitState("success");
      setFeedback("帖子已经发出，正在打开详情页。");
      setTitle("");
      setContent("");

      startTransition(() => {
        router.push(`/message-box/${payload.postId}`);
        router.refresh();
      });
    } catch (error) {
      setSubmitState("error");
      setFeedback(error instanceof Error ? error.message : "发帖失败，请稍后再试。");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      id="community-composer"
      className={`rounded-[1.75rem] border border-border bg-card/90 shadow-[0_18px_34px_rgba(31,30,29,0.05)] ${
        compact ? "px-4 py-4 sm:px-5" : "px-5 py-5"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm leading-7 text-muted">
          标题把话题立住，正文把你真正想说的写清楚。{sampleMode ? "当前还是模板数据模式。" : "现在会直接写进 Notion。"}
        </p>

        <div className="flex items-center gap-3">
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground transition-colors duration-200 hover:border-accent/35 hover:text-accent"
            >
              关闭
            </button>
          ) : null}

          <button
            type="submit"
            disabled={submitState === "submitting"}
            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm text-background shadow-[0_12px_28px_rgba(31,30,29,0.12)] transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
          >
            {submitState === "submitting" ? "发帖中…" : "发布帖子"}
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm text-muted">标题</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={80}
            placeholder="比如：想看 5AM in Toronto 的逐段解析"
            className="mt-2 h-12 w-full rounded-2xl border border-border bg-background px-4 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted/80 focus:border-accent/35"
          />
        </label>

        <label className="block">
          <span className="text-sm text-muted">正文</span>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={compact ? 4 : 6}
            maxLength={2000}
            placeholder="写下你想听的歌、想看的解析、想补的背景，或者单纯催更。"
            className={`mt-2 w-full rounded-[1.5rem] border border-border bg-background px-4 py-4 text-[15px] leading-7 text-foreground outline-none transition-colors placeholder:text-muted/80 focus:border-accent/35 ${
              compact ? "min-h-32" : "min-h-44"
            }`}
          />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={
            submitState === "error"
              ? "text-sm text-red-500"
              : submitState === "success"
                ? "text-sm text-emerald-600"
                : "text-sm text-muted"
          }
        >
          {feedback || "不需要登录，发出后会进入帖子详情页。"}
        </p>
      </div>
    </form>
  );
}
