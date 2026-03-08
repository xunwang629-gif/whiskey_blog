import { notFound } from "next/navigation";

import { CommunityNav } from "@/components/community-nav";
import { CommunityThreadList } from "@/components/community-thread-list";
import { CommunityThreadPanel } from "@/components/community-thread-panel";
import { getCommunityThread, listCommunityPosts } from "@/lib/notion-community";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    postId: string;
  }>;
};

export default async function CommunityThreadPage({ params }: PageProps) {
  const { postId } = await params;
  const [posts, thread] = await Promise.all([
    listCommunityPosts(),
    getCommunityThread(postId),
  ]);

  if (!thread) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CommunityNav />

      <section className="community-detail-page-shell mx-auto max-w-[1600px] px-3 py-3 sm:px-4 sm:py-4 md:px-6">
        <div className="community-split" data-panel-open="true">
          <CommunityThreadList
            posts={posts}
            selectedPostId={thread.id}
            actionLabel="发布帖子"
            actionHref="/message-box?compose=1#community-composer"
          />
          <CommunityThreadPanel thread={thread} />
        </div>
      </section>
    </main>
  );
}
