import React from "react";
import { useRouter } from "next/navigation";

interface UserTypeProps {
  onBack: () => void;
  onSelectArtist: () => void;
  onSelectFan: () => void;
  language: string;
  onGoToQuestionnaire?: () => void;
  onGoToWelcome?: () => void;
}

export function UserType({
  onBack,
  onSelectArtist,
  onSelectFan,
  language,
  onGoToQuestionnaire,
  onGoToWelcome,
}: UserTypeProps) {
  const content = {
    spanish: {
      title: "¿Quién eres?",
      artist: "Soy un artista",
      fan: "Soy un fan",
      back: "Volver",
      questionnaireLink:
        "¿Quieres ayudarnos a probar la plataforma? Completa el cuestionario",
      welcomeLink:
        "Volver a la página de bienvenida para disfrutar de nuestras actuaciones!",
    },
    english: {
      title: "Who are you?",
      artist: "I am an artist",
      fan: "I am a fan",
      back: "Back",
      questionnaireLink:
        "Want to help us test out the platform? Fill out the questionnaire",
      welcomeLink: "Go back to welcome page to enjoy our performances!",
    },
    catalan: {
      title: "Qui ets?",
      artist: "Sóc un artista",
      fan: "Sóc un fan",
      back: "Tornar",
      questionnaireLink:
        "Vols ajudar-nos a provar la plataforma? Completa el qüestionari",
      welcomeLink:
        "Tornar a la pàgina de benvinguda per gaudir de les nostres actuacions!",
    },
  };
  const router = useRouter();

  const text = content[language as keyof typeof content];

  const handleSelection = (type: string) => {
    if (type === "artist") onSelectArtist();
    else onSelectFan();
  };

  return (
    <div
      className="
        relative w-full
        min-h-[100svh] md:min-h-screen
        flex flex-col items-center justify-start
        px-4 sm:px-6 md:px-8
        py-15
        pt-[calc(env(safe-area-inset-top)+7rem)]
        pb-[calc(env(safe-area-inset-bottom)+2.5rem)]
      "
    >
      {/* Back button (safe on notch + always visible) */}
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

      <div className="w-full max-w-2xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl mt-12 text-white drop-shadow-lg mb-8 sm:mb-10 md:mb-12">
          {text.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <button
            onClick={() => handleSelection("artist")}
            type="button"
            className="
              cursor-pointer
              w-full
              px-6 sm:px-8
              py-8 sm:py-10 md:py-12
              rounded-2xl
              bg-white/20 backdrop-blur-md
              border-2 border-white/30
              text-white drop-shadow
              hover:bg-white/30 hover:border-white/50
              transition-all
              active:scale-[0.99]
            "
          >
            <div className="text-xl sm:text-2xl">{text.artist}</div>
          </button>

          <button
            onClick={() => handleSelection("fan")}
            type="button"
            className="
              cursor-pointer
              w-full
              px-6 sm:px-8
              py-8 sm:py-10 md:py-12
              rounded-2xl
              bg-white/20 backdrop-blur-md
              border-2 border-white/30
              text-white drop-shadow
              hover:bg-white/30 hover:border-white/50
              transition-all
              active:scale-[0.99]
            "
          >
            <div className="text-xl sm:text-2xl">{text.fan}</div>
          </button>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => router.replace("/home/?view=question")}
            className="cursor-pointer text-sm text-white/90 drop-shadow hover:opacity-70 transition-opacity"
          >
            {text.questionnaireLink}
          </button>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => router.replace("/home/?view=home")}
            className="cursor-pointer text-sm text-white/90 drop-shadow hover:opacity-70 transition-opacity"
          >
            {text.welcomeLink}
          </button>
        </div>
      </div>
    </div>
  );
}
