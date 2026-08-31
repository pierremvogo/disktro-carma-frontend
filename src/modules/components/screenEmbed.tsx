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
import { useRouter, useSearchParams } from "next/navigation";

type Language = "english" | "spanish" | "catalan";
const LANGUAGE_STORAGE_KEY = "disktro_language";

export function ScreenEmbed({ initialView }: { initialView?: string }) {
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mediaScrollRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const dragData = useRef({ startX: 0, scrollLeft: 0 });

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const ACCESS_TOKEN_KEY = UserModule.localState.ACCESS_TOKEN;
  const USER_ID_KEY = UserModule.localState.USER_ID;
  const USER_DATA_KEY = UserModule.localState.USER_DATA;
  const USER_ROLE_KEY = UserModule.localState.USER_ROLE;

  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "home";

  const getButtonClass = (view: string) =>
    `px-4 py-2 text-sm text-white rounded-lg transition-all font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
      currentView === view
        ? "bg-purple-500/20 border border-purple-400"
        : "w-full text-left px-4 py-3 text-sm text-white/90 hover:bg-white/10 rounded-xl transition-colors font-medium"
    }`;

  // Fermer le menu au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // Fermer le menu avec la touche Échap
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Gestion de la navigation au clavier pour le scroll horizontal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByAmount(-300);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByAmount(300);
    }
  };

  useEffect(() => {
    if (initialView === "home") {
      setShowLogin(false);
      setShowUserType(false);
      setShowQuestionnaire(false);
      setShowArtistChoice(false);
    }

    if (initialView === "question") {
      setShowLogin(false);
      setShowUserType(false);
      setShowQuestionnaire(true);
    }

    if (initialView === "login") {
      setShowLogin(true);
      setShowUserType(false);
      setShowQuestionnaire(false);
    }

    if (initialView === "signup") {
      setShowUserType(true);
      setShowLogin(false);
      setShowQuestionnaire(false);
    }

    if (initialView === "logout") {
      setShowUserType(false);
      setShowLogin(false);
      setShowQuestionnaire(false);
      setShowArtistChoice(false);
      setShowArtistDashboard(false);
      setShowArtistProfileSetup(false);
      setShowFanProfileSetup(false);
      setShowFanStreaming(false);
    }
  }, [initialView]);

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

        if (!token || !userId) {
          cleanupAndRedirect();
          return;
        }

        const payload = decodeJwt(token);
        if (payload?.exp) {
          const nowInSeconds = Math.floor(Date.now() / 1000);
          if (payload.exp < nowInSeconds) {
            console.warn("Token expiré");
            cleanupAndRedirect();
            return;
          }
        }

        const res = await UserModule.service.getUser(userId);

        if (!res?.data) {
          console.warn("Utilisateur introuvable");
          cleanupAndRedirect();
          return;
        }

        localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.data));
        localStorage.setItem(USER_ROLE_KEY, JSON.stringify(res.data.type));

        setIsLoggedIn(true);
      } catch (error) {
        console.error("Erreur lors de la vérification d'auth", error);
        cleanupAndRedirect();
      }
    };

    checkAuth();
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsMenuOpen(false);
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

  const handleMediaScroll = () => {
    updateScrollArrows();

    const el = mediaScrollRef.current;
    if (!el) return;

    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveMediaIndex(index);
  };

  const scrollByAmount = (amount: number) => {
    const el = mediaScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });

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

  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (!v) return;
      v.pause();
    });

    const v = videoRefs.current[activeMediaIndex];
    if (v) {
      v.muted = true;
      v.playsInline = true;

      const p = v.play();
      if (p && typeof (p as any).catch === "function") {
        (p as any).catch(() => {
          // Autoplay bloqué par le navigateur
        });
      }
    }
  }, [activeMediaIndex]);

  const [videos] = useState<string[]>([
    "https://res.cloudinary.com/dql4qiwjg/video/upload/v1765036472/video_song/1765036469226-496598996.mp4",
    "https://res.cloudinary.com/dql4qiwjg/video/upload/v1765037601/video_song/1765037599148-810866371.mp4",
  ]);

  const messages: Record<Language, string> = {
    spanish: "Bienvenido a Bbok",
    english: "Welcome to Bbok",
    catalan: "Benvingut a Bbok",
  };

  const loginText: Record<Language, string> = {
    spanish: "Iniciar sesión",
    english: "Log in",
    catalan: "Iniciar sessió",
  };

  const signUpText: Record<Language, string> = {
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

  // 🧩 EMBEDDED SCREEN - OPTIMISÉ MOBILE
  return (
    <div
      className="
        relative w-full
        min-h-[100svh] md:min-h-screen
        overflow-hidden
        bg-gradient-to-br from-[#5A0B4D] via-[#4A1456] to-[#2D0E3E]
        text-white
        bg-cover bg-center bg-fixed
      "
      style={{
        backgroundImage:
          'url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <AccessibilityButton language={language} /> */}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* WRAPPER PRINCIPAL */}
      <div
        className="
          relative z-10 flex flex-col w-full
          min-h-[100svh] md:min-h-screen
          pt-[max(env(safe-area-inset-top),1rem)]
          pb-[max(env(safe-area-inset-bottom),1rem)]
          overflow-hidden
        "
      >
        {/* HEADER - Logo + Menu Mobile */}
        <header
          className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 py-3"
          role="banner"
        >
          <button
            onClick={() => {
              setShowUserType(false);
              setShowQuestionnaire(false);
              setShowLogin(false);
              setShowArtistChoice(false);
              setShowFanStreaming(false);
              setShowArtistProfileSetup(false);
              setShowFanProfileSetup(false);
              setIsMenuOpen(false);
            }}
            className="cursor-pointer flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-lg"
            aria-label="Home"
            tabIndex={0}
          >
            <img
              src="/logo_vector.svg"
              alt="Logo"
              className="h-7 sm:h-8 md:h-10 w-auto"
            />
          </button>

          {/* Menu Mobile Burger */}
          <div className="lg:hidden relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
              tabIndex={0}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Dropdown Menu Mobile */}
            {isMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4 z-50"
                role="menu"
              >
                {/* Langues */}
                <div className="mb-4 pb-4 border-b border-white/10">
                  <p className="text-xs text-white/50 mb-3 uppercase tracking-wider font-medium">
                    Language
                  </p>
                  <div
                    className="grid grid-cols-3 gap-2"
                    role="group"
                    aria-label="Language selection"
                  >
                    {(["spanish", "english", "catalan"] as Language[]).map(
                      (lang) => (
                        <button
                          key={lang}
                          onClick={() => changeLanguage(lang)}
                          className={`text-xs px-2 py-2 rounded-xl transition-all font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                            language === lang
                              ? "bg-purple-500/60 text-white shadow-lg"
                              : "text-white/70 hover:bg-white/10"
                          }`}
                          role="menuitemradio"
                          aria-checked={language === lang}
                          tabIndex={0}
                        >
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="space-y-1.5" role="group">
                  <button
                    onClick={() => {
                      router.replace("/home/?view=home");
                      setIsMenuOpen(false);
                    }}
                    className={`${getButtonClass("home")} w-full text-left`}
                    role="menuitem"
                    tabIndex={0}
                  >
                    🏠 Home
                  </button>
                  {/* <button
                    onClick={() => {
                      router.replace("/home/?view=question");
                      setIsMenuOpen(false);
                    }}
                    className={`${getButtonClass(
                      "question"
                    )} flex items-center gap-2 w-full text-left `}
                    role="menuitem"
                    tabIndex={0}
                  >
                    🧪 Test Group
                  </button> */}
                  <button
                    onClick={() => {
                      router.replace("/home/?view=signup");
                      setIsMenuOpen(false);
                    }}
                    className={`${getButtonClass(
                      "signup"
                    )} flex items-center gap-2 w-full text-left`}
                    role="menuitem"
                    tabIndex={0}
                  >
                    ✨ {signUpText[language]}
                  </button>
                  {!isLoggedIn ? (
                    <button
                      onClick={() => {
                        router.replace("/home/?view=login");
                        setIsMenuOpen(false);
                      }}
                      className={`${getButtonClass("login")} w-full text-left`}
                      role="menuitem"
                      tabIndex={0}
                    >
                      🔑 {loginText[language]}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (getUserRole() == "artist")
                          router.push("/dashboard/artist/select");
                        else setShowFanStreaming(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-white/90 hover:bg-white/10 rounded-xl transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                      role="menuitem"
                      tabIndex={0}
                    >
                      📊 Dashboard
                    </button>
                  )}
                  <button
                    onClick={() => {
                      router.push("/subscription");
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-white/90 hover:bg-white/10 rounded-xl transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    role="menuitem"
                    tabIndex={0}
                  >
                    💎 Subscription
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Desktop */}
          <nav
            className="hidden lg:flex items-center gap-3"
            role="navigation"
            aria-label="Main navigation"
          >

             <div className="flex items-center gap-2">
    
            {/* Bouton Accessibilité */}
             <AccessibilityButton language={language} /> 
            {/* Language Pills */}
            <div
              className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/10"
              role="group"
              aria-label="Language selection"
            >
              {(["spanish", "english", "catalan"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`px-3 py-1.5 text-xs rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                    language === lang
                      ? "bg-purple-500/60 text-white font-semibold shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  aria-pressed={language === lang}
                  tabIndex={0}
                >
                  {lang === "spanish" && "ES"}
                  {lang === "english" && "EN"}
                  {lang === "catalan" && "CA"}
                </button>
              ))}
            </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.replace("/home/?view=home")}
                className={`${
                  currentView === "home"
                    ? "bg-purple-500/60 text-white font-semibold shadow-lg px-4 py-2 text-sm  backdrop-blur-md border border-white/20 rounded-lg hover:bg-purple-500/80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    : "px-4 py-2 text-sm text-white/90 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                }`}
                tabIndex={0}
              >
                Home
              </button>
              {/* <button
                onClick={() => router.replace("/home/?view=question")}
                className={`${
                  currentView === "question"
                    ? "bg-purple-500/60 text-white font-semibold shadow-lg px-4 py-2 text-sm  backdrop-blur-md border border-white/20 rounded-lg hover:bg-purple-500/80 transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    : "px-4 py-2 text-sm text-white/90 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all font-medium flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                }`}
                tabIndex={0}
              >
                Test Group
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button> */}
              <button
                onClick={() => router.replace("/home/?view=signup")}
                className={`${
                  currentView === "signup"
                    ? "bg-purple-500/60 text-white font-semibold shadow-lg px-4 py-2 text-sm  backdrop-blur-md border border-white/20 rounded-lg hover:bg-purple-500/80 transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    : "px-4 py-2 text-sm text-white/90 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all font-medium flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                }`}
                tabIndex={0}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
                {signUpText[language]}
              </button>
              {!isLoggedIn ? (
                <button
                  onClick={() => router.replace("/home/?view=login")}
                  className="px-4 py-2 text-sm text-white bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 transition-all font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  tabIndex={0}
                >
                  {loginText[language]}
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (getUserRole() == "artist")
                      router.push("/dashboard/artist/select");
                    else setShowFanStreaming(true);
                  }}
                  className="px-4 py-2 text-sm text-white bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 transition-all font-medium flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  tabIndex={0}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3h8v6h-8V3zM3 17h8v4H3v-4z" />
                  </svg>
                  Dashboard
                </button>
              )}
              <button
                onClick={() => router.push("/subscription")}
                className="px-4 py-2 text-sm text-white bg-white/20 backdrop-blur-md border border-white/30 rounded-lg hover:bg-white/30 transition-all font-medium flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                tabIndex={0}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M12 2L3 7v6c0 5 3.8 8.7 9 9 5.2-.3 9-4 9-9V7l-9-5z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                Subscription
              </button>
            </div>
          </nav>
        </header>

        {/* CONTENU PRINCIPAL */}
        <main
          className="flex-1 w-full overflow-y-auto 
          overscroll-contain px-4 sm:px-6 lg:px-8 pb-6"
          role="main"
        >
          
          
          <div className="relative w-full max-w-2xl mx-auto
          flex flex-col sm:flex-row items-center gap-6 md:gap-5">
            {/* Panneau central */}

             {/* Magazine Button 
            <div className="flex sm:flex-col  w-55 max-w-4xl mt-2 sm:mt-4">
              <button
                onClick={() => router.push("/magazine")}
                className="
                  m-2
                  relative
                  w-48 sm:w-48 md:w-56
                  h-25 sm:h-[100px]
                  overflow-hidden
                  rounded-xl sm:rounded-2xl
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-2xl
                  cursor-pointer
                  group
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                "
                style={{
                  backgroundImage: "url('/image/bbok_btn1.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
                tabIndex={0}
                aria-label="Visit Bbok Club Magazine"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 rounded-xl sm:rounded-2xl" />

                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none" />

                <div className="absolute -top-full -left-1/2 w-1/2 h-[300%] rotate-12 bg-white/10 blur-xl group-hover:left-[120%] transition-all duration-1000 pointer-events-none" />

                
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl drop-shadow-lg"></span>
                </div>
              </button>

               <button
                onClick={() => router.push("/magazine")}
                className="
                m-2
                  relative
                  w-48 sm:w-48 md:w-56
                  h-25 sm:h-[100px]
                  overflow-hidden
                  rounded-xl sm:rounded-2xl
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-2xl
                  cursor-pointer
                  group
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                "
                style={{
                  backgroundImage: "url('/image/bbok_btn2.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
                tabIndex={0}
                aria-label="Visit Bbok Club Magazine"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 rounded-xl sm:rounded-2xl" />

                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none" />

                <div className="absolute -top-full -left-1/2 w-1/2 h-[300%] rotate-12 bg-white/10 blur-xl group-hover:left-[120%] transition-all duration-1000 pointer-events-none" />

                {/* Texte sur le bouton 
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl drop-shadow-lg"></span>
                </div>
              </button>


              <button
                onClick={() => router.push("/magazine")}
                className="
                invisible
                m-2
                  relative
                  w-48 sm:w-48 md:w-56
                  h-25 sm:h-[100px]
                  overflow-hidden
                  rounded-xl sm:rounded-2xl
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-2xl
                  cursor-pointer
                  group
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                "
                style={{
                  backgroundImage: "url('/image/bbok_btn2.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
                tabIndex={0}
                aria-label="Visit Bbok Club Magazine"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 rounded-xl sm:rounded-2xl" />

                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none" />

                <div className="absolute -top-full -left-1/2 w-1/2 h-[300%] rotate-12 bg-white/10 blur-xl group-hover:left-[120%] transition-all duration-1000 pointer-events-none" />

                {/* Texte sur le bouton 
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl drop-shadow-lg"></span>
                </div>
              </button>

              <button
                onClick={() => router.push("/magazine")}
                className="
                invisible
                m-2
                  relative
                  w-48 sm:w-48 md:w-56
                  h-25 sm:h-[100px]
                  overflow-hidden
                  rounded-xl sm:rounded-2xl
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-2xl
                  cursor-pointer
                  group
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                "
                style={{
                  backgroundImage: "url('/image/bbok_btn2.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
                tabIndex={0}
                aria-label="Visit Bbok Club Magazine"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 rounded-xl sm:rounded-2xl" />

                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none" />

                <div className="absolute -top-full -left-1/2 w-1/2 h-[300%] rotate-12 bg-white/10 blur-xl group-hover:left-[120%] transition-all duration-1000 pointer-events-none" />

                {/* Texte sur le bouton 
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl drop-shadow-lg"></span>
                </div>
              </button>

              <button
                onClick={() => router.push("/magazine")}
                className="
                invisible
                m-2
                  relative
                  w-48 sm:w-48 md:w-56
                  h-25 sm:h-[100px]
                  overflow-hidden
                  rounded-xl sm:rounded-2xl
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-2xl
                  cursor-pointer
                  group
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                "
                style={{
                  backgroundImage: "url('/image/bbok_btn2.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
                tabIndex={0}
                aria-label="Visit Bbok Club Magazine"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 rounded-xl sm:rounded-2xl" />

                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none" />

                <div className="absolute -top-full -left-1/2 w-1/2 h-[300%] rotate-12 bg-white/10 blur-xl group-hover:left-[120%] transition-all duration-1000 pointer-events-none" />

                {/* Texte sur le bouton
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl drop-shadow-lg"></span>
                </div>
              </button>

            </div>*/}
            
            <div className="relative z-10 
            w-full max-w-2xl mt-2 flex-row md:mt-4">
              <div className="w-full h-full bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20 flex flex-col">
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
                    <div className="text-center text-white space-y-4 sm:space-y-6 px-2 sm:px-4 w-full">
                      <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">
                          {messages[language]}
                        </h2>
                      </div>

                      {/* MEDIA CARD */}
                      <div
                        className="mt-4 sm:mt-8 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-6 max-w-md mx-auto border border-white/20 relative"
                        onKeyDown={handleKeyDown}
                        role="region"
                        aria-label="Media carousel"
                        tabIndex={0}
                      >
                        {/* Arrow Left */}
                        {canScrollLeft && (
                          <button
                            type="button"
                            onClick={() => scrollByAmount(-300)}
                            className="hidden sm:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full backdrop-blur-md shadow-md hover:bg-black/60 transition-all z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                            aria-label="Scroll left"
                            tabIndex={0}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden="true"
                            >
                              <path d="M15 18l-6-6 6-6" />
                            </svg>
                          </button>
                        )}

                        {/* Arrow Right */}
                        {canScrollRight && (
                          <button
                            type="button"
                            onClick={() => scrollByAmount(300)}
                            className="hidden sm:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full backdrop-blur-md shadow-md hover:bg-black/60 transition-all z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                            aria-label="Scroll right"
                            tabIndex={0}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden="true"
                            >
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </button>
                        )}

                        {/* Scrollable Zone */}
                        <div
                          ref={mediaScrollRef}
                          onScroll={handleMediaScroll}
                          onPointerDown={(e) => {
                            const el = mediaScrollRef.current;
                            if (!el) return;
                            el.setPointerCapture(e.pointerId);
                            setIsDragging(true);
                            dragData.current = {
                              startX: e.clientX,
                              scrollLeft: el.scrollLeft,
                            };
                          }}
                          onPointerMove={(e) => {
                            if (!isDragging) return;
                            const el = mediaScrollRef.current;
                            if (!el) return;
                            e.preventDefault();
                            const walk =
                              (e.clientX - dragData.current.startX) * 1.2;
                            el.scrollLeft = dragData.current.scrollLeft - walk;
                          }}
                          onPointerUp={() => setIsDragging(false)}
                          onPointerCancel={() => setIsDragging(false)}
                          className={`
                            flex gap-4
                            overflow-x-auto
                            snap-x snap-mandatory
                            pb-2
                            no-scrollbar
                            touch-pan-x select-none
                            ${isDragging ? "cursor-grabbing" : "cursor-grab"}
                          `}
                          style={{ scrollBehavior: "smooth" }}
                          tabIndex={0}
                          role="list"
                          aria-label="Media items"
                        >
                          {/* Videos */}
                          {videos.map((url, index) => (
                            <div
                              key={index}
                              className="min-w-full snap-center"
                              role="listitem"
                            >
                              <div className="aspect-video bg-black rounded-lg mb-3 overflow-hidden shadow-lg">
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
                                  aria-label={`Video ${index + 1}`}
                                />
                              </div>
                              <p className="text-xs sm:text-sm opacity-80 drop-shadow text-center font-medium">
                                #{index + 1}
                              </p>
                            </div>
                          ))}

                          {/* Image Slide */}
                          <div
                            className="min-w-full snap-center"
                            role="listitem"
                          >
                            <div className="aspect-video bg-black/20 backdrop-blur-sm rounded-lg mb-3 flex items-center justify-center overflow-hidden shadow-lg">
                              <ImageWithFallback
                                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80"
                                alt="Second visual"
                                className="w-full h-full object-cover rounded-lg opacity-80"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Indicateurs de slide */}
                        <div
                          className="flex justify-center gap-2 mt-3 mb-1"
                          role="tablist"
                          aria-label="Media navigation"
                        >
                          {videos.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                const el = mediaScrollRef.current;
                                if (el) {
                                  el.scrollTo({
                                    left: el.clientWidth * i,
                                    behavior: "smooth",
                                  });
                                }
                              }}
                              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                                i === activeMediaIndex
                                  ? "bg-white w-6"
                                  : "bg-white/40 hover:bg-white/60 w-2"
                              }`}
                              aria-label={`Go to slide ${i + 1}`}
                              aria-selected={i === activeMediaIndex}
                              role="tab"
                              tabIndex={0}
                            />
                          ))}
                          {/* Dot pour l'image */}
                          <button
                            onClick={() => {
                              const el = mediaScrollRef.current;
                              if (el) {
                                el.scrollTo({
                                  left: el.clientWidth * videos.length,
                                  behavior: "smooth",
                                });
                              }
                            }}
                            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                              activeMediaIndex === videos.length
                                ? "bg-white w-6"
                                : "bg-white/40 hover:bg-white/60 w-2"
                            }`}
                            aria-label="Go to image slide"
                            aria-selected={activeMediaIndex === videos.length}
                            role="tab"
                            tabIndex={0}
                          />
                        </div>

                        <p
                          className="text-[11px] sm:text-xs opacity-70 mt-2 text-center"
                          aria-live="polite"
                        >
                          Drag horizontally with your cursor or swipe on mobile
                          to explore media. Use left/right arrow keys to
                          navigate.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Magazine Button */}
            <div className="flex justify-center items-center sm:justify-center w-full max-w-4xl mt-6 sm:mt-10">
              <button
                onClick={() => router.push("/magazine")}
                className="
                  relative
                  w-38 sm:w-48 md:w-56
                  h-15 sm:h-[100px]
                  overflow-hidden
                  rounded-xl sm:rounded-2xl
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-2xl
                  cursor-pointer
                  group
                  focus focus-visible:ring-2 focus-visible:ring-blue-500
                "
                style={{
                  backgroundImage: "url('/image/bbok_club.jpeg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  border: "1.5px solid rgba(255,255,255,0.5)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
                tabIndex={0}
                aria-label="Visit Bbok Club Magazine"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300 rounded-xl sm:rounded-2xl" />

                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none" />

                <div className="absolute -top-full -left-1/2 w-1/2 h-[300%] rotate-12 bg-white/10 blur-xl group-hover:left-[120%] transition-all duration-1000 pointer-events-none" />

                {/* Texte sur le bouton */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl drop-shadow-lg"></span>
                </div>
              </button>
            </div>
            </div>

            
          </div>
        </main>
      </div>
    </div>
  );
}
