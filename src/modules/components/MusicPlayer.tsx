"use client";

import React, { useState } from "react";
import { AccessibleMusicPlayer } from "./AccessibleMusicPlayer";
import { useAccessibility } from "./AccessibilityProvider";

type Song = {
  id: number;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  lyrics?: string;
};

const demoSongs: Song[] = [
  {
    id: 1,
    title: "Midnight Groove",
    artist: "Nova Pulse",
    cover: "/image/demo-cover-1.jpg",
    duration: "3:42",
    lyrics: "Sample lyrics for Midnight Groove...",
  },
  {
    id: 2,
    title: "Cosmic Dreams",
    artist: "Stellar Echoes",
    cover: "/image/demo-cover-2.jpg",
    duration: "4:10",
    lyrics: "Lyrics for Cosmic Dreams...",
  },
  {
    id: 3,
    title: "Neon Skyline",
    artist: "Lunar City",
    cover: "/image/demo-cover-3.jpg",
    duration: "2:58",
    lyrics: "Neon Skyline lyrics...",
  },
];

export function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

  // 🔥 Récupération des settings via ton AccessibilityProvider
  const { highContrastMode, enableKeyboardShortcuts, reducedMotion } =
    useAccessibility();

  // (à toi d'ajouter plus tard language + largerTargets dans ton provider si tu veux)
  const language = "english"; // PROVISOIRE -> à venir via provider
  const largerTargets = enableKeyboardShortcuts;
  // (ou un autre flag selon comment tu veux le mapper)

  const currentSong = demoSongs[currentIndex] ?? null;

  const handlePlayPause = () => setIsPlaying((prev) => !prev);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % demoSongs.length);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? demoSongs.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleShowLyrics = () => currentSong?.lyrics && setShowLyrics(true);
  const handleCloseLyrics = () => setShowLyrics(false);

  return (
    <div className="relative min-h-[300px]">
      <div className="pb-32">
        <h2 className="text-white text-2xl mb-4 drop-shadow">
          Music For All – Player Démo
        </h2>

        <p className="text-white/70 mb-6 max-w-xl">
          Sélectionne un morceau et contrôle la lecture en bas de la page.
        </p>

        {/* Playlist */}
        <div className="space-y-2 max-w-md">
          {demoSongs.map((song, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={song.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPlaying(true);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? "bg-white/20 border-white/60 text-white shadow-lg"
                    : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10">
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{song.title}</p>
                    <p className="truncate text-xs text-white/60">
                      {song.artist} · {song.duration}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ──────────────── PLAYEUR ACCESSIBLE ─────────────── */}
      <AccessibleMusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onShowLyrics={handleShowLyrics}
        language={language} // bientôt via provider
        largerTargets={largerTargets} // mappé depuis tes settings
        reducedMotion={reducedMotion} // 100% depuis provider
      />

      {/* ──────────────── MODALE LYRICS ─────────────── */}
      {showLyrics && currentSong && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-40"
          onClick={handleCloseLyrics}
        >
          <div
            className="bg-black/90 border border-white/30 rounded-2xl max-w-lg w-full mx-4 p-6 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">
                {currentSong.title} – Lyrics
              </h3>
              <button
                onClick={handleCloseLyrics}
                className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
              >
                Close
              </button>
            </div>
            <p className="whitespace-pre-wrap text-sm text-white/80">
              {currentSong.lyrics}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
