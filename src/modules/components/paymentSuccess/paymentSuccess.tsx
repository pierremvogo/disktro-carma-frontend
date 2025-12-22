"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StripeModuleObject } from "../stripe/module";
import { SubscriptionModuleObject } from "@/modules/subscription/module"; // adapte le chemin
import { UserModuleObject as ModuleObject } from "@/modules/module"; // adapte si besoin

type Status = "idle" | "processing" | "success" | "error";

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
        /**
         * ✅ OPTIONNEL (recommandé) :
         * Si tu ajoutes un endpoint backend pour vérifier la session checkout (session_id),
         * tu peux l’appeler ici pour améliorer l’UX et être certain.
         *
         * Exemple: GET /stripe/checkout/session/:sessionId
         * -> renvoie { paid: true, artistId, planId, subscriptionId }
         *
         * Pour l'instant, on ne dépend PAS de ça car le webhook crée la subscription.
         */

        // 👉 Petit délai pour laisser le webhook écrire en DB (Render/Stripe parfois > 1s)
        await new Promise((r) => setTimeout(r, 1500));

        // ✅ Refresh local subscription state (si tu as la liste d'artistes, tu peux refetch)
        // Ici on fait un ping simple: rien à faire côté backend si tout est webhook-driven.
        // Tu peux aussi appeler un endpoint "GET /subscription/user/:userId" si utile.

        setStatus("success");
        setMessage(
          "Payment successful! Your subscription should now be active."
        );

        // Auto-redirect (2.5s)
        setTimeout(() => {
          router.push("/fan/streaming?tab=dashboard"); // ✅ ouvre directement Dashboard
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
  }, [sessionId, router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 p-6">
      <div className="w-full max-w-lg bg-black/70 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          {status === "processing" && (
            <div className="w-3 h-3 rounded-full bg-white/70 animate-pulse" />
          )}
          {status === "success" && (
            <div className="w-3 h-3 rounded-full bg-green-400" />
          )}
          {status === "error" && (
            <div className="w-3 h-3 rounded-full bg-red-400" />
          )}

          <h1 className="text-white text-xl font-semibold">
            {status === "processing"
              ? "Processing…"
              : status === "success"
              ? "Success"
              : "Payment issue"}
          </h1>
        </div>

        <p className="text-white/70 text-sm mb-6">{message}</p>

        <div className="bg-white/10 border border-white/15 rounded-xl p-4 text-xs text-white/70">
          <div className="flex items-center justify-between gap-3">
            <span className="text-white/60">Session</span>
            <span className="truncate">{sessionId ?? "—"}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => router.push("/home")}
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            Go to Home
          </button>

          <button
            onClick={() => router.push("/fan/streaming")}
            className="flex-1 px-4 py-3 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all"
          >
            Continue listening
          </button>
        </div>

        <p className="mt-4 text-[11px] text-white/50">
          If your subscription does not appear immediately, wait a few seconds
          and refresh.
        </p>
      </div>
    </div>
  );
}
