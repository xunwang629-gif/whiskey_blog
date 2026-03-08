import { XMLParser } from "fast-xml-parser";

const BILIBILI_SPACE_URL = "https://space.bilibili.com/7858870";
const BILIBILI_VIDEO_URL = `${BILIBILI_SPACE_URL}/video`;
const RSS_REVALIDATE_SECONDS = 60 * 60 * 24;

export type BilibiliVideo = {
  title: string;
  url: string;
  summary: string;
  subtitle: string;
  badge: string;
  publishedAt: string;
  publishedLabel: string;
  accentClass: string;
};

export type BilibiliFeed = {
  items: BilibiliVideo[];
  source: "rss" | "fallback";
  lastSyncedLabel: string;
};

const fallbackVideos: BilibiliVideo[] = [
  {
    title: "Drake's Top 10 Songs",
    url: BILIBILI_VIDEO_URL,
    summary: "全网最全 Drake 十佳歌曲歌词深度解析",
    subtitle: "Drake",
    badge: "手动精选",
    publishedAt: "2026-03-08T00:00:00.000Z",
    publishedLabel: "2026-03-08",
    accentClass: "from-slate-950 via-zinc-800 to-stone-900",
  },
  {
    title: "Ghost Town 歌词解析",
    url: BILIBILI_VIDEO_URL,
    summary: "Ye 最被低估的一首歌，孤独、自由与救赎",
    subtitle: "Kanye West",
    badge: "手动精选",
    publishedAt: "2026-03-05T00:00:00.000Z",
    publishedLabel: "2026-03-05",
    accentClass: "from-amber-950 via-orange-900 to-yellow-950",
  },
  {
    title: "What Did I Miss? 歌词解析",
    url: BILIBILI_VIDEO_URL,
    summary: "Drake 的反击，每一句都有所指",
    subtitle: "Drake",
    badge: "手动精选",
    publishedAt: "2026-03-01T00:00:00.000Z",
    publishedLabel: "2026-03-01",
    accentClass: "from-violet-950 via-indigo-900 to-purple-900",
  },
  {
    title: "Family Matters - Drake 歌词解析",
    url: BILIBILI_VIDEO_URL,
    summary: "Drake · 歌词解析",
    subtitle: "Drake · 歌词解析",
    badge: "手动精选",
    publishedAt: "2026-02-25T00:00:00.000Z",
    publishedLabel: "2026-02-25",
    accentClass: "from-zinc-900 via-stone-800 to-neutral-900",
  },
  {
    title: "5am in Toronto - Drake 歌词解析",
    url: BILIBILI_VIDEO_URL,
    summary: "Drake · 歌词解析",
    subtitle: "Drake · 歌词解析",
    badge: "手动精选",
    publishedAt: "2026-02-21T00:00:00.000Z",
    publishedLabel: "2026-02-21",
    accentClass: "from-stone-900 via-amber-900 to-neutral-900",
  },
  {
    title: "Emotionless - Drake 歌词解析",
    url: BILIBILI_VIDEO_URL,
    summary: "Drake · 歌词解析",
    subtitle: "Drake · 歌词解析",
    badge: "手动精选",
    publishedAt: "2026-02-17T00:00:00.000Z",
    publishedLabel: "2026-02-17",
    accentClass: "from-slate-900 via-indigo-950 to-zinc-900",
  },
  {
    title: "Fireworks - Drake 歌词解析",
    url: BILIBILI_VIDEO_URL,
    summary: "Drake · 歌词解析",
    subtitle: "Drake · 歌词解析",
    badge: "手动精选",
    publishedAt: "2026-02-13T00:00:00.000Z",
    publishedLabel: "2026-02-13",
    accentClass: "from-neutral-900 via-zinc-800 to-stone-900",
  },
];

const accentClasses = [
  "from-slate-950 via-zinc-800 to-stone-900",
  "from-amber-950 via-orange-900 to-yellow-950",
  "from-violet-950 via-indigo-900 to-purple-900",
  "from-neutral-900 via-stone-800 to-zinc-900",
];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  trimValues: true,
});

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDateLabel(input?: string) {
  if (!input) {
    return "最近更新";
  }

  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    return "最近更新";
  }

  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function inferSubtitle(title: string) {
  if (title.includes("Drake")) {
    return "Drake";
  }
  if (title.includes("Kanye")) {
    return "Kanye West";
  }
  return "HiWhiskey · Bilibili";
}

function normalizeItems(rawItems: unknown) {
  const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

  return items
    .map((item, index) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const record = item as Record<string, unknown>;
      const title = typeof record.title === "string" ? stripHtml(record.title) : "";
      const url = typeof record.link === "string" ? record.link : BILIBILI_VIDEO_URL;
      const publishedAt =
        typeof record.pubDate === "string"
          ? record.pubDate
          : typeof record.updated === "string"
            ? record.updated
            : "";
      const description =
        typeof record.description === "string"
          ? record.description
          : typeof record.summary === "string"
            ? record.summary
            : "";
      const summary = stripHtml(description).slice(0, 80) || "Bilibili 最新更新";

      if (!title) {
        return null;
      }

      return {
        title,
        url,
        summary,
        subtitle: inferSubtitle(title),
        badge: "Bilibili 同步",
        publishedAt,
        publishedLabel: formatDateLabel(publishedAt),
        accentClass: accentClasses[index % accentClasses.length],
      } satisfies BilibiliVideo;
    })
    .filter((item): item is BilibiliVideo => item !== null);
}

async function fetchBilibiliFeedNoCache() {
  const rssUrl = process.env.BILIBILI_RSS_URL;

  if (!rssUrl) {
    return {
      items: fallbackVideos,
      source: "fallback" as const,
      lastSyncedLabel: "未配置 RSSHub，当前展示手动精选内容",
    };
  }

  try {
    const response = await fetch(rssUrl, {
      next: { revalidate: RSS_REVALIDATE_SECONDS, tags: ["bilibili-feed"] },
      headers: {
        "User-Agent": "HiWhiskey/1.0",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }

    const xml = await response.text();
    const parsed = parser.parse(xml) as {
      rss?: { channel?: { item?: unknown } };
      feed?: { entry?: unknown };
    };

    const items = normalizeItems(
      parsed.rss?.channel?.item ?? parsed.feed?.entry ?? [],
    );

    if (items.length === 0) {
      throw new Error("No usable items in RSS feed");
    }

    return {
      items,
      source: "rss" as const,
      lastSyncedLabel: `最近同步：${formatDateLabel(new Date().toISOString())}`,
    };
  } catch {
    return {
      items: fallbackVideos,
      source: "fallback" as const,
      lastSyncedLabel: "RSS 拉取失败，已回退到手动精选内容",
    };
  }
}

export async function getBilibiliFeed() {
  return fetchBilibiliFeedNoCache();
}

export async function warmBilibiliFeed() {
  return fetchBilibiliFeedNoCache();
}

export { BILIBILI_SPACE_URL, BILIBILI_VIDEO_URL, RSS_REVALIDATE_SECONDS };
