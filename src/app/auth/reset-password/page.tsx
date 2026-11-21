"use client";
import ResetPasswordForm from "@/modules/auth/resetPassword";
import React, { use, useEffect, useState } from "react";

type Language = "english" | "spanish" | "catalan";

const Page = ({ searchParams }: { searchParams: Promise<{ token?: string }> }) => {
  const { token } = use(searchParams);
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
      initialToken={token ?? ""}
      language={language}
    />
  );
};

export default Page;
