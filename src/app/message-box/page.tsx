import { CommunityLobbyShell } from "@/components/community-lobby-shell";
import { SiteNav } from "@/components/site-nav";
import { listCommunityPosts } from "@/lib/notion-community";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<{
    compose?: string;
  }>;
};

export default async function CommunityPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const posts = await listCommunityPosts();
  const sampleMode = posts[0]?.source === "sample";
  const initialComposerOpen = resolvedSearchParams?.compose === "1";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="mx-auto max-w-[1600px] px-3 py-3 sm:px-4 sm:py-4 md:px-6">
        <CommunityLobbyShell
          posts={posts}
          sampleMode={sampleMode}
          initialComposerOpen={initialComposerOpen}
        />
      </section>
    </main>
  );
}
