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
  onGoToArtistDashboard: () => void;
  onGoToFanStreaming: () => void;
  language: string;
  onLogout?: () => void;
}

export function ArtistChoice({
  onGoToArtistDashboard,
  onGoToFanStreaming,
  language,
  onLogout,
}: ArtistChoiceProps) {
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
      artistDescription: "Manage your music, streams, royalties and more",
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
        backgroundImage: `url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative w-full h-full overflow-y-auto flex items-center justify-center p-6">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="relative text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Music className="text-white" size={48} />
            </div>
            <div className="flex items-center justify-center gap-4 mb-3">
              <h1 className="text-5xl text-white drop-shadow-lg">
                {content.title}
              </h1>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/30 backdrop-blur-md border-2 border-white/30 rounded-xl text-white hover:bg-red-500/40 hover:border-white/50 transition-all shadow-lg"
                  title={content.logout}
                >
                  <LogOut size={20} />
                  <span className="drop-shadow">{content.logout}</span>
                </button>
              )}
            </div>
            <p className="text-xl text-white/80 drop-shadow">
              {content.subtitle}
            </p>
          </div>

          {/* Choice Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Artist Dashboard Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl hover:bg-white/15 transition-all group">
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="flex items-center justify-center">
                  <div className="p-6 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl">
                    <BarChart3 className="text-white" size={64} />
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-3">
                  <h2 className="text-3xl text-white drop-shadow-lg">
                    {content.artistDashboard}
                  </h2>
                  <p className="text-white/70 drop-shadow text-lg">
                    {content.artistDescription}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="drop-shadow">
                      {language === "spanish" && "Subir y gestionar tu música"}
                      {language === "english" && "Upload and manage your music"}
                      {language === "catalan" &&
                        "Pujar i gestionar la teva música"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span className="drop-shadow">
                      {language === "spanish" && "Ver estadísticas y streams"}
                      {language === "english" && "View statistics and streams"}
                      {language === "catalan" &&
                        "Veure estadístiques i streams"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="drop-shadow">
                      {language === "spanish" && "Monitorear regalías"}
                      {language === "english" && "Monitor royalties"}
                      {language === "catalan" && "Monitorar regalies"}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={onGoToArtistDashboard}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-500/40 to-pink-500/40 backdrop-blur-md border-2 border-white/40 rounded-xl text-white text-lg hover:from-purple-500/50 hover:to-pink-500/50 hover:border-white/60 transition-all shadow-lg flex items-center justify-center gap-2 group-hover:scale-105"
                >
                  {content.choose}
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Fan Streaming Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl hover:bg-white/15 transition-all group">
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="flex items-center justify-center">
                  <div className="p-6 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-3xl">
                    <Headphones className="text-white" size={64} />
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-3">
                  <h2 className="text-3xl text-white drop-shadow-lg">
                    {content.fanStreaming}
                  </h2>
                  <p className="text-white/70 drop-shadow text-lg">
                    {content.fanDescription}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="drop-shadow">
                      {language === "spanish" && "Descubre nueva música"}
                      {language === "english" && "Discover new music"}
                      {language === "catalan" && "Descobreix nova música"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="drop-shadow">
                      {language === "spanish" &&
                        "Explora por género y estado de ánimo"}
                      {language === "english" && "Browse by genre and mood"}
                      {language === "catalan" &&
                        "Explora per gènere i estat d'ànim"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                    <span className="drop-shadow">
                      {language === "spanish" &&
                        "Crea playlists personalizadas"}
                      {language === "english" && "Create custom playlists"}
                      {language === "catalan" &&
                        "Crea playlists personalitzades"}
                    </span>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={onGoToFanStreaming}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 backdrop-blur-md border-2 border-white/40 rounded-xl text-white text-lg hover:from-blue-500/50 hover:to-cyan-500/50 hover:border-white/60 transition-all shadow-lg flex items-center justify-center gap-2 group-hover:scale-105"
                >
                  {content.choose}
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
