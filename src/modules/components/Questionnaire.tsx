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
      name: "Full Name",
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
    <div className="relative w-full h-full min-h-0 overflow-hidden">
      {/* Back button */}
      <button
        onClick={onBack}
        type="button"
        className="
          absolute z-20
          left-3 sm:left-4 md:left-5
          top-[max(8px,env(safe-area-inset-top))]
          flex items-center gap-2
          rounded-full
          border border-white/20
          bg-white/10 backdrop-blur-md
          px-3 py-2
          text-white drop-shadow
          hover:opacity-70 transition-opacity
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
          className="shrink-0"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className="text-xs sm:text-sm md:text-base">{text.back}</span>
      </button>

      {/* Content */}
      <div
        className="
          relative z-10
          flex h-full min-h-0 w-full items-center justify-center
          overflow-hidden
          px-4 sm:px-5 md:px-6
          pt-[max(56px,calc(env(safe-area-inset-top)+0.75rem))]
          pb-[max(14px,calc(env(safe-area-inset-bottom)+0.75rem))]
        "
      >
        <div className="mx-auto flex w-full max-w-lg min-h-0 flex-col justify-center">
          <h2
            className="mb-1 text-white drop-shadow-lg font-semibold leading-tight"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)" }}
          >
            {text.title}
          </h2>

          <p className="mb-4 text-sm sm:text-base text-white/90 drop-shadow">
            {text.subtitle}
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm sm:text-base text-white drop-shadow"
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
                className="
                  w-full rounded-lg border border-white/30
                  bg-white/20 backdrop-blur-md
                  px-4 py-2.5
                  text-black
                  placeholder-white/50
                  focus:outline-none focus:ring-2 focus:ring-white/50
                "
              />
            </div>

            <div>
              <label className="mb-1 block text-sm sm:text-base text-white drop-shadow">
                {text.ageRange}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {["-18", "-22", "-25", "-30", "-50", "+50"].map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => handleSelectAgeRange(range)}
                    className={`rounded-lg px-2 py-2 cursor-pointer transition-all ${
                      formData.ageRange === range
                        ? "border-2 border-white/50 bg-white/30 backdrop-blur-sm"
                        : "border-2 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                    }`}
                  >
                    <span className="text-[11px] sm:text-xs text-white drop-shadow">
                      {range}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm sm:text-base text-white drop-shadow">
                {text.language}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["catalan", "spanish", "english"].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => handleSelectLanguage(lang)}
                    className={`rounded-lg px-3 py-2 cursor-pointer transition-all ${
                      formData.language === lang
                        ? "border-2 border-white/50 bg-white/30 backdrop-blur-sm"
                        : "border-2 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20"
                    }`}
                  >
                    <span className="capitalize text-xs sm:text-sm text-white drop-shadow">
                      {lang}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm sm:text-base text-white drop-shadow"
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
                className="
                  w-full rounded-lg border border-white/30
                  bg-white/20 backdrop-blur-md
                  px-4 py-2.5
                  text-black
                  placeholder-white/50
                  focus:outline-none focus:ring-2 focus:ring-white/50
                "
              />

              {errorMessage && (
                <div className="mt-3 rounded-lg bg-red-500/70 px-3 py-2 text-sm text-white">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="mt-3 rounded-lg bg-emerald-500/70 px-3 py-2 text-sm text-white">
                  {successMessage}
                </div>
              )}

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
                {!success ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto whitespace-nowrap rounded-xl border-2 border-white/50 bg-gradient-to-r from-purple-500/50 to-pink-500/50 px-5 py-2.5 text-white shadow-xl backdrop-blur-md transition-all flex items-center justify-center gap-2 drop-shadow-lg ${
                      isSubmitting
                        ? "cursor-not-allowed opacity-70"
                        : "cursor-pointer hover:from-purple-500/60 hover:to-pink-500/60"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="text-sm font-medium">Loading...</span>
                    ) : (
                      <>
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
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-sm sm:text-base font-medium">
                          {text.submit}
                        </span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onSubmit}
                    className="
                      w-full sm:w-auto whitespace-nowrap
                      rounded-xl border-2 border-white/50
                      bg-gradient-to-r from-purple-500/50 to-pink-500/50
                      px-5 py-2.5
                      text-white shadow-xl backdrop-blur-md
                      transition-all hover:from-purple-500/60 hover:to-pink-500/60
                      flex items-center justify-center gap-2
                      drop-shadow-lg cursor-pointer
                    "
                  >
                    <span className="text-sm sm:text-base font-medium">
                      {text.continue}
                    </span>
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
