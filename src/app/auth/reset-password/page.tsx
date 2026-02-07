"use client";
import ResetPasswordForm from "@/modules/auth/resetPassword";
import React, { useEffect, useState } from "react";

type Language = "english" | "spanish" | "catalan";

const Page = ({ searchParams }: { searchParams: { token?: string } }) => {
  const [language, setLanguage] = useState<Language>("english");

  useEffect(() => {
    const storedLanguage = localStorage.getItem(
      "disktro_language"
    ) as Language | null;

    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  return (
    <ResetPasswordForm
      initialToken={searchParams.token || ""}
      language={language}
    />
  );
};

export default Page;
