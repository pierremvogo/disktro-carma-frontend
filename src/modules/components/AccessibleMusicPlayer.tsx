import React, { useEffect, useRef } from "react";

const Play = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const Pause = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const SkipBack = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="19 20 9 12 19 4 19 20" />
    <line x1="5" y1="19" x2="5" y2="5" />
  </svg>
);

const SkipForward = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" y1="5" x2="19" y2="19" />
  </svg>
);

const Volume2 = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

interface AccessibleMusicPlayerProps {
  currentSong: {
    id: number;
    title: string;
    artist: string;
    cover: string;
    duration: string;
  } | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShowLyrics?: () => void;
  language?: string;
  largerTargets?: boolean;
  reducedMotion?: boolean;
}

export function AccessibleMusicPlayer({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onShowLyrics,
  language = "english",
  largerTargets = false,
  reducedMotion = false,
}: AccessibleMusicPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const previousSongRef = useRef<string>("");

  const text = {
    spanish: {
      nowPlaying: "Reproduciendo ahora",
      play: "Reproducir",
      pause: "Pausar",
      previous: "Pista anterior",
      next: "Pista siguiente",
      volume: "Volumen",
      lyrics: "Letras",
      playbackControls: "Controles de reproducción",
      albumCover: "Portada del álbum",
      duration: "Duración",
    },
    english: {
      nowPlaying: "Now Playing",
      play: "Play",
      pause: "Pause",
      previous: "Previous track",
      next: "Next track",
      volume: "Volume",
      lyrics: "Lyrics",
      playbackControls: "Playback controls",
      albumCover: "Album cover",
      duration: "Duration",
    },
    catalan: {
      nowPlaying: "Reproduint ara",
      play: "Reproduir",
      pause: "Pausar",
      previous: "Pista anterior",
      next: "Pista següent",
      volume: "Volum",
      lyrics: "Lletres",
      playbackControls: "Controls de reproducció",
      albumCover: "Portada de l'àlbum",
      duration: "Durada",
    },
  };

  const content = text[language as keyof typeof text] || text.english;

  // Announce song changes to screen readers
  useEffect(() => {
    if (currentSong && previousSongRef.current !== currentSong.title) {
      previousSongRef.current = currentSong.title;
      const announcement = `${content.nowPlaying}: ${currentSong.title} ${
        language === "spanish" ? "de" : language === "english" ? "by" : "de"
      } ${currentSong.artist}`;

      // Create a temporary announcement element
      const announcer = document.createElement("div");
      announcer.setAttribute("role", "status");
      announcer.setAttribute("aria-live", "polite");
      announcer.className = "sr-only";
      announcer.textContent = announcement;
      document.body.appendChild(announcer);

      setTimeout(() => {
        document.body.removeChild(announcer);
      }, 1000);
    }
  }, [currentSong, content, language]);

  if (!currentSong) return null;

  const animationClasses = reducedMotion ? "" : "transition-all";
  const buttonSizeClasses = largerTargets ? "p-4" : "p-3";

  return (
    <div
      ref={playerRef}
      className="absolute bottom-0 left-0 right-0 z-20 bg-black/40 backdrop-blur-xl border-t border-white/10"
      role="region"
      aria-label={content.nowPlaying}
    >
      <div className="flex items-center justify-between p-6 gap-6">
        {/* Song Info - Live region for screen reader updates */}
        <div
          className="flex items-center gap-4 flex-1 min-w-0"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={currentSong.cover}
              alt={`${content.albumCover}: ${currentSong.title} ${
                language === "spanish" ? "de" : "by"
              } ${currentSong.artist}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-white drop-shadow truncate">
              {currentSong.title}
            </h4>
            <p className="text-white/60 text-sm truncate">
              {currentSong.artist}
            </p>
          </div>
        </div>

        {/* Player Controls - Grouped for screen readers */}
        <div
          className="flex items-center gap-4"
          role="group"
          aria-label={content.playbackControls}
        >
          <button
            onClick={onPrevious}
            className={`text-white/80 hover:text-white focus:text-white ${animationClasses} ${buttonSizeClasses}`}
            aria-label={content.previous}
            title={content.previous}
          >
            <SkipBack size={largerTargets ? 32 : 24} />
          </button>

          <button
            onClick={onPlayPause}
            className={`p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 focus:bg-white/30 ${animationClasses} ${buttonSizeClasses}`}
            aria-label={isPlaying ? content.pause : content.play}
            aria-pressed={isPlaying}
            title={isPlaying ? content.pause : content.play}
          >
            {isPlaying ? (
              <Pause size={largerTargets ? 36 : 28} />
            ) : (
              <Play size={largerTargets ? 36 : 28} />
            )}
          </button>

          <button
            onClick={onNext}
            className={`text-white/80 hover:text-white focus:text-white ${animationClasses} ${buttonSizeClasses}`}
            aria-label={content.next}
            title={content.next}
          >
            <SkipForward size={largerTargets ? 32 : 24} />
          </button>
        </div>

        {/* Volume & Actions */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <span
            className="text-white/60 text-sm"
            aria-label={`${content.duration}: ${currentSong.duration}`}
          >
            {currentSong.duration}
          </span>

          {onShowLyrics && (
            <button
              onClick={onShowLyrics}
              className={`text-white/80 hover:text-white focus:text-white ${animationClasses} ${buttonSizeClasses}`}
              aria-label={content.lyrics}
              title={content.lyrics}
            >
              <svg
                width={largerTargets ? 32 : 24}
                height={largerTargets ? 32 : 24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </button>
          )}

          <button
            className={`text-white/80 hover:text-white focus:text-white ${animationClasses} ${buttonSizeClasses}`}
            aria-label={content.volume}
            title={content.volume}
          >
            <Volume2 size={largerTargets ? 32 : 24} />
          </button>
        </div>
      </div>

      {/* Progress bar with ARIA */}
      <div
        className="h-1 bg-white/10"
        role="progressbar"
        aria-label={
          language === "spanish"
            ? "Progreso de reproducción"
            : language === "english"
            ? "Playback progress"
            : "Progrés de reproducció"
        }
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      >
        <div className="h-full bg-white/40 w-0"></div>
      </div>
    </div>
  );
}
