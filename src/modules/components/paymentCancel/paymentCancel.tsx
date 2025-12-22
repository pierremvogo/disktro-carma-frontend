"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// Icons (même style que payment-success)
const XCircle = ({ size = 24, className = "" }) => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const Music = ({ size = 24, className = "" }) => (
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
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

export default function PaymentCancelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = useMemo(
    () => searchParams.get("session_id"),
    [searchParams]
  );

  const [message, setMessage] = useState(
    "Your payment was cancelled. No charges were made."
  );

  useEffect(() => {
    // Tu peux ajouter ici du tracking / analytics si besoin
    if (!sessionId) {
      setMessage(
        "Your payment was cancelled. No charges were made to your account."
      );
    }
  }, [sessionId]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative w-full h-full overflow-y-auto flex items-center justify-center p-6">
        <div className="w-full max-w-lg mt-10">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-2 rounded-2xl bg-red-500/20 border border-red-500/30">
                <XCircle className="text-red-300" size={28} />
              </div>
              <div className="text-center">
                <h1 className="text-3xl text-white drop-shadow-lg">
                  Payment cancelled
                </h1>
                <p className="text-white/70 drop-shadow mt-1">
                  You stopped the checkout process
                </p>
              </div>
            </div>

            {/* Message */}
            <div className="rounded-2xl border border-red-500/30 bg-red-500/15 p-4 text-sm text-white">
              <p className="text-white/90">{message}</p>
              <p className="mt-2 text-white/70 text-xs">
                You can safely retry the payment at any time.
              </p>
            </div>

            {/* Session */}
            <div className="mt-6 bg-white/10 border border-white/15 rounded-2xl p-4 text-xs text-white/70">
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/60">Session</span>
                <span className="truncate max-w-[70%]">{sessionId ?? "—"}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => router.push("/dashboard/fan-streaming")}
                className="w-full cursor-pointer px-6 py-4 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-xl text-white hover:bg-white/30 hover:border-white/50 transition-all shadow-lg"
              >
                Back to streaming
              </button>

              <button
                onClick={() =>
                  router.push("/dashboard/fan-streaming?tab=artists&sub=retry")
                }
                className="w-full cursor-pointer px-6 py-4 bg-white/30 backdrop-blur-md border-2 border-white/40 rounded-xl text-white hover:bg-white/40 hover:border-white/60 transition-all shadow-lg"
              >
                Retry payment
              </button>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 mt-6 border-t border-white/20">
              <p className="mt-2 text-[11px] text-white/50">
                No charges were made to your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
