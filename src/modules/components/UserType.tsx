import React from 'react';

interface UserTypeProps {
  onBack: () => void;
  onSelectArtist: () => void;
  onSelectFan: () => void;
  language: string;
  onGoToQuestionnaire?: () => void;
  onGoToWelcome?: () => void;
}

export function UserType({ onBack, onSelectArtist, onSelectFan, language, onGoToQuestionnaire, onGoToWelcome }: UserTypeProps) {
  const content = {
    spanish: {
      title: '¿Quién eres?',
      artist: 'Soy un artista',
      fan: 'Soy un fan',
      back: 'Volver',
      questionnaireLink: '¿Quieres ayudarnos a probar la plataforma? Completa el cuestionario',
      welcomeLink: 'Volver a la página de bienvenida para disfrutar de nuestras actuaciones!'
    },
    english: {
      title: 'Who are you?',
      artist: 'I am an artist',
      fan: 'I am a fan',
      back: 'Back',
      questionnaireLink: 'Want to help us test out the platform? Fill out the questionnaire',
      welcomeLink: 'Go back to welcome page to enjoy our performances!'
    },
    catalan: {
      title: 'Qui ets?',
      artist: 'Sóc un artista',
      fan: 'Sóc un fan',
      back: 'Tornar',
      questionnaireLink: 'Vols ajudar-nos a provar la plataforma? Completa el qüestionari',
      welcomeLink: 'Tornar a la pàgina de benvinguda per gaudir de les nostres actuacions!'
    }
  };

  const text = content[language as keyof typeof content];

  const handleSelection = (type: string) => {
    console.log('User type selected:', type);
    if (type === 'artist') {
      onSelectArtist();
    } else {
      onSelectFan();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <button
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-white drop-shadow hover:opacity-70 transition-opacity"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        {text.back}
      </button>

      <div className="max-w-2xl w-full text-center">
        <h2 className="text-4xl text-white drop-shadow-lg mb-12">{text.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => handleSelection('artist')}
            className="px-8 py-12 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/30 text-white drop-shadow hover:bg-white/30 hover:border-white/50 transition-all"
          >
            <div className="text-2xl">{text.artist}</div>
          </button>

          <button
            onClick={() => handleSelection('conscious fan')}
            className="px-8 py-12 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/30 text-white drop-shadow hover:bg-white/30 hover:border-white/50 transition-all"
          >
            <div className="text-2xl">{text.fan}</div>
          </button>
        </div>

        <div className="mt-8">
          <a
            href="#"
            onClick={onGoToQuestionnaire}
            className="text-sm text-white drop-shadow hover:opacity-70 transition-opacity"
          >
            {text.questionnaireLink}
          </a>
        </div>

        <div className="mt-4">
          <a
            href="#"
            onClick={onGoToWelcome}
            className="text-sm text-white drop-shadow hover:opacity-70 transition-opacity"
          >
            {text.welcomeLink}
          </a>
        </div>
      </div>
    </div>
  );
}