"use client";

import ForgotPasswordForm from "@/modules/auth/forgotPassword";
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

  return <ForgotPasswordForm language={language} />;
};

export default Page;
