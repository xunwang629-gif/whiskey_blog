import { DrakeLibrary } from "@/components/drake-library";
import { SiteNav } from "@/components/site-nav";
import { drakeTracks } from "@/lib/music-library";

export default function DrakeLibraryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-10 sm:pt-20">
        <p className="text-xs tracking-[0.28em] text-muted uppercase">Drake Library</p>
      </section>
      <DrakeLibrary tracks={drakeTracks} />
    </main>
  );
}
