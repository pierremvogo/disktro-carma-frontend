import React, { useState } from 'react';

interface QuestionnaireProps {
  onBack: () => void;
  onSubmit: () => void;
  language: string;
  onShowLogin?: () => void;
  onSkipToSignUp?: () => void;
}

export function Questionnaire({ onBack, onSubmit, language }: QuestionnaireProps) {
  const [formData, setFormData] = useState({
    name: '',
    ageRange: '',
    language: '',
    email: ''
  });

  const content = {
    spanish: {
      title: 'Únete a nuestro grupo de pruebas',
      subtitle: 'Ayúdanos a construir el futuro de la música para todos',
      name: 'Nombre',
      ageRange: 'Rango de edad',
      language: 'Idioma',
      email: 'Correo electrónico',
      submit: 'Enviar solicitud',
      back: 'Volver'
    },
    english: {
      title: 'Join Our Testing Group',
      subtitle: 'Help us build the future of music for everybody',
      name: 'Name',
      ageRange: 'Age Range',
      language: 'Language',
      email: 'Email',
      submit: 'Submit Application',
      back: 'Back'
    },
    catalan: {
      title: 'Uneix-te al nostre grup de proves',
      subtitle: 'Ajuda\'ns a construir el futur de la música per a tothom',
      name: 'Nom',
      ageRange: 'Rang d\'edat',
      language: 'Idioma',
      email: 'Correu electrònic',
      submit: 'Enviar sol·licitud',
      back: 'Tornar'
    }
  };

  const text = content[language as keyof typeof content];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full h-full overflow-y-auto px-4 py-2 flex flex-col justify-start">
      <button
        onClick={onBack}
        className="absolute top-2 left-2 flex items-center gap-2 text-white drop-shadow hover:opacity-70 transition-opacity"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        {text.back}
      </button>

      <div className="max-w-lg mx-auto w-full pt-8">
        <h2 className="text-white drop-shadow-lg mb-1">{text.title}</h2>
        <p className="text-white/90 drop-shadow mb-3">{text.subtitle}</p>

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
              className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          <div>
            <label className="block text-white drop-shadow mb-1">
              {text.ageRange}
            </label>
            <div className="flex gap-1.5">
              {['-18', '-22', '-30', '-50', '+50'].map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setFormData({ ...formData, ageRange: range })}
                  className={`flex-1 px-1 py-2 rounded-lg transition-all ${
                    formData.ageRange === range
                      ? 'bg-white/30 backdrop-blur-sm border-2 border-white/50'
                      : 'bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <span className="text-white drop-shadow text-xs">{range}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white drop-shadow mb-1">
              {text.language}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['catalan', 'spanish', 'english'].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setFormData({ ...formData, language: lang })}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    formData.language === lang
                      ? 'bg-white/30 backdrop-blur-sm border-2 border-white/50'
                      : 'bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <span className="text-white drop-shadow">{lang}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-white drop-shadow mb-1">
              {text.email}
            </label>
            <div className="flex gap-3">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-purple-500/50 to-pink-500/50 backdrop-blur-md border-2 border-white/50 rounded-xl text-white drop-shadow-lg hover:from-purple-500/60 hover:to-pink-500/60 transition-all flex items-center justify-center gap-2 shadow-xl whitespace-nowrap"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span className="font-medium">{text.submit}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
