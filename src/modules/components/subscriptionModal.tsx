import React, { useEffect, useState } from "react";

type ConfirmResult =
  | { ok: true; message?: string }
  | { ok: false; message: string };

type SubscriptionModalProps = {
  language: string;
  text: { cancel: string };

  showSubscriptionModal: boolean;
  selectedArtistForSubscription: any | null;

  // ✅ Option A: le parent peut retourner un résultat OU throw
  handleConfirmSubscription: () => Promise<void | ConfirmResult> | void;
  onClose: () => void;

  artistPlans: any[];
  plansLoading: boolean;
  plansError: string;

  selectedPlanId: string;
  setSelectedPlanId: (planId: string) => void;
};

// ✅ Simple check icon (sans lucide)
const CheckCircle2 = ({ size = 16, className = "" }) => (
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const Spinner = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
      opacity="0.25"
    />
    <path
      d="M22 12a10 10 0 0 1-10 10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

function formatPrice(p: any) {
  const value = typeof p?.price === "string" ? p.price : String(p?.price ?? "");
  const currency = (p?.currency ?? "EUR").toUpperCase();
  const symbol =
    currency === "EUR" ? "€" : currency === "USD" ? "$" : `${currency} `;
  return `${symbol}${value}`;
}

function cycleLabel(language: string, billingCycle?: string) {
  const v = String(billingCycle ?? "").toLowerCase();

  const map = {
    english: { monthly: "/month", quarterly: "/3 months", annual: "/year" },
    spanish: { monthly: "/mes", quarterly: "/3 meses", annual: "/año" },
    catalan: { monthly: "/mes", quarterly: "/3 mesos", annual: "/any" },
  } as const;

  const dict = map[language as keyof typeof map] ?? map.english;

  if (v === "monthly") return dict.monthly;
  if (v === "quarterly") return dict.quarterly;
  if (v === "annual") return dict.annual;
  return "";
}

function getDefaultFeatures(language: string, plan: any) {
  const cycle = String(plan?.billingCycle ?? "").toLowerCase();

  const base =
    language === "spanish"
      ? [
          "Acceso a contenido exclusivo",
          "Soporte por email",
          "Cancelación fácil",
        ]
      : language === "catalan"
      ? ["Accés a contingut exclusiu", "Suport per email", "Cancel·lació fàcil"]
      : ["Access to exclusive content", "Email support", "Easy cancellation"];

  const extra =
    cycle === "monthly"
      ? language === "spanish"
        ? ["Facturación mensual", "Renovación automática"]
        : language === "catalan"
        ? ["Facturació mensual", "Renovació automàtica"]
        : ["Monthly billing", "Auto-renew"]
      : cycle === "quarterly"
      ? language === "spanish"
        ? ["Facturación trimestral", "Mejor valor que mensual"]
        : language === "catalan"
        ? ["Facturació trimestral", "Millor valor que mensual"]
        : ["Quarterly billing", "Better value vs monthly"]
      : cycle === "annual"
      ? language === "spanish"
        ? ["Facturación anual", "Mejor precio del año"]
        : language === "catalan"
        ? ["Facturació anual", "Millor preu de l'any"]
        : ["Annual billing", "Best yearly price"]
      : [];

  const backendFeatures = Array.isArray(plan?.features) ? plan.features : null;
  return backendFeatures?.length ? backendFeatures : [...base, ...extra];
}

function getUiText(language: string) {
  const t = {
    english: {
      title: "Subscription",
      choosePlan: "Choose a plan",
      continue: "Continue to payment",
      redirecting: "Redirecting…",
      selectingHint: "Select a plan to continue.",
      noPlans: "No plans available",
      selected: "Selected",
      choose: "Choose",
      selectThis: "Select this plan",
      // messages
      genericError: "Checkout failed",
      beforeRedirect: "Redirecting to payment…",
    },
    spanish: {
      title: "Suscripción",
      choosePlan: "Elige un plan",
      continue: "Continuar con el pago",
      redirecting: "Redirigiendo…",
      selectingHint: "Selecciona un plan para continuar.",
      noPlans: "No hay planes disponibles",
      selected: "Seleccionado",
      choose: "Elegir",
      selectThis: "Elegir este plan",
      genericError: "Error al iniciar el pago",
      beforeRedirect: "Redirigiendo al pago…",
    },
    catalan: {
      title: "Subscripció",
      choosePlan: "Tria un pla",
      continue: "Continuar amb el pagament",
      redirecting: "Redirigint…",
      selectingHint: "Selecciona un pla per continuar.",
      noPlans: "No hi ha plans disponibles",
      selected: "Seleccionat",
      choose: "Triar",
      selectThis: "Triar aquest pla",
      genericError: "Error en iniciar el pagament",
      beforeRedirect: "Redirigint al pagament…",
    },
  } as const;

  return t[language as keyof typeof t] ?? t.english;
}

export function SubscriptionModal({
  language,
  text,
  showSubscriptionModal,
  selectedArtistForSubscription,
  handleConfirmSubscription,
  onClose,
  artistPlans,
  plansLoading,
  plansError,
  selectedPlanId,
  setSelectedPlanId,
}: SubscriptionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ reset state when modal closes / reopens
  useEffect(() => {
    if (!showSubscriptionModal) {
      setIsSubmitting(false);
      setSuccessMessage("");
      setErrorMessage("");
    }
  }, [showSubscriptionModal]);

  const ui = getUiText(language);

  const subtitle =
    language === "spanish"
      ? `Elige un plan para suscribirte a ${
          selectedArtistForSubscription?.name ?? ""
        }`
      : language === "catalan"
      ? `Tria un pla per subscriure't a ${
          selectedArtistForSubscription?.name ?? ""
        }`
      : `Choose a plan to subscribe to ${
          selectedArtistForSubscription?.name ?? ""
        }`;

  if (!showSubscriptionModal || !selectedArtistForSubscription) return null;

  const canSubmit =
    !!selectedPlanId && !plansLoading && !plansError && !isSubmitting;

  const onConfirmClick = async () => {
    if (!canSubmit) return;

    try {
      setIsSubmitting(true);
      setSuccessMessage("");
      setErrorMessage("");

      // ✅ (optionnel) message avant redirect
      setSuccessMessage(ui.beforeRedirect);

      const res = await Promise.resolve(handleConfirmSubscription());

      // ✅ si le parent retourne un résultat structuré
      if (res && typeof res === "object" && "ok" in res) {
        if (res.ok) {
          if (res.message) setSuccessMessage(res.message);
          // si pas de redirect, tu peux remettre isSubmitting=false
          setIsSubmitting(false);
        } else {
          setErrorMessage(res.message);
          setSuccessMessage("");
          setIsSubmitting(false);
        }
        return;
      }

      // ✅ si la fonction ne retourne rien (comme ton cas avec redirect)
      // on laisse le spinner: la page va changer
    } catch (e: any) {
      setSuccessMessage("");
      setErrorMessage(e?.message || ui.genericError);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[90] p-4">
      <div className="bg-black/80 backdrop-blur-xl rounded-3xl border border-white/20 p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h3 className="text-2xl text-white drop-shadow mb-1">{ui.title}</h3>
            <p className="text-white/60 text-sm">{subtitle}</p>
          </div>

          <button
            onClick={() => {
              if (isSubmitting) return; // évite de fermer pendant redirect
              onClose();
            }}
            className={`text-white/60 hover:text-white transition-colors flex-shrink-0 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Close"
            disabled={isSubmitting}
          >
            <svg
              width="26"
              height="26"
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

        {/* Plan selector */}
        <div className="mb-6">
          <p className="text-white/80 text-sm mb-3">{ui.choosePlan}</p>

          {plansLoading ? (
            <div className="text-white/60 text-sm bg-white/10 border border-white/20 rounded-2xl p-4">
              Loading plans...
            </div>
          ) : plansError ? (
            <div className="text-white/80 text-sm bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
              {plansError}
            </div>
          ) : !artistPlans?.length ? (
            <div className="text-white/70 text-sm bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
              {ui.noPlans}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {artistPlans.map((p: any) => {
                const isSelected = selectedPlanId === String(p.id);
                const features = getDefaultFeatures(language, p);

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      if (isSubmitting) return;
                      setSelectedPlanId(String(p.id));
                      // ✅ reset messages on plan change (optionnel)
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    disabled={isSubmitting}
                    className={[
                      "text-left rounded-2xl border p-6 transition-all",
                      "bg-white/10 hover:bg-white/15",
                      isSubmitting
                        ? "cursor-not-allowed opacity-70"
                        : "cursor-pointer",
                      isSelected
                        ? "border-white/40 ring-2 ring-white/30"
                        : "border-white/15",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <h4 className="text-xl font-semibold text-white drop-shadow truncate">
                          {p.name ?? "Plan"}
                        </h4>
                        <p className="text-white/60 text-xs mt-1">
                          {p.description ?? ""}
                        </p>
                      </div>

                      <div
                        className={[
                          "px-3 py-1 rounded-full text-xs border",
                          isSelected
                            ? "bg-white/20 border-white/30 text-white"
                            : "bg-white/10 border-white/15 text-white/70",
                        ].join(" ")}
                      >
                        {isSelected ? ui.selected : ui.choose}
                      </div>
                    </div>

                    <div className="flex items-end justify-between mb-4">
                      <p className="text-3xl font-bold text-white drop-shadow">
                        {formatPrice(p)}
                        <span className="text-sm font-medium text-white/70 ml-2">
                          {cycleLabel(language, p.billingCycle)}
                        </span>
                      </p>
                    </div>

                    <ul className="space-y-2">
                      {features
                        .slice(0, 5)
                        .map((feature: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-white/80"
                          >
                            <CheckCircle2
                              size={16}
                              className="text-white/80 mt-0.5"
                            />
                            <span className="leading-snug">{feature}</span>
                          </li>
                        ))}
                    </ul>

                    <div className="mt-5">
                      <div
                        className={[
                          "w-full text-center text-sm py-2.5 rounded-xl border transition-all",
                          isSelected
                            ? "bg-white/25 border-white/30 text-white"
                            : "bg-white/15 border-white/15 text-white/80",
                        ].join(" ")}
                      >
                        {ui.selectThis}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Hint */}
        {!plansLoading && !plansError && (
          <p className="text-white/50 text-xs mb-4">{ui.selectingHint}</p>
        )}

        {/* ✅ Success / Error messages (comme ton Login) */}
        {successMessage && (
          <p className="mb-4 text-sm text-green-400">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mb-4 text-sm text-center text-red-400">
            {errorMessage}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => {
              if (isSubmitting) return;
              onClose();
            }}
            disabled={isSubmitting}
            className="flex-1 px-5 py-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all border border-white/15 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {text.cancel}
          </button>

          <button
            type="button"
            onClick={onConfirmClick}
            disabled={!canSubmit}
            className="flex-1 px-5 py-3 bg-white/25 rounded-xl text-white hover:bg-white/35 transition-all border border-white/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Spinner size={18} className="text-white animate-spin" />
                <span>{ui.redirecting}</span>
              </span>
            ) : (
              ui.continue
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
