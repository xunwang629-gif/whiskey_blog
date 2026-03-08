type NotionPropertyDefinition = {
  id: string;
  name?: string;
  type: string;
};

type NotionSchemaResponse = {
  properties?: Record<string, NotionPropertyDefinition>;
};

type NotionRichText = {
  plain_text?: string;
};

type NotionPropertyValue = {
  type?: string;
  title?: NotionRichText[];
};

type NotionPage = {
  id: string;
  created_time: string;
  properties: Record<string, NotionPropertyValue>;
};

type NotionQueryResponse = {
  results?: NotionPage[];
};

type NotionBlock = {
  id: string;
  type: string;
  created_time: string;
  paragraph?: { rich_text?: NotionRichText[] };
  quote?: { rich_text?: NotionRichText[] };
};

type NotionBlocksResponse = {
  results?: NotionBlock[];
};

export type CommunityPostSummary = {
  id: string;
  title: string;
  preview: string;
  replyCount: number;
  createdAt: string;
  createdAtLabel: string;
  source: "notion" | "sample";
};

export type CommunityReply = {
  id: string;
  content: string;
  createdAt: string;
  createdAtLabel: string;
  source: "notion" | "sample";
};

export type CommunityThread = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  createdAtLabel: string;
  replies: CommunityReply[];
  source: "notion" | "sample";
};

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATA_SOURCE_ID = process.env.NOTION_DATA_SOURCE_ID;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

const SAMPLE_THREADS: CommunityThread[] = [
  {
    id: "sample-marvins-room",
    title: "最近一直在循环 Marvin's Room，想看这首的细拆。",
    content:
      "副歌和前后语气切换很上头，想看你从情绪推进、叙述视角和 Drake 当时状态三个角度拆一下。",
    createdAt: "2026-03-08T08:30:00.000Z",
    createdAtLabel: "2026-03-08",
    source: "sample",
    replies: [
      {
        id: "sample-reply-1",
        content: "这首已经在排，会优先写成长文版本。",
        createdAt: "2026-03-08T10:10:00.000Z",
        createdAtLabel: "2026-03-08",
        source: "sample",
      },
    ],
  },
  {
    id: "sample-family-matters",
    title: "Family Matters 想看逐段解析。",
    content:
      "主要想看里面对 Kendrick 的回应逻辑，以及三段之间语气怎么往上拱的。",
    createdAt: "2026-03-07T14:20:00.000Z",
    createdAtLabel: "2026-03-07",
    source: "sample",
    replies: [
      {
        id: "sample-reply-2",
        content: "这类 diss 歌适合分段做，我会按段落拆。",
        createdAt: "2026-03-07T16:00:00.000Z",
        createdAtLabel: "2026-03-07",
        source: "sample",
      },
      {
        id: "sample-reply-3",
        content: "也可以顺手把里面的典故一起补上。",
        createdAt: "2026-03-07T16:20:00.000Z",
        createdAtLabel: "2026-03-07",
        source: "sample",
      },
    ],
  },
];

function formatDateLabel(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Tokyo",
  })
    .format(new Date(value))
    .replaceAll("/", "-");
}

function getNotionVersion() {
  return NOTION_DATA_SOURCE_ID ? "2025-09-03" : "2022-06-28";
}

function getNotionHeaders() {
  return {
    Authorization: `Bearer ${NOTION_TOKEN}`,
    "Content-Type": "application/json",
    "Notion-Version": getNotionVersion(),
  };
}

function getSchemaUrl() {
  if (NOTION_DATA_SOURCE_ID) {
    return `https://api.notion.com/v1/data_sources/${NOTION_DATA_SOURCE_ID}`;
  }

  return `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}`;
}

function getQueryUrl() {
  if (NOTION_DATA_SOURCE_ID) {
    return `https://api.notion.com/v1/data_sources/${NOTION_DATA_SOURCE_ID}/query`;
  }

  return `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`;
}

function getParentPayload() {
  if (NOTION_DATA_SOURCE_ID) {
    return { type: "data_source_id", data_source_id: NOTION_DATA_SOURCE_ID };
  }

  return { database_id: NOTION_DATABASE_ID };
}

function hasNotionConfig() {
  return Boolean(NOTION_TOKEN && (NOTION_DATA_SOURCE_ID || NOTION_DATABASE_ID));
}

function getPlainText(items?: NotionRichText[]) {
  return (items || []).map((item) => item.plain_text || "").join("").trim();
}

async function notionRequest<T>(url: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...getNotionHeaders(),
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Notion 请求失败。");
  }

  return (await response.json()) as T;
}

async function getTitlePropertyName() {
  const schema = await notionRequest<NotionSchemaResponse>(getSchemaUrl());
  const entry = Object.entries(schema.properties || {}).find(([, value]) => value.type === "title");

  if (!entry) {
    throw new Error("Notion 数据源里没有 title 属性。");
  }

  return entry[0];
}

async function getPageBlocks(pageId: string) {
  const blocks = await notionRequest<NotionBlocksResponse>(
    `https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`,
  );

  return blocks.results || [];
}

function mapBlocksToContent(blocks: NotionBlock[]) {
  const firstParagraph = blocks.find((block) => block.type === "paragraph");
  const replies = blocks.filter((block) => block.type === "quote");

  return {
    content: firstParagraph ? getPlainText(firstParagraph.paragraph?.rich_text) : "",
    replies: replies
      .map((block) => ({
        id: block.id,
        content: getPlainText(block.quote?.rich_text),
        createdAt: block.created_time,
        createdAtLabel: formatDateLabel(block.created_time),
        source: "notion" as const,
      }))
      .filter((reply) => reply.content),
  };
}

async function listNotionPosts(): Promise<CommunityPostSummary[]> {
  const titlePropertyName = await getTitlePropertyName();
  const query = await notionRequest<NotionQueryResponse>(getQueryUrl(), {
    method: "POST",
    body: JSON.stringify({
      page_size: 10,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    }),
  });

  const pages = query.results || [];

  const previews = await Promise.all(
    pages.map(async (page) => {
      const blocks = await getPageBlocks(page.id);
      const { content, replies } = mapBlocksToContent(blocks);

      return {
        id: page.id,
        title: getPlainText(page.properties[titlePropertyName]?.title) || "未命名帖子",
        preview: content || "这条帖子还没有正文。",
        replyCount: replies.length,
        createdAt: page.created_time,
        createdAtLabel: formatDateLabel(page.created_time),
        source: "notion" as const,
      };
    }),
  );

  return previews;
}

async function getNotionThread(postId: string): Promise<CommunityThread | null> {
  const titlePropertyName = await getTitlePropertyName();
  const page = await notionRequest<NotionPage>(`https://api.notion.com/v1/pages/${postId}`);
  const blocks = await getPageBlocks(postId);
  const { content, replies } = mapBlocksToContent(blocks);

  return {
    id: page.id,
    title: getPlainText(page.properties[titlePropertyName]?.title) || "未命名帖子",
    content: content || "这条帖子还没有正文。",
    createdAt: page.created_time,
    createdAtLabel: formatDateLabel(page.created_time),
    replies,
    source: "notion",
  };
}

export async function listCommunityPosts(): Promise<CommunityPostSummary[]> {
  if (!hasNotionConfig()) {
    return SAMPLE_THREADS.map((thread) => ({
      id: thread.id,
      title: thread.title,
      preview: thread.content,
      replyCount: thread.replies.length,
      createdAt: thread.createdAt,
      createdAtLabel: thread.createdAtLabel,
      source: "sample",
    }));
  }

  try {
    return await listNotionPosts();
  } catch {
    return SAMPLE_THREADS.map((thread) => ({
      id: thread.id,
      title: thread.title,
      preview: thread.content,
      replyCount: thread.replies.length,
      createdAt: thread.createdAt,
      createdAtLabel: thread.createdAtLabel,
      source: "sample",
    }));
  }
}

export async function getCommunityThread(postId: string): Promise<CommunityThread | null> {
  const sample = SAMPLE_THREADS.find((thread) => thread.id === postId);

  if (sample) {
    return sample;
  }

  if (!hasNotionConfig()) {
    return null;
  }

  try {
    return await getNotionThread(postId);
  } catch {
    return null;
  }
}

export async function createCommunityPost(input: { title: string; content: string }) {
  if (!hasNotionConfig()) {
    throw new Error("服务端还没配置 Notion 社区存储。");
  }

  const titlePropertyName = await getTitlePropertyName();
  const response = await notionRequest<{ id: string }>("https://api.notion.com/v1/pages", {
    method: "POST",
    body: JSON.stringify({
      parent: getParentPayload(),
      properties: {
        [titlePropertyName]: {
          title: [
            {
              text: {
                content: input.title,
              },
            },
          ],
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: input.content,
                },
              },
            ],
          },
        },
      ],
    }),
  });

  return response.id;
}

export async function createCommunityReply(input: { postId: string; content: string }) {
  if (!hasNotionConfig()) {
    throw new Error("服务端还没配置 Notion 社区存储。");
  }

  await notionRequest(`https://api.notion.com/v1/blocks/${input.postId}/children`, {
    method: "PATCH",
    body: JSON.stringify({
      children: [
        {
          object: "block",
          type: "quote",
          quote: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: input.content,
                },
              },
            ],
          },
        },
      ],
    }),
  });
}
