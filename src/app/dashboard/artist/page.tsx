"use client";

import { ArtistDashboard } from "@/modules/components/ArtistDashboard";
import { useLanguage } from "@/@disktro/hooks/useLanguage";
import React from "react";
import { ProtectedRoute } from "@/@disktro/protectedRoute";

export default function Page() {
  const { language } = useLanguage();

  return (
    <ProtectedRoute>
      <ArtistDashboard language={language} />
    </ProtectedRoute>
  );
}
