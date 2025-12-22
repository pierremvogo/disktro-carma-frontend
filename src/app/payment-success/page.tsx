import PaymentSuccessPage from "@/modules/components/paymentSuccess/paymentSuccess";
import React, { Suspense } from "react";

const page = () => {
  <Suspense fallback={<div className="p-6 text-white">Chargement…</div>}>
    <PaymentSuccessPage />
  </Suspense>;
};

export default page;
