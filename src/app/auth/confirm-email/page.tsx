"use client";

import ConfirmEmailForm from "@/modules/auth/confirmEmail";
import React, { useEffect, useState } from "react";

type Language = "english" | "spanish" | "catalan";

const Page = () => {
  const [language, setLanguage] = useState<Language>("english");

  useEffect(() => {
    const storedLanguage = localStorage.getItem(
      "disktro_language"
    ) as Language | null;

    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  return <ConfirmEmailForm language={language} />;
};

export default Page;
