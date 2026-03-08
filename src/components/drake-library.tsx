"use client";

import { useState } from "react";

import type { MusicTrack } from "@/lib/music-library";

type DrakeLibraryProps = {
  tracks: MusicTrack[];
};

export function DrakeLibrary({ tracks }: DrakeLibraryProps) {
  const [activeTrackId, setActiveTrackId] = useState(tracks[0]?.id ?? "");
  const activeTrack =
    tracks.find((track) => track.id === activeTrackId) ?? tracks[0] ?? null;

  return (
    <section id="drake-library" className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          {activeTrack ? (
            <>
              <p className="text-xs tracking-[0.2em] text-muted uppercase">
                Now Playing
              </p>
              <h3 className="mt-4 font-serif text-3xl tracking-tight">
                {activeTrack.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{activeTrack.subtitle}</p>
              {activeTrack.description && (
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
                  {activeTrack.description}
                </p>
              )}
              <audio
                key={activeTrack.id}
                className="mt-6 w-full"
                controls
                preload="none"
                src={activeTrack.src}
              >
                你的浏览器暂不支持音频播放。
              </audio>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href={activeTrack.src}
                  download
                  className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  下载 MP3
                </a>
                <p className="text-xs text-muted">
                  如果当前文件还没上传，播放和下载都会不可用。
                </p>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted">先在 `src/lib/music-library.ts` 里添加歌曲。</p>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-3">
          <div className="space-y-2">
            {tracks.map((track, index) => {
              const isActive = track.id === activeTrack?.id;

              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setActiveTrackId(track.id)}
                  className={`w-full rounded-xl border px-4 py-4 text-left transition-colors duration-200 ${
                    isActive
                      ? "border-accent/40 bg-accent/5"
                      : "border-transparent hover:border-border hover:bg-card-hover"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium tracking-tight">{track.title}</p>
                      <p className="mt-1 text-sm text-muted">{track.subtitle}</p>
                    </div>
                    <span className="text-xs text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
