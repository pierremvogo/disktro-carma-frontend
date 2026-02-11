"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import { UserModuleObject as ModuleObject } from "../module";
import { MediaModuleObject as MediaModule } from "../file/module";
import { wait } from "@/@disktro/utils";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import Select from "react-select";
import countryList from "react-select-country-list";
import CustomSuccess from "@/@disktro/CustomSuccess";
import CustomAlert from "@/@disktro/CustomAlert";
import { AccessibilityButton } from "./accessibilityButton/AccessibilityButton";

// Icon components
const User = ({ size = 24, className = "" }) => (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

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

const Shield = ({ size = 24, className = "" }) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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

interface FanProfileSetupProps {
  onComplete: () => void;
  onBack: () => void;
  language: string;
  onSignUp?: () => void; // 👈 nouvelle prop
}

export function FanProfileSetup({
  onComplete,
  onBack,
  language,
  onSignUp,
}: FanProfileSetupProps) {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [country, setCountry] = useState<string>(""); // code pays (ex: "FR")
  const options = React.useMemo(() => countryList().getData(), []);

  const [isDraggingPic, setIsDraggingPic] = useState(false);
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);

  // Petits helpers
  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropProfile = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    setIsDraggingPic(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    // Utilise la même logique que handleProfilePicture
    const fakeEvent = { target: { files: [file] } } as any;
    handleImageChange(fakeEvent);
  };

  const text = {
    spanish: {
      title: "Configura Tu Perfil de Fan",
      subtitle:
        "Completa tu información para comenzar a disfrutar de la música",
      profileInfo: "Información de Perfil",
      accountSecurity: "Seguridad de Cuenta",
      profilePicture: "Foto de Perfil",
      uploadPhoto: "Subir foto",
      username: "Nombre de Usuario",
      usernamePlaceholder: "Tu nombre de usuario",
      bio: "Bio",
      bioPlaceholder: "Cuéntanos sobre ti y tu música favorita...",
      email: "Correo Electrónico",
      emailPlaceholder: "tu@email.com",
      verifyEmail: "Verificar Email",
      emailVerified: "Email Verificado",
      sendVerification: "Enviar Código de Verificación",
      verificationCode: "Código de Verificación",
      verificationCodePlaceholder: "Ingresa el código de 6 dígitos",
      verify: "Verificar",
      password: "Contraseña",
      passwordPlaceholder: "Crea una contraseña segura",
      confirmPassword: "Confirmar Contraseña",
      confirmPasswordPlaceholder: "Confirma tu contraseña",
      twoFactor: "Autenticación de Dos Factores",
      twoFactorDesc: "Añade una capa extra de seguridad",
      enable: "Habilitar",
      enabled: "Habilitado",
      passwordRequirements: "La contraseña debe tener al menos 8 caracteres",
      passwordMatch: "Las contraseñas coinciden",
      passwordMismatch: "Las contraseñas no coinciden",
      completeSetup: "Completar Configuración",
      back: "Volver",
      errors: {
        generic: "Algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      },
      text: {
        error: {
          fillAllProfileFields:
            "Por favor complete todos los campos del perfil.",
          enterEmail: "Por favor ingrese una dirección de correo electrónico.",
          passwordMinLength: "La contraseña debe tener al menos 8 caracteres.",
          passwordsDontMatch: "Las contraseñas no coinciden.",
          generic: "Ocurrió un error. Por favor, inténtelo de nuevo.",
        },
        success: {
          profileCreated: "Perfil de artista creado con éxito.",
        },
      },
    },
    english: {
      errors: {
        generic: "Something went wrong. Please try again later.",
      },
      noAlbumUploadedYet: "No album uploaded yet.",

      title: "Set Up Your Fan Profile",
      subtitle: "Complete your information to start enjoying music",
      profileInfo: "Profile Information",
      accountSecurity: "Account Security",
      profilePicture: "Profile Picture",
      uploadPhoto: "Upload photo",
      username: "Username",
      usernamePlaceholder: "Your username",
      bio: "Bio",
      bioPlaceholder: "Tell us about yourself and your favorite music...",
      email: "Email Address",
      emailPlaceholder: "your@email.com",
      verifyEmail: "Verify Email",
      emailVerified: "Email Verified",
      sendVerification: "Send Verification Code",
      verificationCode: "Verification Code",
      verificationCodePlaceholder: "Enter 6-digit code",
      verify: "Verify",
      password: "Password",
      passwordPlaceholder: "Create a strong password",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm your password",
      twoFactor: "Two-Factor Authentication",
      twoFactorDesc: "Add an extra layer of security",
      enable: "Enable",
      enabled: "Enabled",
      passwordRequirements: "Password must be at least 8 characters",
      passwordMatch: "Passwords match",
      passwordMismatch: "Passwords do not match",
      completeSetup: "Complete Setup",
      back: "Back",
      text: {
        error: {
          fillAllProfileFields: "Please fill in all profile fields.",
          enterEmail: "Please enter an email address.",
          passwordMinLength: "Password must be at least 8 characters long.",
          passwordsDontMatch: "Passwords do not match.",
          generic: "An error occurred. Please try again.",
        },
        success: {
          profileCreated: "Artist profile created successfully.",
        },
      },
    },
    catalan: {
      text: {
        error: {
          fillAllProfileFields: "Si us plau, ompliu tots els camps del perfil.",
          enterEmail: "Si us plau, introduïu una adreça de correu electrònic.",
          passwordMinLength: "La contrasenya ha de tenir almenys 8 caràcters.",
          passwordsDontMatch: "Les contrasenyes no coincideixen.",
          generic: "S'ha produït un error. Si us plau, torneu-ho a intentar.",
        },
        success: {
          profileCreated: "Perfil d'artista creat amb èxit.",
        },
      },
      errors: {
        generic:
          "Alguna cosa ha anat malament. Si us plau, torna-ho a provar més tard.",
      },
      title: "Configura El Teu Perfil de Fan",
      subtitle:
        "Completa la teva informació per començar a gaudir de la música",
      profileInfo: "Informació de Perfil",
      accountSecurity: "Seguretat del Compte",
      profilePicture: "Foto de Perfil",
      uploadPhoto: "Pujar foto",
      username: "Nom d'Usuari",
      usernamePlaceholder: "El teu nom d'usuari",
      bio: "Bio",
      bioPlaceholder: "Explica'ns sobre tu i la teva música favorita...",
      email: "Correu Electrònic",
      emailPlaceholder: "teu@email.com",
      verifyEmail: "Verificar Email",
      emailVerified: "Email Verificat",
      sendVerification: "Enviar Codi de Verificació",
      verificationCode: "Codi de Verificació",
      verificationCodePlaceholder: "Introdueix el codi de 6 dígits",
      verify: "Verificar",
      password: "Contrasenya",
      passwordPlaceholder: "Crea una contrasenya segura",
      confirmPassword: "Confirmar Contrasenya",
      confirmPasswordPlaceholder: "Confirma la teva contrasenya",
      twoFactor: "Autenticació de Dos Factors",
      twoFactorDesc: "Afegeix una capa extra de seguretat",
      enable: "Habilitar",
      enabled: "Habilitat",
      passwordRequirements: "La contrasenya ha de tenir almenys 8 caràcters",
      passwordMatch: "Les contrasenyes coincideixen",
      passwordMismatch: "Les contrasenyes no coincideixen",
      completeSetup: "Completar Configuració",
      back: "Tornar",
    },
  };

  const content = text[language as keyof typeof text] || text.english;

  // 👇 Gestion de la photo de profil comme dans ProfileSettings
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const handleVerifyEmail = () => {
    setShowVerificationCode(true);
  };

  const handleVerifyCode = () => {
    if (verificationCode === "123456") {
      setEmailVerified(true);
      setShowVerificationCode(false);
    }
  };

  const handleEnableTwoFactor = () => {
    setTwoFactorEnabled(true);
  };

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;
  const passwordValid = password.length >= 8;

  // ⚙️ Upload image comme dans ProfileSettings
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(ModuleObject.localState.USER_ID);
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMessage("");
    setSuccess(false);
    setIsLoading(true);
    setPreviewUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await MediaModule.service.uploadImageFile(formData);
      if (res && res.url) {
        setProfileImageUrl(res.url);
        if (userId) {
          await ModuleObject.service.updateUser(userId, {
            profileImageUrl: res.url,
          });
        }
        setSuccess(true);
        setIsLoading(false);
        setErrorMessage("");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage(content.errors.generic);
      setIsLoading(false);
      setSuccess(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);
    setErrors({}); // reset previous errors

    // Récupérer la langue dans localStorage
    const language =
      (typeof window !== "undefined" &&
        localStorage.getItem("disktro_language")) ||
      "english";

    if (!username || !bio) {
      setErrorMessage(content.text.error.fillAllProfileFields);
      setIsLoading(false);
      return;
    }

    if (!email) {
      setErrorMessage(content.text.error.enterEmail);
      setIsLoading(false);
      return;
    }

    if (!passwordValid) {
      setErrorMessage(content.text.error.passwordMinLength);
      setIsLoading(false);
      return;
    }

    if (!passwordsMatch) {
      setErrorMessage(content.text.error.passwordsDontMatch);
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        name: "name",
        surname: "surname",
        username,
        email,
        password,
        type: "fan",
        artistName: "artistName",
        realName: "realName",
        genre: "gender",
        bio,
        emailVerified,
        twoFactorEnabled,
        country: country || undefined,
        profileImageUrl, // URL de l'image
        language, // 👈 on ajoute la langue ici
      };

      const res = await ModuleObject.service.createUser(payload);
      await wait();
      setSuccessMessage(content.text.success.profileCreated);
      setErrorMessage("");
      setIsLoading(false);
      router.push("/auth/confirm-email");
    } catch (err) {
      console.error(err);
      setErrorMessage(content.errors.generic);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden text-white">
      {/* ================= FIXED BACKGROUND ================= */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("/image/4ac3eed398bb68113a14d0fa5efe7a6def6f7651.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scale(1.03)",
        }}
      />

      {/* ================= FIXED OVERLAY ================= */}
      <div className="fixed inset-0 -z-10 bg-black/50" />

      {/* ================= ACCESSIBILITY BUTTON ================= */}
      <div className="relative z-20">
        <AccessibilityButton language={language} />
      </div>

      {/* ================= SCROLL CONTAINER ================= */}
      <div
        className="
          relative z-10
          h-[100dvh]
          overflow-y-auto overscroll-contain
          touch-pan-y
          px-4 sm:px-6
          pt-[calc(env(safe-area-inset-top)+1.25rem)]
          pb-[calc(env(safe-area-inset-bottom)+1.25rem)]
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="min-h-full flex items-center justify-center py-6">
          <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl">
            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (onSignUp) onSignUp();
                  else onBack();
                }}
                className="p-2 hover:bg-white/10 cursor-pointer rounded-lg transition-all flex-shrink-0"
                aria-label="Back"
              >
                <ArrowLeft className="text-white" size={24} />
              </button>

              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl text-white drop-shadow-lg">
                  {content.title}
                </h1>
                <p className="text-white/70 drop-shadow mt-1 text-sm sm:text-base">
                  {content.subtitle}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-2 gap-8 mb-5">
                {/* Profile Information Section */}
                <div className="space-y-6">
                  <h2 className="text-xl sm:text-2xl text-white drop-shadow-lg flex items-center gap-2">
                    <User size={24} />
                    {content.profileInfo}
                  </h2>

                  {/* Profile Picture */}
                  <div>
                    <label className="block text-white drop-shadow mb-3">
                      {content.profilePicture}
                    </label>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragEnter={(e) => {
                        e.preventDefault();
                        setIsDraggingPic(true);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setIsDraggingPic(false);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDraggingPic(false);
                        const file = e.dataTransfer.files[0];
                        if (file && file.type.startsWith("image/")) {
                          handleImageChange({
                            target: { files: [file] },
                          } as any);
                        }
                      }}
                      className={`aspect-square w-full max-w-xs mx-auto sm:mx-0
                        border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer
                        flex items-center justify-center overflow-hidden
                        ${
                          isDraggingPic
                            ? "border-white/80 bg-white/15"
                            : "border-white/30 bg-white/5 hover:bg-white/10"
                        }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />

                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <User
                            size={48}
                            className="text-white/40 mx-auto mb-2"
                          />
                          <p className="text-white/60 text-sm">
                            {content.uploadPhoto}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-white drop-shadow mb-2">
                      {content.username}
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={content.usernamePlaceholder}
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-white drop-shadow mb-2">
                      Country
                    </label>
                    <Select
                      options={options}
                      value={
                        options.find((opt: any) => opt.value === country) ||
                        null
                      }
                      onChange={(opt) =>
                        setCountry(opt ? (opt as any).value : "")
                      }
                      className="text-black cursor-pointer"
                      classNamePrefix="react-select-country"
                      placeholder="Select your country"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white drop-shadow mb-2">
                      {content.email}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={content.emailPlaceholder}
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                      disabled={emailVerified}
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-white drop-shadow mb-2">
                      {content.bio}
                    </label>
                    <textarea
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder={content.bioPlaceholder}
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                    />
                  </div>
                </div>

                {/* Account Security Section */}
                <div className="space-y-6">
                  <h2 className="text-xl sm:text-2xl text-white drop-shadow-lg flex items-center gap-2">
                    <Shield size={24} />
                    {content.accountSecurity}
                  </h2>

                  {/* Password */}
                  <div>
                    <label className="block text-white drop-shadow mb-2">
                      {content.password}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={content.passwordPlaceholder}
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-black/90 hover:text-black cursor-pointer backdrop-blur-sm"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    {password && (
                      <p
                        className={`text-sm mt-2 ${
                          passwordValid ? "text-green-400" : "text-yellow-400"
                        }`}
                      >
                        {content.passwordRequirements}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-white drop-shadow mb-2">
                      {content.confirmPassword}
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={content.confirmPasswordPlaceholder}
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-black placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-black/90 hover:text-black cursor-pointer backdrop-blur-sm"
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    {confirmPassword && (
                      <p
                        className={`text-sm mt-2 ${
                          passwordsMatch ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {passwordsMatch
                          ? content.passwordMatch
                          : content.passwordMismatch}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages d'erreur / succès */}
              {successMessage && <CustomSuccess message={successMessage} />}
              {errorMessage && <CustomAlert message={errorMessage} />}

              {/* Complete Button */}
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto px-8 cursor-pointer py-4 bg-white/30 backdrop-blur-md border-2 border-white/40 rounded-xl text-white text-base sm:text-lg hover:bg-white/40 hover:border-white/60 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{content.completeSetup}...</span>
                    </div>
                  ) : (
                    content.completeSetup
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
