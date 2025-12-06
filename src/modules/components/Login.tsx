"use client";
import { wait } from "@/@disktro/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { UserModuleObject as ModuleObject } from "../module";

import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";

// Icon components
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

const ArrowLeft = ({ size = 24, className = "" }) => (
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
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
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

interface LoginProps {
  onBack: () => void;
  onLoginAsFan: () => void;
  onLoginAsArtist: () => void;
  language: string;
  onSignUp?: () => void; // 👈 nouvelle prop
}

// Mock user database - in real app this would be a backend
const mockUsers = [
  { email: "fan@example.com", password: "password123", type: "fan" },
  { email: "artist@example.com", password: "password123", type: "artist" },
  { email: "test@fan.com", password: "fan", type: "fan" },
  { email: "test@artist.com", password: "artist", type: "artist" },
];

export function Login({
  onBack,
  onLoginAsFan,
  onLoginAsArtist,
  language,
  onSignUp, // 👈 récupérée
}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const text = {
    spanish: {
      title: "Iniciar Sesión",
      subtitle: "Accede a tu cuenta para continuar",
      email: "Correo Electrónico",
      emailPlaceholder: "tu@email.com",
      password: "Contraseña",
      passwordPlaceholder: "Tu contraseña",
      loginButton: "Iniciar Sesión",
      forgotPassword: "¿Olvidaste tu contraseña?",
      noAccount: "¿No tienes cuenta?",
      signUp: "Regístrate",
      invalidCredentials: "Correo o contraseña incorrectos",
      fillFields: "Por favor completa todos los campos",
      back: "Volver",
      demoHint:
        "Demo: fan@example.com / artist@example.com (contraseña: password123)",
    },
    english: {
      title: "Log In",
      subtitle: "Access your account to continue",
      email: "Email Address",
      emailPlaceholder: "your@email.com",
      password: "Password",
      passwordPlaceholder: "Your password",
      loginButton: "Log In",
      forgotPassword: "Forgot your password?",
      noAccount: "Don't have an account?",
      signUp: "Sign Up",
      invalidCredentials: "Invalid email or password",
      fillFields: "Please fill in all fields",
      back: "Back",
      demoHint:
        "Demo: fan@example.com / artist@example.com (password: password123)",
    },
    catalan: {
      title: "Iniciar Sessió",
      subtitle: "Accedeix al teu compte per continuar",
      email: "Correu Electrònic",
      emailPlaceholder: "teu@email.com",
      password: "Contrasenya",
      passwordPlaceholder: "La teva contrasenya",
      loginButton: "Iniciar Sessió",
      forgotPassword: "Has oblidat la teva contrasenya?",
      noAccount: "No tens compte?",
      signUp: "Registra't",
      invalidCredentials: "Correu o contrasenya incorrectes",
      fillFields: "Si us plau omple tots els camps",
      back: "Tornar",
      demoHint:
        "Demo: fan@example.com / artist@example.com (contrasenya: password123)",
    },
  };

  const content = text[language as keyof typeof text] || text.english;
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill all fields");
      return;
    }
    console.log("Logging in with:", { email, password });
    try {
      setSuccessMessage("");
      setErrorMessage("");
      setIsLoading(true);
      setSuccess(false);
      const res = await ModuleObject.service.loginUser({ email, password });

      await wait();
      localStorage.setItem(ModuleObject.localState.ACCESS_TOKEN, res.token);
      localStorage.setItem(ModuleObject.localState.USER_ID, res.user.id);
      const res1 = await ModuleObject.service.getUser(res.user.id);
      localStorage.setItem(
        ModuleObject.localState.USER_DATA,
        JSON.stringify(res1.data)
      );
      localStorage.setItem(
        ModuleObject.localState.USER_ROLE,
        JSON.stringify(res1.data.type)
      );
      setSuccessMessage(res.message);
      setIsLoading(false);
      setSuccess(true);
      if (res1.data.type === "artist") {
        router.push("/dashboard/artist/select");
      } else {
        router.push("/dashboard/fan-streaming");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage((error as Error).message);
      setIsLoading(false);
      setSuccess(false);
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

      {/* Content */}
      <div className="relative w-full h-full overflow-y-auto flex items-center justify-center p-6">
        <div className="w-full max-w-md mt-10">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Music className="text-white" size={32} />
                </div>
                <h1 className="text-3xl text-white drop-shadow-lg">
                  {content.title}
                </h1>
                <p className="text-white/70 drop-shadow mt-1">
                  {content.subtitle}
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-white drop-shadow mb-2">
                  {content.email}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Mail className="text-white/60" size={20} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={content.emailPlaceholder}
                    className="w-full pl-11 pr-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-white drop-shadow mb-2">
                  {content.password}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Lock className="text-white/60" size={20} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={content.passwordPlaceholder}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-black placeholder-white/40 focus:outline-none focus:ring-2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 
              p-1.5 rounded-full 
             text-black/90 hover:text-black/100 cursor-pointer backdrop-blur-sm"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3 text-white text-sm">
                  {error}
                </div>
              )}

              {/* Demo Hint */}
              {/* <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-3 text-white/80 text-xs">
                {content.demoHint}
              </div> */}

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  href="/auth/password-forgot"
                  className="text-white/70 hover:text-white text-sm underline transition-all"
                >
                  {content.forgotPassword}
                </Link>
              </div>
              {successMessage && (
                <p className="m-4 text-sm text-green-400">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="m-4 text-sm text-center text-red-400">
                  {errorMessage}
                </p>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer px-6 py-4 bg-white/30 backdrop-blur-md border-2 border-white/40 rounded-xl text-white text-lg hover:bg-white/40 hover:border-white/60 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{content.loginButton}...</span>
                  </div>
                ) : (
                  content.loginButton
                )}
              </button>

              {/* Sign Up Link */}
              <div className="text-center pt-4 border-t border-white/20">
                <p className="text-white/70 text-sm">
                  {content.noAccount}{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onSignUp) onSignUp();
                      else onBack();
                    }}
                    className="text-white hover:underline"
                  >
                    {content.signUp}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
