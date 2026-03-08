"use client";

import { useEffect, useState } from "react";

const WECHAT_ID = "linewitblack";

export function WechatCard() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(WECHAT_ID);
      setCopied(true);
    } catch {
      window.prompt("请手动复制微信号", WECHAT_ID);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group rounded-xl border border-border bg-card px-5 py-4 text-left transition-all duration-200 hover:bg-card-hover hover:shadow-sm"
    >
      <p className="font-medium tracking-tight transition-colors duration-200 group-hover:text-accent">
        微信
      </p>
      <p className="mt-1 text-sm text-muted" aria-live="polite">
        {copied ? `已复制：${WECHAT_ID}` : `点击复制 ${WECHAT_ID}`}
      </p>
    </button>
  );
}
