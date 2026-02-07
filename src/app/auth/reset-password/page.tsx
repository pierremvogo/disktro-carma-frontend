"use client";

import ResetPasswordForm from "@/modules/auth/resetPassword";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type Language = "english" | "spanish" | "catalan";

export default function Page() {
  const searchParams = useSearchParams();

  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);

  const [language, setLanguage] = useState<Language>("english");

  useEffect(() => {
    const storedLanguage = localStorage.getItem(
      "disktro_language"
    ) as Language | null;
    if (storedLanguage) setLanguage(storedLanguage);
  }, []);

  return <ResetPasswordForm initialToken={token} language={language} />;
}
