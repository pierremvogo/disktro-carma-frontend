"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ColorBlindFilters } from "./ColorBlindFilters";

const defaults = {
  fontSize: "medium" as "small" | "medium" | "large" | "xl",
  colorBlindMode: "none" as "none" | "protanopia" | "deuteranopia" | "tritanopia",
  highContrast: false,
  reduceMotion: false,
  textToSpeech: false,
  showCaptions: false,
  visualNotifications: false,
  largerTargets: false,
  keyboardNav: false,
  dyslexiaFont: false,
  focusMode: false,
  readingGuide: false,
};
type Preferences = typeof defaults;
const storageKey = "bbok.accessibility";
const PreferencesContext = createContext<{
  preferences: Preferences;
  setPreference: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
}>({ preferences: defaults, setPreference: () => {} });

export const useAccessibilityPreferences = () => useContext(PreferencesContext);

export function AccessibilityPreferences({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState(defaults);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? "{}");
      const restored = { ...defaults };
      for (const key of Object.keys(defaults) as (keyof Preferences)[]) {
        const value = saved?.[key];
        if (key === "fontSize") {
          if (["small", "medium", "large", "xl"].includes(value)) restored.fontSize = value;
        } else if (key === "colorBlindMode") {
          if (["none", "protanopia", "deuteranopia", "tritanopia"].includes(value)) restored.colorBlindMode = value;
        } else if (typeof value === "boolean") {
          restored[key] = value;
        }
      }
      setPreferences(restored);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(preferences));
    } catch {}

    const html = document.documentElement;
    html.dataset.bbokFontSize = preferences.fontSize;
    html.dataset.bbokColorMode = preferences.colorBlindMode;
    const classes = {
      "bbok-contrast": preferences.highContrast,
      "bbok-dyslexia": preferences.dyslexiaFont,
      "bbok-reduced-motion": preferences.reduceMotion,
      "larger-targets": preferences.largerTargets,
      "keyboard-nav": preferences.keyboardNav,
      "focus-mode": preferences.focusMode,
      "reading-guide": preferences.readingGuide,
    };
    for (const [name, enabled] of Object.entries(classes)) html.classList.toggle(name, enabled);

    if (preferences.readingGuide) {
      const move = (event: MouseEvent) =>
        html.style.setProperty("--reading-guide-position", `${event.clientY}px`);
      window.addEventListener("mousemove", move);
      return () => window.removeEventListener("mousemove", move);
    }
  }, [preferences, ready]);

  function setPreference<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    setPreferences(current => ({ ...current, [key]: value }));
  }

  return (
    <PreferencesContext.Provider value={{ preferences, setPreference }}>
      <ColorBlindFilters />
      {children}
    </PreferencesContext.Provider>
  );
}
