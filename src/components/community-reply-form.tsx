"use client";

import { useRouter } from "next/navigation";
import { FormEvent, startTransition, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function CommunityReplyForm({ postId }: { postId: string }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedContent = content.trim();

    if (trimmedContent.length < 2) {
      setSubmitState("error");
      setFeedback("回复至少写两个字。");
      return;
    }

    setSubmitState("submitting");
    setFeedback("");

    try {
      const response = await fetch(`/api/community/posts/${postId}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: trimmedContent,
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "回复失败，请稍后再试。");
      }

      setSubmitState("success");
      setFeedback("收到，回复已经挂在下面。");
      setContent("");

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setSubmitState("error");
      setFeedback(error instanceof Error ? error.message : "回复失败，请稍后再试。");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.5rem] border border-border bg-card px-4 py-4 shadow-[0_14px_30px_rgba(31,30,29,0.04)]"
    >
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={3}
        maxLength={1000}
        placeholder="继续补充你的想法，或者直接回复楼主。"
        className="min-h-28 w-full rounded-[1.3rem] border border-border bg-background px-4 py-4 text-[15px] leading-7 text-foreground outline-none transition-colors placeholder:text-muted/80 focus:border-accent/35"
      />

      <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={
            submitState === "error"
              ? "text-sm text-red-500"
              : submitState === "success"
                ? "text-sm text-emerald-600"
                : "text-sm text-muted"
          }
        >
          {feedback || "回复框会固定停在底部，方便一边看一边回。"}
        </p>

        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm text-background shadow-[0_12px_28px_rgba(31,30,29,0.12)] transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
        >
          {submitState === "submitting" ? "发送中…" : "回复帖子"}
        </button>
      </div>
    </form>
  );
}
