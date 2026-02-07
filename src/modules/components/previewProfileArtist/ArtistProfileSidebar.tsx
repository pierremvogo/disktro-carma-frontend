import { X } from "lucide-react";
import { MusicPlayer } from "./MusicPlayer";

interface ArtistProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  artist: {
    id: string;
    name: string;
    avatar?: string; // ✅ from API mapping
    genres?: string; // ✅ string "a, b, c"
    subscribers?: number;
    activeSubscribers?: number;
    hasActivePlan?: boolean;

    // Optionnels (si un jour tu les ajoutes)
    bio?: string;
    videoUrl?: string;
    previewSong?: {
      title: string;
      duration: string;
      audioUrl?: string;
    };
  } | null;
}

export function ArtistProfileSidebar({
  isOpen,
  onClose,
  artist,
}: ArtistProfileSidebarProps) {
  if (!isOpen || !artist) return null;

  const genresList =
    String(artist.genres ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean) || [];

  return (
    <>
      {/* Backdrop */}
      <MusicPlayer />
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-gradient-to-b from-[#3d1952] to-[#4a1f5c] shadow-2xl z-50 overflow-y-auto overscroll-contain">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="min-w-0">
              <h2 className="text-white text-xl sm:text-2xl font-medium truncate">
                Artist Profile
              </h2>
              <p className="text-white/60 text-xs sm:text-sm truncate">
                {artist.hasActivePlan
                  ? "Subscription available"
                  : "No active subscription plan"}
              </p>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Artist Avatar */}
          <div className="mb-6">
            <div className="w-full rounded-2xl overflow-hidden border border-white/20 bg-white/5">
              <img
                src={artist.avatar ?? "/avatar-placeholder.png"}
                alt={artist.name}
                className="w-full h-56 sm:h-64 object-cover"
              />
            </div>
          </div>

          {/* Artist Name + Stats */}
          <div className="mb-6">
            <h3 className="text-white text-2xl sm:text-3xl font-medium mb-2">
              {artist.name}
            </h3>

            <div className="flex items-center gap-4 text-white/70 text-sm">
              <span>
                <span className="text-white font-semibold">
                  {artist.subscribers ?? 0}
                </span>{" "}
                subscribers
              </span>
              <span className="text-white/40">•</span>
              <span>
                <span className="text-white font-semibold">
                  {artist.activeSubscribers ?? 0}
                </span>{" "}
                active
              </span>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-8">
            <h4 className="text-white text-lg font-medium mb-3">Bio</h4>
            <div className="bg-[#5a2772]/50 backdrop-blur-sm rounded-xl p-4 border border-[#7a3f91]/30 min-h-[120px]">
              <p className="text-gray-300 text-sm leading-relaxed">
                {artist.bio || "No bio available yet."}
              </p>
            </div>
          </div>

          {/* Video Player Section */}
          <div className="mb-8">
            <h4 className="text-white text-lg font-medium mb-3">
              Featured Video
            </h4>
            <div className="bg-[#2d0e3d] rounded-xl overflow-hidden aspect-video border border-[#7a3f91]/30">
              {artist.videoUrl ? (
                <video controls className="w-full h-full" src={artist.videoUrl}>
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-400 text-sm">No video available</p>
                </div>
              )}
            </div>
          </div>

          {/* Genres Section */}
          <div className="mb-6">
            <h4 className="text-white text-lg font-medium mb-3">Genres</h4>

            {genresList.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {genresList.map((genre, index) => (
                  <span
                    key={`${genre}-${index}`}
                    className="px-4 py-2 bg-[#7a3f91] text-white text-sm rounded-full border border-[#9f7fb5]/30"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-white/60 text-sm">—</p>
            )}
          </div>

          {/* Preview Song Section */}
          <div className="mb-6">
            <h4 className="text-white text-lg font-medium mb-3">
              Preview Song
            </h4>
            <div className="bg-[#5a2772]/50 backdrop-blur-sm rounded-xl p-5 border border-[#7a3f91]/30">
              <div className="flex items-center gap-4 mb-3">
                <button
                  type="button"
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={!artist.previewSong?.audioUrl}
                  title={
                    artist.previewSong?.audioUrl
                      ? "Play preview"
                      : "No audio preview"
                  }
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-[#2d0e3d] ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">
                    {artist.previewSong?.title || "Sample Track"}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {artist.previewSong?.duration || "—"}
                  </p>
                </div>
              </div>

              {/* Audio progress bar (placeholder UI) */}
              <div className="w-full h-1 bg-[#2d0e3d] rounded-full overflow-hidden">
                <div className="h-full bg-white w-0 transition-all duration-300" />
              </div>

              {!artist.previewSong?.audioUrl && (
                <p className="text-white/50 text-xs mt-3">
                  No preview audio provided.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
