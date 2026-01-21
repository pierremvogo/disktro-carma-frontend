import PaymentCancelPage from "@/modules/components/paymentCancel/paymentCancel";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          Loading…
        </div>
      }
    >
      <PaymentCancelPage />
    </Suspense>
  );
}
