import React, { useEffect, useState } from "react";

type ConfirmResult =
  | { ok: true; message?: string }
  | { ok: false; message: string };

type SubscriptionModalProps = {
  text: any;

  showSubscriptionModal: boolean;
  selectedArtistForSubscription: any | null;

  handleConfirmSubscriptionStripe: () => Promise<void | ConfirmResult> | void;
  handleConfirmSubscriptionLygos: () => Promise<void | ConfirmResult> | void;

  onClose: () => void;
  artistPlans: any[];
  plansLoading: boolean;
  plansError: string;
  selectedPlanId: string;
  setSelectedPlanId: (planId: string) => void;
};

export function SubscriptionModal({
  text,
  showSubscriptionModal,
  selectedArtistForSubscription,
  handleConfirmSubscriptionStripe,
  handleConfirmSubscriptionLygos,
  onClose,
  artistPlans,
  plansLoading,
  plansError,
  selectedPlanId,
  setSelectedPlanId,
}: SubscriptionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "lygos">(
    "stripe"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!showSubscriptionModal) {
      setIsSubmitting(false);
      setSuccessMessage("");
      setErrorMessage("");
    }
  }, [showSubscriptionModal]);

  useEffect(() => {
    if (artistPlans.length === 0) setLoading(true);
    else setLoading(false);
  }, [artistPlans.length]);

  const canSubmit =
    !!selectedPlanId && !plansLoading && !plansError && !isSubmitting;

  const PLAN_ACCESS: Record<
    string,
    {
      label: string;
      features: string[];
    }
  > = {
    Monthly: {
      label: text.subscription.plans.monthly.label,
      features: text.subscription.plans.monthly.features,
    },
    Quarterly: {
      label: text.subscription.plans.quarterly.label,
      features: text.subscription.plans.quarterly.features,
    },
    Annual: {
      label: text.subscription.plans.annual.label,
      features: text.subscription.plans.annual.features,
    },
  };

  const onConfirmClick = async () => {
    if (!canSubmit) return;

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const handler =
        paymentMethod === "stripe"
          ? handleConfirmSubscriptionStripe
          : handleConfirmSubscriptionLygos;

      setSuccessMessage(text.subscription.message.redirecting);

      const res = await Promise.resolve(handler());

      if (res && typeof res === "object" && "ok" in res) {
        if (res.ok) {
          if (res.message) setSuccessMessage(res.message);
          setIsSubmitting(false);
        } else {
          setErrorMessage(res.message);
          setSuccessMessage("");
          setIsSubmitting(false);
        }
        return;
      }
    } catch (e: any) {
      console.error("Subscription payment error:", e);
      setSuccessMessage("");
      setErrorMessage(text.subscription.message.paymentFailed);
      setIsSubmitting(false);
    }
  };

  if (!showSubscriptionModal || !selectedArtistForSubscription) return null;

  return (
    <div
      className="
        fixed inset-0 z-[90]
        bg-black/50 backdrop-blur-sm
        flex items-end sm:items-center justify-center
        p-0 sm:p-6
        [padding-top:env(safe-area-inset-top)]
        [padding-bottom:env(safe-area-inset-bottom)]
      "
    >
      <div
        className="
          bg-black/80 backdrop-blur-xl
          rounded-t-3xl sm:rounded-3xl
          border border-white/20
          shadow-2xl
          w-full
          max-w-none sm:max-w-xl md:max-w-2xl
          mx-0 sm:mx-4
          max-h-[85svh] sm:max-h-[90vh]
          overflow-y-auto overscroll-contain
          p-5 sm:p-8
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5 sm:mb-6">
          <div className="min-w-0">
            <h3 className="text-xl sm:text-2xl text-white drop-shadow mb-1">
              {text.subscription.title || ""}
            </h3>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              {text.subscription.subtitle.replace(
                "{{artistName}}",
                selectedArtistForSubscription.name
              )}
            </p>
          </div>

          <button
            onClick={() => {
              if (isSubmitting) return;
              onClose();
            }}
            className={`cursor-pointer text-white/60 hover:text-white transition-colors flex-shrink-0 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Payment Method */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
          <button
            type="button"
            className={`cursor-pointer py-2 sm:py-2.5 rounded-xl border transition ${
              paymentMethod === "stripe"
                ? "bg-white/25 border-white ring-1 text-white"
                : "bg-white/10 border-white/30 text-white/70"
            }`}
            onClick={() => setPaymentMethod("stripe")}
          >
            {text.subscription.payment.stripe}
          </button>
          <button
            type="button"
            className={`cursor-pointer py-2 sm:py-2.5 rounded-xl border transition ${
              paymentMethod === "lygos"
                ? "bg-white/25 border-white ring-1 text-white"
                : "bg-white/10 border-white/30 text-white/70"
            }`}
            onClick={() => setPaymentMethod("lygos")}
          >
            {text.subscription.payment.lygos}
          </button>
        </div>

        {loading && (
          <div className="text-white text-base text-center py-3">
            <p>Loading...</p>
          </div>
        )}

        {/* Plan selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
          {artistPlans.map((p: any) => {
            const isSelected = selectedPlanId === String(p.id);
            const access = PLAN_ACCESS[p.name];

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPlanId(String(p.id))}
                className={`cursor-pointer p-4 rounded-xl border text-left transition ${
                  isSelected
                    ? "border-white ring-2 ring-white bg-white/15"
                    : "border-white/15 bg-white/10"
                }`}
              >
                <h4 className="text-white font-semibold text-base sm:text-lg">
                  {p.name}
                </h4>
                <p className="text-white/70 text-xs sm:text-sm mb-3 leading-relaxed">
                  {p.description}
                </p>

                {/* Price */}
                <p className="text-white/90 font-semibold mb-3 text-sm sm:text-base">
                  {p.price} {p.currency} / {access?.label}
                </p>

                {/* Access list */}
                <ul className="space-y-1 text-xs sm:text-sm text-white/80">
                  {access?.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-green-400">✔</span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {successMessage && (
          <p className="text-green-400 mb-2 text-sm">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-400 mb-2 text-sm">{errorMessage}</p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="cursor-pointer flex-1 px-5 py-3 bg-white/10 rounded-xl text-white hover:bg-white/20 border border-white/15 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {text.cancel}
          </button>

          <button
            type="button"
            onClick={onConfirmClick}
            disabled={!canSubmit}
            className="cursor-pointer flex-1 px-5 py-3 bg-white/25 rounded-xl text-white hover:bg-white/35 border border-white/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? text.subscription.button.redirecting
              : text.subscription.button.continue}
          </button>
        </div>
      </div>
    </div>
  );
}
