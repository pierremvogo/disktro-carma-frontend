import FlutterwaveCallbackPage from "@/modules/components/flutterwave/paymentCallback";
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
      <FlutterwaveCallbackPage />
    </Suspense>
  );
}
