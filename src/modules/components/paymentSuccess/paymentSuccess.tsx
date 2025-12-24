"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserModuleObject as ModuleObject } from "@/modules/module";

type Status = "idle" | "processing" | "success" | "error";

/* ================= ICONS ================= */
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

/* ================= COMPONENT ================= */
export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = useMemo(
    () => searchParams.get("session_id"),
    [searchParams]
  );

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState<"english" | "spanish" | "catalan">(
    "english"
  );

  /* ================= LANGUAGE FROM STORAGE ================= */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("disktro_language");
    if (stored === "english" || stored === "spanish" || stored === "catalan") {
      setLanguage(stored);
    }
  }, []);

  /* ================= TRANSLATIONS ================= */
  const content = {
    english: {
      headers: {
        idle: "Preparing…",
        processing: "Processing…",
        success: "Success",
        error: "Payment issue",
      },
      subtitles: {
        idle: "Loading…",
        processing: "We’re confirming your payment with Stripe.",
        success: "You can continue to your dashboard.",
        error: "We couldn’t confirm the payment.",
      },
      messages: {
        missingSession: "Missing session_id in URL.",
        notAuth: "Not authenticated. Please log in again.",
        processing: "Finalizing your subscription…",
        success: "Payment successful! Your subscription should now be active.",
        error: "Something went wrong while confirming your payment.",
      },
      actions: {
        home: "Go to Home",
        dashboard: "Continue listening",
      },
      misc: {
        session: "Session",
        dontClose: "Please don’t close this page.",
        refresh:
          "If your subscription does not appear immediately, wait a few seconds and refresh.",
      },
    },
    spanish: {
      headers: {
        idle: "Preparando…",
        processing: "Procesando…",
        success: "Éxito",
        error: "Problema de pago",
      },
      subtitles: {
        idle: "Cargando…",
        processing: "Estamos confirmando tu pago con Stripe.",
        success: "Puedes continuar a tu panel.",
        error: "No pudimos confirmar el pago.",
      },
      messages: {
        missingSession: "Falta session_id en la URL.",
        notAuth: "No autenticado. Por favor, inicia sesión de nuevo.",
        processing: "Finalizando tu suscripción…",
        success: "¡Pago realizado con éxito! Tu suscripción ya está activa.",
        error: "Algo salió mal al confirmar tu pago.",
      },
      actions: {
        home: "Ir al inicio",
        dashboard: "Seguir escuchando",
      },
      misc: {
        session: "Sesión",
        dontClose: "Por favor, no cierres esta página.",
        refresh:
          "Si tu suscripción no aparece inmediatamente, espera unos segundos y actualiza.",
      },
    },
    catalan: {
      headers: {
        idle: "Preparant…",
        processing: "Processant…",
        success: "Èxit",
        error: "Problema de pagament",
      },
      subtitles: {
        idle: "Carregant…",
        processing: "Estem confirmant el teu pagament amb Stripe.",
        success: "Pots continuar cap al teu tauler.",
        error: "No hem pogut confirmar el pagament.",
      },
      messages: {
        missingSession: "Falta session_id a la URL.",
        notAuth: "No autenticat. Torna a iniciar sessió.",
        processing: "Finalitzant la teva subscripció…",
        success:
          "Pagament realitzat correctament! La teva subscripció ja està activa.",
        error: "Alguna cosa ha anat malament en confirmar el pagament.",
      },
      actions: {
        home: "Anar a l'inici",
        dashboard: "Continuar escoltant",
      },
      misc: {
        session: "Sessió",
        dontClose: "Si us plau, no tanquis aquesta pàgina.",
        refresh:
          "Si la subscripció no apareix immediatament, espera uns segons i refresca.",
      },
    },
  };

  const text = content[language] || content.english;

  /* ================= EFFECT ================= */
  useEffect(() => {
    let redirectTimer: any;

    async function run() {
      if (!sessionId) {
        setStatus("error");
        setMessage(text.messages.missingSession);
        return;
      }

      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) {
        setStatus("error");
        setMessage(text.messages.notAuth);
        return;
      }

      setStatus("processing");
      setMessage(text.messages.processing);

      try {
        await new Promise((r) => setTimeout(r, 1500));

        setStatus("success");
        setMessage(text.messages.success);

        redirectTimer = setTimeout(() => {
          router.push("/dashboard/fan-streaming?tab=dashboard&sub=success");
        }, 2500);
      } catch (e: any) {
        setStatus("error");
        setMessage(e?.message || text.messages.error);
      }
    }

    run();

    return () => {
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [sessionId, router, text]);

  const header = {
    idle: {
      title: text.headers.idle,
      icon: <Music className="text-white" size={28} />,
    },
    processing: {
      title: text.headers.processing,
      icon: <Loader className="text-white animate-spin" size={22} />,
    },
    success: {
      title: text.headers.success,
      icon: <CheckCircle className="text-green-300" size={26} />,
    },
    error: {
      title: text.headers.error,
      icon: <AlertTriangle className="text-red-300" size={26} />,
    },
  }[status];

  /* ================= JSX ================= */
  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative w-full h-full flex items-center justify-center p-6">
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
                  {text.subtitles[status]}
                </p>
              </div>
            </div>

            {/* Message */}
            <div className="rounded-2xl border p-4 text-sm bg-white/10 border-white/15 text-white">
              <p className="text-white/90">{message}</p>
              {status === "processing" && (
                <div className="mt-3 flex items-center gap-2 text-white/70 text-xs">
                  <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
                  <span>{text.misc.dontClose}</span>
                </div>
              )}
            </div>

            {/* Session */}
            <div className="mt-6 bg-white/10 border border-white/15 rounded-2xl p-4 text-xs text-white/70">
              <div className="flex items-center justify-between">
                <span>{text.misc.session}</span>
                <span className="truncate max-w-[70%]">{sessionId ?? "—"}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => router.push("/home")}
                className="px-6 py-4 bg-white/20 border-2 border-white/30 rounded-xl text-white hover:bg-white/30 transition-all"
              >
                {text.actions.home}
              </button>

              <button
                onClick={() => router.push("/dashboard/fan-streaming")}
                className="px-6 py-4 bg-white/30 border-2 border-white/40 rounded-xl text-white hover:bg-white/40 transition-all"
              >
                {text.actions.dashboard}
              </button>
            </div>

            <div className="text-center pt-4 mt-6 border-t border-white/20">
              <p className="text-[11px] text-white/50">{text.misc.refresh}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
