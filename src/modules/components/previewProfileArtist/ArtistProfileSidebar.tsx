import { Star, X } from "lucide-react";
import { MusicPlayer } from "./MusicPlayer";
import {
  SubscriptionModuleObject as ModuleObject,
  SubscriptionModuleObject,
} from "@/modules/subscription/module";
import { useEffect, useState } from "react";
import { PlanModuleObject } from "@/modules/plan/module";
import { LygosModuleObject } from "../lygos/module";
import { StripeModuleObject } from "../stripe/module";
import { SubscriptionModal } from "../subscriptionModal";

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
    videoIntroUrl?: string;
    previewSong?: {
      title: string;
      duration: string;
      audioUrl?: string;
    };
  } | null;
  isSubscribed?: boolean;
  onSubscribe?: () => void;
  onUnsubscribe?: () => void;
}

export function ArtistProfileSidebar({
  isOpen,
  onClose,
  artist,
  isSubscribed = false,
  onSubscribe,
  onUnsubscribe,
}: ArtistProfileSidebarProps) {
  if (!isOpen || !artist) return null;
  const content = {
    english: {
      errors: {
        generic: "Something went wrong. Please try again later.",
      },
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
      artistProfile: "Artist Profile",
      subscriptionAvailable: "Subscription available",
      noSubscriptionPlan: "No active subscription plan",
      subscribers: "subscribers",
      active: "active",
      subscribe: "Subscribe",
      subscribed: "Subscribed",
      unsubscribe: "Unsubscribe",
      paymentSoon: "Payment coming soon",
      subscribedHint: "You are subscribed to this artist.",
      subscribeHint: "Subscribe to access exclusive content.",
      bio: "Bio",
      noBio: "No bio available yet.",
      featuredVideo: "Featured Video",
      noVideo: "No video available",
      genres: "Genres",
      previewSong: "Preview Song",
      sampleTrack: "Sample Track",
      noPreview: "No preview audio provided.",
      playPreview: "Play preview",
      noAudioPreview: "No audio preview",
      cancel: "Cancel",
    },

    spanish: {
      errors: {
        generic: "Algo salió mal. Por favor, inténtalo de nuevo.",
      },
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
      artistProfile: "Perfil del artista",
      subscriptionAvailable: "Suscripción disponible",
      noSubscriptionPlan: "No hay un plan de suscripción activo",
      subscribers: "suscriptores",
      active: "activos",
      subscribe: "Suscribirse",
      subscribed: "Suscrito",
      unsubscribe: "Darse de baja",
      paymentSoon: "Pago próximamente",
      subscribedHint: "Estás suscrito a este artista.",
      subscribeHint: "Suscríbete para acceder a contenido exclusivo.",
      bio: "Biografía",
      noBio: "No hay biografía disponible.",
      featuredVideo: "Video destacado",
      noVideo: "No hay video disponible",
      genres: "Géneros",
      previewSong: "Canción de muestra",
      sampleTrack: "Pista de muestra",
      noPreview: "No se proporcionó una vista previa de audio.",
      playPreview: "Reproducir muestra",
      noAudioPreview: "No hay vista previa de audio",
      cancel: "Cancelar",
    },

    catalan: {
      errors: {
        generic: "Alguna cosa ha anat malament. Torna-ho a provar més tard.",
      },
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
      artistProfile: "Perfil de l’artista",
      subscriptionAvailable: "Subscripció disponible",
      noSubscriptionPlan: "No hi ha cap pla de subscripció actiu",
      subscribers: "subscriptors",
      active: "actius",
      subscribe: "Subscriure’s",
      subscribed: "Subscrit",
      unsubscribe: "Cancel·lar subscripció",
      paymentSoon: "Pagament aviat disponible",
      subscribedHint: "Estàs subscrit a aquest artista.",
      subscribeHint: "Subscriu-te per accedir a contingut exclusiu.",
      bio: "Biografia",
      noBio: "Encara no hi ha biografia disponible.",
      featuredVideo: "Vídeo destacat",
      noVideo: "No hi ha cap vídeo disponible",
      genres: "Gèneres",
      previewSong: "Cançó de mostra",
      sampleTrack: "Pista de mostra",
      noPreview: "No s’ha proporcionat cap vista prèvia d’àudio.",
      playPreview: "Reproduir mostra",
      noAudioPreview: "No hi ha vista prèvia d’àudio",
      cancel: "Cancel·lar",
    },
  };

  const language =
    typeof window !== "undefined"
      ? localStorage.getItem("language") || "english"
      : "english";

  const text = content[language as keyof typeof content] || content.english;

  const [artistPlans, setArtistPlans] = useState<any[]>([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [plansError, setPlansError] = useState<string>("");
  const [subscription, setSubscription] = useState<[] | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedArtistForSubscription, setSelectedArtistForSubscription] =
    useState<any | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [paymentOption, setPaymentOption] = useState<"card" | "paypal">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [subscribedArtists, setSubscribedArtists] = useState<string[]>([]);
  const [subscribingArtistId, setSubscribingArtistId] = useState<string | null>(
    null
  );

  const startSubscription = async (artist: any) => {
    setSelectedArtistForSubscription(artist);
    setShowSubscriptionModal(true);

    setArtistPlans([]);
    setSelectedPlanId("");
    setPlansError("");

    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) {
      setPlansError("Utilisateur non authentifié.");
      return;
    }

    try {
      setPlansLoading(true);

      const res: any = await PlanModuleObject.service.getPlansByArtist(
        String(artist.id),
        token
      );

      const plans = res.data ?? [];
      // filtre actifs + tri (monthly -> quarterly -> annual)
      const order = { monthly: 1, quarterly: 2, annual: 3 } as any;

      const normalized = plans
        .filter((p: any) => p.active)
        .sort(
          (a: any, b: any) =>
            (order[a.billingCycle] ?? 99) - (order[b.billingCycle] ?? 99)
        );

      setArtistPlans(normalized);

      // sélection par défaut: monthly si existe, sinon 1er
      const defaultPlan =
        normalized.find((p: any) => p.billingCycle === "monthly") ??
        normalized[0];

      if (defaultPlan?.id) setSelectedPlanId(String(defaultPlan.id));
    } catch (e: any) {
      console.error(e);
      setPlansError(text.errors.generic);
    } finally {
      setPlansLoading(false);
    }
  };

  const handleConfirmSubscriptionLygos = async () => {
    if (!selectedArtistForSubscription) throw new Error("No artist selected");

    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) throw new Error("Not authenticated");

    if (!selectedPlanId) throw new Error("Please select a plan.");

    // ✅ Récupérer les infos fan
    const userData = localStorage.getItem(ModuleObject.localState.USER_DATA);
    if (!userData) throw new Error("User data missing");
    const user = JSON.parse(userData);
    const email = user.email;
    const phone = "+237698114902";
    if (!email || !phone) throw new Error("User email or phone missing");

    // ✅ Récupérer le plan pour connaître le montant
    const selectedPlan = artistPlans.find((p) => p.id === selectedPlanId);
    if (!selectedPlan) throw new Error("Plan not found");
    const amount = Number(selectedPlan.price);

    try {
      setCheckoutLoading(true);

      const res = await LygosModuleObject.service.initializeSubscription(
        {
          artistId: String(selectedArtistForSubscription.id),
          planId: String(selectedPlanId),
          email,
          phone,
          amount,
        },
        token
      );

      const paymentUrl = res?.data?.redirectUrl ?? res?.data?.link ?? res?.url;
      if (!paymentUrl) throw new Error("Lygos payment url not returned");

      window.location.href = paymentUrl;
    } catch (e: any) {
      throw new Error(text.errors.generic);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleConfirmSubscriptionStripe = async () => {
    if (!selectedArtistForSubscription) throw new Error("No artist selected");

    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) throw new Error("Not authenticated");

    if (!selectedPlanId) throw new Error("Please select a plan.");

    try {
      setCheckoutLoading(true);

      const res =
        await StripeModuleObject.service.createSubscriptionCheckoutSession(
          {
            artistId: String(selectedArtistForSubscription.id),
            planId: String(selectedPlanId),
          },
          token
        );

      const url = res?.data?.url ?? res?.url;
      if (!url) throw new Error("Stripe checkout url not returned");

      window.location.href = url; // ✅ redirect
    } catch (e: any) {
      // IMPORTANT: rethrow pour que la modale puisse remettre isSubmitting=false
      throw new Error(text.errors.generic);
    } finally {
      setCheckoutLoading(false);
    }
  };

  async function toggleSubscription(artistId: string) {
    try {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) return;

      setSubscribingArtistId(artistId);

      const isSubscribed = subscribedArtists.includes(String(artistId));

      if (isSubscribed) {
        await SubscriptionModuleObject.service.unsubscribe(
          String(artistId),
          token
        );
        setSubscribedArtists((prev) =>
          prev.filter((id) => id !== String(artistId))
        );
      } else {
        // option: price/months selon ton business
        await SubscriptionModuleObject.service.subscribe(
          String(artistId),
          token,
          { months: 1, price: 0 }
        );
        setSubscribedArtists((prev) => [...prev, String(artistId)]);
      }
    } catch (e) {
      console.error("toggleSubscription error:", e);
    } finally {
      setSubscribingArtistId(null);
    }
  }

  async function fetchSubscription() {
    try {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      const userId = localStorage.getItem(ModuleObject.localState.USER_ID);
      if (!token || !userId) {
        setSubscription([]);
        return;
      }
      const res = await ModuleObject.service.getSubscriptionByUserAndArtist(
        userId,
        artist?.id!,
        token
      );
      const raw = res.data ?? [];
      setSubscription(raw);
    } catch (e) {
      console.error("fetchSubscription error:", e);
      setSubscription([]);
    } finally {
      setSubscription([]);
    }
  }

  useEffect(() => {
    if (!subscription) {
      fetchSubscription();
    }
    console.log("ARTIST - PROFILE : ", artist);
  }, [subscription]);

  const genresList =
    String(artist.genres ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean) || [];

  return (
    <>
      {/* Backdrop + Player */}
      <div
        className="fixed inset-0 z-40 bg-transparent"
        onClick={onClose}
        style={{
          backgroundImage:
            'url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Sidebar */}
      <div
        className="
                    fixed right-0 top-0 z-50
                    h-[100svh] sm:h-screen
                    w-[92vw] max-w-[480px]
                    bg-gradient-to-b from-[#3d1952] to-[#4a1f5c]
                    shadow-2xl
                    overflow-y-auto overscroll-contain
                    [padding-top:env(safe-area-inset-top)]
                    [padding-bottom:env(safe-area-inset-bottom)]
                  "
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="min-w-0">
              <h2 className="text-white text-xl sm:text-2xl font-medium truncate">
                {text.artistProfile}
              </h2>
              <p className="text-white/60 text-xs sm:text-sm truncate">
                {artist.hasActivePlan
                  ? text.subscriptionAvailable
                  : text.noSubscriptionPlan}
              </p>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="cursor-pointer text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
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
                {text.subscribers}
              </span>
              <span className="text-white/40">•</span>
              <span>
                <span className="text-white font-semibold">
                  {artist.activeSubscribers ?? 0}
                </span>{" "}
                {text.active}
              </span>
            </div>
          </div>

          {/* Subscribe / Unsubscribe */}
          <div className="mb-8">
            {!artist.hasActivePlan ? (
              <></>
            ) : subscription?.length !== 0 ? (
              <button
                type="button"
                onClick={onUnsubscribe}
                disabled={!onUnsubscribe}
                className="w-full px-4 py-3 rounded-xl bg-red-500/30 hover:bg-red-500/40 border border-red-400/30 text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {text.unsubscribe}
              </button>
            ) : (
              <button
                disabled={!artist.hasActivePlan}
                onClick={() => {
                  if (!artist.hasActivePlan) return;

                  subscribedArtists.includes(String(artist.id))
                    ? toggleSubscription(String(artist.id))
                    : startSubscription(artist);
                }}
                className={`cursor-pointer disabled:cursor-not-allowed w-full px-4 py-2 backdrop-blur-sm rounded-lg text-white transition-all flex items-center justify-center gap-2
                      ${
                        artist.hasActivePlan
                          ? subscribedArtists.includes(String(artist.id))
                            ? "bg-white/30 border border-white/40"
                            : "bg-white/20 hover:bg-white/30"
                          : "bg-white/10 text-white/60 cursor-not-allowed"
                      }`}
              >
                <Star
                  size={16}
                  className={
                    artist.hasActivePlan &&
                    subscribedArtists.includes(String(artist.id))
                      ? "fill-white"
                      : ""
                  }
                />
                {artist.hasActivePlan
                  ? subscribedArtists.includes(String(artist.id))
                    ? text.subscribed
                    : text.subscribe
                  : text.paymentSoon}
              </button>
            )}

            {artist.hasActivePlan && (
              <p className="text-white/50 text-xs mt-2 text-center">
                {isSubscribed ? text.subscribedHint : text.subscribeHint}
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="mb-8">
            <h4 className="text-white text-lg font-medium mb-3">{text.bio}</h4>
            <div className="bg-[#5a2772]/50 backdrop-blur-sm rounded-xl p-4 border border-[#7a3f91]/30 min-h-[120px]">
              <p className="text-gray-300 text-sm leading-relaxed">
                {artist.bio || text.noBio}
              </p>
            </div>
          </div>

          {/* Featured Video */}
          <div className="mb-8">
            <h4 className="text-white text-lg font-medium mb-3">
              {text.featuredVideo}
            </h4>

            <div className="bg-[#2d0e3d] rounded-xl overflow-hidden aspect-video border border-[#7a3f91]/30">
              {artist?.videoIntroUrl ? (
                <video
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover"
                  src={artist.videoIntroUrl}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-400 text-sm">{text.noVideo}</p>
                </div>
              )}
            </div>
          </div>

          {/* Genres */}
          <div className="mb-6">
            <h4 className="text-white text-lg font-medium mb-3">
              {text.genres}
            </h4>

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

          {/* Preview Song */}
          <div className="mb-6">
            <h4 className="text-white text-lg font-medium mb-3">
              {text.previewSong}
            </h4>

            <div className="bg-[#5a2772]/50 backdrop-blur-sm rounded-xl p-5 border border-[#7a3f91]/30">
              <div className="flex items-center gap-4 mb-3">
                <button
                  type="button"
                  className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={!artist.previewSong?.audioUrl}
                  title={
                    artist.previewSong?.audioUrl
                      ? text.playPreview
                      : text.noAudioPreview
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
                    {artist.previewSong?.title || text.sampleTrack}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {artist.previewSong?.duration || "—"}
                  </p>
                </div>
              </div>

              <div className="w-full h-1 bg-[#2d0e3d] rounded-full overflow-hidden">
                <div className="h-full bg-white w-0 transition-all duration-300" />
              </div>

              {!artist.previewSong?.audioUrl && (
                <p className="text-white/50 text-xs mt-3">{text.noPreview}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal
        text={text}
        showSubscriptionModal={showSubscriptionModal}
        selectedArtistForSubscription={selectedArtistForSubscription}
        handleConfirmSubscriptionStripe={handleConfirmSubscriptionStripe}
        handleConfirmSubscriptionLygos={handleConfirmSubscriptionLygos}
        artistPlans={artistPlans}
        plansLoading={plansLoading}
        plansError={plansError}
        selectedPlanId={selectedPlanId}
        setSelectedPlanId={setSelectedPlanId}
        onClose={() => {
          setShowSubscriptionModal(false);
          setSelectedArtistForSubscription(null);
          setCardNumber("");
          setCardHolder("");
          setCardExpiry("");
          setCardCvc("");
          setPaypalEmail("");
        }}
      />
    </>
  );
}
