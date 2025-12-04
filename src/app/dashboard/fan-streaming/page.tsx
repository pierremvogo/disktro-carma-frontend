"use client";

import { ProtectedRoute } from "@/@disktro/protectedRoute";
import { FanStreaming } from "@/modules/components/FanStreaming";
import { useLanguage } from "@/@disktro/hooks/useLanguage";

export default function FanStreamingPage() {
  const { language } = useLanguage();
  return (
    <ProtectedRoute>
      <FanStreaming
        language={language} // ou récupéré depuis ton système de langue
      />
    </ProtectedRoute>
  );
}
