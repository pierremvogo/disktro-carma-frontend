import PaymentSuccessPage from "@/modules/components/paymentSuccess/paymentSuccess";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-black text-white">
          Loading…
        </div>
      }
    >
      <PaymentSuccessPage />
    </Suspense>
  );
}
