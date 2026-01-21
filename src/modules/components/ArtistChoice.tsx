"use client";
import { useRouter } from "next/navigation";
import React from "react";

// Icon components
const Music = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const Disc = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const BarChart3 = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </svg>
);

const Headphones = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
  </svg>
);

const ArrowRight = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const LogOut = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

interface ArtistChoiceProps {
  onGoToArtistDashboard?: () => void;
  onGoToFanStreaming?: () => void;
  language: string;
  onLogout?: () => void;
}

export function ArtistChoice({
  onGoToArtistDashboard,
  onGoToFanStreaming,
  language,
  onLogout,
}: ArtistChoiceProps) {
  const router = useRouter();

  const text = {
    spanish: {
      title: "¡Bienvenido!",
      subtitle: "Como artista, tienes acceso a ambas plataformas",
      artistDashboard: "Dashboard de Artista",
      artistDescription: "Gestiona tu música, streams, regalías y más",
      fanStreaming: "Plataforma de Streaming",
      fanDescription: "Descubre y escucha música como fan",
      choose: "Elegir",
      logout: "Cerrar sesión",
    },
    english: {
      title: "Welcome!",
      subtitle: "As an artist, you have access to both platforms",
      artistDashboard: "Artist Dashboard",
      artistDescription: "Manage your music, streams, royalties ...",
      fanStreaming: "Streaming Platform",
      fanDescription: "Discover and listen to music as a fan",
      choose: "Choose",
      logout: "Log out",
    },
    catalan: {
      title: "Benvingut!",
      subtitle: "Com a artista, tens accés a ambdues plataformes",
      artistDashboard: "Dashboard d'Artista",
      artistDescription: "Gestiona la teva música, streams, regalies i més",
      fanStreaming: "Plataforma d'Streaming",
      fanDescription: "Descobreix i escolta música com a fan",
      choose: "Triar",
      logout: "Tancar sessió",
    },
  };

  const content = text[language as keyof typeof text] || text.english;

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative w-full h-full overflow-y-auto flex justify-center p-4 sm:p-6">
        <div className="w-full max-w-5xl flex flex-col gap-6 sm:gap-8">
          {/* Header */}
          <header className="flex flex-col items-center gap-4 text-center mb-4 sm:mb-8">
            {/* Logo / Icon */}
            <div className="flex items-center justify-center gap-3">
              <Music className="text-white drop-shadow-lg" size={40} />
            </div>

            {/* Title + Logout */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl text-white drop-shadow-2xl font-semibold">
                {content.title}
              </h1>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/40 backdrop-blur-md border border-red-300/60 rounded-xl text-white text-sm sm:text-base hover:bg-red-500/60 hover:border-white/70 transition-all shadow-lg"
                  title={content.logout}
                >
                  <LogOut size={18} />
                  <span className="drop-shadow">{content.logout}</span>
                </button>
              )}
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-white/85 drop-shadow-md max-w-2xl">
              {content.subtitle}
            </p>
          </header>

          {/* Choice Cards */}
          <main className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Artist Dashboard Card */}
            <section className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-5 sm:p-6 md:p-8 shadow-2xl hover:bg-white/15 transition-all group">
              <div className="text-center space-y-5 sm:space-y-6">
                {/* Icon */}
                <div className="flex items-center justify-center">
                  <div className="p-4 sm:p-5 bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-3xl shadow-lg">
                    <BarChart3 className="text-white" size={48} />
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl text-white drop-shadow-lg font-semibold">
                    {content.artistDashboard}
                  </h2>
                  <p className="text-white/80 drop-shadow text-sm sm:text-base">
                    {content.artistDescription}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 text-left text-sm sm:text-base">
                  <li className="flex items-center gap-3 text-white/85">
                    <span className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span className="drop-shadow">
                      {language === "spanish" && "Subir y gestionar tu música"}
                      {language === "english" && "Upload and manage your music"}
                      {language === "catalan" &&
                        "Pujar i gestionar la teva música"}
                    </span>
                  </li>
                  <li className="flex items-center gap-3 text-white/85">
                    <span className="w-2 h-2 bg-pink-400 rounded-full" />
                    <span className="drop-shadow">
                      {language === "spanish" && "Ver estadísticas y streams"}
                      {language === "english" && "View statistics and streams"}
                      {language === "catalan" &&
                        "Veure estadístiques i streams"}
                    </span>
                  </li>
                  <li className="flex items-center gap-3 text-white/85">
                    <span className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="drop-shadow">
                      {language === "spanish" && "Monitorear regalías"}
                      {language === "english" && "Monitor royalties"}
                      {language === "catalan" && "Monitorar regalies"}
                    </span>
                  </li>
                </ul>

                {/* Button */}
                <button
                  onClick={() => router.push("/dashboard/artist")}
                  className="cursor-pointer w-full px-5 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-purple-500/50 to-pink-500/50 backdrop-blur-md border border-white/40 rounded-xl text-white text-base sm:text-lg hover:from-purple-500/60 hover:to-pink-500/60 hover:border-white/70 transition-all shadow-lg flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                >
                  {content.choose}
                  <ArrowRight size={18} />
                </button>
              </div>
            </section>

            {/* Fan Streaming Card */}
            <section className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-5 sm:p-6 md:p-8 shadow-2xl hover:bg-white/15 transition-all group">
              <div className="text-center space-y-5 sm:space-y-6">
                {/* Icon */}
                <div className="flex items-center justify-center">
                  <div className="p-4 sm:p-5 bg-gradient-to-br from-blue-500/40 to-cyan-500/40 rounded-3xl shadow-lg">
                    <Headphones className="text-white" size={48} />
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl text-white drop-shadow-lg font-semibold">
                    {content.fanStreaming}
                  </h2>
                  <p className="text-white/80 drop-shadow text-sm sm:text-base">
                    {content.fanDescription}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 text-left text-sm sm:text-base">
                  <li className="flex items-center gap-3 text-white/85">
                    <span className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="drop-shadow">
                      {language === "spanish" && "Descubre nueva música"}
                      {language === "english" && "Discover new music"}
                      {language === "catalan" && "Descobreix nova música"}
                    </span>
                  </li>
                  <li className="flex items-center gap-3 text-white/85">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="drop-shadow">
                      {language === "spanish" &&
                        "Explora por género y estado de ánimo"}
                      {language === "english" && "Browse by genre and mood"}
                      {language === "catalan" &&
                        "Explora per gènere i estat d'ànim"}
                    </span>
                  </li>
                  <li className="flex items-center gap-3 text-white/85">
                    <span className="w-2 h-2 bg-teal-400 rounded-full" />
                    <span className="drop-shadow">
                      {language === "spanish" &&
                        "Crea playlists personalizadas"}
                      {language === "english" && "Create custom playlists"}
                      {language === "catalan" &&
                        "Crea playlists personalitzades"}
                    </span>
                  </li>
                </ul>

                {/* Button */}
                <button
                  onClick={() => {
                    router.push("/dashboard/fan-streaming");
                  }}
                  className="cursor-pointer w-full px-5 py-3 sm:px-6 sm:py-4 bg-gradient-to-r from-blue-500/50 to-cyan-500/50 backdrop-blur-md border border-white/40 rounded-xl text-white text-base sm:text-lg hover:from-blue-500/60 hover:to-cyan-500/60 hover:border-white/70 transition-all shadow-lg flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                >
                  {content.choose}
                  <ArrowRight size={18} />
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
