"use client";

import React, { useEffect, useState } from "react";
import { X, Circle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

interface StickmanIconProps {
  className?: string;
  
}
// Stickman Accessibility Icon
function StickmanIcon({ className,
}: StickmanIconProps) {

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="5" r="2.5" />
      <line x1="12" y1="7.5" x2="12" y2="14" />
      <line x1="12" y1="9.5" x2="8" y2="12" />
      <line x1="12" y1="9.5" x2="16" y2="12" />
      <line x1="12" y1="14" x2="9" y2="19" />
      <line x1="12" y1="14" x2="15" y2="19" />
    </svg>
  );
}

type Language = string;

export function AccessibilityButton({ language }: { language: Language }) {
  const [isOpen, setIsOpen] = useState(false);

  const [keyboardNav, setKeyboardNav] = useState(false);
  const [largerButtons, setLargerButtons] = useState(false);
  const [voiceControl, setVoiceControl] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large" | "xl">(
     "medium"
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
     const [dyslexiaFont, setDyslexiaFont] = useState(false);
 
   useEffect(() => {
      if (!showAccessibility) return;
  
      const onKeyDown = (e: any) => {
        if (e.key === "Escape") setShowAccessibility(false);
      };
  
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [showAccessibility]);


  const text = {
    english: {
      aria: { open: "Accessibility options", close: "Close" },
      header: "Accessibility",
      keyboardNav: "Keyboard Navigation",
      largerButtons: "Larger Buttons",
      voiceControl: "Voice Control",
      voiceControlDesc: "Control the app with voice commands",
      cognitiveTitle: "Cognitive Accessibility",
      focusMode: "Focus Mode",
      focusModeDesc: "Reduce visual distractions",
      readingGuide: "Reading Guide",
      readingGuideDesc: "Guiding line for reading",
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

      title: "Bbok music with everybody",
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
      dyslexiaFont: "Dyslexia Font",
      simplifiedInterface: "Simplified Interface",
    },
    spanish: {
      dyslexiaFont: "Fuente para Dislexia",
      aria: { open: "Opciones de accesibilidad", close: "Cerrar" },
      header: "Accesibilidad",
      keyboardNav: "Navegación por Teclado",
      largerButtons: "Botones Más Grandes",
      voiceControl: "Control por Voz",
      voiceControlDesc: "Controla la aplicación con comandos de voz",
      cognitiveTitle: "Accesibilidad Cognitiva",
      focusMode: "Modo Enfoque",
      focusModeDesc: "Reduce las distracciones visuales",
      readingGuide: "Guía de Lectura",
      readingGuideDesc: "Línea guía para leer",
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
    catalan: {
      aria: { open: "Opcions d’accessibilitat", close: "Tancar" },
      header: "Accessibilitat",
      keyboardNav: "Navegació per Teclat",
      largerButtons: "Botons Més Grans",
      voiceControl: "Control per Veu",
      voiceControlDesc: "Controla l'aplicació amb comandes de veu",
      cognitiveTitle: "Accessibilitat Cognitiva",
      focusMode: "Mode Focus",
      focusModeDesc: "Redueix distraccions visuals",
      readingGuide: "Guia de Lectura",
      readingGuideDesc: "Línia guia per llegir",
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
      dyslexiaFont: "Font per Dislèxia",
      simplifiedInterface: "Interfície Simplificada",
    },
  };

  const content = text[language as keyof typeof text] || text.english;

  // ✅ Button size reduced
  const BUTTON_SIZE = 64; // h-16 w-16
  const MARGIN = 24;

  // ✅ Position: init bottom-right on client
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  // ✅ Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // ✅ Init bottom-right + update on resize
  useEffect(() => {
    const setBottomRight = () => {
      setPosition({
        x: window.innerWidth - BUTTON_SIZE - MARGIN,
        y: window.innerHeight - BUTTON_SIZE - MARGIN,
      });
    };

    setBottomRight();
    window.addEventListener("resize", setBottomRight);
    return () => window.removeEventListener("resize", setBottomRight);
  }, []);

  // Reading guide mouse tracking
  useEffect(() => {
    if (!readingGuide) return;

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty(
        "--reading-guide-position",
        `${e.clientY}px`
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [readingGuide]);

  // ✅ Only start dragging if user clicked the BUTTON (not the popover)
  const handleMouseDown = (e: React.MouseEvent) => {
    const clickedButton = (e.target as HTMLElement).closest(
      `button[aria-label="${content.aria.open}"]`
    );
    if (!clickedButton) return;

    const wrapper = e.currentTarget as HTMLElement;
    const rect = wrapper.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  // ✅ Drag listeners
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - dragOffset.x;
      const y = e.clientY - dragOffset.y;

      const maxX = window.innerWidth - BUTTON_SIZE;
      const maxY = window.innerHeight - BUTTON_SIZE;

      setPosition({
        x: Math.max(0, Math.min(x, maxX)),
        y: Math.max(0, Math.min(y, maxY)),
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const toggleKeyboardNav = (checked: boolean) => {
    setKeyboardNav(checked);
    document.documentElement.classList.toggle("keyboard-nav", checked);
  };

  const toggleLargerButtons = (checked: boolean) => {
    setLargerButtons(checked);
    document.documentElement.classList.toggle("larger-buttons", checked);
  };

  const toggleVoiceControl = (checked: boolean) => {
    setVoiceControl(checked);
    document.documentElement.classList.toggle("voice-control", checked);
  };

  const toggleFocusMode = (checked: boolean) => {
    setFocusMode(checked);
    document.documentElement.classList.toggle("focus-mode", checked);
  };

  const toggleReadingGuide = (checked: boolean) => {
    setReadingGuide(checked);
    document.documentElement.classList.toggle("reading-guide", checked);
  };

  if (!position) return null;

  return (
    <div
      className=""
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className="relative h-14 w-14 rounded-full shadow-2xl transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
            aria-label={content.aria.open}
            style={{
              background: "rgba(168, 85, 145, 0.4)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none",
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)",
              }}
            />
            <StickmanIcon  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-white" />
          </button>
        </PopoverTrigger>

        {/* ✅ Scrollable Popover */}
        <PopoverContent
          className="w-96 bg-black/95 border-gray-800 text-white backdrop-blur-xl max-h-[calc(100vh-120px)] flex flex-col"
          side="top"
          align="end"
          sideOffset={16}
        >
          {/* Sticky header */}
          <div className="sticky top-0 z-10 bg-black/95 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StickmanIcon className="h-5 w-5" />
                <h4 className="font-semibold text-lg">{content.header}</h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 hover:bg-white/10 transition-colors"
                aria-label={content.aria.close}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <Separator className="bg-gray-800 mt-3" />
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 pt-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50">
              <Label
                htmlFor="keyboard-nav"
                className="cursor-pointer text-base font-normal"
              >
                {content.keyboardNav}
              </Label>
              <Switch
                id="keyboard-nav"
                checked={keyboardNav}
                onCheckedChange={toggleKeyboardNav}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50">
              <Label
                htmlFor="larger-buttons"
                className="cursor-pointer text-base font-normal"
              >
                {content.largerButtons}
              </Label>
              <Switch
                id="larger-buttons"
                checked={largerButtons}
                onCheckedChange={toggleLargerButtons}
              />
            </div>

            <div className="space-y-2 p-3 rounded-lg bg-zinc-900/50">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="voice-control"
                  className="cursor-pointer text-base font-normal"
                >
                  {content.voiceControl}
                </Label>
                <Switch
                  id="voice-control"
                  checked={voiceControl}
                  onCheckedChange={toggleVoiceControl}
                />
              </div>
              <p className="text-sm text-gray-400">
                {content.voiceControlDesc}
              </p>
            </div>

            <Separator className="bg-gray-800" />

            <div className="flex items-center gap-2">
              <Circle className="h-5 w-5" />
              <h5 className="font-semibold text-base">
                {content.cognitiveTitle}
              </h5>
            </div>

            <div className="space-y-2 p-3 rounded-lg bg-zinc-900/50">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="focus-mode"
                  className="cursor-pointer text-base font-normal"
                >
                  {content.focusMode}
                </Label>
                <Switch
                  id="focus-mode"
                  checked={focusMode}
                  onCheckedChange={toggleFocusMode}
                />
              </div>
              <p className="text-sm text-gray-400">{content.focusModeDesc}</p>
            </div>

            <div className="space-y-2 p-3 rounded-lg bg-zinc-900/50">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="reading-guide"
                  className="cursor-pointer text-base font-normal"
                >
                  {content.readingGuide}
                </Label>
                <Switch
                  id="reading-guide"
                  checked={readingGuide}
                  onCheckedChange={toggleReadingGuide}
                />
              </div>
              <p className="text-sm text-gray-400">
                {content.readingGuideDesc}
              </p>
            </div>
          </div>

       
      
        </PopoverContent>
      </Popover>
    </div>
  );
}
