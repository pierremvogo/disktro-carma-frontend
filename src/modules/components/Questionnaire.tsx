import React, { useState, useMemo } from "react";
import { TesterModuleObject as ModuleObject } from "../testers/module";
import type { TesterPayload } from "../testers/module";

interface QuestionnaireProps {
  onBack: () => void;
  onSubmit: () => void;
  language: string;
  onShowLogin?: () => void;
  onSkipToSignUp?: () => void;
}

export function Questionnaire({
  onBack,
  onSubmit,
  language,
  onShowLogin,
  onSkipToSignUp,
}: QuestionnaireProps) {
  const [formData, setFormData] = useState({
    name: "",
    ageRange: "",
    language: language || "english",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const content = {
    spanish: {
      errors: {
        generic: "Algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      },
      title: "Únete a nuestro grupo de pruebas",
      subtitle: "Ayúdanos a construir el futuro de la música para todos",
      name: "Nombre",
      ageRange: "Rango de edad",
      language: "Idioma",
      email: "Correo electrónico",
      submit: "Enviar solicitud",
      back: "Volver",
      requiredAgeAndLanguage:
        "Por favor, selecciona tu rango de edad e idioma.",
      success:
        "Solicitud enviada con éxito. Por favor, revisa tu correo electrónico.",
      alreadyTester: "¿Ya eres tester?",
      login: "Inicia sesión",
      noAccount: "¿No tienes cuenta?",
      signUp: "Regístrate",
      continue: "continuar",
    },
    english: {
      errors: {
        generic: "Something went wrong. Please try again later.",
      },
      title: "Join Our Testing Group",
      subtitle: "Help us build the future of music for everybody",
      name: "Name",
      ageRange: "Age Range",
      language: "Language",
      email: "Email",
      submit: "Submit Application",
      back: "Back",
      requiredAgeAndLanguage: "Please select your age range and language.",
      success: "Application submitted successfully. Please check your Email!",
      alreadyTester: "Already a tester?",
      login: "Log in",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      continue: "continue",
    },
    catalan: {
      errors: {
        generic:
          "Alguna cosa ha anat malament. Si us plau, torna-ho a provar més tard.",
      },
      title: "Uneix-te al nostre grup de proves",
      subtitle: "Ajuda'ns a construir el futur de la música per a tothom",
      name: "Nom",
      ageRange: "Rang d'edat",
      language: "Idioma",
      email: "Correu electrònic",
      submit: "Enviar sol·licitud",
      back: "Tornar",
      requiredAgeAndLanguage:
        "Si us plau, selecciona el teu rang d'edat i idioma.",
      success:
        "Sol·licitud enviada correctament. Si us plau, comprova el teu correu electrònic.",
      alreadyTester: "Ja ets tester?",
      login: "Inicia sessió",
      noAccount: "No tens compte?",
      signUp: "Registra't",
      continue: "continua",
    },
  };

  const text = content[language as keyof typeof content] || content.english;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectAgeRange = (range: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setFormData((prev) => ({ ...prev, ageRange: range }));
  };

  const handleSelectLanguage = (lang: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setFormData((prev) => ({ ...prev, language: lang }));
  };

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.ageRange !== "" &&
      formData.language !== ""
    );
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setSuccess(false);

    if (!isFormValid) {
      setErrorMessage(text.requiredAgeAndLanguage);
      return;
    }

    const payload: TesterPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      ageRange: formData.ageRange as TesterPayload["ageRange"],
      language: formData.language as TesterPayload["language"],
    };

    try {
      setIsSubmitting(true);
      await ModuleObject.service.createTester(payload);
      setSuccessMessage(text.success);
      setSuccess(true);
      setFormData({
        name: "",
        ageRange: "",
        language: language || "english",
        email: "",
      });
    } catch (err: any) {
      setErrorMessage(text.errors.generic);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      {/* ✅ FIXED BACK BUTTON (ne scroll pas) */}
      <button
        onClick={onBack}
        type="button"
        className="
          fixed z-50
          left-4 sm:left-6
          top-[calc(env(safe-area-inset-top)+1rem)]
          flex items-center gap-2
          text-white drop-shadow
          hover:opacity-70 transition-opacity
          bg-white/10 backdrop-blur-md
          border border-white/20
          rounded-full
          px-3 py-2
        "
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className="text-sm sm:text-base">{text.back}</span>
      </button>

      {/* ✅ SCROLL AREA (SEUL CE CONTAINER SCROLLE) */}
      <div
        className="
          relative z-10
          h-[100dvh]
          overflow-y-auto overscroll-contain
          touch-pan-y
          px-4 sm:px-6
          pt-[calc(env(safe-area-inset-top)+1rem+3.25rem)]
          pb-[calc(env(safe-area-inset-bottom)+1rem)]
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="max-w-lg mx-auto w-full pt-2 pb-8">
          <h2 className="text-white drop-shadow-lg mb-1 text-xl sm:text-2xl">
            {text.title}
          </h2>
          <p className="text-white/90 drop-shadow mb-4 text-sm sm:text-base">
            {text.subtitle}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-white drop-shadow mb-1"
              >
                {text.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div>
              <label className="block text-white drop-shadow mb-1">
                {text.ageRange}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {["-18", "-22", "-25", "-30", "-50", "+50"].map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => handleSelectAgeRange(range)}
                    className={`px-2 py-2 cursor-pointer rounded-lg transition-all ${
                      formData.ageRange === range
                        ? "bg-white/30 backdrop-blur-sm border-2 border-white/50"
                        : "bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20"
                    }`}
                  >
                    <span className="text-white drop-shadow text-xs">
                      {range}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-white drop-shadow mb-1">
                {text.language}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["catalan", "spanish", "english"].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => handleSelectLanguage(lang)}
                    className={`px-3 py-2 cursor-pointer rounded-lg transition-all ${
                      formData.language === lang
                        ? "bg-white/30 backdrop-blur-sm border-2 border-white/50"
                        : "bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20"
                    }`}
                  >
                    <span className="text-white drop-shadow capitalize">
                      {lang}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-white drop-shadow mb-1"
              >
                {text.email}
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />

              {errorMessage && (
                <div className="mt-3 px-3 py-2 rounded-lg bg-red-500/70 text-white text-sm">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="mt-3 px-3 py-2 rounded-lg bg-emerald-500/70 text-white text-sm">
                  {successMessage}
                </div>
              )}

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                {!success ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto px-6 cursor-pointer py-2 bg-gradient-to-r from-purple-500/50 to-pink-500/50 backdrop-blur-md border-2 border-white/50 rounded-xl text-white drop-shadow-lg hover:from-purple-500/60 hover:to-pink-500/60 transition-all flex items-center justify-center gap-2 shadow-xl whitespace-nowrap ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="text-sm font-medium">Loading...</span>
                    ) : (
                      <>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="font-medium">{text.submit}</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onSubmit}
                    className="w-full sm:w-auto px-6 cursor-pointer py-2 bg-gradient-to-r from-purple-500/50 to-pink-500/50 backdrop-blur-md border-2 border-white/50 rounded-xl text-white drop-shadow-lg hover:from-purple-500/60 hover:to-pink-500/60 transition-all flex items-center justify-center gap-2 shadow-xl whitespace-nowrap"
                  >
                    <span className="font-medium">{text.continue}</span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
