// hooks/useAppLanguage.ts
"use client";

import { useEffect, useState } from "react";
import { LANGUAGE_EVENT, LANGUAGE_KEY } from "../utils";

export function useAppLanguage(defaultLang = "english") {
  const [language, setLanguage] = useState(defaultLang);

  useEffect(() => {
    const read = () => {
      const lang = localStorage.getItem(LANGUAGE_KEY) || defaultLang;
      setLanguage(lang);
    };

    read(); // initial read

    window.addEventListener(LANGUAGE_EVENT, read);
    // Bonus: si la langue change dans un autre onglet
    window.addEventListener("storage", (e) => {
      if (e.key === LANGUAGE_KEY) read();
    });

    return () => {
      window.removeEventListener(LANGUAGE_EVENT, read);
      window.removeEventListener("storage", () => {});
    };
  }, [defaultLang]);

  return language;
}
