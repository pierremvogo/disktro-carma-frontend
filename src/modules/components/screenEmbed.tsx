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

  const [showAccessibility, setShowAccessibility] = useState(false);
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large" | "xl">(
    "medium",
  );
  const [highContrast, setHighContrast] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState<
    "none" | "protanopia" | "deuteranopia" | "tritanopia"
  >("none");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [visualNotifications, setVisualNotifications] = useState(false);
  const [largerTargets, setLargerTargets] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);

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

  useEffect(() => {
    if (!showAccessibility) return;

    const onKeyDown = (e: any) => {
      if (e.key === "Escape") setShowAccessibility(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showAccessibility]);

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

  const content = {
    spanish: {
      subscription: {
        title: "Suscribirse a un plan",
        subtitle: "Elige una suscripción para apoyar a {{artistName}}",

        button: {
          continue: "Continuar",
          redirecting: "Redirigiendo...",
        },

        message: {
          redirecting: "Redirigiendo a la página de pago...",
          paymentFailed: "El pago ha fallado. Inténtalo de nuevo.",
          success: "¡Pago realizado con éxito!",
        },

        payment: {
          stripe: "Tarjeta bancaria (Stripe)",
          lygos: "Mobile Money (Lygos)",
        },

        plans: {
          monthly: {
            label: "Suscripción mensual",
            features: [
              "Acceso a lanzamientos exclusivos",
              "Escucha anticipada",
              "Contenido exclusivo para fans",
              "Soporte estándar",
            ],
          },
          quarterly: {
            label: "Suscripción trimestral",
            features: [
              "Todos los beneficios mensuales",
              "Contenido premium exclusivo",
              "Acceso a conciertos en vivo privados",
              "Descargas limitadas",
              "Soporte prioritario",
            ],
          },
          annual: {
            label: "Suscripción anual",
            features: [
              "Todos los beneficios trimestrales",
              "Acceso ilimitado a contenido premium",
              "Descargas ilimitadas",
              "Encuentros virtuales con el artista",
              "Insignia de Fan VIP",
              "Soporte VIP",
            ],
          },
        },
      },
      title: "Música Para Todos",
      discover: "Descubrir",
      myMusic: "Mi Música",
      artists: "Artistas",
      search: "Buscar música, artistas...",
      featured: "Destacados",
      newReleases: "Nuevos Lanzamientos",

      subscribe: "Suscribirse",
      play: "Reproducir",
      pause: "Pausar",
      addToFavorites: "Añadir a favoritos",
      streams: "reproducciones",
      subscribers: "suscriptores",
      back: "Volver",
      nowPlaying: "Reproduciendo ahora",
      duration: "Duración",
      lyrics: "Letra",
      textLyrics: "Letra en Texto",
      signLanguage: "Lenguaje de Signos",
      editorPlaylists: "Playlists de los Editores",
      addToPlaylist: "Añadir a Playlist",
      createPlaylist: "Crear Playlist",
      playlistName: "Nombre de la Playlist",
      create: "Crear",
      cancel: "Cancelar",
      yourPlaylists: "Tus Playlists",
      sortAlphabetically: "Ordenar Alfabéticamente",
      songs: "canciones",
      noSongs: "No hay canciones en esta playlist",
      addedToPlaylist: "Añadido a la playlist",
      favorites: "Favoritos",
      addedToFavorites: "Añadido a favoritos",
      removedFromFavorites: "Eliminado de favoritos",
      accessibility: "Accesibilidad",
      dashboard: "Panel",
      mySubscriptions: "Mis Suscripciones",
      exclusiveGifts: "Regalos Exclusivos",
      subscriptionStats: "Estadísticas",
      totalSubscriptions: "Suscripciones Totales",
      totalGifts: "Regalos Totales",
      unsubscribe: "Cancelar Suscripción",
      subscribed: "Suscrito",
      claimGift: "Reclamar Regalo",
      claimed: "Reclamado",
      noSubscriptions: "Aún no estás suscrito a ningún artista",
      noGifts: "No hay regalos exclusivos disponibles",
      exploreArtists: "Explorar Artistas",
      giftFrom: "Regalo de",
      subscribedOn: "Suscrito desde",
      visualAccessibility: "Accesibilidad Visual",
      hearingAccessibility: "Accesibilidad Auditiva",
      motorAccessibility: "Accesibilidad Motora",
      cognitiveAccessibility: "Accesibilidad Cognitiva",
      fontSize: "Tamaño de Fuente",
      small: "Pequeño",
      medium: "Mediano",
      large: "Grande",
      extraLarge: "Extra Grande",
      highContrast: "Alto Contraste",
      colorBlindMode: "Modo Daltónico",
      none: "Ninguno",
      protanopia: "Protanopia (Rojo-Verde)",
      deuteranopia: "Deuteranopia (Rojo-Verde)",
      tritanopia: "Tritanopia (Azul-Amarillo)",
      reduceMotion: "Reducir Animaciones",
      textToSpeech: "Texto a Voz",
      captions: "Subtítulos",
      visualNotifications: "Notificaciones Visuales",
      largerTargets: "Botones Más Grandes",
      keyboardNav: "Navegación por Teclado",
      voiceControl: "Control por Voz",
      dyslexiaFont: "Fuente para Dislexia",
      focusMode: "Modo Enfoque",
      readingGuide: "Guía de Lectura",
      simplifiedInterface: "Interfaz Simplificada",
      errors: {
        generic: "Algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      },
      loading: "Cargando...",
      track: "Pista",
      refresh: "Actualizar",
      loadingTracks: "Cargando pistas...",
      loadingError: "Error al cargar",
      retry: "Reintentar",
      noTracksFound: "No se encontró ninguna pista",
      tryAnother: "Prueba otra",
      close: "Cerrar",
      clear: "Borrar",
      paymentSoon: "Suscripción disponible próximamente",
    },

    english: {
      paymentSoon: "Subscription coming soon",
      subscription: {
        title: "Subscribe to a plan",
        subtitle: "Choose a subscription to support {{artistName}}",

        button: {
          continue: "Continue",
          redirecting: "Redirecting...",
        },

        message: {
          redirecting: "Redirecting to the payment page...",
          paymentFailed: "Payment failed. Please try again.",
          success: "Payment completed successfully!",
        },

        payment: {
          stripe: "Credit card (Stripe)",
          lygos: "Mobile Money (Lygos)",
        },

        plans: {
          monthly: {
            label: "Monthly subscription",
            features: [
              "Access to exclusive releases",
              "Early listening",
              "Fan-only content",
              "Standard support",
            ],
          },
          quarterly: {
            label: "Quarterly subscription",
            features: [
              "All monthly benefits",
              "Exclusive premium content",
              "Access to private live sessions",
              "Limited downloads",
              "Priority support",
            ],
          },
          annual: {
            label: "Annual subscription",
            features: [
              "All quarterly benefits",
              "Unlimited access to premium content",
              "Unlimited downloads",
              "Virtual meet & greet with the artist",
              "VIP Fan badge",
              "VIP support",
            ],
          },
        },
      },
      loading: "Loading...",
      track: "Track",
      refresh: "Refresh",
      loadingTracks: "Loading tracks...",
      loadingError: "Error loading",
      retry: "Retry",
      noTracksFound: "No track found",
      tryAnother: "Try another",
      close: "Close",
      clear: "Clear",
      errors: {
        generic: "Something went wrong. Please try again later.",
      },
      noAlbumUploadedYet: "No album uploaded yet.",

      title: "Music with everybody",
      discover: "Discover",
      myMusic: "My Music",
      artists: "Artists",
      search: "Search music, artists...",
      featured: "Featured",
      newReleases: "New Releases",

      subscribe: "Subscribe",
      play: "Play",
      pause: "Pause",
      addToFavorites: "Add to favorites",
      streams: "streams",
      subscribers: "subscribers",
      back: "Back",
      nowPlaying: "Now playing",
      duration: "Duration",
      lyrics: "Lyrics",
      textLyrics: "Text Lyrics",
      signLanguage: "Sign Language",
      editorPlaylists: "Editor's Playlists",
      addToPlaylist: "Add to Playlist",
      createPlaylist: "Create Playlist",
      playlistName: "Playlist Name",
      create: "Create",
      cancel: "Cancel",
      yourPlaylists: "Your Playlists",
      sortAlphabetically: "Sort Alphabetically",
      songs: "songs",
      noSongs: "No songs in this playlist",
      addedToPlaylist: "Added to playlist",
      favorites: "Favorites",
      addedToFavorites: "Added to favorites",
      removedFromFavorites: "Removed from favorites",
      accessibility: "Accessibility",
      dashboard: "Dashboard",
      mySubscriptions: "My Subscriptions",
      exclusiveGifts: "Exclusive Gifts",
      subscriptionStats: "Statistics",
      totalSubscriptions: "Total Subscriptions",
      totalGifts: "Total Gifts",
      unsubscribe: "Unsubscribe",
      subscribed: "Subscribed",
      claimGift: "Claim Gift",
      claimed: "Claimed",
      noSubscriptions: "You're not subscribed to any artists yet",
      noGifts: "No exclusive gifts available",
      exploreArtists: "Explore Artists",
      giftFrom: "Gift from",
      subscribedOn: "Subscribed since",
      visualAccessibility: "Visual Accessibility",
      hearingAccessibility: "Hearing Accessibility",
      motorAccessibility: "Motor Accessibility",
      cognitiveAccessibility: "Cognitive Accessibility",
      fontSize: "Font Size",
      small: "Small",
      medium: "Medium",
      large: "Large",
      extraLarge: "Extra Large",
      highContrast: "High Contrast",
      colorBlindMode: "Color Blind Mode",
      none: "None",
      protanopia: "Protanopia (Red-Green)",
      deuteranopia: "Deuteranopia (Red-Green)",
      tritanopia: "Tritanopia (Blue-Yellow)",
      reduceMotion: "Reduce Motion",
      textToSpeech: "Text to Speech",
      captions: "Captions",
      visualNotifications: "Visual Notifications",
      largerTargets: "Larger Buttons",
      keyboardNav: "Keyboard Navigation",
      voiceControl: "Voice Control",
      dyslexiaFont: "Dyslexia Font",
      focusMode: "Focus Mode",
      readingGuide: "Reading Guide",
      simplifiedInterface: "Simplified Interface",
    },
    catalan: {
      paymentSoon: "Subscripció disponible aviat",
      subscription: {
        title: "Subscriure's a un pla",
        subtitle: "Tria una subscripció per donar suport a {{artistName}}",

        button: {
          continue: "Continuar",
          redirecting: "Redirigint...",
        },

        message: {
          redirecting: "Redirigint a la pàgina de pagament...",
          paymentFailed: "El pagament ha fallat. Torna-ho a provar.",
          success: "Pagament realitzat amb èxit!",
        },

        payment: {
          stripe: "Targeta bancària (Stripe)",
          lygos: "Mobile Money (Lygos)",
        },

        plans: {
          monthly: {
            label: "Subscripció mensual",
            features: [
              "Accés a llançaments exclusius",
              "Escolta anticipada",
              "Contingut exclusiu per a fans",
              "Suport estàndard",
            ],
          },
          quarterly: {
            label: "Subscripció trimestral",
            features: [
              "Tots els avantatges mensuals",
              "Contingut premium exclusiu",
              "Accés a directes privats",
              "Descàrregues limitades",
              "Suport prioritari",
            ],
          },
          annual: {
            label: "Subscripció anual",
            features: [
              "Tots els avantatges trimestrals",
              "Accés il·limitat a contingut premium",
              "Descàrregues il·limitades",
              "Trobades virtuals amb l’artista",
              "Insígnia de Fan VIP",
              "Suport VIP",
            ],
          },
        },
      },
      loading: "Carregant...",
      track: "Pista",
      refresh: "Actualitzar",
      loadingTracks: "Carregant pistes...",
      loadingError: "Error en carregar",
      retry: "Torna-ho a provar",
      noTracksFound: "Cap pista trobada",
      tryAnother: "Prova una altra",
      close: "Tancar",
      clear: "Netejar",
      errors: {
        generic:
          "Alguna cosa ha anat malament. Si us plau, torna-ho a provar més tard.",
      },
      title: "Música Per a Tothom",
      discover: "Descobrir",
      myMusic: "La Meva Música",
      artists: "Artistes",
      search: "Cercar música, artistes...",
      featured: "Destacats",
      newReleases: "Nous Llançaments",

      subscribe: "Subscriure's",
      play: "Reproduir",
      pause: "Pausar",
      addToFavorites: "Afegir a favorits",
      streams: "reproduccions",
      subscribers: "subscriptors",
      back: "Tornar",
      nowPlaying: "Reproduint ara",
      duration: "Durada",
      lyrics: "Lletra",
      textLyrics: "Lletra en Text",
      signLanguage: "Llengua de Signes",
      editorPlaylists: "Playlists dels Editors",
      addToPlaylist: "Afegir a Playlist",
      createPlaylist: "Crear Playlist",
      playlistName: "Nom de la Playlist",
      create: "Crear",
      cancel: "Cancel·lar",
      yourPlaylists: "Les Teves Playlists",
      sortAlphabetically: "Ordenar Alfabèticament",
      songs: "cançons",
      noSongs: "No hi ha cançons en aquesta playlist",
      addedToPlaylist: "Afegit a la playlist",
      favorites: "Favorits",
      addedToFavorites: "Afegit a favorits",
      removedFromFavorites: "Eliminat de favorits",
      accessibility: "Accessibilitat",
      dashboard: "Tauler",
      mySubscriptions: "Les Meves Subscripcions",
      exclusiveGifts: "Regals Exclusius",
      subscriptionStats: "Estadístiques",
      totalSubscriptions: "Subscripcions Totals",
      totalGifts: "Regals Totals",
      unsubscribe: "Cancel·lar Subscripció",
      subscribed: "Subscrit",
      claimGift: "Reclamar Regal",
      claimed: "Reclamat",
      noSubscriptions: "Encara no estàs subscrit a cap artista",
      noGifts: "No hi ha regals exclusius disponibles",
      exploreArtists: "Explorar Artistes",
      giftFrom: "Regal de",
      subscribedOn: "Subscrit des de",
      visualAccessibility: "Accessibilitat Visual",
      hearingAccessibility: "Accessibilitat Auditiva",
      motorAccessibility: "Accessibilitat Motora",
      cognitiveAccessibility: "Accessibilitat Cognitiva",
      fontSize: "Mida de Font",
      small: "Petit",
      medium: "Mitjà",
      large: "Gran",
      extraLarge: "Extra Gran",
      highContrast: "Alt Contrast",
      colorBlindMode: "Mode Daltònic",
      none: "Cap",
      protanopia: "Protanòpia (Vermell-Verd)",
      deuteranopia: "Deuteranòpia (Vermell-Verd)",
      tritanopia: "Tritanòpia (Blau-Groc)",
      reduceMotion: "Reduir Animacions",
      textToSpeech: "Text a Veu",
      captions: "Subtítols",
      visualNotifications: "Notificacions Visuals",
      largerTargets: "Botons Més Grans",
      keyboardNav: "Navegació per Teclat",
      voiceControl: "Control per Veu",
      dyslexiaFont: "Font per Dislèxia",
      focusMode: "Mode Focus",
      readingGuide: "Guia de Lectura",
      simplifiedInterface: "Interfície Simplificada",
    },
  };

  const text = content[language as keyof typeof content];

  const containerClasses = `fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#5A0B4D] via-[#4A1456] to-[#2D0E3E] overflow-hidden relative w-full
min-h-[100svh] md:min-h-screen
overflow-hidden
pt-[env(safe-area-inset-top)]
pb-[env(safe-area-inset-bottom)]
 ${
   fontSize === "large"
     ? "text-lg"
     : fontSize === "xl"
       ? "text-xl"
       : fontSize === "small"
         ? "text-sm"
         : ""
 } ${highContrast ? "contrast-150" : ""} ${dyslexiaFont ? "font-mono" : ""}`;

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
    token: string,
  ): { exp?: number; [key: string]: any } | null {
    try {
      const [, payloadBase64] = token.split(".");
      if (!payloadBase64) return null;

      const payloadJson = atob(
        payloadBase64.replace(/-/g, "+").replace(/_/g, "/"),
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
      className={`${containerClasses} 
        relative w-full
        min-h-[100svh] md:min-h-screen
        overflow-hidden
        bg-gradient-to-br from-[#5A0B4D] via-[#4A1456] to-[#2D0E3E]
        text-white
        bg-cover bg-center bg-fixed
      `}
      style={{
        backgroundImage:
          'url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter:
          colorBlindMode === "protanopia"
            ? "url(#protanopia)"
            : colorBlindMode === "deuteranopia"
              ? "url(#deuteranopia)"
              : colorBlindMode === "tritanopia"
                ? "url(#tritanopia)"
                : "none",
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
        {/* Keyboard Navigation Hints */}
        {keyboardNav && !showAccessibility && (
          <div
            className="fixed right-4 z-40 bg-black/80 backdrop-blur-md border border-white/30 rounded-xl p-3 text-[11px] text-white/80"
            style={{ bottom: "calc(env(safe-area-inset-bottom) + 20px)" }}
          >
            <div className="space-y-1">
              <div>
                <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                  ESC
                </kbd>{" "}
                {language === "spanish"
                  ? "Volver"
                  : language === "english"
                    ? "Back"
                    : "Tornar"}
              </div>
              <div>
                <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                  SPACE
                </kbd>{" "}
                {language === "spanish"
                  ? "Play/Pausa"
                  : language === "english"
                    ? "Play/Pause"
                    : "Play/Pausa"}
              </div>
              <div>
                <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                  Ctrl+A
                </kbd>{" "}
                {text.accessibility}
              </div>
            </div>
          </div>
        )}
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
                      ),
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
                      "signup",
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
              {/* <AccessibilityButton language={language} />  */}
              <button
                onClick={() => setShowAccessibility(true)}
                aria-label={text.accessibility}
                title={text.accessibility}
                type="button"
                className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full shadow-md transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 select-none"
                style={{
                  background: "rgba(168, 85, 145, 0.4)",
                  backdropFilter: "blur(10px)",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)",
                  }}
                />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute top-1/2 left-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-x-1/2 -translate-y-1/2 text-white"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="5" r="2.5" />
                  <line x1="12" y1="7.5" x2="12" y2="14" />
                  <line x1="12" y1="9.5" x2="8" y2="12" />
                  <line x1="12" y1="9.5" x2="16" y2="12" />
                  <line x1="12" y1="14" x2="9" y2="19" />
                  <line x1="12" y1="14" x2="15" y2="19" />
                </svg>
              </button>
              {/* Language Pills */}
              <div
                className="flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/10"
                role="group"
                aria-label="Language selection"
              >
                {(["spanish", "english", "catalan"] as Language[]).map(
                  (lang) => (
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
                  ),
                )}
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

        {/* Accessibility Panel */}
        {showAccessibility && (
          <div
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-title"
            onMouseDown={() => setShowAccessibility(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
              className="absolute inset-x-0 mx-auto w-[min(700px,calc(100%-1.5rem))] sm:w-[min(700px,calc(100%-2rem))] top-[calc(env(safe-area-inset-top)+0.75rem)] bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] bg-black/80 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl overflow-hidden flex flex-col"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-xl border-b border-white/20">
                <div className="flex items-center justify-between gap-2 p-3 sm:p-4">
                  <h2
                    id="accessibility-title"
                    className="text-base sm:text-lg text-white drop-shadow-lg flex items-center gap-2"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                    {text.accessibility}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowAccessibility(false)}
                    className="rounded-lg p-1.5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    aria-label="Close accessibility panel"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <div className="px-3 sm:px-4 pb-2 text-white/50 text-[11px]">
                  {language === "english"
                    ? "Tip: Tap outside to close."
                    : language === "spanish"
                      ? "Consejo: toca fuera para cerrar."
                      : "Consell: toca fora per tancar."}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-sm sm:text-base text-white drop-shadow flex items-center gap-1.5">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        {text.visualAccessibility}
                      </h3>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                        <label className="text-white/90 mb-2 block text-xs sm:text-sm">
                          {text.fontSize}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                          {(["small", "medium", "large", "xl"] as const).map(
                            (size) => (
                              <button
                                key={size}
                                type="button"
                                onClick={() => setFontSize(size)}
                                className={`px-3 py-1.5 rounded-lg transition-all text-xs ${
                                  fontSize === size
                                    ? "bg-white/30 text-white"
                                    : "bg-white/10 text-white/70 hover:bg-white/20"
                                }`}
                              >
                                {text[size === "xl" ? "extraLarge" : size]}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2v20" />
                          </svg>
                          <span className="text-white/90 text-xs sm:text-sm">
                            {text.highContrast}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setHighContrast(!highContrast)}
                          className={`w-12 h-7 rounded-full transition-all ${
                            highContrast ? "bg-green-500" : "bg-white/20"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              highContrast ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                        <label className="text-white/90 mb-2 block text-xs sm:text-sm">
                          {text.colorBlindMode}
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {(
                            [
                              "none",
                              "protanopia",
                              "deuteranopia",
                              "tritanopia",
                            ] as const
                          ).map((mode) => (
                            <button
                              key={mode}
                              type="button"
                              onClick={() => setColorBlindMode(mode)}
                              className={`px-3 py-1.5 rounded-lg transition-all text-xs ${
                                colorBlindMode === mode
                                  ? "bg-white/30 text-white"
                                  : "bg-white/10 text-white/70 hover:bg-white/20"
                              }`}
                            >
                              {text[mode]}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                          <span className="text-white/90 text-xs sm:text-sm">
                            {text.reduceMotion}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setReduceMotion(!reduceMotion)}
                          className={`w-12 h-7 rounded-full transition-all ${
                            reduceMotion ? "bg-green-500" : "bg-white/20"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              reduceMotion ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M4 7V4h16v3" />
                            <path d="M9 20h6" />
                            <path d="M12 4v16" />
                          </svg>
                          <span className="text-white/90 text-xs sm:text-sm">
                            {text.dyslexiaFont}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setDyslexiaFont(!dyslexiaFont)}
                          className={`w-12 h-7 rounded-full transition-all ${
                            dyslexiaFont ? "bg-green-500" : "bg-white/20"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              dyslexiaFont ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-sm sm:text-base text-white drop-shadow flex items-center gap-1.5">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                          <line x1="12" y1="19" x2="12" y2="22" />
                        </svg>
                        {text.hearingAccessibility}
                      </h3>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="M8 10h.01" />
                            <path d="M12 10h.01" />
                            <path d="M16 10h.01" />
                            <path d="M8 14h8" />
                          </svg>
                          <div>
                            <span className="text-white/90 block text-xs sm:text-sm">
                              {text.captions}
                            </span>
                            <span className="text-white/50 text-[11px]">
                              {text.signLanguage}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowCaptions(!showCaptions)}
                          className={`w-12 h-7 rounded-full transition-all ${
                            showCaptions ? "bg-green-500" : "bg-white/20"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              showCaptions ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                          </svg>
                          <span className="text-white/90 text-xs sm:text-sm">
                            {text.visualNotifications}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setVisualNotifications(!visualNotifications)
                          }
                          className={`w-12 h-7 rounded-full transition-all ${
                            visualNotifications ? "bg-green-500" : "bg-white/20"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              visualNotifications
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                          </svg>
                          <span className="text-white/90 text-xs sm:text-sm">
                            {text.textToSpeech}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setTextToSpeech(!textToSpeech)}
                          className={`w-12 h-7 rounded-full transition-all ${
                            textToSpeech ? "bg-green-500" : "bg-white/20"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              textToSpeech ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 bg-black/70 px-3 sm:px-4 py-2 text-[11px] text-white/50">
                {language === "english"
                  ? "Changes are applied instantly."
                  : language === "spanish"
                    ? "Los cambios se aplican al instante."
                    : "Els canvis s'apliquen a l'instant."}
              </div>
            </div>
          </div>
        )}

        {/* CONTENU PRINCIPAL */}
        <main
          className="flex-1 w-full overflow-y-auto 
          overscroll-contain px-4 sm:px-6 lg:px-8 pb-6"
          role="main"
        >
          <div
            className="relative w-full max-w-2xl mx-auto
          flex flex-col sm:flex-row items-center gap-6 md:gap-5"
          >
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

            <div
              className="relative z-10 
            w-full max-w-2xl mt-2 flex-row md:mt-4"
            >
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
                                      videos.length - 1,
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
