import React from "react";
import { FocusTrap } from "./AccessibilityProvider";

interface AccessibilitySettingsProps {
  language: string;
  onClose: () => void;
  settings: {
    largerTargets: boolean;
    highContrast: boolean;
    reducedMotion: boolean;
    keyboardNav: boolean;
    screenReader: boolean;
    textToSpeech: boolean;
    visualNotifications: boolean;
    focusMode: boolean;
    colorBlindMode: string;
  };
  onSettingChange: (setting: string, value: any) => void;
}

export function AccessibilitySettings({
  language,
  onClose,
  settings,
  onSettingChange,
}: AccessibilitySettingsProps) {
  const text = {
    spanish: {
      title: "Configuración de Accesibilidad",
      close: "Cerrar",
      visual: "Visual",
      interaction: "Interacción",
      audio: "Audio",
      largerTargets: "Objetivos Táctiles Más Grandes",
      largerTargetsDesc: "Aumenta el tamaño de los botones e interacciones",
      highContrast: "Alto Contraste",
      highContrastDesc: "Aumenta el contraste de colores",
      reducedMotion: "Movimiento Reducido",
      reducedMotionDesc: "Reduce animaciones y transiciones",
      keyboardNav: "Navegación por Teclado",
      keyboardNavDesc: "Muestra atajos de teclado disponibles",
      screenReader: "Optimizado para Lector de Pantalla",
      screenReaderDesc: "Mejora la compatibilidad con lectores de pantalla",
      textToSpeech: "Texto a Voz",
      textToSpeechDesc: "Activa anuncios de texto a voz",
      visualNotifications: "Notificaciones Visuales",
      visualNotificationsDesc: "Muestra alertas visuales en lugar de sonoras",
      focusMode: "Modo Enfoque",
      focusModeDesc: "Reduce distracciones visuales",
      colorBlindMode: "Modo Daltónico",
      colorBlindModeDesc: "Ajusta colores para diferentes tipos de daltonismo",
      none: "Ninguno",
      protanopia: "Protanopía (Rojo-Verde)",
      deuteranopia: "Deuteranopía (Rojo-Verde)",
      tritanopia: "Tritanopía (Azul-Amarillo)",
      keyboardShortcuts: "Ver Atajos de Teclado",
      saveSettings: "Guardar Configuración",
    },
    english: {
      title: "Accessibility Settings",
      close: "Close",
      visual: "Visual",
      interaction: "Interaction",
      audio: "Audio",
      largerTargets: "Larger Touch Targets",
      largerTargetsDesc: "Increases button and interaction sizes",
      highContrast: "High Contrast",
      highContrastDesc: "Increases color contrast",
      reducedMotion: "Reduced Motion",
      reducedMotionDesc: "Reduces animations and transitions",
      keyboardNav: "Keyboard Navigation",
      keyboardNavDesc: "Shows available keyboard shortcuts",
      screenReader: "Screen Reader Optimized",
      screenReaderDesc: "Improves screen reader compatibility",
      textToSpeech: "Text-to-Speech",
      textToSpeechDesc: "Enables text-to-speech announcements",
      visualNotifications: "Visual Notifications",
      visualNotificationsDesc: "Shows visual alerts instead of audio",
      focusMode: "Focus Mode",
      focusModeDesc: "Reduces visual distractions",
      colorBlindMode: "Color Blind Mode",
      colorBlindModeDesc:
        "Adjusts colors for different types of color blindness",
      none: "None",
      protanopia: "Protanopia (Red-Green)",
      deuteranopia: "Deuteranopia (Red-Green)",
      tritanopia: "Tritanopia (Blue-Yellow)",
      keyboardShortcuts: "View Keyboard Shortcuts",
      saveSettings: "Save Settings",
    },
    catalan: {
      title: "Configuració d'Accessibilitat",
      close: "Tancar",
      visual: "Visual",
      interaction: "Interacció",
      audio: "Àudio",
      largerTargets: "Objectius Tàctils Més Grans",
      largerTargetsDesc: "Augmenta la mida dels botons i interaccions",
      highContrast: "Alt Contrast",
      highContrastDesc: "Augmenta el contrast de colors",
      reducedMotion: "Moviment Reduït",
      reducedMotionDesc: "Redueix animacions i transicions",
      keyboardNav: "Navegació per Teclat",
      keyboardNavDesc: "Mostra dreceres de teclat disponibles",
      screenReader: "Optimitzat per Lector de Pantalla",
      screenReaderDesc: "Millora la compatibilitat amb lectors de pantalla",
      textToSpeech: "Text a Veu",
      textToSpeechDesc: "Activa anuncis de text a veu",
      visualNotifications: "Notificacions Visuals",
      visualNotificationsDesc: "Mostra alertes visuals en lloc de sonores",
      focusMode: "Mode Enfocament",
      focusModeDesc: "Redueix distraccions visuals",
      colorBlindMode: "Mode Daltònic",
      colorBlindModeDesc: "Ajusta colors per a diferents tipus de daltonisme",
      none: "Cap",
      protanopia: "Protanòpia (Vermell-Verd)",
      deuteranopia: "Deuteranòpia (Vermell-Verd)",
      tritanopia: "Tritanòpia (Blau-Groc)",
      keyboardShortcuts: "Veure Dreceres de Teclat",
      saveSettings: "Guardar Configuració",
    },
  };

  const content = text[language as keyof typeof text] || text.english;

  const ToggleSwitch = ({ checked, onChange, label, description }: any) => (
    <div className="flex items-start justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
      <div className="flex-1 pr-4">
        <label className="text-white drop-shadow cursor-pointer">{label}</label>
        <p className="text-white/60 text-sm mt-1">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex cursor-pointer h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
          checked ? "bg-blue-600" : "bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div
      className="mt-60 bg-black/100 fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-title"
    >
      <FocusTrap active={true}>
        <div
          className="bg-black/100 backdrop-blur-md rounded-xl p-8 border border-white/20 max-w-3xl w-full max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              id="accessibility-title"
              className="text-2xl text-white drop-shadow-lg"
            >
              {content.title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-white border-white border  cursor-pointer rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={content.close}
            >
              <svg
                width="24"
                height="24"
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

          <div className="space-y-6">
            {/* Visual Section */}
            <section aria-labelledby="visual-section">
              <h3
                id="visual-section"
                className="text-xl text-white drop-shadow mb-4"
              >
                {content.visual}
              </h3>
              <div className="space-y-3">
                <ToggleSwitch
                  checked={settings.largerTargets}
                  onChange={(value: boolean) =>
                    onSettingChange("largerTargets", value)
                  }
                  label={content.largerTargets}
                  description={content.largerTargetsDesc}
                />
                <ToggleSwitch
                  checked={settings.highContrast}
                  onChange={(value: boolean) =>
                    onSettingChange("highContrast", value)
                  }
                  label={content.highContrast}
                  description={content.highContrastDesc}
                />
                <ToggleSwitch
                  checked={settings.reducedMotion}
                  onChange={(value: boolean) =>
                    onSettingChange("reducedMotion", value)
                  }
                  label={content.reducedMotion}
                  description={content.reducedMotionDesc}
                />
                <ToggleSwitch
                  checked={settings.focusMode}
                  onChange={(value: boolean) =>
                    onSettingChange("focusMode", value)
                  }
                  label={content.focusMode}
                  description={content.focusModeDesc}
                />

                {/* Color Blind Mode Selector */}
                <div className="p-4 bg-white/5 rounded-lg">
                  <label
                    htmlFor="colorblind-select"
                    className="text-white drop-shadow block mb-2"
                  >
                    {content.colorBlindMode}
                  </label>
                  <p className="text-white/60 text-sm mb-3">
                    {content.colorBlindModeDesc}
                  </p>
                  <select
                    id="colorblind-select"
                    value={settings.colorBlindMode}
                    onChange={(e) =>
                      onSettingChange("colorBlindMode", e.target.value)
                    }
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none" className="bg-gray-900">
                      {content.none}
                    </option>
                    <option value="protanopia" className="bg-gray-900">
                      {content.protanopia}
                    </option>
                    <option value="deuteranopia" className="bg-gray-900">
                      {content.deuteranopia}
                    </option>
                    <option value="tritanopia" className="bg-gray-900">
                      {content.tritanopia}
                    </option>
                  </select>
                </div>
              </div>
            </section>

            {/* Interaction Section */}
            <section aria-labelledby="interaction-section">
              <h3
                id="interaction-section"
                className="text-xl text-white drop-shadow mb-4"
              >
                {content.interaction}
              </h3>
              <div className="space-y-3">
                <ToggleSwitch
                  checked={settings.keyboardNav}
                  onChange={(value: boolean) =>
                    onSettingChange("keyboardNav", value)
                  }
                  label={content.keyboardNav}
                  description={content.keyboardNavDesc}
                />
                <ToggleSwitch
                  checked={settings.screenReader}
                  onChange={(value: boolean) =>
                    onSettingChange("screenReader", value)
                  }
                  label={content.screenReader}
                  description={content.screenReaderDesc}
                />
              </div>
            </section>

            {/* Audio Section */}
            <section aria-labelledby="audio-section">
              <h3
                id="audio-section"
                className="text-xl text-white drop-shadow mb-4"
              >
                {content.audio}
              </h3>
              <div className="space-y-3">
                <ToggleSwitch
                  checked={settings.textToSpeech}
                  onChange={(value: boolean) =>
                    onSettingChange("textToSpeech", value)
                  }
                  label={content.textToSpeech}
                  description={content.textToSpeechDesc}
                />
                <ToggleSwitch
                  checked={settings.visualNotifications}
                  onChange={(value: boolean) =>
                    onSettingChange("visualNotifications", value)
                  }
                  label={content.visualNotifications}
                  description={content.visualNotificationsDesc}
                />
              </div>
            </section>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 cursor-pointer bg-gradient-to-r from-blue-500/40 to-cyan-500/40 backdrop-blur-md border-2 border-white/40 rounded-xl text-white hover:from-blue-500/50 hover:to-cyan-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {content.saveSettings}
            </button>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}
