"use client";

import { useState, useEffect } from "react";
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

interface ForgotPasswordFormProps {
  language: "english" | "spanish" | "catalan";
}

export default function ForgotPasswordForm({
  language,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendAvailable, setResendAvailable] = useState(false);

  const router = useRouter();

  /* ================= TRANSLATIONS ================= */
  const content = {
    spanish: {
      title: "¿Olvidaste tu contraseña?",
      subtitle:
        "Introduce tu correo electrónico para recibir un enlace de restablecimiento.",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "Introduce tu correo electrónico",
      submitButton: "Enviar enlace",
      sending: "Enviando...",
      successInfo:
        "Si este correo existe en nuestro sistema, te hemos enviado un enlace 💌",
      resend: "¿No recibiste el correo? Reenviar",
      resendCountdown: "Puedes solicitar un nuevo correo en",
      errors: {
        emptyEmail: "Por favor, introduce tu correo electrónico.",
        generic: "Algo salió mal. Inténtalo de nuevo.",
      },
    },
    english: {
      title: "Forgot Password",
      subtitle: "Enter your email to receive a password reset link.",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      submitButton: "Send reset link",
      sending: "Sending...",
      successInfo:
        "If this email exists in our system, we’ve sent you a reset link 💌",
      resend: "Didn’t receive the email? Resend it",
      resendCountdown: "You can request a new email in",
      errors: {
        emptyEmail: "Please enter your email.",
        generic: "Something went wrong. Please try again.",
      },
    },
    catalan: {
      title: "Has oblidat la contrasenya?",
      subtitle:
        "Introdueix el teu correu electrònic per rebre un enllaç de restabliment.",
      emailLabel: "Correu electrònic",
      emailPlaceholder: "Introdueix el teu correu electrònic",
      submitButton: "Enviar enllaç",
      sending: "Enviant...",
      successInfo:
        "Si aquest correu existeix al nostre sistema, t’hem enviat un enllaç 💌",
      resend: "No has rebut el correu? Reenvia’l",
      resendCountdown: "Pots sol·licitar un nou correu en",
      errors: {
        emptyEmail: "Si us plau, introdueix el teu correu electrònic.",
        generic: "Alguna cosa ha anat malament. Torna-ho a intentar.",
      },
    },
  };

  const text = content[language] || content.english;

  /* ================= HANDLERS ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage(text.errors.emptyEmail);
      return;
    }
    // Récupérer la langue dans localStorage
    const language =
      (typeof window !== "undefined" &&
        localStorage.getItem("disktro_language")) ||
      "english";

    try {
      setSuccessMessage("");
      setErrorMessage("");
      setIsLoading(true);
      setSuccess(false);

      const res = await ModuleObject.service.forgotPassword({
        email,
        language: language,
      });
      await wait();

      setSuccess(true);
      setSuccessMessage(res.message);
      setCountdown(60);
      setResendAvailable(false);
    } catch (error: any) {
      setErrorMessage(error?.message || text.errors.generic);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    try {
      setIsLoading(true);
      setCountdown(60);
      setResendAvailable(false);

      const res = await ModuleObject.service.forgotPassword({ email });
      await wait();

      setSuccessMessage(res.message);
    } catch (error: any) {
      setErrorMessage(error?.message || text.errors.generic);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= COUNTDOWN ================= */
  useEffect(() => {
    if (countdown <= 0) {
      setResendAvailable(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

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

            {successMessage && <CustomSuccess message={successMessage} />}
            {errorMessage && <CustomAlert message={errorMessage} />}

            {success ? (
              <div className="text-center space-y-4">
                <p className="text-white/80 text-sm bg-green-500/20 border border-green-500/40 rounded-lg p-3">
                  {text.successInfo}
                </p>

                {resendAvailable ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isLoading}
                    className="text-white/80 hover:text-white underline text-sm disabled:opacity-50"
                  >
                    {text.resend}
                  </button>
                ) : (
                  <p className="text-sm text-white/70">
                    {text.resendCountdown} {countdown}s...
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white drop-shadow mb-2">
                    {text.emailLabel}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Mail className="text-white/60" size={20} />
                    </div>
                    <input
                      type="email"
                      placeholder={text.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full px-6 py-4 bg-white/30 backdrop-blur-md border-2 border-white/40 rounded-xl text-white text-base sm:text-lg hover:bg-white/40 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{text.sending}</span>
                    </>
                  ) : (
                    text.submitButton
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => router.replace("/home/?view=login")}
                  className="cursor-pointer w-full text-white/70 hover:text-white text-sm transition-all"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
