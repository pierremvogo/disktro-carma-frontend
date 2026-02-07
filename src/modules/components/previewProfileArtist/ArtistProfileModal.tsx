"use client";

import React from "react";
import { ArtistProfileSidebar } from "./ArtistProfileSidebar";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  artist: any | null;
};

export function ArtistProfileModal({ isOpen, onClose, artist }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[95]"
      role="dialog"
      aria-modal="true"
      aria-label="Artist profile"
      onMouseDown={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Container iOS-safe */}
      <div
        className="
          absolute inset-x-0
          mx-auto
          w-[min(1100px,calc(100%-1.5rem))]
          sm:w-[min(1100px,calc(100%-2rem))]
          top-[calc(env(safe-area-inset-top)+0.75rem)]
          bottom-[calc(env(safe-area-inset-bottom)+0.75rem)]
          overflow-hidden
          rounded-2xl
          border border-white/20
          bg-black/60
          backdrop-blur-xl
          shadow-2xl
        "
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* ✅ Tu réutilises ton composant existant */}
        <ArtistProfileSidebar isOpen={true} onClose={onClose} artist={artist} />
      </div>
    </div>
  );
}
