"use client";

import { Login } from "@/modules/components/Login";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <Login
      // Retour à la page précédente ou une route précise
      onBack={() => router.back()}
      // Exemple : redirection vers une page de login fan
      onLoginAsFan={() => router.push("/login/fan")}
      // Exemple : redirection vers une page de login artiste
      onLoginAsArtist={() => router.push("/login/artist")}
      language="english"
    />
  );
};

export default Page;
