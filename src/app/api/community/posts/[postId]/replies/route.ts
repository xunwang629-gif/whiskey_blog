import { NextResponse } from "next/server";

import { createCommunityReply } from "@/lib/notion-community";

type CreateReplyPayload = {
  content?: unknown;
};

type RouteContext = {
  params: Promise<{
    postId: string;
  }>;
};

export async function POST(request: Request, context: RouteContext) {
  try {
    const { postId } = await context.params;
    const body = (await request.json()) as CreateReplyPayload;
    const content = typeof body.content === "string" ? body.content.trim().slice(0, 1000) : "";

    if (content.length < 2) {
      return NextResponse.json(
        { ok: false, error: "回复至少写两个字。" },
        { status: 400 },
      );
    }

    await createCommunityReply({ postId, content });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "回复失败，请稍后再试。",
      },
      { status: 500 },
    );
  }
}
