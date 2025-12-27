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

  useEffect(() => {
    if (!showSubscriptionModal) {
      setIsSubmitting(false);
      setSuccessMessage("");
      setErrorMessage("");
    }
  }, [showSubscriptionModal]);

  const canSubmit =
    !!selectedPlanId && !plansLoading && !plansError && !isSubmitting;

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[90] p-4">
      <div className="bg-black/80 backdrop-blur-xl rounded-3xl border border-white/20 p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl text-white drop-shadow mb-1">
              {text.subscription.title}
            </h3>
            <p className="text-white/60 text-sm">
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
            className={`text-white/60 hover:text-white transition-colors flex-shrink-0 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            ✕
          </button>
        </div>

        {/* Payment Method */}
        <div className="flex gap-4 mb-4">
          <button
            type="button"
            className={`flex-1 py-2 rounded-xl border ${
              paymentMethod === "stripe"
                ? "bg-white/25 border-white text-white"
                : "bg-white/10 border-white/30 text-white/70"
            }`}
            onClick={() => setPaymentMethod("stripe")}
          >
            {text.subscription.payment.stripe}
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-xl border ${
              paymentMethod === "lygos"
                ? "bg-white/25 border-white text-white"
                : "bg-white/10 border-white/30 text-white/70"
            }`}
            onClick={() => setPaymentMethod("lygos")}
          >
            {text.subscription.payment.lygos}
          </button>
        </div>

        {/* Plan selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {artistPlans.map((p: any) => {
            const isSelected = selectedPlanId === String(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPlanId(String(p.id))}
                className={`p-4 rounded-xl border transition ${
                  isSelected
                    ? "border-white/40 ring-2 ring-white/30 bg-white/15"
                    : "border-white/15 bg-white/10"
                }`}
              >
                <h4 className="text-white font-semibold">{p.name}</h4>
                <p className="text-white/70">{p.description}</p>
                <p className="text-white/80 mt-2">
                  {p.price} {p.currency}
                </p>
              </button>
            );
          })}
        </div>

        {successMessage && (
          <p className="text-green-400 mb-2">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-400 mb-2">{errorMessage}</p>}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-5 py-3 bg-white/10 rounded-xl text-white hover:bg-white/20 border border-white/15 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {text.cancel}
          </button>
          <button
            type="button"
            onClick={onConfirmClick}
            disabled={!canSubmit}
            className="flex-1 px-5 py-3 bg-white/25 rounded-xl text-white hover:bg-white/35 border border-white/25 disabled:opacity-50 disabled:cursor-not-allowed"
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
