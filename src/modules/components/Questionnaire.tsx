import React, { useState, useMemo } from "react";
import { TesterModuleObject as ModuleObject } from "../testers/module";
import type { TesterPayload } from "../testers/module";

interface QuestionnaireProps {
  onBack: () => void;
  onSubmit: () => void; // appelé quand la création du tester réussit
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

  const content = {
    spanish: {
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
      genericError:
        "Ha ocurrido un error al enviar tu solicitud. Inténtalo de nuevo.",
      success: "¡Solicitud enviada con éxito!",
      alreadyTester: "¿Ya eres tester?",
      login: "Inicia sesión",
      noAccount: "¿No tienes cuenta?",
      signUp: "Regístrate",
    },
    english: {
      title: "Join Our Testing Group",
      subtitle: "Help us build the future of music for everybody",
      name: "Name",
      ageRange: "Age Range",
      language: "Language",
      email: "Email",
      submit: "Submit Application",
      back: "Back",
      requiredAgeAndLanguage: "Please select your age range and language.",
      genericError:
        "An error occurred while submitting your application. Please try again.",
      success: "Application submitted successfully!",
      alreadyTester: "Already a tester?",
      login: "Log in",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
    },
    catalan: {
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
      genericError:
        "S'ha produït un error en enviar la sol·licitud. Torna-ho a intentar.",
      success: "Sol·licitud enviada correctament!",
      alreadyTester: "Ja ets tester?",
      login: "Inicia sessió",
      noAccount: "No tens compte?",
      signUp: "Registra't",
    },
  };

  const text = content[language as keyof typeof content] || content["english"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectAgeRange = (range: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setFormData((prev) => ({
      ...prev,
      ageRange: range,
    }));
  };

  const handleSelectLanguage = (lang: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setFormData((prev) => ({
      ...prev,
      language: lang,
    }));
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

    if (!formData.ageRange || !formData.language) {
      setErrorMessage(text.requiredAgeAndLanguage);
      return;
    }

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
      // Optionnel : reset du formulaire
      setFormData({
        name: "",
        ageRange: "",
        language: language || "english",
        email: "",
      });
      // Notification au parent (ex: fermer modal, passer à l'étape suivante, etc.)
      onSubmit();
    } catch (err: any) {
      // Gestion d'erreur inspirée des pattern classiques
      const apiMessage =
        err?.response?.data?.message || err?.message || text.genericError;
      setErrorMessage(apiMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto px-4 py-2 flex flex-col justify-start relative">
      <button
        onClick={onBack}
        type="button"
        className="absolute cursor-pointer top-2 left-2 flex items-center gap-2 text-white drop-shadow hover:opacity-70 transition-opacity"
      >
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
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {text.back}
      </button>

      <div className="max-w-lg mx-auto w-full pt-8">
        <h2 className="text-white drop-shadow-lg mb-1">{text.title}</h2>
        <p className="text-white/90 drop-shadow mb-3">{text.subtitle}</p>

        {/* zone messages */}
        {errorMessage && (
          <div className="mb-3 px-3 py-2 rounded-lg bg-red-500/70 text-white text-sm">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-3 px-3 py-2 rounded-lg bg-emerald-500/70 text-white text-sm">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="name" className="block text-white drop-shadow mb-1">
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
            <div className="flex gap-1.5">
              {["-18", "-22", "-25", "-30", "-50", "+50"].map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => handleSelectAgeRange(range)}
                  className={`flex-1 px-1 py-2 cursor-pointer rounded-lg transition-all ${
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
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full sm:flex-1 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-6 cursor-pointer py-2 bg-gradient-to-r from-purple-500/50 to-pink-500/50 backdrop-blur-md border-2 border-white/50 rounded-xl text-white drop-shadow-lg hover:from-purple-500/60 hover:to-pink-500/60 transition-all flex items-center justify-center gap-2 shadow-xl whitespace-nowrap ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="text-sm font-medium">...</span>
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
