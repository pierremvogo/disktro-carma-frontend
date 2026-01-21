"use client";
import { useEffect, useState } from "react";

type Language = "english" | "spanish" | "catalan";
const LANGUAGE_STORAGE_KEY = "disktro_language";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("english");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "english" || saved === "spanish" || saved === "catalan") {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  };

  return { language, setLanguage: changeLanguage };
}
