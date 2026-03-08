import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

import { warmBilibiliFeed } from "@/lib/bilibili";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (
    !process.env.CRON_SECRET ||
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return Response.json({ ok: false }, { status: 401 });
  }

  revalidateTag("bilibili-feed", "max");
  const feed = await warmBilibiliFeed();

  return Response.json({
    ok: true,
    source: feed.source,
    count: feed.items.length,
    syncedAt: new Date().toISOString(),
  });
}
