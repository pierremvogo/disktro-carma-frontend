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
        relative w-full min-h-dvh
        flex flex-col items-center justify-center
        overflow-hidden
        px-4 pt-20 pb-6
        sm:px-6 sm:pt-24 sm:pb-8
        md:px-8 md:pt-28 md:pb-10
        lg:px-10
        pt-[max(5rem,calc(env(safe-area-inset-top)+1.25rem))]
        pb-[max(1.5rem,calc(env(safe-area-inset-bottom)+1rem))]
      "
    >
      {/* Back button - Optimisé pour mobile */}
      <button
        onClick={() => router.replace("/home/?view=home")}
        type="button"
        aria-label={text.back}
        className="
          absolute z-20
          left-3 top-3
          sm:left-4 sm:top-4
          md:left-5 md:top-5
          flex items-center gap-1.5 sm:gap-2
          rounded-full
          border border-white/20
          bg-white/10 backdrop-blur-md
          shadow-lg shadow-black/10
          min-h-[44px] min-w-[44px]
          px-3 py-2
          sm:px-4 sm:py-2.5
          text-white font-medium
          hover:bg-white/20 hover:border-white/30
          active:scale-95 active:bg-white/25
          transition-all duration-200
          focus-visible:outline-2 focus-visible:outline-white
          focus-visible:outline-offset-2
        "
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 w-4 h-4 sm:w-[18px] sm:h-[18px]"
          aria-hidden="true"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className="text-xs sm:text-sm md:text-base leading-none">
          {text.back}
        </span>
      </button>

      {/* Contenu principal */}
      <div
        className="
          w-full max-w-lg sm:max-w-xl md:max-w-2xl
          flex flex-col items-center justify-center
          text-center gap-6 sm:gap-7 md:gap-8
          my-auto
        "
      >
        {/* Titre responsive */}
        <h2
          className="
            text-white drop-shadow-lg font-bold leading-tight
            text-2xl
            sm:text-3xl
            md:text-4xl
            lg:text-5xl
            tracking-tight
            max-w-xs sm:max-w-md md:max-w-lg
          "
        >
          {text.title}
        </h2>

        {/* Grille de boutons adaptative */}
        <div
          className="
            w-full grid gap-3
            grid-cols-1
            sm:grid-cols-2 sm:gap-4
            md:gap-5 lg:gap-6
          "
        >
          {/* Bouton Artiste */}
          <button
            onClick={() => handleSelection("artist")}
            type="button"
            className="
              group cursor-pointer w-full
              rounded-2xl sm:rounded-3xl
              border-2 border-white/30
              bg-white/15 backdrop-blur-lg
              shadow-lg shadow-black/10
              min-h-[80px] sm:min-h-[100px] md:min-h-[120px]
              px-5 py-6
              sm:px-6 sm:py-8
              md:px-8 md:py-10
              hover:bg-white/25 hover:border-white/50
              hover:shadow-xl hover:shadow-black/20
              hover:scale-[1.02]
              active:scale-[0.98] active:bg-white/30
              transition-all duration-300 ease-out
              focus-visible:outline-3 focus-visible:outline-white
              focus-visible:outline-offset-3
            "
          >
            <span
              className="
                text-white font-semibold leading-tight
                text-lg
                sm:text-xl
                md:text-2xl
                lg:text-3xl
                drop-shadow-md
                group-hover:drop-shadow-lg
                transition-all
              "
            >
              {text.artist}
            </span>
          </button>

          {/* Bouton Fan */}
          <button
            onClick={() => handleSelection("fan")}
            type="button"
            className="
              group cursor-pointer w-full
              rounded-2xl sm:rounded-3xl
              border-2 border-white/30
              bg-white/15 backdrop-blur-lg
              shadow-lg shadow-black/10
              min-h-[80px] sm:min-h-[100px] md:min-h-[120px]
              px-5 py-6
              sm:px-6 sm:py-8
              md:px-8 md:py-10
              hover:bg-white/25 hover:border-white/50
              hover:shadow-xl hover:shadow-black/20
              hover:scale-[1.02]
              active:scale-[0.98] active:bg-white/30
              transition-all duration-300 ease-out
              focus-visible:outline-3 focus-visible:outline-white
              focus-visible:outline-offset-3
            "
          >
            <span
              className="
                text-white font-semibold leading-tight
                text-lg
                sm:text-xl
                md:text-2xl
                lg:text-3xl
                drop-shadow-md
                group-hover:drop-shadow-lg
                transition-all
              "
            >
              {text.fan}
            </span>
          </button>
        </div>

        {/* Liens supplémentaires */}
        <div
          className="
            flex flex-col items-center gap-2.5 sm:gap-3
            mt-2 sm:mt-4
          "
        >
          {/* <button
            type="button"
            onClick={() => router.replace("/home/?view=question")}
            className="
              cursor-pointer
              text-xs sm:text-sm
              text-white/90
              hover:text-white
              underline-offset-2 hover:underline
              transition-all duration-200
              px-2 py-1
              focus-visible:outline-2 focus-visible:outline-white
              focus-visible:outline-offset-2
              rounded
            "
          >
            {text.questionnaireLink}
          </button> */}

          {/* <button
            type="button"
            onClick={() => router.replace("/home/?view=home")}
            className="
              cursor-pointer
              text-xs sm:text-sm
              text-white/90
              hover:text-white
              underline-offset-2 hover:underline
              transition-all duration-200
              px-2 py-1
              focus-visible:outline-2 focus-visible:outline-white
              focus-visible:outline-offset-2
              rounded
            "
          >
            {text.welcomeLink}
          </button> */}
        </div>
      </div>
    </div>
  );
}

// import React from "react";
// import { useRouter } from "next/navigation";

// interface UserTypeProps {
//   onBack: () => void;
//   onSelectArtist: () => void;
//   onSelectFan: () => void;
//   language: string;
//   onGoToQuestionnaire?: () => void;
//   onGoToWelcome?: () => void;
// }

// export function UserType({
//   onBack,
//   onSelectArtist,
//   onSelectFan,
//   language,
//   onGoToQuestionnaire,
//   onGoToWelcome,
// }: UserTypeProps) {
//   const content = {
//     spanish: {
//       title: "¿Quién eres?",
//       artist: "Soy un artista",
//       fan: "Soy un fan",
//       back: "Volver",
//       questionnaireLink:
//         "¿Quieres ayudarnos a probar la plataforma? Completa el cuestionario",
//       welcomeLink:
//         "Volver a la página de bienvenida para disfrutar de nuestras actuaciones!",
//     },
//     english: {
//       title: "Who are you?",
//       artist: "I am an artist",
//       fan: "I am a fan",
//       back: "Back",
//       questionnaireLink:
//         "Want to help us test out the platform? Fill out the questionnaire",
//       welcomeLink: "Go back to welcome page to enjoy our performances!",
//     },
//     catalan: {
//       title: "Qui ets?",
//       artist: "Sóc un artista",
//       fan: "Sóc un fan",
//       back: "Tornar",
//       questionnaireLink:
//         "Vols ajudar-nos a provar la plataforma? Completa el qüestionari",
//       welcomeLink:
//         "Tornar a la pàgina de benvinguda per gaudir de les nostres actuacions!",
//     },
//   };
//   const router = useRouter();

//   const text = content[language as keyof typeof content];

//   const handleSelection = (type: string) => {
//     if (type === "artist") onSelectArtist();
//     else onSelectFan();
//   };

//   return (
//     <div
//       className="
//         relative w-full h-full min-h-0
//         flex flex-col items-center justify-center
//         overflow-hidden
//         px-4 sm:px-6 md:px-8
//         pt-[max(56px,calc(env(safe-area-inset-top)+0.75rem))]
//         pb-[max(16px,calc(env(safe-area-inset-bottom)+0.75rem))]
//       "
//     >
//       {/* Back button */}
//       <button
//         style={{
//           outline: "3px solid #ffffff",
//           outlineOffset: "3px",
//         }}
//         onClick={() => router.replace("/home/?view=home")}
//         type="button"
//         className="
//           absolute z-20
//           left-3 sm:left-4 md:left-5
//           top-[max(8px,env(safe-area-inset-top))]
//           flex items-center gap-2
//           rounded-full
//           border border-white/20
//           bg-white/10 backdrop-blur-md
//           px-3 py-2
//           text-white drop-shadow
//           hover:opacity-70 transition-opacity
//         "
//       >
//         <svg
//           width="18"
//           height="18"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="shrink-0"
//         >
//           <path d="M19 12H5M12 19l-7-7 7-7" />
//         </svg>
//         <span className="text-xs sm:text-sm md:text-base">{text.back}</span>
//       </button>

//       <div className="w-full max-w-2xl min-h-0 flex flex-col items-center justify-center text-center">
//         <h2
//           className="text-white drop-shadow-lg font-semibold leading-tight mb-4 sm:mb-5 md:mb-6"
//           style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)" }}
//         >
//           {text.title}
//         </h2>

//         <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
//           <button
//             style={{
//               outline: "3px solid #ffffff",
//               outlineOffset: "3px",
//             }}
//             onClick={() => handleSelection("artist")}
//             type="button"
//             className="
//               cursor-pointer w-full
//               rounded-2xl
//               border-2 border-white/30
//               bg-white/20 backdrop-blur-md
//               text-white drop-shadow
//               hover:bg-white/30 hover:border-white/50
//               transition-all active:scale-[0.99]
//               px-5 sm:px-6
//               py-6 sm:py-7 md:py-8
//             "
//           >
//             <div className="text-lg sm:text-xl md:text-2xl leading-tight">
//               {text.artist}
//             </div>
//           </button>

//           <button
//             style={{
//               outline: "3px solid #ffffff",
//               outlineOffset: "3px",
//             }}
//             onClick={() => handleSelection("fan")}
//             type="button"
//             className="
//               cursor-pointer w-full
//               rounded-2xl
//               border-2 border-white/30
//               bg-white/20 backdrop-blur-md
//               text-white drop-shadow
//               hover:bg-white/30 hover:border-white/50
//               transition-all active:scale-[0.99]
//               px-5 sm:px-6
//               py-6 sm:py-7 md:py-8
//             "
//           >
//             <div className="text-lg sm:text-xl md:text-2xl leading-tight">
//               {text.fan}
//             </div>
//           </button>
//         </div>

//         <div className="mt-5 sm:mt-6 flex flex-col items-center gap-3">
//           <button
//             style={{
//               outline: "3px solid #ffffff",
//               outlineOffset: "3px",
//             }}
//             type="button"
//             onClick={() => router.replace("/home/?view=question")}
//             className="cursor-pointer text-xs sm:text-sm text-white/90 drop-shadow hover:opacity-70 transition-opacity"
//           >
//             {text.questionnaireLink}
//           </button>

//           <button
//             style={{
//               outline: "3px solid #ffffff",
//               outlineOffset: "3px",
//             }}
//             type="button"
//             onClick={() => router.replace("/home/?view=home")}
//             className="cursor-pointer text-xs sm:text-sm text-white/90 drop-shadow hover:opacity-70 transition-opacity"
//           >
//             {text.welcomeLink}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
