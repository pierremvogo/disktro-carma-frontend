"use client";

import { useState } from "react";
import { wait } from "@/@disktro/utils";
import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";
import { UserModuleObject as ModuleObject } from "../module";

interface ResetPasswordFormProps {
  initialToken?: string;
  language: "english" | "spanish" | "catalan";
}

/* ================= ICONS ================= */
const Lock = ({ size = 24, className = "" }) => (
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
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const Eye = ({ size = 24, className = "" }) => (
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
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = ({ size = 24, className = "" }) => (
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
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

/* ================= COMPONENT ================= */
export default function ResetPasswordForm({
  initialToken = "",
  language,
}: ResetPasswordFormProps) {
  const [token] = useState(initialToken);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* ================= TRANSLATIONS ================= */
  const content = {
    english: {
      title: "Reset Password",
      subtitle: "Choose a new password to secure your account.",
      newPassword: "New password",
      confirmPassword: "Confirm new password",
      placeholderNew: "New password",
      placeholderConfirm: "Confirm new password",
      submit: "Reset Password",
      submitting: "Resetting...",
      successInfo: "✅ Your password has been reset successfully.",
      loginText: "You can now",
      loginLink: "log in",
      errors: {
        empty: "Please fill in all fields.",
        mismatch: "Passwords do not match.",
        generic: "Something went wrong. Please try again.",
      },
    },
    spanish: {
      title: "Restablecer contraseña",
      subtitle: "Elige una nueva contraseña para proteger tu cuenta.",
      newPassword: "Nueva contraseña",
      confirmPassword: "Confirmar nueva contraseña",
      placeholderNew: "Nueva contraseña",
      placeholderConfirm: "Confirmar nueva contraseña",
      submit: "Restablecer contraseña",
      submitting: "Restableciendo...",
      successInfo: "✅ Tu contraseña se ha restablecido correctamente.",
      loginText: "Ahora puedes",
      loginLink: "iniciar sesión",
      errors: {
        empty: "Por favor, completa todos los campos.",
        mismatch: "Las contraseñas no coinciden.",
        generic: "Ocurrió un error. Inténtalo de nuevo.",
      },
    },
    catalan: {
      title: "Restablir contrasenya",
      subtitle: "Tria una nova contrasenya per protegir el teu compte.",
      newPassword: "Nova contrasenya",
      confirmPassword: "Confirma la nova contrasenya",
      placeholderNew: "Nova contrasenya",
      placeholderConfirm: "Confirma la nova contrasenya",
      submit: "Restablir contrasenya",
      submitting: "Restablint...",
      successInfo: "✅ La teva contrasenya s’ha restablert correctament.",
      loginText: "Ara pots",
      loginLink: "iniciar sessió",
      errors: {
        empty: "Si us plau, omple tots els camps.",
        mismatch: "Les contrasenyes no coincideixen.",
        generic: "Alguna cosa ha anat malament. Torna-ho a intentar.",
      },
    },
  };

  const text = content[language] || content.english;

  /* ================= HANDLER ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !password || !confirmPassword) {
      setErrorMessage(text.errors.empty);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(text.errors.mismatch);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const res = await ModuleObject.service.resetPassword(token, password);
      await wait();

      setSuccess(true);
      setSuccessMessage(res.message);
    } catch (error: any) {
      setErrorMessage(error?.message || text.errors.generic);
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="w-full max-w-md mt-10">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
            {/* Header */}
            <div className="flex flex-col items-center gap-3 mb-6 text-center">
              <Lock className="text-white" size={32} />
              <h2 className="text-3xl text-white drop-shadow-lg">
                {text.title}
              </h2>
              <p className="text-white/70 drop-shadow">{text.subtitle}</p>
            </div>

            {successMessage && <CustomSuccess message={successMessage} />}
            {errorMessage && <CustomAlert message={errorMessage} />}

            {success ? (
              <div className="text-center space-y-4">
                <p className="text-white/80 text-sm bg-green-500/20 border border-green-500/40 rounded-lg p-3">
                  {text.successInfo}
                </p>
                <p className="text-white/80">
                  {text.loginText}{" "}
                  <a
                    href="/auth/login"
                    className="underline hover:text-white/90"
                  >
                    {text.loginLink}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Password */}
                <div>
                  <label className="block text-white mb-2">
                    {text.newPassword}
                  </label>
                  <div className="relative">
                    <Lock
                      size={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={text.placeholderNew}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-12 py-3 bg-white/20 border border-white/30 rounded-lg text-black placeholder-white/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm */}
                <div>
                  <label className="block text-white mb-2">
                    {text.confirmPassword}
                  </label>
                  <div className="relative">
                    <Lock
                      size={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={text.placeholderConfirm}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-11 pr-12 py-3 bg-white/20 border border-white/30 rounded-lg text-black placeholder-white/40"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full px-6 py-4 bg-white/30 border-2 border-white/40 rounded-xl text-white text-lg hover:bg-white/40 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{text.submitting}</span>
                    </>
                  ) : (
                    text.submit
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
