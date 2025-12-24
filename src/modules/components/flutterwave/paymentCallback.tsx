"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FlutterwaveModuleObject as ModuleObject } from "./module";

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

/* ================= COMPONENT ================= */
export default function FlutterwaveCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const txRef = useMemo(() => searchParams.get("tx_ref"), [searchParams]);
  const flwRef = useMemo(() => searchParams.get("flw_ref"), [searchParams]);
  const statusParam = useMemo(() => searchParams.get("status"), [searchParams]);

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  const [language, setLanguage] = useState<"english" | "spanish" | "catalan">(
    "english"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("disktro_language");
    if (stored === "english" || stored === "spanish" || stored === "catalan") {
      setLanguage(stored);
    }
  }, []);

  const content = {
    english: {
      headers: {
        idle: "Preparing…",
        processing: "Processing…",
        success: "Success",
        error: "Payment issue",
      },
      messages: {
        confirming: "Confirming your payment…",
        success: "Payment successful! Your subscription is now active.",
        error: "Something went wrong or payment was cancelled.",
      },
      actions: {
        home: "Go to Home",
        dashboard: "Continue listening",
      },
    },
    spanish: {
      headers: {
        idle: "Preparando…",
        processing: "Procesando…",
        success: "Éxito",
        error: "Problema con el pago",
      },
      messages: {
        confirming: "Confirmando tu pago…",
        success: "¡Pago exitoso! Tu suscripción está activa.",
        error: "Algo salió mal o el pago fue cancelado.",
      },
      actions: {
        home: "Ir al inicio",
        dashboard: "Continuar escuchando",
      },
    },
    catalan: {
      headers: {
        idle: "Preparant…",
        processing: "Processant…",
        success: "Èxit",
        error: "Problema amb el pagament",
      },
      messages: {
        confirming: "Confirmant el teu pagament…",
        success: "Pagament correcte! La teva subscripció està activa.",
        error:
          "Alguna cosa ha anat malament o el pagament ha estat cancel·lat.",
      },
      actions: {
        home: "Anar a l'inici",
        dashboard: "Continuar escoltant",
      },
    },
  };

  const text = content[language] || content.english;

  useEffect(() => {
    let redirectTimer: any;

    async function run() {
      if (!txRef || !statusParam) {
        setStatus("error");
        setMessage(text.messages.error);
        return;
      }

      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) {
        setStatus("error");
        setMessage(text.messages.error);
        return;
      }

      setStatus("processing");
      setMessage(text.messages.confirming);

      try {
        const res = await ModuleObject.service.verifyFlutterwavePayment(
          { txRef, flwRef: flwRef ?? "" },
          token
        );

        if (res?.data?.status === "success") {
          setStatus("success");
          setMessage(text.messages.success);

          redirectTimer = setTimeout(() => {
            router.push("/dashboard/fan-streaming?tab=dashboard&sub=success");
          }, 2500);
        } else {
          setStatus("error");
          setMessage(res?.data?.message ?? text.messages.error);
        }
      } catch (e: any) {
        console.error(e);
        setStatus("error");
        setMessage(e?.message ?? text.messages.error);
      }
    }

    run();
    return () => {
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [txRef, flwRef, statusParam, router, text.messages]);

  const headerIcon = {
    idle: <Loader className="text-white animate-spin" size={24} />,
    processing: <Loader className="text-white animate-spin" size={24} />,
    success: <CheckCircle className="text-green-300" size={24} />,
    error: <AlertTriangle className="text-red-300" size={24} />,
  }[status];

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl w-full max-w-lg text-center">
        <div className="flex flex-col items-center gap-3 mb-6">
          {headerIcon}
          <h1 className="text-3xl text-white drop-shadow-lg">
            {text.headers[status]}
          </h1>
          <p className="text-white/70 drop-shadow">{message}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => router.push("/home")}
            className="w-full px-6 py-4 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-all"
          >
            {text.actions.home}
          </button>
          <button
            onClick={() => router.push("/dashboard/fan-streaming")}
            className="w-full px-6 py-4 bg-white/30 rounded-xl text-white hover:bg-white/40 transition-all"
          >
            {text.actions.dashboard}
          </button>
        </div>
      </div>
    </div>
  );
}
