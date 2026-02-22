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
import { useRouter } from "next/navigation";

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

  const mediaScrollRef = useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  // const dragData = useRef({ startX: 0, scrollLeft: 0 });

  const router = useRouter();

  const dragData = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    locked: false, // est-ce qu'on a décidé horizontal/vertical ?
    isHorizontal: false, // true => on gère le drag horizontal
  });

  // ✅ NEW: index actif + refs vidéos
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const ACCESS_TOKEN_KEY = UserModule.localState.ACCESS_TOKEN;
  const USER_ID_KEY = UserModule.localState.USER_ID;
  const USER_DATA_KEY = UserModule.localState.USER_DATA;
  const USER_ROLE_KEY = UserModule.localState.USER_ROLE;

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

  const bbokMessage = {
    english: {
      title: "Welcome to Bbok",
      p: [
        "Bbok is a music streaming service and fan-subscription platform built for music lovers.",
        "It allows artists to share exclusive content with their most dedicated fans and build a closer, more personal connection.",
        "We are currently welcoming artists to contact us and help us test the platform’s features, shape its future, and grow together.",
        "Accessibility is at the heart of Bbok.",
        "We have made a strong commitment to inclusion by developing features such as Sign Language support, Braille compatibility, Deuteranopia-friendly design, and many more accessibility tools — because music is better when everybody is included.",
      ],
      tags: ["#artists4artists", "#musicwitheverybody"],
      sign: ["Love,", "Team Bbok"],
      psLabel: "PS:",
      psText:
        "You can check out my YouTube channel if you’d like to know more about me as an artist:",
    },

    spanish: {
      title: "Bienvenido a Bbok",
      p: [
        "Bbok es un servicio de streaming musical y una plataforma de suscripción para fans, creada para amantes de la música.",
        "Permite a los artistas compartir contenido exclusivo con sus fans más fieles y construir una conexión más cercana y personal.",
        "Actualmente invitamos a artistas a contactarnos y ayudarnos a probar las funciones de la plataforma, dar forma a su futuro y crecer juntos.",
        "La accesibilidad está en el corazón de Bbok.",
        "Hemos asumido un fuerte compromiso con la inclusión desarrollando funciones como soporte de Lengua de Señas, compatibilidad con Braille, diseño adaptado para deuteranopía y muchas más herramientas de accesibilidad — porque la música es mejor cuando todos están incluidos.",
      ],
      tags: ["#artists4artists", "#musicwitheverybody"],
      sign: ["Con cariño,", "Team Bbok"],
      psLabel: "PD:",
      psText:
        "Puedes visitar mi canal de YouTube si quieres saber más sobre mí como artista:",
    },

    catalan: {
      title: "Benvingut/da a Bbok",
      p: [
        "Bbok és un servei d’streaming musical i una plataforma de subscripció per a fans, creada per als amants de la música.",
        "Permet als artistes compartir contingut exclusiu amb els seus fans més fidels i construir una connexió més propera i personal.",
        "Actualment convidem artistes a contactar amb nosaltres i ajudar-nos a provar les funcionalitats de la plataforma, donar forma al seu futur i créixer plegats.",
        "L’accessibilitat és al cor de Bbok.",
        "Hem fet un compromís ferm amb la inclusió desenvolupant funcionalitats com suport per a Llengua de Signes, compatibilitat amb Braille, disseny adaptat per a la deuteranòpia i moltes més eines d’accessibilitat — perquè la música és millor quan tothom hi és inclòs.",
      ],
      tags: ["#artists4artists", "#musicwitheverybody"],
      sign: ["Amb estima,", "Team Bbok"],
      psLabel: "PS:",
      psText:
        "Pots visitar el meu canal de YouTube si vols saber més de mi com a artista:",
    },
  };

  const ytLink = "https://youtube.com/@kabifepabbil";

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

  // const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const el = mediaScrollRef.current;
  //   if (!el) return;
  //   setIsDragging(true);
  //   dragData.current = {
  //     startX: e.pageX - el.offsetLeft,
  //     scrollLeft: el.scrollLeft,
  //   };
  // };

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
        onBack={() => {
          setShowArtistChoice(false);
          setIsArtist(false);
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
      <FullScreenScroll>
        <Login
          onBack={() => {
            setShowLogin(false);
            setShowUserType(false);
            setShowQuestionnaire(false);
            setShowUserType(true);
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
      </FullScreenScroll>
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

  function FullScreenScroll({ children }: { children: React.ReactNode }) {
    return (
      <div
        className="
          fixed inset-0 w-screen h-[100dvh]
          overflow-y-auto overscroll-contain
          touch-pan-y
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Important : un contenu qui peut dépasser */}
        <div className="min-h-[100dvh]">{children}</div>
      </div>
    );
  }

  // 🧩 EMBEDDED SCREEN
  return (
    <div className="relative w-full h-[100dvh] overflow-hidden text-white">
      {/* ✅ Background image (boost colors) */}
      <div
        className="absolute inset-0 bg-cover bg-center origin-center"
        style={{
          backgroundImage:
            'url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")',
          filter: "brightness(1.2) saturate(1.25) contrast(1.08)",
          transform: "scale(1.03)",
        }}
      />

      {/* ✅ Gradient tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5A0B4D]/30 via-[#4A1456]/25 to-[#2D0E3E]/30" />
      {/* ✅ Lighter overlay than before */}
      <div className="absolute inset-0 bg-black/25" />

      {/* ✅ Bouton d’accessibilité */}
      <AccessibilityButton language={language} />

      {/* ✅ WRAPPER PRINCIPAL */}
      <div className="relative z-10 flex flex-col w-full h-full min-h-0 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        {/* ✅ HEADER (STICKY, robuste sur Android) */}
        <div
          className="
    sticky top-0 z-[60]
    w-full
     backdrop-blur-md
    border-b border-white/10
  "
          style={{ WebkitBackdropFilter: "blur(12px)" }}
        >
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
            <div className="pt-[calc(env(safe-area-inset-top)+0.75rem)] pb-3">
              {/* ✅ 1 seul layout : mobile colonne centrée, desktop ligne (2 colonnes) */}
              <div
                className="
          flex flex-col items-center justify-center gap-3
          md:grid md:grid-cols-[auto_1fr_auto] md:items-center
        "
              >
                {/* ✅ Logo (gauche sur desktop, centré sur mobile) */}
                <div className="w-full md:w-auto md:justify-self-start flex justify-center md:justify-start">
                  <button
                    onClick={() => {
                      setShowUserType(false);
                      setShowQuestionnaire(false);
                      setShowLogin(false);
                      setShowArtistChoice(false);
                      setShowFanStreaming(false);
                      setShowArtistProfileSetup(false);
                      setShowFanProfileSetup(false);
                    }}
                    className="cursor-pointer"
                    aria-label="Home"
                  >
                    <img
                      src="/logo_vector.svg"
                      alt="Logo"
                      className="h-8 sm:h-9 md:h-10 w-auto"
                    />
                  </button>
                </div>
                {/* ✅ Bloc boutons (centré, même sur desktop) */}
                <div className="w-full md:w-auto md:justify-self-center">
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                    {/* Home */}
                    <button
                      onClick={() => router.replace("/home/?view=home")}
                      className="flex cursor-pointer items-center gap-2 px-3 sm:px-4 py-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-lg text-white text-xs sm:text-sm drop-shadow hover:bg-white/25 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="button"
                      aria-label="Home"
                    >
                      Home
                    </button>

                    {/* Test Group */}
                    <button
                      onClick={() => router.replace("/home/?view=question")}
                      className="flex cursor-pointer items-center gap-2 px-3 sm:px-4 py-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-lg text-white text-xs sm:text-sm drop-shadow hover:bg-white/25 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="button"
                    >
                      Test Group
                    </button>

                    {/* Sign Up */}
                    <button
                      onClick={() => router.replace("/home/?view=signup")}
                      className="flex cursor-pointer items-center gap-2 px-3 sm:px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white text-xs sm:text-sm drop-shadow hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="button"
                      aria-label={
                        signUpText[language as keyof typeof signUpText]
                      }
                    >
                      {signUpText[language as keyof typeof signUpText]}
                    </button>

                    {/* Login / Dashboard */}
                    {!isLoggedIn ? (
                      <button
                        onClick={() => router.replace("/home/?view=login")}
                        className="flex cursor-pointer items-center gap-2 px-3 sm:px-4 py-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-lg text-white text-xs sm:text-sm drop-shadow hover:bg-white/25 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="button"
                        aria-label={
                          loginText[language as keyof typeof loginText]
                        }
                      >
                        {loginText[language as keyof typeof loginText]}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (getUserRole() == "artist")
                            setShowArtistChoice(true);
                          else setShowFanStreaming(true);
                        }}
                        className="flex cursor-pointer items-center gap-2 px-3 sm:px-4 py-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-lg text-white text-xs sm:text-sm drop-shadow hover:bg-white/25 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="button"
                        aria-label="Dashboard"
                      >
                        Dashboard
                      </button>
                    )}
                  </div>
                </div>

                {/* ✅ Bloc langues (extrême droite sur desktop, centré sur mobile) */}
                <div className="w-full lg:w-auto lg:justify-self-end">
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
                    <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 text-xs sm:text-sm">
                      <button
                        onClick={() => changeLanguage("spanish")}
                        className={`cursor-pointer text-white underline ${
                          language === "spanish"
                            ? "font-bold opacity-100"
                            : "opacity-70"
                        }`}
                        type="button"
                        aria-label="Español"
                        aria-current={language === "spanish" ? "true" : "false"}
                      >
                        Spanish
                      </button>

                      <button
                        onClick={() => changeLanguage("english")}
                        className={`cursor-pointer text-white underline ${
                          language === "english"
                            ? "font-bold opacity-100"
                            : "opacity-70"
                        }`}
                        type="button"
                        aria-label="English"
                        aria-current={language === "english" ? "true" : "false"}
                      >
                        English
                      </button>

                      <button
                        onClick={() => changeLanguage("catalan")}
                        className={`cursor-pointer text-white underline ${
                          language === "catalan"
                            ? "font-bold opacity-100"
                            : "opacity-70"
                        }`}
                        type="button"
                        aria-label="Català"
                        aria-current={language === "catalan" ? "true" : "false"}
                      >
                        Catalan
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ CONTENT SCROLL (interne) */}
        <div
          className="
            flex-1 min-h-0 w-full
            overflow-y-auto overscroll-contain
            px-4 md:px-8 pb-6
            touch-pan-y
          "
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehaviorY: "contain",
          }}
        >
          <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center gap-8 md:gap-10 min-h-0">
            <div className="relative w-full flex items-center justify-center min-h-0">
              {/* Left Panel */}
              <div className="hidden lg:block absolute left-0 w-64 h-full rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center origin-center" />

              {/* Right Panel */}
              <div className="hidden lg:block absolute right-0 w-64 h-full rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center origin-center" />

              {/* Middle Panel */}
              <div className="relative z-10 w-full max-w-4xl mt-4 md:mt-2 lg:mt-2 min-h-0">
                <div className="w-full h-full shadow-2xl overflow-visible border-white/20 flex flex-col min-h-0">
                  {/* MAIN CONTENT */}
                  <div className="flex-1 relative flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 min-h-0">
                    {showUserType ? (
                      <FullScreenScroll>
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
                      </FullScreenScroll>
                    ) : showQuestionnaire ? (
                      <FullScreenScroll>
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
                      </FullScreenScroll>
                    ) : (
                      <div className="text-center text-white space-y-6 px-2 sm:px-4 w-full">
                        {/* ================= TEXT CONTENT ================= */}
                        <div className="space-y-4 max-w-2xl mx-auto font-bold text-justify">
                          {(() => {
                            const t =
                              bbokMessage[
                                language as keyof typeof bbokMessage
                              ] || bbokMessage.english;

                            return (
                              <>
                                <h2 className="text-2xl sm:text-3xl md:text-4xl drop-shadow-lg text-center font-bold">
                                  {t.title}
                                </h2>

                                <div className="space-y-3 text-sm sm:text-base leading-relaxed text-white/90 font-bold text-justify">
                                  {t.p.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                  ))}
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2 justify-start">
                                  {t.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-xs sm:text-sm px-3 py-1 rounded-full bg-white/10 border border-white/20 font-bold"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                <div className="pt-4 font-bold text-justify">
                                  <p className="text-white/90">{t.sign[0]}</p>
                                  <p>{t.sign[1]}</p>
                                </div>

                                <div className="pt-3 text-sm sm:text-base text-white/90 font-bold text-justify">
                                  <p>
                                    <span>{t.psLabel}</span> {t.psText}
                                  </p>
                                  <a
                                    href="https://youtube.com/@kabifepabbil"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline hover:opacity-80 break-all font-bold"
                                  >
                                    https://youtube.com/@kabifepabbil
                                  </a>
                                </div>
                              </>
                            );
                          })()}
                        </div>

                        {/* ================= MEDIA CARD ================= */}
                        {/*  */}
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
