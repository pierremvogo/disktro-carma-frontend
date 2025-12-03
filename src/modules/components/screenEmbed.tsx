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

type Language = "english" | "spanish" | "catalan";

export function ScreenEmbed() {
  const [language, setLanguage] = useState<Language>("english");
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

  // 🧩 ARTIST CHOICE FULL SCREEN
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

  // 🧩 LOGIN FULL SCREEN
  if (showLogin) {
    return (
      <Login
        onBack={() => setShowLogin(false)}
        onLoginAsFan={() => {
          setShowLogin(false);
          setIsArtist(false);
          setShowFanStreaming(true);
        }}
        onLoginAsArtist={() => {
          setShowLogin(false);
          setIsArtist(true);
          setShowArtistChoice(true);
        }}
        language={language}
        onSignUp={() => {
          setShowLogin(false);
          setShowUserType(true);
        }}
      />
    );
  }

  // 🧩 ARTIST DASHBOARD FULL SCREEN
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

  // 🧩 FAN PROFILE SETUP FULL SCREEN
  if (showFanProfileSetup) {
    return (
      <FanProfileSetup
        onBack={() => setShowFanProfileSetup(false)}
        onComplete={() => {
          setShowFanProfileSetup(false);
          setShowFanStreaming(true);
        }}
        language={language}
        onSignUp={() => {
          setShowFanProfileSetup(false);
          setShowUserType(true);
        }}
      />
    );
  }

  // 🧩 ARTIST PROFILE SETUP FULL SCREEN
  if (showArtistProfileSetup) {
    return (
      <ArtistProfileSetup
        onBack={() => setShowArtistProfileSetup(false)}
        onComplete={() => {
          setShowArtistProfileSetup(false);
          setShowArtistDashboard(true);
        }}
        language={language}
        onSignUp={() => {
          setShowArtistProfileSetup(false);
          setShowUserType(true);
        }}
      />
    );
  }

  // 🧩 FAN STREAMING FULL SCREEN
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

  // 🧩 EMBEDDED SCREEN (responsive)
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-500 px-4 py-8 md:px-8">
      <div className="relative w-full max-w-7xl flex flex-col items-center gap-8 md:gap-10">
        <div className="relative w-full flex items-center justify-center">
          {/* Left Panel - vertical background (only on large screens) */}
          <div
            className="hidden lg:block absolute left-0 w-64 h-full rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center origin-center"
            style={{
              backgroundImage: `url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")`,
              backgroundPosition: "25% 35%",
              backgroundSize: "cover",
              transform: "rotate(90deg)",
            }}
          />

          {/* Right Panel - vertical background (only on large screens) */}
          <div
            className="hidden lg:block absolute right-0 w-64 h-full rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center origin-center"
            style={{
              backgroundImage: `url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")`,
              backgroundPosition: "75% 35%",
              backgroundSize: "cover",
              transform: "rotate(90deg)",
            }}
          />

          {/* Middle Panel - Screen (responsive) */}
          <div className="relative z-10 w-full max-w-4xl mt-8 md:mt-20 lg:mt-32">
            <div className="w-full h-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 flex flex-col">
              {/* Main Content Area */}
              <div className="flex-1 relative bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 flex items-center justify-center p-4 sm:p-6 md:p-8">
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
                  <div className="text-center text-white space-y-4 px-2 sm:px-4">
                    <div className="space-y-2">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl drop-shadow-lg">
                        {messages[language]}
                      </h2>
                      <p className="text-sm sm:text-base md:text-lg opacity-90 drop-shadow">
                        This screen is embedded within your artistic frame
                      </p>
                    </div>

                    {/* Sample Content Card */}
                    <div className="mt-6 sm:mt-8 bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 max-w-md mx-auto border border-white/20">
                      <div className="aspect-video bg-black/20 backdrop-blur-sm rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        <ImageWithFallback
                          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
                          alt="Abstract art"
                          className="w-full h-full object-cover rounded-lg opacity-80"
                        />
                      </div>
                      <p className="text-xs sm:text-sm opacity-80 drop-shadow">
                        Add any content: videos, images, apps, or interactive
                        elements
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Language Options and Controls - below the screen */}
        <div className="relative z-10 flex flex-col items-center gap-3 w-full">
          {/* Language Options */}
          <nav
            aria-label={
              language === "spanish"
                ? "Selección de idioma"
                : language === "english"
                ? "Language selection"
                : "Selecció d'idioma"
            }
            className="w-full"
          >
            <div
              className="flex flex-wrap justify-center gap-3 sm:gap-6"
              role="group"
            >
              <button
                onClick={() => setLanguage("spanish")}
                className={`text-white cursor-pointer drop-shadow hover:opacity-70 transition-opacity underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1 text-sm sm:text-base ${
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
                className={`text-white cursor-pointer drop-shadow hover:opacity-70 transition-opacity underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1 text-sm sm:text-base ${
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
                className={`text-white cursor-pointer drop-shadow hover:opacity-70 transition-opacity underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1 text-sm sm:text-base ${
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

          {/* Bottom Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
            <button
              onClick={() => setShowQuestionnaire(true)}
              className="flex cursor-pointer items-center gap-2 px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white text-sm sm:text-base drop-shadow hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="flex cursor-pointer items-center gap-2 px-3 sm:px-4 py-2 bg-white/30 backdrop-blur-md border border-white/40 rounded-lg text-white text-sm sm:text-base drop-shadow hover:bg-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={signUpText[language as keyof typeof signUpText]}
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
              {signUpText[language as keyof typeof signUpText]}
            </button>

            <button
              onClick={() => setShowLogin(true)}
              className="flex cursor-pointer items-center gap-2 px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white text-sm sm:text-base drop-shadow hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={loginText[language as keyof typeof loginText]}
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
              {loginText[language as keyof typeof loginText]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
