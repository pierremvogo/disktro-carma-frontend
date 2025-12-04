"use client";

import { useState, useEffect } from "react";
import Loader from "@/@disktro/Loader";
import { wait } from "@/@disktro/utils";
import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";
import { UserModuleObject as ModuleObject } from "../module";

// Icône Mail (comme dans le Login)
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

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false); // toujours là si tu veux l'utiliser plus tard
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendAvailable, setResendAvailable] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }

    try {
      setSuccessMessage("");
      setErrorMessage("");
      setIsLoading(true);
      setSuccess(false);

      const res = await ModuleObject.service.forgotPassword({ email });
      await wait();

      setIsLoading(false);
      setSuccessMessage(res.message);
      setCountdown(60); // 60 secondes avant de pouvoir renvoyer
      setResendAvailable(false);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setErrorMessage((error as Error).message);
      setIsLoading(false);
      setSuccess(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    try {
      setSuccessMessage("");
      setErrorMessage("");
      setIsLoading(true);
      setSuccess(true);
      setCountdown(60);
      setResendAvailable(false);

      const res = await ModuleObject.service.forgotPassword({ email });
      await wait();

      setIsLoading(false);
      setSuccessMessage(res.message);
    } catch (error) {
      console.log(error);
      setErrorMessage((error as Error).message);
      setIsLoading(false);
      setSuccess(false);
    }
  };

  // 🔄 Gérer le compte à rebours
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (countdown <= 0) {
      setResendAvailable(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

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

      {/* Contenu */}
      <div className="relative w-full h-full overflow-y-auto flex items-center justify-center p-6">
        <div className="w-full max-w-md mt-10">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
            {/* Header */}
            <div className="flex flex-col items-center gap-3 mb-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Mail className="text-white" size={32} />
              </div>
              <h2 className="text-3xl text-white drop-shadow-lg">
                Forgot Password
              </h2>
              <p className="text-white/70 drop-shadow mt-1">
                Enter your email to receive a password reset link.
              </p>
            </div>
            {/* Messages succès / erreur */}
            {successMessage && <CustomSuccess message={successMessage} />}

            {errorMessage && <CustomAlert message={errorMessage} />}

            {/* Contenu selon succès ou non */}
            {success ? (
              <div className="text-center space-y-4">
                <p className="text-white/80 text-sm bg-green-500/20 border border-green-500/40 rounded-lg p-3">
                  If this email exists in our system, we’ve sent you a reset
                  link 💌
                </p>

                {resendAvailable ? (
                  <button
                    onClick={handleResend}
                    disabled={isLoading}
                    className="text-white/80 hover:text-white underline text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Didn’t receive the email? Resend it
                  </button>
                ) : (
                  <p className="text-sm text-white/70">
                    You can request a new email in {countdown}s...
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Champ email */}
                <div>
                  <label className="block text-white drop-shadow mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Mail className="text-white/60" size={20} />
                    </div>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full pl-11 pr-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Bouton */}
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full cursor-pointer px-6 py-4 bg-white/30 backdrop-blur-md border-2 border-white/40 rounded-xl text-white text-lg hover:bg-white/40 hover:border-white/60 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
