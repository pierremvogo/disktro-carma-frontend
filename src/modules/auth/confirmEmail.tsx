"use client";

import { useState } from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { wait } from "@/@disktro/utils";
import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";
import { UserModuleObject as ModuleObject } from "../module";
import Loader from "@/@disktro/Loader";
import { useRouter } from "next/navigation";

// Optionnel : icône Mail pour le header / champ
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

export default function ConfirmEmailForm() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setStatus("error");
      setMessage("Please enter the token you received.");
      return;
    }

    try {
      setSuccessMessage("");
      setErrorMessage("");
      setIsLoading(true);
      setSuccess(false);

      const res = await ModuleObject.service.verifyEmail(token);
      await wait();

      setIsLoading(false);
      setSuccessMessage(res.message);
      setSuccess(true);
      setStatus("success");
      setMessage(res.message);

      router.push("/auth/login");
    } catch (error) {
      console.log(error);
      const errMsg = (error as Error).message;
      setErrorMessage(errMsg);
      setIsLoading(false);
      setSuccess(false);
      setStatus("error");
      setMessage(errMsg);
    }
  };

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

      {/* Contenu principal (si tu veux garder Header/Footer, tu peux les intégrer ici) */}
      {/* <Header /> */}

      <div className="relative w-full h-full overflow-y-auto flex items-center justify-center p-6">
        <div className="w-full max-w-md mt-10">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
            {/* Header du formulaire */}
            <div className="flex flex-col items-center gap-3 mb-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Mail className="text-white" size={32} />
              </div>
              <h2 className="text-3xl text-white drop-shadow-lg">
                Confirm Your Email
              </h2>
              <p className="text-white/70 drop-shadow mt-1">
                Registration successful! Please check your email and enter your
                confirmation code.
              </p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleConfirm} className="space-y-6">
              <div>
                <label className="block text-white drop-shadow mb-2">
                  Code de confirmation
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Mail className="text-white/60" size={20} />
                  </div>
                  <input
                    name="token"
                    type="text"
                    placeholder="Enter your confirmation code"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
              </div>

              {/* Messages de succès / erreur (même thème que login) */}
              {successMessage && (
                <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-3 text-white text-sm">
                  <CustomSuccess message={successMessage} />
                </div>
              )}

              {errorMessage && (
                <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3 text-white text-sm">
                  <CustomAlert message={errorMessage} />
                </div>
              )}

              {status !== "idle" &&
                message &&
                !successMessage &&
                !errorMessage && (
                  <div
                    className={`rounded-lg p-3 text-white text-sm ${
                      status === "success"
                        ? "bg-green-500/20 border border-green-500/40"
                        : "bg-red-500/20 border border-red-500/40"
                    }`}
                  >
                    {message}
                  </div>
                )}

              {/* Bouton de confirmation */}
              <button
                disabled={isLoading}
                type="submit"
                className="w-full cursor-pointer px-6 py-4 bg-white/30 backdrop-blur-md border-2 border-white/40 rounded-xl text-white text-lg hover:bg-white/40 hover:border-white/60 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Confirming...</span>
                  </>
                ) : (
                  "Confirm Email"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
