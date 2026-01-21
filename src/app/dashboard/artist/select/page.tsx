"use client";

import { ArtistChoice } from "@/modules/components/ArtistChoice";
import { useLanguage } from "@/@disktro/hooks/useLanguage";
import React from "react";
import { ProtectedRoute } from "@/@disktro/protectedRoute";

export default function Page() {
  const { language } = useLanguage();

  return <ArtistChoice language={language} />;
}
