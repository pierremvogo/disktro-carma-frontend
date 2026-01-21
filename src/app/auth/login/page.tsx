"use client";

import { Login } from "@/modules/components/Login";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Language = "english" | "spanish" | "catalan";

const Page = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("english"); // valeur par défaut

  useEffect(() => {
    const storedLanguage = localStorage.getItem(
      "disktro_language"
    ) as Language | null;

    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  return (
    <Login
      onBack={() => router.back()}
      onLoginAsFan={() => router.push("/login/fan")}
      onLoginAsArtist={() => router.push("/login/artist")}
      language={language}
    />
  );
};

export default Page;
