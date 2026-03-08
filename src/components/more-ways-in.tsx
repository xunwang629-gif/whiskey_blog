"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function MoreWaysIn() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    const updateCardMotion = () => {
      frameId = 0;

      itemRefs.current.forEach((node, index) => {
        if (!node) {
          return;
        }

        if (prefersReducedMotion.matches) {
          node.style.opacity = "1";
          node.style.transform = "scale(1)";
          return;
        }

        const rect = node.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const start = viewportHeight * 1.02;
        const end = viewportHeight * (0.34 - index * 0.05);
        const progress = clamp((start - rect.top) / (start - end), 0, 1);
        const scale = 0.78 + progress * 0.22;
        const opacity = 0.08 + progress * 0.92;

        node.style.opacity = opacity.toFixed(3);
        node.style.transform = `scale(${scale.toFixed(3)})`;
      });
    };

    const requestUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateCardMotion);
    };

    updateCardMotion();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    prefersReducedMotion.addEventListener("change", requestUpdate);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      prefersReducedMotion.removeEventListener("change", requestUpdate);
    };
  }, []);

  const baseCardClass =
    "block transform-gpu opacity-[0.08] transition-colors duration-200 will-change-transform will-change-[opacity]";

  return (
    <section ref={sectionRef} className="mx-auto max-w-4xl px-6 py-10 sm:py-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-medium tracking-tight">More Ways In</h2>
          <p className="mt-2 text-sm text-muted">
           你威哥的小巧思
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
        <Link
          href="/drake-library"
          ref={(node) => {
            itemRefs.current[0] = node;
          }}
          className={`${baseCardClass} group origin-left`}
        >
          <p className="text-xs tracking-[0.22em] text-muted uppercase">Library</p>
          <h3 className="mt-4 font-serif text-[clamp(2rem,4vw,3.4rem)] leading-none tracking-tight transition-colors duration-200 group-hover:text-accent">
            Drake音乐库
          </h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">
            在线播放、下载 MP3.
          </p>
          <span className="mt-6 inline-flex items-center text-sm text-muted transition-colors duration-200 group-hover:text-accent">
            进入音乐库 &rarr;
          </span>
        </Link>

        <Link
          href="/message-box"
          ref={(node) => {
            itemRefs.current[1] = node;
          }}
          className={`${baseCardClass} group origin-right`}
        >
          <p className="text-xs tracking-[0.22em] text-muted uppercase">Community</p>
          <h3 className="mt-4 font-serif text-[clamp(2rem,4vw,3.4rem)] leading-none tracking-tight transition-colors duration-200 group-hover:text-accent">
            匿名社区
          </h3>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted">
            带标题的匿名发帖区。想点歌、催更、补资料，直接开帖，下面继续接回复。
          </p>
          <span className="mt-6 inline-flex items-center text-sm text-muted transition-colors duration-200 group-hover:text-accent">
            进入社区 &rarr;
          </span>
        </Link>
      </div>
    </section>
  );
}
