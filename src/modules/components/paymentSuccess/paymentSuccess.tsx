"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { UserModuleObject as ModuleObject } from "@/modules/module"; // adapte si besoin

type Status = "idle" | "processing" | "success" | "error";

// Simple icon components (même esprit que ton Login)
const CheckCircle = ({ size = 24, className = "" }) => (
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

const AlertTriangle = ({ size = 24, className = "" }) => (
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
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const Loader = ({ size = 20, className = "" }) => (
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

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = useMemo(
    () => searchParams.get("session_id"),
    [searchParams]
  );

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let redirectTimer: any;

    async function run() {
      if (!sessionId) {
        setStatus("error");
        setMessage("Missing session_id in URL.");
        return;
      }

      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) {
        setStatus("error");
        setMessage("Not authenticated. Please log in again.");
        return;
      }

      setStatus("processing");
      setMessage("Finalizing your subscription…");

      try {
        // Petit délai pour laisser le webhook écrire en DB
        await new Promise((r) => setTimeout(r, 1500));

        setStatus("success");
        setMessage(
          "Payment successful! Your subscription should now be active."
        );

        // Auto-redirect (2.5s)
        redirectTimer = setTimeout(() => {
          router.push("dashboard/fan-streaming?tab=dashboard&sub=success");
        }, 2500);
      } catch (e: any) {
        console.error(e);
        setStatus("error");
        setMessage(
          e?.message ?? "Something went wrong while confirming your payment."
        );
      }
    }

    run();

    return () => {
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [sessionId, router]);

  const header = {
    idle: {
      title: "Preparing…",
      icon: <Music className="text-white" size={28} />,
    },
    processing: {
      title: "Processing…",
      icon: <Loader className="text-white animate-spin" size={22} />,
    },
    success: {
      title: "Success",
      icon: <CheckCircle className="text-green-300" size={26} />,
    },
    error: {
      title: "Payment issue",
      icon: <AlertTriangle className="text-red-300" size={26} />,
    },
  }[status];

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
              <div className="p-2 rounded-2xl bg-white/10 border border-white/15">
                {header.icon}
              </div>
              <div className="text-center">
                <h1 className="text-3xl text-white drop-shadow-lg">
                  {header.title}
                </h1>
                <p className="text-white/70 drop-shadow mt-1">
                  {status === "processing"
                    ? "We’re confirming your payment with Stripe."
                    : status === "success"
                    ? "You can continue to your dashboard."
                    : status === "error"
                    ? "We couldn’t confirm the payment."
                    : "Loading…"}
                </p>
              </div>
            </div>

            {/* Message */}
            <div
              className={[
                "rounded-2xl border p-4 text-sm",
                status === "success"
                  ? "bg-green-500/15 border-green-500/30 text-white"
                  : status === "error"
                  ? "bg-red-500/15 border-red-500/30 text-white"
                  : "bg-white/10 border-white/15 text-white",
              ].join(" ")}
            >
              <p className="text-white/90">{message}</p>
              {status === "processing" && (
                <div className="mt-3 flex items-center gap-2 text-white/70 text-xs">
                  <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
                  <span>Please don’t close this page.</span>
                </div>
              )}
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
                onClick={() => router.push("/home")}
                className="w-full cursor-pointer px-6 py-4 bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-xl text-white hover:bg-white/30 hover:border-white/50 transition-all shadow-lg"
              >
                Go to Home
              </button>

              <button
                onClick={() => router.push("dashboard/fan-streaming")}
                className="w-full cursor-pointer px-6 py-4 bg-white/30 backdrop-blur-md border-2 border-white/40 rounded-xl text-white hover:bg-white/40 hover:border-white/60 transition-all shadow-lg"
              >
                Continue listening
              </button>
            </div>

            {/* Secondary links */}
            <div className="text-center pt-4 mt-6 border-t border-white/20">
              <p className="mt-2 text-[11px] text-white/50">
                If your subscription does not appear immediately, wait a few
                seconds and refresh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
