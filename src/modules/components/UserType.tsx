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
        relative w-full h-full min-h-0
        flex flex-col items-center justify-center
        overflow-hidden
        px-4 sm:px-6 md:px-8
        pt-[max(56px,calc(env(safe-area-inset-top)+0.75rem))]
        pb-[max(16px,calc(env(safe-area-inset-bottom)+0.75rem))]
      "
    >
      {/* Back button */}
      <button
        onClick={() => router.replace("/home/?view=home")}
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

      <div className="w-full max-w-2xl min-h-0 flex flex-col items-center justify-center text-center">
        <h2
          className="text-white drop-shadow-lg font-semibold leading-tight mb-4 sm:mb-5 md:mb-6"
          style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)" }}
        >
          {text.title}
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          <button
            onClick={() => handleSelection("artist")}
            type="button"
            className="
              cursor-pointer w-full
              rounded-2xl
              border-2 border-white/30
              bg-white/20 backdrop-blur-md
              text-white drop-shadow
              hover:bg-white/30 hover:border-white/50
              transition-all active:scale-[0.99]
              px-5 sm:px-6
              py-6 sm:py-7 md:py-8
            "
          >
            <div className="text-lg sm:text-xl md:text-2xl leading-tight">
              {text.artist}
            </div>
          </button>

          <button
            onClick={() => handleSelection("fan")}
            type="button"
            className="
              cursor-pointer w-full
              rounded-2xl
              border-2 border-white/30
              bg-white/20 backdrop-blur-md
              text-white drop-shadow
              hover:bg-white/30 hover:border-white/50
              transition-all active:scale-[0.99]
              px-5 sm:px-6
              py-6 sm:py-7 md:py-8
            "
          >
            <div className="text-lg sm:text-xl md:text-2xl leading-tight">
              {text.fan}
            </div>
          </button>
        </div>

        <div className="mt-5 sm:mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => router.replace("/home/?view=question")}
            className="cursor-pointer text-xs sm:text-sm text-white/90 drop-shadow hover:opacity-70 transition-opacity"
          >
            {text.questionnaireLink}
          </button>

          <button
            type="button"
            onClick={() => router.replace("/home/?view=home")}
            className="cursor-pointer text-xs sm:text-sm text-white/90 drop-shadow hover:opacity-70 transition-opacity"
          >
            {text.welcomeLink}
          </button>
        </div>
      </div>
    </div>
  );
}
