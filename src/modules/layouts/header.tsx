"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import LanguageSwitcher from "@/@disktro/translation/LanguageSwitcher";
import i18n from "@/core/translation/i18n";
import Image from "next/image";
import {
  Menu,
  X,
  LogOut,
  Settings,
  Album,
  CreditCard,
  PlaySquareIcon,
  Home,
  UserSquare2Icon,
  Disc3,
  Disc,
  ListMusic,
} from "lucide-react";
import { UserModuleObject as UserModule } from "../module";
import { getImageFile, getUserRole, isTokenExpired } from "@/@disktro/utils";
import { MediaModuleObject as ModuleObject } from "../file/module";

// Panneau d’accessibilité
import { AccessibilitySettingsPanel } from "../components/AccessibilitySettingsPanel";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fade, setFade] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  // Langue actuelle pour l’accessibilité
  const currentLanguage =
    (i18n?.language as "english" | "spanish" | "catalan") || "english";

  // ✅ Chargement initial
  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const role = getUserRole();
    setUserRole(role);
    setIsAuthenticated(!!token);
    if (token) {
      if (isTokenExpired()) {
        handleLogout();
      } else if (!profileImageUrl) {
        fetchUser();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole]);

  // ✅ Fermer le dropdown quand on clique à l’extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFade(true);
        setTimeout(() => setIsDropdownOpen(false), 100);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // ✅ Charger les infos utilisateur
  const fetchUser = async () => {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(ModuleObject.localState.USER_ID);
    if (!userId) return;

    try {
      const user = await UserModule.service.getUser(userId);
      if (user.data.profileImageUrl) {
        const imageObjectUrl = await getImageFile(
          user.data.profileImageUrl,
          token!
        );
        setProfileImageUrl(imageObjectUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem(ModuleObject.localState.ACCESS_TOKEN);
    localStorage.removeItem(ModuleObject.localState.USER_ID);
    localStorage.removeItem(ModuleObject.localState.USER_DATA);
    localStorage.removeItem(ModuleObject.localState.USER_ROLE);

    setIsAuthenticated(false);
    setIsDropdownOpen(false);
    setUserRole(null);
    router.push("/home");
  };

  const handleLogin = () => router.push("/auth/login");
  const handleSignup = () => router.push("/auth/register");

  const isActive = (path: string) => pathname === path;
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleDropdown = () => {
    if (isDropdownOpen && isAuthenticated) {
      setFade(true);
      setTimeout(() => setIsDropdownOpen(false), 100);
    } else {
      setIsDropdownOpen(true);
      setFade(false);
    }
  };

  // 🔹 Nouveau style de bouton/link pour matcher le login (verre + blanc)
  const linkClass = (path: string) =>
    `flex items-center cursor-pointer text-sm font-medium px-4 py-2 rounded-lg transition-all border ${
      isActive(path)
        ? "bg-white/30 border-white/60 text-white shadow-lg"
        : "bg-white/10 border-white/30 text-white/80 hover:bg-white/20 hover:text-white"
    }`;

  return (
    <>
      {/* HEADER */}
      <header className="bg-black/10 backdrop-blur-xl border-b border-white/20 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        {/* Left side (Hamburger + Logo) */}
        <div className="flex items-center gap-3">
          {/* Hamburger visible uniquement sur mobile */}
          <button className="md:hidden text-white mr-1" onClick={toggleSidebar}>
            {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Logo visible sur desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Logo image qui remplit tout le cercle */}
            <div className="w-10 h-10 rounded-full overflow-hidden border-white/40 shadow-md">
              <Image
                src="/image/logo.png" // adapte le chemin à ton vrai logo
                alt="Cosmic logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white font-semibold text-lg drop-shadow">
              Music for all
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {/* Accueil */}
          <button onClick={() => router.push("/")} className={linkClass("/")}>
            <Home size={16} className="mr-2" />
            Accueil
          </button>

          {/* ⚙️ Accessibilité */}
          <div>
            <AccessibilitySettingsPanel language={currentLanguage} />
          </div>

          {/* Dropdown Profil visible uniquement sur desktop */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={isAuthenticated ? toggleDropdown : handleLogin}
              className="flex items-center justify-center focus:outline-none"
            >
              <div className="relative cursor-pointer rounded-full overflow-hidden border border-white/50 w-[40px] h-[40px] bg-white/10">
                <Image
                  src={profileImageUrl || "/image/profile_default.png"}
                  alt="Profile"
                  className="object-cover h-full w-full"
                  width={80}
                  height={80}
                />
              </div>
            </button>

            {/* Dropdown */}
            {isAuthenticated && isDropdownOpen && (
              <div
                className={`absolute mt-2 right-0 w-56 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-10 overflow-hidden transition-opacity duration-200 ${
                  fade ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="py-2 px-2 space-y-1">
                  {(userRole === "artist" || userRole === "admin") && (
                    <>
                      <button
                        onClick={() => router.push("/single")}
                        className={linkClass("/single")}
                      >
                        <Disc size={16} className="mr-2" /> Mes singles
                      </button>
                      <button
                        onClick={() => router.push("/extended-play")}
                        className={linkClass("/extended-play")}
                      >
                        <ListMusic size={16} className="mr-2" /> Mes EPs
                      </button>
                      <button
                        onClick={() => router.push("/album")}
                        className={linkClass("/album")}
                      >
                        <Album size={16} className="mr-2" />
                        Mes Albums
                      </button>
                      <button
                        onClick={() => router.push("/release")}
                        className={linkClass("/release")}
                      >
                        <Disc3 size={16} className="mr-2" /> Releases
                      </button>
                    </>
                  )}

                  {(userRole === "user" ||
                    userRole === "artist" ||
                    userRole === "admin") && (
                    <button
                      onClick={() => router.push("/playlist")}
                      className={linkClass("/playlist")}
                    >
                      <PlaySquareIcon size={16} className="mr-2" /> Mes
                      Playlists
                    </button>
                  )}

                  <button
                    onClick={() => router.push("/pricing")}
                    className={linkClass("/pricing")}
                  >
                    <CreditCard size={16} className="mr-2" /> Pricing
                  </button>

                  <button
                    onClick={() => router.push("/settings")}
                    className={linkClass("/settings")}
                  >
                    <Settings size={16} className="mr-2" /> Settings
                  </button>

                  {userRole === "admin" && (
                    <button
                      onClick={() => router.push("/admin/dashboard")}
                      className={linkClass("/admin/dashboard")}
                    >
                      <UserSquare2Icon size={16} className="mr-2" /> Admin
                      Dashboard
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center cursor-pointer text-sm w-full px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all"
                  >
                    <LogOut size={16} className="mr-2" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* SIDEBAR - Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black/85 backdrop-blur-xl text-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/20">
          <div className="hidden md:flex items-center gap-3">
            {/* Logo image qui remplit tout le cercle */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/40 shadow-md">
              <Image
                src="/image/logo.jpg" // adapte le chemin à ton vrai logo
                alt="Cosmic logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white font-semibold text-lg drop-shadow">
              Music for all
            </span>
          </div>
          <button onClick={toggleSidebar} className="text-white">
            <X size={24} />
          </button>
        </div>

        {/* NAVIGATION MOBILE */}
        <nav className="flex flex-col gap-4 px-6 py-6">
          <Link
            href="/home"
            onClick={toggleSidebar}
            className={linkClass("/home")}
          >
            <Home size={16} className="mr-2" /> Accueil
          </Link>

          {(userRole === "artist" || userRole === "admin") && (
            <>
              <button
                onClick={() => {
                  router.push("/single");
                  toggleSidebar();
                }}
                className={linkClass("/single")}
              >
                <Disc size={16} className="mr-2" /> Mes singles
              </button>
              <button
                onClick={() => {
                  router.push("/extended-play");
                  toggleSidebar();
                }}
                className={linkClass("/extended-play")}
              >
                <ListMusic size={16} className="mr-2" /> Mes EPs
              </button>
              <button
                onClick={() => {
                  router.push("/album");
                  toggleSidebar();
                }}
                className={linkClass("/album")}
              >
                <Album size={16} className="mr-2" />
                Mes Albums
              </button>

              <button
                onClick={() => {
                  router.push("/release");
                  toggleSidebar();
                }}
                className={linkClass("/release")}
              >
                <Disc3 size={16} className="mr-2" /> Releases
              </button>
            </>
          )}

          {(userRole === "user" ||
            userRole === "artist" ||
            userRole === "admin") && (
            <Link
              href="/playlist"
              onClick={toggleSidebar}
              className={linkClass("/playlist")}
            >
              <PlaySquareIcon size={16} className="mr-2" /> My Playlist
            </Link>
          )}

          <Link
            href="/pricing"
            onClick={toggleSidebar}
            className={linkClass("/pricing")}
          >
            <CreditCard size={16} className="mr-2" /> Pricing
          </Link>

          <Link
            href="/settings"
            onClick={toggleSidebar}
            className={linkClass("/settings")}
          >
            <Settings size={16} className="mr-2" /> Settings
          </Link>

          {/* ⚙️ Panneau Accessibilité aussi sur mobile */}
          <div className="mt-2">
            <AccessibilitySettingsPanel language={currentLanguage} />
          </div>

          {userRole === "admin" && (
            <Link
              href="/admin/dashboard"
              onClick={toggleSidebar}
              className={linkClass("/admin/dashboard")}
            >
              <UserSquare2Icon size={16} className="mr-2" /> Admin Dashboard
            </Link>
          )}

          {isAuthenticated ? (
            <button
              onClick={() => {
                toggleSidebar();
                handleLogout();
              }}
              className="flex items-center cursor-pointer text-sm bg-red-500/20 text-red-300 font-medium px-4 py-2 rounded-lg hover:bg-red-500/30 transition"
            >
              <LogOut size={16} className="mr-2" /> Sign Out
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  toggleSidebar();
                  handleLogin();
                }}
                className={linkClass("/auth/login")}
              >
                Se connecter
              </button>
              <button
                onClick={() => {
                  toggleSidebar();
                  handleSignup();
                }}
                className={linkClass("/auth/register")}
              >
                Créer un compte
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
