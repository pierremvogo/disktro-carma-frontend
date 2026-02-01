"use client";

import { useEffect } from "react";

export default function InitLanguage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedLanguage = localStorage.getItem("disktro_language");

    if (!storedLanguage) {
      localStorage.setItem("disktro_language", "english");
    }
  }, []);

  return null;
}
