import { DrakeLibrary } from "@/components/drake-library";
import { SiteNav } from "@/components/site-nav";
import { drakeTracks } from "@/lib/music-library";

export default function DrakeLibraryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <DrakeLibrary tracks={drakeTracks} />
    </main>
  );
}
