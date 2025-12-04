"use client";

import { ArtistDashboard } from "@/modules/components/ArtistDashboard";
import { useLanguage } from "@/@disktro/hooks/useLanguage";
import React from "react";

export default function Page() {
  const { language } = useLanguage();

  return <ArtistDashboard language={language} />;
}
