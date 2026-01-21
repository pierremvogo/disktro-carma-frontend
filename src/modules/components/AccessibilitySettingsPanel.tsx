"use client";

import React, { useState, useEffect } from "react";
import { AccessibilitySettings } from "./AccessibilitySettings";
import { useAccessibility } from "./AccessibilityProvider";

type Language = "english" | "spanish" | "catalan";

interface AccessibilitySettingsPanelProps {
  language?: Language;
}

interface AccessibilitySettingsState {
  largerTargets: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  keyboardNav: boolean;
  screenReader: boolean;
  textToSpeech: boolean;
  visualNotifications: boolean;
  focusMode: boolean;
  colorBlindMode: string;
}

const STORAGE_KEY = "accessibility.settings";

export function AccessibilitySettingsPanel({
  language = "english",
}: AccessibilitySettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Récupération du contexte global
  const {
    highContrastMode,
    setHighContrastMode,
    enableKeyboardShortcuts,
    setEnableKeyboardShortcuts,
    reducedMotion,
  } = useAccessibility();

  const defaultSettings: AccessibilitySettingsState = {
    largerTargets: false,
    highContrast: highContrastMode,
    reducedMotion: reducedMotion,
    keyboardNav: enableKeyboardShortcuts,
    screenReader: false,
    textToSpeech: false,
    visualNotifications: true,
    focusMode: false,
    colorBlindMode: "none",
  };

  const [settings, setSettings] =
    useState<AccessibilitySettingsState>(defaultSettings);

  // 1) Au montage : on charge depuis localStorage et on synchronise avec le provider
  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined"
          ? localStorage.getItem(STORAGE_KEY)
          : null;
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AccessibilitySettingsState>;

        const merged: AccessibilitySettingsState = {
          ...defaultSettings,
          ...parsed,
        };

        setSettings(merged);

        // On applique les réglages persistés au provider global
        if (typeof parsed.highContrast === "boolean") {
          setHighContrastMode(parsed.highContrast);
        }
        if (typeof parsed.keyboardNav === "boolean") {
          setEnableKeyboardShortcuts(parsed.keyboardNav);
        }
        // reducedMotion est plutôt géré via prefers-reduced-motion + contexte,
        // mais tu peux le rendre contrôlable si tu ajoutes un setter dans le provider.
      } else {
        // Pas de localStorage → on initialise avec les valeurs du provider
        setSettings(defaultSettings);
      }
    } catch (err) {
      console.error(
        "Error reading accessibility settings from localStorage:",
        err
      );
      setSettings(defaultSettings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // seulement au montage

  // 2) À chaque changement des settings → on les persiste dans localStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      }
    } catch (err) {
      console.error(
        "Error saving accessibility settings to localStorage:",
        err
      );
    }
  }, [settings]);

  // 3) Si le contexte change (par ex. prefers-reduced-motion ou autre),
  // on met à jour le state local (sans toucher localStorage pour l’instant)
  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      highContrast: highContrastMode,
      keyboardNav: enableKeyboardShortcuts,
      reducedMotion: reducedMotion,
    }));
  }, [highContrastMode, enableKeyboardShortcuts, reducedMotion]);

  // 4) Gestion des changements de la modale AccessibilitySettings
  const handleSettingChange = (setting: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));

    // On synchronise les réglages importants avec le provider global
    if (setting === "highContrast") {
      setHighContrastMode(Boolean(value));
    }

    if (setting === "keyboardNav") {
      setEnableKeyboardShortcuts(Boolean(value));
    }

    // Si un jour tu ajoutes setReducedMotion dans le provider :
    // if (setting === "reducedMotion") {
    //   setReducedMotion(Boolean(value));
    // }
  };

  return (
    <>
      {/* Bouton d’ouverture des paramètres d’accessibilité */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center cursor-pointer gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span aria-hidden="true">⚙️</span>
        <span>Accessibilité</span>
      </button>

      {/* Modale de réglages */}
      {isOpen && (
        <AccessibilitySettings
          language={language}
          settings={settings}
          onSettingChange={handleSettingChange}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
