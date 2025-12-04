"use client";

import { ProtectedRoute } from "@/@disktro/protectedRoute";
import { FanStreaming } from "@/modules/components/FanStreaming";

export default function FanStreamingPage() {
  return (
    <ProtectedRoute>
      <FanStreaming
        onBack={() => {
          // éventuellement router.back() ou une autre navigation
        }}
        language="english" // ou récupéré depuis ton système de langue
      />
    </ProtectedRoute>
  );
}
