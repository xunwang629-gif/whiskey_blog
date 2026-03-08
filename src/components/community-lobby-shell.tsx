"use client";

import { useState } from "react";

import { CommunityPostForm } from "@/components/community-post-form";
import { CommunityThreadList } from "@/components/community-thread-list";
import type { CommunityPostSummary } from "@/lib/notion-community";

export function CommunityLobbyShell({
  posts,
  sampleMode,
  initialComposerOpen,
}: {
  posts: CommunityPostSummary[];
  sampleMode: boolean;
  initialComposerOpen: boolean;
}) {
  const [isComposerOpen, setIsComposerOpen] = useState(initialComposerOpen);

  return (
    <div className="community-split" data-panel-open="false">
      <CommunityThreadList
        posts={posts}
        actionLabel={isComposerOpen ? "收起发帖" : "发布帖子"}
        onActionClick={() => setIsComposerOpen((open) => !open)}
        inlineComposer={
          isComposerOpen ? (
            <CommunityPostForm
              sampleMode={sampleMode}
              compact
              onClose={() => setIsComposerOpen(false)}
            />
          ) : null
        }
      />
    </div>
  );
}
