import { NextResponse } from "next/server";

import { createCommunityPost } from "@/lib/notion-community";

type CreatePostPayload = {
  title?: unknown;
  content?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreatePostPayload;
    const title = typeof body.title === "string" ? body.title.trim().slice(0, 80) : "";
    const content = typeof body.content === "string" ? body.content.trim().slice(0, 2000) : "";

    if (!title) {
      return NextResponse.json(
        { ok: false, error: "标题不能为空。" },
        { status: 400 },
      );
    }

    const postId = await createCommunityPost({ title, content });

    return NextResponse.json({ ok: true, postId });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "发帖失败，请稍后再试。",
      },
      { status: 500 },
    );
  }
}
