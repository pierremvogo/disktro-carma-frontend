"use client";

import { useState } from "react";
import { wait } from "@/@disktro/utils";
import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";
import { UserModuleObject as ModuleObject } from "../module";
import { useRouter } from "next/navigation";

// Icône Mail
const Mail = ({ size = 24, className = "" }) => (
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

interface ConfirmEmailFormProps {
  language: "english" | "spanish" | "catalan";
}

export default function ConfirmEmailForm({ language }: ConfirmEmailFormProps) {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  /* ================= TRANSLATIONS ================= */
  const content = {
    spanish: {
      title: "Confirma tu correo electrónico",
      subtitle:
        "¡Registro completado! Revisa tu correo electrónico e introduce el código de confirmación.",
      labelToken: "Código de confirmación",
      placeholderToken: "Introduce tu código de confirmación",
      confirmButton: "Confirmar correo",
      confirming: "Confirmando...",
      errors: {
        emptyToken: "Por favor, introduce el código que recibiste.",
        generic: "Ocurrió un error. Inténtalo de nuevo.",
      },
    },
    english: {
      title: "Confirm Your Email",
      subtitle:
        "Registration successful! Please check your email and enter your confirmation code.",
      labelToken: "Confirmation Code",
      placeholderToken: "Enter your confirmation code",
      confirmButton: "Confirm Email",
      confirming: "Confirming...",
      errors: {
        emptyToken: "Please enter the token you received.",
        generic: "Something went wrong. Please try again.",
      },
    },
    catalan: {
      title: "Confirma el teu correu electrònic",
      subtitle:
        "Registre completat! Revisa el teu correu electrònic i introdueix el codi de confirmació.",
      labelToken: "Codi de confirmació",
      placeholderToken: "Introdueix el teu codi de confirmació",
      confirmButton: "Confirmar correu",
      confirming: "Confirmant...",
      errors: {
        emptyToken: "Si us plau, introdueix el codi que has rebut.",
        generic: "Alguna cosa ha anat malament. Torna-ho a intentar.",
      },
    },
  };

  const text = content[language] || content.english;

  /* ================= HANDLER ================= */
  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    // Récupérer la langue dans localStorage
    const language =
      (typeof window !== "undefined" &&
        localStorage.getItem("disktro_language")) ||
      "english";

    if (!token) {
      setStatus("error");
      setMessage(text.errors.emptyToken);
      return;
    }

    try {
      setSuccessMessage("");
      setErrorMessage("");
      setIsLoading(true);

      const res = await ModuleObject.service.verifyEmail(token, language);
      await wait();

      setStatus("success");
      setSuccessMessage(res.message);
      setMessage(res.message);

      router.push("/auth/login");
    } catch (error: any) {
      const errMsg = error?.message || text.errors.generic;
      setErrorMessage(errMsg);
      setStatus("error");
      setMessage(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= JSX ================= */
  return (
    <div
      className="
        relative w-full
        min-h-[100svh] md:min-h-screen
        overflow-hidden
        bg-cover bg-center
        text-white
      "
      style={{
        backgroundImage:
          'url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      {/* ✅ Scroll container stable iOS */}
      <div
        className="
          relative z-10
          min-h-[100svh]
          overflow-y-auto overscroll-contain
          px-4 sm:px-6
          pt-[calc(env(safe-area-inset-top)+1.25rem)]
          pb-[calc(env(safe-area-inset-bottom)+1.25rem)]
          flex items-center justify-center
        "
      >
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl">
            {/* Header */}
            <div className="flex flex-col items-center gap-3 mb-6 text-center">
              <Mail className="text-white" size={32} />
              <h2 className="text-2xl sm:text-3xl text-white drop-shadow-lg">
                {text.title}
              </h2>
              <p className="text-white/70 drop-shadow text-sm sm:text-base">
                {text.subtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleConfirm} className="space-y-6">
              <div>
                <label className="block text-white drop-shadow mb-2">
                  {text.labelToken}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Mail className="text-white/60" size={20} />
                  </div>
                  <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder={text.placeholderToken}
                    className="w-full pl-11 pr-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
              </div>

              {successMessage && <CustomSuccess message={successMessage} />}
              {errorMessage && <CustomAlert message={errorMessage} />}

              <button
                disabled={isLoading}
                type="submit"
                className="w-full px-6 py-4 bg-white/30 backdrop-blur-md border-2 border-white/40 rounded-xl text-white text-base sm:text-lg hover:bg-white/40 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{text.confirming}</span>
                  </>
                ) : (
                  text.confirmButton
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
