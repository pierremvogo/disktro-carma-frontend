import React from "react";

type PaymentOption = "card" | "paypal";

type SubscriptionModalProps = {
  language: string;
  text: { cancel: string };

  showSubscriptionModal: boolean;
  selectedArtistForSubscription: any | null;

  paymentOption: PaymentOption;
  setPaymentOption: (v: PaymentOption) => void;

  cardNumber: string;
  setCardNumber: (v: string) => void;

  cardHolder: string;
  setCardHolder: (v: string) => void;

  cardExpiry: string;
  setCardExpiry: (v: string) => void;

  cardCvc: string;
  setCardCvc: (v: string) => void;

  paypalEmail: string;
  setPaypalEmail: (v: string) => void;

  handleConfirmSubscription: () => void;

  onClose: () => void;

  artistPlans: any[];
  plansLoading: boolean;
  plansError: string;
  selectedPlanId: string;
  setSelectedPlanId: (planId: string) => void;
};

export function SubscriptionModal({
  language,
  text,

  showSubscriptionModal,
  selectedArtistForSubscription,

  paymentOption,
  setPaymentOption,

  cardNumber,
  setCardNumber,

  cardHolder,
  setCardHolder,

  cardExpiry,
  setCardExpiry,

  cardCvc,
  setCardCvc,

  paypalEmail,
  setPaypalEmail,

  handleConfirmSubscription,
  onClose,
  artistPlans,
  plansLoading,
  plansError,
  selectedPlanId,
  setSelectedPlanId,
}: SubscriptionModalProps) {
  if (!showSubscriptionModal || !selectedArtistForSubscription) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[90] p-4">
      <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-white/20 p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl text-white drop-shadow mb-1">
              {language === "spanish" && "Suscripción"}
              {language === "english" && "Subscription"}
              {language === "catalan" && "Subscripció"}
            </h3>
            <p className="text-white/60 text-sm">
              {language === "spanish" &&
                `Completa el pago para suscribirte a ${selectedArtistForSubscription.name}`}
              {language === "english" &&
                `Complete payment to subscribe to ${selectedArtistForSubscription.name}`}
              {language === "catalan" &&
                `Completa el pagament per subscriure't a ${selectedArtistForSubscription.name}`}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg
              width="24"
              height="24"
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

        {/* Payment method selector */}
        <div className="mb-6">
          <p className="text-white/80 text-sm mb-2">
            {language === "spanish" && "Método de pago"}
            {language === "english" && "Payment method"}
            {language === "catalan" && "Mètode de pagament"}
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPaymentOption("card")}
              className={`px-4 py-2 rounded-lg text-sm ${
                paymentOption === "card"
                  ? "bg-white/30 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {language === "spanish" && "Tarjeta"}
              {language === "english" && "Card"}
              {language === "catalan" && "Targeta"}
            </button>

            <button
              type="button"
              onClick={() => setPaymentOption("paypal")}
              className={`px-4 py-2 rounded-lg text-sm ${
                paymentOption === "paypal"
                  ? "bg-white/30 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              PayPal
            </button>
          </div>
        </div>
        {/* Plan selector */}
        <div className="mb-6">
          <p className="text-white/80 text-sm mb-2">
            {language === "english"
              ? "Choose a plan"
              : language === "spanish"
              ? "Elige un plan"
              : "Tria un pla"}
          </p>

          {plansLoading ? (
            <div className="text-white/60 text-sm bg-white/10 border border-white/20 rounded-lg p-3">
              Loading plans...
            </div>
          ) : plansError ? (
            <div className="text-white/70 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              {plansError}
            </div>
          ) : (
            <div className="space-y-2">
              {artistPlans.map((p: any) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlanId(String(p.id))}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                    selectedPlanId === String(p.id)
                      ? "bg-white/20 border-white/30 text-white"
                      : "bg-white/10 border-white/15 text-white/80 hover:bg-white/15"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{p.name}</span>
                    <span className="text-sm text-white/70">
                      {p.price} {p.currency}
                    </span>
                  </div>
                  <div className="text-xs text-white/50 mt-1">
                    {p.billingCycle}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Card form */}
        {paymentOption === "card" && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-white/80 text-sm mb-1">
                {language === "spanish" && "Número de tarjeta"}
                {language === "english" && "Card number"}
                {language === "catalan" && "Número de targeta"}
              </label>

              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full p-3 bg-white border border-white/20 rounded-lg text-black focus:outline-none focus:border-white/40"
                placeholder="•••• •••• •••• ••••"
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm mb-1">
                {language === "spanish" && "Titular"}
                {language === "english" && "Card holder"}
                {language === "catalan" && "Titular"}
              </label>

              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-black  focus:outline-none focus:border-white/40"
                placeholder="Name Surname"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-white/80 text-sm mb-1">
                  {language === "spanish" && "Caducidad"}
                  {language === "english" && "Expiry"}
                  {language === "catalan" && "Caducitat"}
                </label>

                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-black  focus:outline-none focus:border-white/40"
                  placeholder="MM/YY"
                />
              </div>

              <div className="w-24">
                <label className="block text-white/80 text-sm mb-1">CVC</label>
                <input
                  type="password"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-black  focus:outline-none focus:border-white/40"
                  placeholder="•••"
                />
              </div>
            </div>
          </div>
        )}

        {/* PayPal form */}
        {paymentOption === "paypal" && (
          <div className="mb-6">
            <label className="block text-white/80 text-sm mb-1">
              PayPal email
            </label>

            <input
              type="email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-black  focus:outline-none focus:border-white/40"
              placeholder="you@example.com"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-all"
          >
            {text.cancel}
          </button>

          <button
            type="button"
            onClick={handleConfirmSubscription}
            className="flex-1 px-4 py-3 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-all"
          >
            {language === "spanish" && "Confirmar suscripción"}
            {language === "english" && "Confirm subscription"}
            {language === "catalan" && "Confirmar subscripció"}
          </button>
        </div>
      </div>
    </div>
  );
}
