"use client";

import React, { useId, useRef } from "react";
import { Accessibility } from "lucide-react";
import { useAccessibilityPreferences } from "../AccessibilityPreferences";

const translations = {
  spanish: {
    accessibility: "Accesibilidad",
    close: "Cerrar",
    visualAccessibility: "Accesibilidad Visual",
    hearingAccessibility: "Accesibilidad Auditiva",
    motorAccessibility: "Accesibilidad Motora",
    cognitiveAccessibility: "Accesibilidad Cognitiva",
    fontSize: "Tamaño de Fuente",
    small: "Pequeño",
    medium: "Mediano",
    large: "Grande",
    extraLarge: "Extra Grande",
    highContrast: "Alto Contraste",
    colorBlindMode: "Modo Daltónico",
    none: "Ninguno",
    protanopia: "Protanopia",
    deuteranopia: "Deuteranopia",
    tritanopia: "Tritanopia",
    reduceMotion: "Reducir Animaciones",
    textToSpeech: "Texto a Voz",
    captions: "Mostrar la letra automáticamente",
    visualNotifications: "Notificaciones Visuales",
    largerTargets: "Botones Más Grandes",
    keyboardNav: "Navegación por Teclado",
    dyslexiaFont: "Fuente para Dislexia",
    focusMode: "Modo Enfoque",
    readingGuide: "Guía de Lectura",
  },
  english: {
    accessibility: "Accessibility",
    close: "Close",
    visualAccessibility: "Visual Accessibility",
    hearingAccessibility: "Hearing Accessibility",
    motorAccessibility: "Motor Accessibility",
    cognitiveAccessibility: "Cognitive Accessibility",
    fontSize: "Font Size",
    small: "Small",
    medium: "Medium",
    large: "Large",
    extraLarge: "Extra Large",
    highContrast: "High Contrast",
    colorBlindMode: "Color Blind Mode",
    none: "None",
    protanopia: "Protanopia",
    deuteranopia: "Deuteranopia",
    tritanopia: "Tritanopia",
    reduceMotion: "Reduce Motion",
    textToSpeech: "Text to Speech",
    captions: "Show lyrics automatically",
    visualNotifications: "Visual Notifications",
    largerTargets: "Larger Buttons",
    keyboardNav: "Keyboard Navigation",
    dyslexiaFont: "Dyslexia Font",
    focusMode: "Focus Mode",
    readingGuide: "Reading Guide",
  },
  catalan: {
    accessibility: "Accessibilitat",
    close: "Tanca",
    visualAccessibility: "Accessibilitat Visual",
    hearingAccessibility: "Accessibilitat Auditiva",
    motorAccessibility: "Accessibilitat Motora",
    cognitiveAccessibility: "Accessibilitat Cognitiva",
    fontSize: "Mida de Font",
    small: "Petit",
    medium: "Mitjà",
    large: "Gran",
    extraLarge: "Extra Gran",
    highContrast: "Alt Contrast",
    colorBlindMode: "Mode Daltònic",
    none: "Cap",
    protanopia: "Protanòpia",
    deuteranopia: "Deuteranòpia",
    tritanopia: "Tritanòpia",
    reduceMotion: "Reduir Animacions",
    textToSpeech: "Text a Veu",
    captions: "Mostra la lletra automàticament",
    visualNotifications: "Notificacions Visuals",
    largerTargets: "Botons Més Grans",
    keyboardNav: "Navegació per Teclat",
    dyslexiaFont: "Font per Dislèxia",
    focusMode: "Mode Focus",
    readingGuide: "Guia de Lectura",
  },
};

export function AccessibilityButton({
  language,
  placement = "bottom",
}: {
  language: string;
  placement?: "bottom" | "left" | "inline";
}) {
  const titleId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const text = translations[language as keyof typeof translations] ?? translations.english;
  const { preferences, setPreference } = useAccessibilityPreferences();
  const { fontSize, colorBlindMode, highContrast, reduceMotion, textToSpeech, showCaptions, visualNotifications, largerTargets, keyboardNav, dyslexiaFont, focusMode, readingGuide } = preferences;
  const position = {
    bottom: "fixed bottom-4 right-4",
    left: "fixed left-2 top-[42%] sm:left-4",
    inline: "relative",
  }[placement];

  return (
    <>
      <button
        type="button"
        aria-label={text.accessibility}
        aria-haspopup="dialog"
        title={text.accessibility}
        className={`${position} z-40 inline-grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-white/60 bg-[#79356f] text-white shadow-lg hover:bg-[#934486]`}
        onClick={() => dialog.current?.showModal()}
      >
        <Accessibility size={26} aria-hidden="true" />
      </button>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        className="bbok-modal fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[min(700px,calc(100%-1.5rem))] overflow-y-auto rounded-2xl border border-white/30 bg-zinc-950 text-white shadow-2xl"
      >
        <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-xl border-b border-white/20">
          <div className="flex items-center justify-between gap-2 p-3 sm:p-4">
            <h2
              id={titleId}
              className="text-base sm:text-lg text-white drop-shadow-lg flex items-center gap-2"
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
                className="text-white"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              {text.accessibility}
            </h2>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="rounded-lg p-1.5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              aria-label={text.close}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="px-3 sm:px-4 pb-2 text-white/50 text-[11px]">
            {language === "english"
              ? "Tip: Tap outside to close."
              : language === "spanish"
              ? "Consejo: toca fuera para cerrar."
              : "Consell: toca fora per tancar."}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-sm sm:text-base text-white drop-shadow flex items-center gap-1.5">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {text.visualAccessibility}
                </h3>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                  <label className="text-white/90 mb-2 block text-xs sm:text-sm">
                    {text.fontSize}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {(["small", "medium", "large", "xl"] as const).map(
                      (size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setPreference("fontSize", size)}
                          aria-pressed={fontSize === size}
                          className={`px-3 py-1.5 rounded-lg transition-all text-xs ${
                            fontSize === size
                              ? "bg-white/30 text-white"
                              : "bg-white/10 text-white/70 hover:bg-white/20"
                          }`}
                        >
                          {text[size === "xl" ? "extraLarge" : size]}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2v20" />
                    </svg>
                    <span className="text-white/90 text-xs sm:text-sm">
                      {text.highContrast}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={highContrast}
                    aria-label={text.highContrast}
                    onClick={() => setPreference("highContrast", !highContrast)}
                    className={`w-12 h-7 rounded-full transition-all ${
                      highContrast ? "bg-green-500" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        highContrast ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                  <label className="text-white/90 mb-2 block text-xs sm:text-sm">
                    {text.colorBlindMode}
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(
                      [
                        "none",
                        "protanopia",
                        "deuteranopia",
                        "tritanopia",
                      ] as const
                    ).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setPreference("colorBlindMode", mode)}
                        aria-pressed={colorBlindMode === mode}
                        className={`px-3 py-1.5 rounded-lg transition-all text-xs ${
                          colorBlindMode === mode
                            ? "bg-white/30 text-white"
                            : "bg-white/10 text-white/70 hover:bg-white/20"
                        }`}
                      >
                        {text[mode]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    <span className="text-white/90 text-xs sm:text-sm">
                      {text.reduceMotion}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={reduceMotion}
                    aria-label={text.reduceMotion}
                    onClick={() => setPreference("reduceMotion", !reduceMotion)}
                    className={`w-12 h-7 rounded-full transition-all ${
                      reduceMotion ? "bg-green-500" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        reduceMotion ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 7V4h16v3" />
                      <path d="M9 20h6" />
                      <path d="M12 4v16" />
                    </svg>
                    <span className="text-white/90 text-xs sm:text-sm">
                      {text.dyslexiaFont}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={dyslexiaFont}
                    aria-label={text.dyslexiaFont}
                    onClick={() => setPreference("dyslexiaFont", !dyslexiaFont)}
                    className={`w-12 h-7 rounded-full transition-all ${
                      dyslexiaFont ? "bg-green-500" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        dyslexiaFont ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-sm sm:text-base text-white drop-shadow flex items-center gap-1.5">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                  {text.hearingAccessibility}
                </h3>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M8 10h.01" />
                      <path d="M12 10h.01" />
                      <path d="M16 10h.01" />
                      <path d="M8 14h8" />
                    </svg>
                    <div>
                      <span className="text-white/90 block text-xs sm:text-sm">
                        {text.captions}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={showCaptions}
                    aria-label={text.captions}
                    onClick={() => setPreference("showCaptions", !showCaptions)}
                    className={`w-12 h-7 rounded-full transition-all ${
                      showCaptions ? "bg-green-500" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        showCaptions ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span className="text-white/90 text-xs sm:text-sm">
                      {text.visualNotifications}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={visualNotifications}
                    aria-label={text.visualNotifications}
                    onClick={() =>
                      setPreference("visualNotifications", !visualNotifications)
                    }
                    className={`w-12 h-7 rounded-full transition-all ${
                      visualNotifications ? "bg-green-500" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        visualNotifications
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                    <span className="text-white/90 text-xs sm:text-sm">
                      {text.textToSpeech}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={textToSpeech}
                    aria-label={text.textToSpeech}
                    onClick={() => setPreference("textToSpeech", !textToSpeech)}
                    className={`w-12 h-7 rounded-full transition-all ${
                      textToSpeech ? "bg-green-500" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        textToSpeech ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm sm:text-base text-white drop-shadow">
                  {text.motorAccessibility}
                </h3>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                  <span className="text-white/90 text-xs sm:text-sm">
                    {text.largerTargets}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={largerTargets}
                    aria-label={text.largerTargets}
                    onClick={() => setPreference("largerTargets", !largerTargets)}
                    className={`w-12 h-7 rounded-full transition-all ${
                      largerTargets ? "bg-green-500" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        largerTargets ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                  <span className="text-white/90 text-xs sm:text-sm">
                    {text.keyboardNav}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={keyboardNav}
                    aria-label={text.keyboardNav}
                    onClick={() => setPreference("keyboardNav", !keyboardNav)}
                    className={`w-12 h-7 rounded-full transition-all ${
                      keyboardNav ? "bg-green-500" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        keyboardNav ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm sm:text-base text-white drop-shadow">
                  {text.cognitiveAccessibility}
                </h3>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                  <span className="text-white/90 text-xs sm:text-sm">
                    {text.focusMode}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={focusMode}
                    aria-label={text.focusMode}
                    onClick={() => setPreference("focusMode", !focusMode)}
                    className={`w-12 h-7 rounded-full transition-all ${
                      focusMode ? "bg-green-500" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        focusMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                  <span className="text-white/90 text-xs sm:text-sm">
                    {text.readingGuide}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={readingGuide}
                    aria-label={text.readingGuide}
                    onClick={() => setPreference("readingGuide", !readingGuide)}
                    className={`w-12 h-7 rounded-full transition-all ${
                      readingGuide ? "bg-green-500" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        readingGuide ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 bg-black/70 px-3 sm:px-4 py-2 text-[11px] text-white/50">
          {language === "english"
            ? "Changes are applied instantly."
            : language === "spanish"
            ? "Los cambios se aplican al instante."
            : "Els canvis s'apliquen a l'instant."}
        </div>
      </dialog>
    </>
  );
}
