"use client";
import { useEffect, useState } from "react";

const useScreenSize = () => {
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    // Cette partie ne s'exécute que côté client
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    // Fonction de mise à jour
    const handleResize = () => setIsMobileScreen(mediaQuery.matches);

    // Initialisation
    handleResize();

    // Écoute des changements
    mediaQuery.addEventListener("change", handleResize);

    // Nettoyage à la destruction du composant
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return { isMobileScreen };
};

export default useScreenSize;
