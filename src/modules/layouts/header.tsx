"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import LanguageSwitcher from "@/@disktro/translation/LanguageSwitcher";
import i18n from "@/core/translation/i18n";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  User2Icon,
  LogOut,
  ArrowBigDown,
  ArrowDown,
  DropletIcon,
  ArrowDown01,
  ArrowDownFromLine,
  Settings,
  Album,
  Play,
  Music,
  Megaphone,
  UserPen,
  CreditCard,
} from "lucide-react";
import { MediaModuleObject as ModuleObject } from "../module";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null); // Store username
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fade, setFade] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!i18n.language) return;
    setIsAuthenticated(!!token);

    if (token) {
      const user = localStorage.getItem(ModuleObject.localState.USER_DATA);
      const currentUser = JSON.parse(user!);
      setUsername(currentUser.name || "Utilisateur");
      setProfileImageUrl(currentUser.profileImage || null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(ModuleObject.localState.ACCESS_TOKEN);
    localStorage.removeItem(ModuleObject.localState.USER_ID);
    localStorage.removeItem(ModuleObject.localState.USER_DATA);
    setIsAuthenticated(false);
    setIsDropdownOpen(false);
    setUsername(null);
    router.push("/home");
  };

  const handleLogin = () => router.push("/auth/login");
  const handleSignup = () => router.push("/auth/register");
  const isActive = (path: string) => pathname === path;
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  // const toggleDropdown = () => {
  //   if (isAuthenticated) {
  //     setIsDropdownOpen(!isDropdownOpen);
  //   }
  // };
  const toggleDropdown = () => {
    if (isDropdownOpen && isAuthenticated) {
      // Si on ferme le dropdown, on démarre l'animation fadeOut
      setFade(true);
      setTimeout(() => setIsDropdownOpen(false), 800); // Attendre la fin de l'animation (300ms)
    } else {
      setIsDropdownOpen(true);
      setFade(false); // Réinitialiser l'animation fadeIn
    }
  };

  return (
    <>
      {/* HEADER */}
      <header className="bg-white/50 backdrop-blur-md shadow-md px-4 py-4 flex items-center justify-between mb-8 sticky top-0 z-50">
        {/* Left side (hamburger OR logo) */}
        <div className="flex items-center">
          {/* Mobile: Hamburger */}
          <button
            className="md:hidden text-[#1F89A5] mr-2"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop: Logo */}
          <div className="hidden md:flex items-center gap-2 text-[#1F89A5] font-bold text-xl">
            <span role="img" aria-label="logo">
              🌌
            </span>
            <span>Cosmic</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="flex items-center gap-4">
          {/* <Link
            href="/home"
            className={`text-sm font-medium text-center items-center transition h-9 w-[100px] rounded-sm ${
              isActive("/home")
                ? "bg-[#1F89A5] text-white"
                : "bg-[#1F89A5] text-white hover:text-[#1A4C61]"
            }`}
          >
            Accueil
          </Link> */}
          <div className="flex items-center cursor-pointer">
            <div className="relative w-[100px]">
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={isAuthenticated ? toggleDropdown : handleLogin}
              className="flex items-center justify-center focus:outline-none"
            >
              {/* <img
                src={
                  profileImageUrl ? profileImageUrl : "/default-avatar.png" // 👈 ton image par défaut
                }
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-[#1F89A5] hover:scale-105 transition-transform"
              /> */}
              <div className="relative cursor-pointer rounded-full overflow-hidden border border-primary w-[40px] h-[40px]">
                <Image
                  src="/image/profile_default.png"
                  alt=""
                  className="object-cover h-full w-full"
                  width={80}
                  height={80}
                />
              </div>
            </button>

            {isAuthenticated && isDropdownOpen && (
              <div
                className={`absolute mt-2 right-0 w-52 max-h-96
      bg-white border border-gray-300 rounded-md 
      shadow-lg z-10 overflow-auto transition-opacity duration-300 ease-out ${
        fade ? "opacity-0" : "opacity-100"
      }`}
              >
                {/* tes éléments du menu dropdown ici */}
                <button
                  onClick={() => router.push("/album")}
                  className="w-full flex items-center cursor-pointer text-sm text-left px-4 py-2 text-[#1F89A5] hover:bg-gray-200"
                >
                  <Album size={16} color="#1A4C61" className="mr-2" />
                  Albums
                </button>
                <button
                  onClick={() => router.push("/artist")}
                  className="w-full flex items-center cursor-pointer text-sm text-left px-4 py-2 text-[#1F89A5] hover:bg-gray-200"
                >
                  <UserPen size={16} color="#1A4C61" className="mr-2" />
                  Artists
                </button>
                <button
                  onClick={() => router.push("/pricing")}
                  className="w-full flex items-center cursor-pointer text-sm text-left px-4 py-2 text-[#1F89A5] hover:bg-gray-200"
                >
                  <CreditCard size={16} color="#1A4C61" className="mr-2" />
                  Pricing
                </button>
                <button
                  onClick={() => router.push("/settings")}
                  className="w-full flex items-center cursor-pointer text-sm text-left px-4 py-2 text-[#1F89A5] hover:bg-gray-200"
                >
                  <Settings size={16} color="#1A4C61" className="mr-2" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center cursor-pointer text-sm text-left px-4 py-2 text-red-400 hover:bg-gray-200"
                >
                  <LogOut size={16} color="#1A4C61" className="mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right side (always visible): LanguageSwitcher */}
      </header>

      {/* SIDEBAR - Mobile only */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
          <div className="text-[#1F89A5] font-bold text-xl flex items-center gap-2">
            <span>🌌</span>
            <span>Cosmic</span>
          </div>
          <button onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 px-6 py-6">
          <Link
            href="/home"
            onClick={toggleSidebar}
            className={`text-sm font-medium px-4 py-2 rounded-md transition ${
              isActive("/home")
                ? "bg-[#1F89A5] text-white"
                : "bg-gray-200 text-[#1F89A5] hover:bg-gray-300"
            }`}
          >
            Accueil
          </Link>
          <Link
            href="/home"
            onClick={toggleSidebar}
            className={`text-sm font-medium px-4 py-2 rounded-md transition ${
              isActive("/home")
                ? "bg-[#1F89A5] text-white"
                : "bg-gray-200 text-[#1F89A5] hover:bg-gray-300"
            }`}
          >
            Clear Cover Song
          </Link>
          <Link
            href="/home"
            onClick={toggleSidebar}
            className={`text-sm font-medium px-4 py-2 rounded-md transition ${
              isActive("/home")
                ? "bg-[#1F89A5] text-white"
                : "bg-gray-200 text-[#1F89A5] hover:bg-gray-300"
            }`}
          >
            Albums
          </Link>
          <Link
            href="/home"
            onClick={toggleSidebar}
            className={`text-sm font-medium px-4 py-2 rounded-md transition ${
              isActive("/home")
                ? "bg-[#1F89A5] text-white"
                : "bg-gray-200 text-[#1F89A5] hover:bg-gray-300"
            }`}
          >
            My Playlist
          </Link>
          <Link
            href="/home"
            onClick={toggleSidebar}
            className={`text-sm font-medium px-4 py-2 rounded-md transition ${
              isActive("/home")
                ? "bg-[#1F89A5] text-white"
                : "bg-gray-200 text-[#1F89A5] hover:bg-gray-300"
            }`}
          >
            Settings
          </Link>
          <button
            onClick={() => {
              toggleSidebar();
              handleSignup();
            }}
            className={`flex text-left text-sm font-medium px-4 py-2 rounded-md transition ${
              isActive("/auth/register")
                ? "bg-[#1F89A5] text-white"
                : "bg-gray-200 text-[#1F89A5] hover:bg-gray-300"
            }`}
          >
            Créer un compte
          </button>

          {isAuthenticated ? (
            <button
              onClick={() => {
                toggleSidebar();
                handleLogout();
              }}
              className="flex text-left text-sm bg-red-100 text-red-600 font-medium px-4 py-2 rounded-md hover:bg-red-200 transition"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => {
                toggleSidebar();
                handleLogin();
              }}
              className={`items-center text-center text-sm font-medium px-4 py-2 rounded-md transition ${
                isActive("/auth/login") || isActive("/auth/password-forgot")
                  ? "bg-[#1F89A5] text-white"
                  : "bg-gray-200 text-[#1F89A5] hover:bg-gray-300"
              }`}
            >
              Se connecter
            </button>
          )}
        </nav>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-30 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
