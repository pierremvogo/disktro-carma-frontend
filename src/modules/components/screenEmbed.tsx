"use client";
import React, { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Questionnaire } from "./Questionnaire";
import { UserType } from "./UserType";
import { ArtistDashboard } from "./ArtistDashboard";
import { FanStreaming } from "./FanStreaming";
import { FanProfileSetup } from "./FanProfileSetup";
import { ArtistProfileSetup } from "./ArtistProfileSetup";
import { Login } from "./Login";
import { ArtistChoice } from "./ArtistChoice";
import { AccessibilityButton } from "./accessibilityButton/AccessibilityButton";
import { UserModuleObject as UserModule } from "../module";
import { getUserRole } from "@/@disktro/utils";

type Language = "english" | "spanish" | "catalan";
const LANGUAGE_STORAGE_KEY = "disktro_language";

export function ScreenEmbed() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const mediaScrollRef = useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const dragData = useRef({ startX: 0, scrollLeft: 0 });

  // ✅ NEW: index actif + refs vidéos
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const ACCESS_TOKEN_KEY = UserModule.localState.ACCESS_TOKEN;
  const USER_ID_KEY = UserModule.localState.USER_ID;
  const USER_DATA_KEY = UserModule.localState.USER_DATA;
  const USER_ROLE_KEY = UserModule.localState.USER_ROLE;

  // Charger la langue depuis localStorage au montage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "english" || saved === "spanish" || saved === "catalan") {
      setLanguage(saved);
    }
  }, []);

  function decodeJwt(
    token: string
  ): { exp?: number; [key: string]: any } | null {
    try {
      const [, payloadBase64] = token.split(".");
      if (!payloadBase64) return null;

      const payloadJson = atob(
        payloadBase64.replace(/-/g, "+").replace(/_/g, "/")
      );
      return JSON.parse(payloadJson);
    } catch (e) {
      console.error("Failed to decode JWT", e);
      return null;
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cleanupAndRedirect = () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(USER_ID_KEY);
      localStorage.removeItem(USER_DATA_KEY);
      localStorage.removeItem(USER_ROLE_KEY);
    };

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        const userId = localStorage.getItem(USER_ID_KEY);

        // 1️⃣ Vérifie que le token et l'ID utilisateur existent
        if (!token || !userId) {
          cleanupAndRedirect();
          return;
        }

        // 2️⃣ Vérifie la date d'expiration du token (si JWT)
        const payload = decodeJwt(token);
        if (payload?.exp) {
          const nowInSeconds = Math.floor(Date.now() / 1000);
          if (payload.exp < nowInSeconds) {
            console.warn("Token expiré");
            cleanupAndRedirect();
            return;
          }
        }

        // 3️⃣ Vérifie en base que l'utilisateur existe encore
        //    et que le token est toujours valide côté backend
        const res = await UserModule.service.getUser(userId);

        if (!res?.data) {
          console.warn("Utilisateur introuvable");
          cleanupAndRedirect();
          return;
        }

        // Tu peux éventuellement resynchroniser le USER_DATA
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.data));
        localStorage.setItem(USER_ROLE_KEY, JSON.stringify(res.data.type));

        // Tous les checks sont OK
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Erreur lors de la vérification d'auth", error);
        cleanupAndRedirect();
      }
    };

    checkAuth();
  }, []);

  // Changer la langue + la persister
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  };

  const updateScrollArrows = () => {
    const el = mediaScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  // ✅ NEW: détecter la slide active + mettre à jour les flèches
  const handleMediaScroll = () => {
    updateScrollArrows();

    const el = mediaScrollRef.current;
    if (!el) return;

    // Comme chaque slide est min-w-full, on peut dériver l'index ainsi
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveMediaIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = mediaScrollRef.current;
    if (!el) return;
    setIsDragging(true);
    dragData.current = {
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const el = mediaScrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragData.current.startX) * 1.2; // vitesse
    el.scrollLeft = dragData.current.scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const scrollByAmount = (amount: number) => {
    const el = mediaScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });

    // petit fallback: recalculer l'index après le scroll smooth
    window.setTimeout(() => {
      const index = Math.round(el.scrollLeft / el.clientWidth);
      setActiveMediaIndex(index);
      updateScrollArrows();
    }, 250);
  };

  useEffect(() => {
    updateScrollArrows();
    const handleResize = () => updateScrollArrows();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ NEW: quand l’index actif change → pause toutes les vidéos + play la nouvelle
  useEffect(() => {
    // Pause toutes les vidéos
    videoRefs.current.forEach((v) => {
      if (!v) return;
      v.pause();
      // Optionnel: remettre au début pour éviter “son en arrière-plan”
      // v.currentTime = 0;
    });

    // Play la vidéo active si elle existe
    const v = videoRefs.current[activeMediaIndex];
    if (v) {
      // Autoplay mobile: souvent besoin de muted + playsInline
      v.muted = true;
      v.playsInline = true;

      const p = v.play();
      if (p && typeof (p as any).catch === "function") {
        (p as any).catch(() => {
          // Autoplay bloqué par le navigateur → ok, l'utilisateur cliquera play
        });
      }
    }
  }, [activeMediaIndex]);

  const [videos] = useState<string[]>([
    "https://res.cloudinary.com/dql4qiwjg/video/upload/v1765036472/video_song/1765036469226-496598996.mp4",
    "https://res.cloudinary.com/dql4qiwjg/video/upload/v1765037601/video_song/1765037599148-810866371.mp4",
  ]);

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
        onBack={() => {
          setShowLogin(false);
          setShowUserType(false);
          setShowQuestionnaire(false);
        }}
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
        <FanStreaming language={language} />
      </div>
    );
  }

  // 🧩 EMBEDDED SCREEN
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
      {/* ✅ Bouton d’accessibilité : monté au plus haut niveau */}
      <AccessibilityButton language={language} />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* WRAPPER PRINCIPAL */}
      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Language Options and Controls */}
        <div className="flex flex-col items-center gap-3 w-full pt-4">
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
                onClick={() => changeLanguage("spanish")}
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
                onClick={() => changeLanguage("english")}
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
                onClick={() => changeLanguage("catalan")}
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

          <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
            <button
              onClick={() => {
                setShowQuestionnaire(true);
                setShowUserType(false);
              }}
              className="flex cursor-pointer items-center gap-2 px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-md border border.white/30 rounded-lg text-white text-sm sm:text-base drop-shadow hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Test Group
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
              {signUpText[language as keyof typeof signUpText]}
            </button>

            {!isLoggedIn ? (
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
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                {loginText[language as keyof typeof loginText]}
              </button>
            ) : (
              <button
                onClick={() => {
                  // ✅ si connecté, on va au bon "dashboard"
                  if (getUserRole() == "artist") {
                    setShowArtistChoice(true); // ou direct setShowArtistDashboard(true) selon ton flow
                  } else {
                    setShowFanStreaming(true);
                  }
                }}
                className="flex cursor-pointer items-center gap-2 px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white text-sm sm:text-base drop-shadow hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Dashboard"
              >
                {/* icône */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3h8v6h-8V3zM3 17h8v4H3v-4z" />
                </svg>
                Dashboard
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 w-full overflow-y-auto flex items-center justify-center px-4 md:px-8 pb-4">
          <div className="relative w-full max-w-7xl flex flex-col items-center gap-8 md:gap-10">
            <div className="relative w-full flex items-center justify-center">
              {/* Left Panel */}
              <div
                className="hidden lg:block absolute left-0 w-64 h-full rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center origin-center"
                // style={{
                //   backgroundImage:
                //     'url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")',
                //   backgroundPosition: "25% 35%",
                //   backgroundSize: "cover",
                //   transform: "rotate(90deg)",
                // }}
              />

              {/* Right Panel */}
              <div
                className="hidden lg:block absolute right-0 w-64 h-full rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center origin-center"
                // style={{
                //   backgroundImage:
                //     'url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")',
                //   backgroundPosition: "75% 35%",
                //   backgroundSize: "cover",
                //   transform: "rotate(90deg)",
                // }}
              />

              {/* Middle Panel */}
              <div className="relative z-10 w-full max-w-4xl mt-4 md:mt-2 lg:mt-2">
                <div className="w-full h-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 flex flex-col">
                  {/* MAIN CONTENT */}
                  <div className="flex-1 relative bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 flex items-center justify-center p-4 sm:p-6 md:p-8">
                    {showUserType ? (
                      <UserType
                        onBack={() => {
                          setShowUserType(false);
                          setShowQuestionnaire(false);
                        }}
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
                        onBack={() => {
                          setShowQuestionnaire(false);
                          setShowUserType(false);
                        }}
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
                        </div>

                        {/* MEDIA CARD */}
                        <div className="mt-6 sm:mt-8 bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 max-w-md mx-auto border border-white/20 relative">
                          {/* ✅ Arrow Left (visible mobile too) */}
                          {canScrollLeft && (
                            <button
                              type="button"
                              onClick={() => scrollByAmount(-300)}
                              className="flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full backdrop-blur-md shadow-md hover:bg-black/60 transition"
                            >
                              ←
                            </button>
                          )}

                          {/* ✅ Arrow Right (visible mobile too) */}
                          {canScrollRight && (
                            <button
                              type="button"
                              onClick={() => scrollByAmount(300)}
                              className="flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full backdrop-blur-md shadow-md hover:bg-black/60 transition"
                            >
                              →
                            </button>
                          )}

                          {/* Scrollable Zone */}
                          <div
                            ref={mediaScrollRef}
                            onScroll={handleMediaScroll}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            className={`
                              flex gap-4 
                              overflow-x-auto 
                              snap-x snap-mandatory 
                              pb-2 
                              no-scrollbar 
                              ${isDragging ? "cursor-grabbing" : "cursor-grab"}
                            `}
                            style={{ scrollBehavior: "smooth" }}
                          >
                            {/* ✅ Videos (Cloudinary MP4 => <video>) */}
                            {videos.map((url, index) => (
                              <div
                                key={index}
                                className="min-w-full snap-center"
                              >
                                <div className="aspect-video bg-black rounded-lg mb-3 overflow-hidden">
                                  <video
                                    ref={(el) => {
                                      videoRefs.current[index] = el;
                                    }}
                                    className="w-full h-full object-cover"
                                    src={url}
                                    controls
                                    muted
                                    playsInline
                                    preload="metadata"
                                    onEnded={() => {
                                      // auto-advance to next slide
                                      const el = mediaScrollRef.current;
                                      if (!el) return;
                                      const next = Math.min(
                                        index + 1,
                                        videos.length - 1
                                      );
                                      el.scrollTo({
                                        left: next * el.clientWidth,
                                        behavior: "smooth",
                                      });
                                    }}
                                  />
                                </div>
                                <p className="text-xs sm:text-sm opacity-80 drop-shadow text-center">
                                  #{index + 1}
                                </p>
                              </div>
                            ))}

                            {/* Image Slide */}
                            <div className="min-w-full snap-center">
                              <div className="aspect-video bg-black/20 backdrop-blur-sm rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                                <ImageWithFallback
                                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80"
                                  alt="Second visual"
                                  className="w-full h-full object-cover rounded-lg opacity-80"
                                />
                              </div>
                            </div>
                          </div>

                          <p className="text-[11px] sm:text-xs opacity-70 mt-2 text-center">
                            Drag horizontally with your cursor or swipe on
                            mobile to explore media.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
