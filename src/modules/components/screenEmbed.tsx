"use client";
import React, { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Questionnaire } from "./Questionnaire";
import { UserType } from "./UserType";
import { ArtistDashboard } from "./ArtistDashboard";
import { FanStreaming } from "./FanStreaming";
import { FanProfileSetup } from "./FanProfileSetup";
import { ArtistProfileSetup } from "./ArtistProfileSetup";
import { Login } from "./Login";
import { ArtistChoice } from "./ArtistChoice";

export function ScreenEmbed() {
  const [language, setLanguage] = useState<"english" | "spanish" | "catalan">(
    "english"
  );
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showUserType, setShowUserType] = useState(false);
  const [showArtistDashboard, setShowArtistDashboard] = useState(false);
  const [showFanStreaming, setShowFanStreaming] = useState(false);
  const [showFanProfileSetup, setShowFanProfileSetup] = useState(false);
  const [showArtistProfileSetup, setShowArtistProfileSetup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showArtistChoice, setShowArtistChoice] = useState(false);
  const [isArtist, setIsArtist] = useState(false);

  const messages = {
    spanish: "Bienvenido a música para todos",
    english: "Welcome to music for everybody",
    catalan: "Benvingut a música per a tothom",
  };

  const loginText = {
    spanish: "Iniciar sesión",
    english: "Log in",
    catalan: "Iniciar sessió",
  };

  const signUpText = {
    spanish: "Registrarse",
    english: "Sign Up",
    catalan: "Registrar-se",
  };

  // ─────────── ÉCRANS PLEIN ÉCRAN ───────────

  if (showArtistChoice) {
    return (
      <ArtistChoice
        onGoToArtistDashboard={() => {
          setShowArtistChoice(false);
          setShowArtistDashboard(true);
        }}
        onGoToFanStreaming={() => {
          setShowArtistChoice(false);
          setShowFanStreaming(true);
        }}
        language={language}
        onLogout={() => {
          setShowArtistChoice(false);
          setIsArtist(false);
        }}
      />
    );
  }

  if (showLogin) {
    return <Login />;
  }

  if (showArtistDashboard) {
    return (
      <div className="fixed inset-0 w-screen h-screen">
        <ArtistDashboard
          onBack={() => {
            setShowArtistDashboard(false);
            setShowArtistChoice(true);
          }}
          language={language}
          onGoToStreaming={() => {
            setShowArtistDashboard(false);
            setShowFanStreaming(true);
          }}
        />
      </div>
    );
  }

  if (showFanProfileSetup) {
    return (
      <FanProfileSetup
        onBack={() => setShowFanProfileSetup(false)}
        onComplete={() => {
          setShowFanProfileSetup(false);
          setShowFanStreaming(true);
        }}
        language={language}
      />
    );
  }

  if (showArtistProfileSetup) {
    return (
      <ArtistProfileSetup
        onBack={() => setShowArtistProfileSetup(false)}
        onComplete={() => {
          setShowArtistProfileSetup(false);
          setShowArtistDashboard(true);
        }}
        language={language}
      />
    );
  }

  if (showFanStreaming) {
    return (
      <div className="fixed inset-0 w-screen h-screen">
        <FanStreaming
          onBack={() => {
            setShowFanStreaming(false);
            if (isArtist) {
              setShowArtistChoice(true);
            }
          }}
          language={language}
        />
      </div>
    );
  }

  // ─────────── ÉCRAN D’ACCUEIL EMBED ───────────

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/60 px-4 py-10">
      <div className="w-full max-w-7xl flex flex-col items-center gap-10">
        {/* Zone de l'écran encadré */}
        <div className="relative w-full max-w-5xl">
          {/* Panneaux de fond gauche/droite */}
          <div className="absolute inset-0 flex justify-between pointer-events-none">
            <div
              className="w-56 md:w-64 h-full rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center origin-center"
              style={{
                backgroundImage:
                  'url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")',
                backgroundPosition: "25% 35%",
                backgroundSize: "cover",
                transform: "rotate(90deg)",
              }}
            />
            <div
              className="w-56 md:w-64 h-full rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center origin-center hidden sm:block"
              style={{
                backgroundImage:
                  'url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")',
                backgroundPosition: "75% 35%",
                backgroundSize: "cover",
                transform: "rotate(90deg)",
              }}
            />
          </div>

          {/* Écran principal au centre */}
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="w-full min-h-[320px] md:min-h-[420px] bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 flex flex-col">
              <div className="flex-1 relative bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 flex items-center justify-center p-6 md:p-8">
                {showUserType ? (
                  <UserType
                    onBack={() => setShowUserType(false)}
                    onSelectArtist={() => {
                      setShowUserType(false);
                      setShowArtistProfileSetup(true);
                    }}
                    onSelectFan={() => {
                      setShowUserType(false);
                      setShowFanProfileSetup(true);
                    }}
                    language={language}
                    onGoToQuestionnaire={() => {
                      setShowUserType(false);
                      setShowQuestionnaire(true);
                    }}
                    onGoToWelcome={() => {
                      setShowUserType(false);
                    }}
                  />
                ) : showQuestionnaire ? (
                  <Questionnaire
                    onBack={() => setShowQuestionnaire(false)}
                    onSubmit={() => {
                      setShowQuestionnaire(false);
                      setShowLogin(true);
                    }}
                    language={language}
                    onShowLogin={() => {
                      setShowQuestionnaire(false);
                      setShowLogin(true);
                    }}
                    onSkipToSignUp={() => {
                      setShowQuestionnaire(false);
                      setShowUserType(true);
                    }}
                  />
                ) : (
                  <div className="text-center text-white space-y-6 max-w-xl mx-auto">
                    <div className="space-y-2">
                      <h2 className="text-3xl md:text-4xl font-semibold drop-shadow-lg">
                        Your Content Here
                      </h2>
                      <p className="text-base md:text-lg opacity-90 drop-shadow">
                        This screen is embedded within your artistic frame
                      </p>
                    </div>

                    {/* Sample Content Card */}
                    <div className="mt-4 bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20">
                      <div className="aspect-video bg-black/20 backdrop-blur-sm rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
                          alt="Abstract art"
                          className="w-full h-full object-cover rounded-lg opacity-80"
                        />
                      </div>
                      <p className="text-sm opacity-80 drop-shadow">
                        Add any content: videos, images, apps, or interactive
                        elements.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Zone sous l'écran : langues + texte + boutons */}
        <div className="relative z-20 flex flex-col items-center gap-5 text-center">
          {/* Langues */}
          <nav
            aria-label={
              language === "spanish"
                ? "Selección de idioma"
                : language === "english"
                ? "Language selection"
                : "Selecció d'idioma"
            }
          >
            <div className="flex flex-wrap justify-center gap-4" role="group">
              <button
                onClick={() => setLanguage("spanish")}
                className={`text-white drop-shadow cursor-pointer hover:opacity-80 transition-opacity underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1 ${
                  language === "spanish"
                    ? "opacity-100 font-bold"
                    : "opacity-70"
                }`}
                aria-label="Español"
                aria-current={language === "spanish" ? "true" : "false"}
              >
                Spanish
              </button>
              <button
                onClick={() => setLanguage("english")}
                className={`text-white drop-shadow cursor-pointer hover:opacity-80 transition-opacity underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1 ${
                  language === "english"
                    ? "opacity-100 font-bold"
                    : "opacity-70"
                }`}
                aria-label="English"
                aria-current={language === "english" ? "true" : "false"}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("catalan")}
                className={`text-white drop-shadow  cursor-pointer hover:opacity-80 transition-opacity underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1 ${
                  language === "catalan"
                    ? "opacity-100 font-bold"
                    : "opacity-70"
                }`}
                aria-label="Català"
                aria-current={language === "catalan" ? "true" : "false"}
              >
                Catalan
              </button>
            </div>
          </nav>

          {/* Message + boutons d'action */}
          <div className="flex flex-col items-center gap-4">
            <p
              className="text-white drop-shadow text-lg md:text-xl"
              role="status"
              aria-live="polite"
            >
              {messages[language]}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setShowQuestionnaire(true)}
                className="flex items-center  cursor-pointer gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white drop-shadow hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={
                  language === "spanish"
                    ? "Entrar al cuestionario"
                    : language === "english"
                    ? "Enter questionnaire"
                    : "Entrar al qüestionari"
                }
              >
                Enter
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>

              <button
                onClick={() => setShowUserType(true)}
                className="flex items-center  cursor-pointer gap-2 px-4 py-2 bg-white/30 backdrop-blur-md border border-white/40 rounded-lg text-white drop-shadow hover:bg:white/40 hover:bg-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={signUpText[language]}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                {signUpText[language]}
              </button>

              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center  cursor-pointer gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white drop-shadow hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={loginText[language]}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                {loginText[language]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
