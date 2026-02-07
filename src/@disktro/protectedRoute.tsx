"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserModuleObject as UserModule } from "@/modules/module";

// Clés de localStorage déjà utilisées dans ton app
const ACCESS_TOKEN_KEY = UserModule.localState.ACCESS_TOKEN;
const USER_ID_KEY = UserModule.localState.USER_ID;
const USER_DATA_KEY = UserModule.localState.USER_DATA;
const USER_ROLE_KEY = UserModule.localState.USER_ROLE;

// Helper pour décoder un JWT et récupérer son payload
function decodeJwt(token: string): { exp?: number; [key: string]: any } | null {
  try {
    const [, payloadBase64] = token.split(".");
    if (!payloadBase64) return null;

    const payloadJson = atob(
      payloadBase64.replace(/-/g, "+").replace(/_/g, "/")
    );
    return JSON.parse(payloadJson);
  } catch (e) {
    console.error("Failed to decode JWT", e);
    return null;
  }
}

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cleanupAndRedirect = () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(USER_ID_KEY);
      localStorage.removeItem(USER_DATA_KEY);
      localStorage.removeItem(USER_ROLE_KEY);

      // Optionnel : garder la route demandée dans "next"
      const next = encodeURIComponent(pathname || "/");
      router.replace(`/home?next=${next}`);
    };

    const checkAuth = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        const userId = localStorage.getItem(USER_ID_KEY);

        // 1️⃣ Vérifie que le token et l'ID utilisateur existent
        if (!token || !userId) {
          cleanupAndRedirect();
          return;
        }

        // 2️⃣ Vérifie la date d'expiration du token (si JWT)
        const payload = decodeJwt(token);
        if (payload?.exp) {
          const nowInSeconds = Math.floor(Date.now() / 1000);
          if (payload.exp < nowInSeconds) {
            console.warn("Token expiré");
            cleanupAndRedirect();
            return;
          }
        }

        // 3️⃣ Vérifie en base que l'utilisateur existe encore
        //    et que le token est toujours valide côté backend
        const res = await UserModule.service.getUser(userId);

        if (!res?.data) {
          console.warn("Utilisateur introuvable");
          cleanupAndRedirect();
          return;
        }

        // Tu peux éventuellement resynchroniser le USER_DATA
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(res.data));
        localStorage.setItem(USER_ROLE_KEY, JSON.stringify(res.data.type));

        // Tous les checks sont OK
        setIsChecked(true);
      } catch (error) {
        console.error("Erreur lors de la vérification d'auth", error);
        cleanupAndRedirect();
      }
    };

    checkAuth();
  }, [router, pathname]);

  // Pendant les vérifications, on évite d'afficher le dashboard
  if (!isChecked) {
    return (
      <div
        className="
          relative w-full
          min-h-[100svh] md:min-h-screen
          overflow-hidden
          flex items-center justify-center
          pt-[env(safe-area-inset-top)]
          pb-[env(safe-area-inset-bottom)]
          bg-gradient-to-br from-[#5A0B4D] via-[#4A1456] to-[#2D0E3E]
          text-white
        "
      >
        {/* Overlay soft */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Loader Card */}
        <div
          className="relative z-10 flex flex-col items-center gap-4 px-6 py-5 rounded-2xl
                        bg-white/10 backdrop-blur-xl
                        border border-white/20
                        shadow-2xl"
        >
          {/* Spinner */}
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-2 border-white/20" />
            <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin" />
          </div>

          {/* Text */}
          <p className="text-sm sm:text-base text-white/85 drop-shadow text-center">
            Checking authorization…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
