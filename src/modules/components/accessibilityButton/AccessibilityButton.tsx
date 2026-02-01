"use client";

import React, { useEffect, useState } from "react";
import { X, Circle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

// Stickman Accessibility Icon
function StickmanIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="5" r="2.5" />
      <line x1="12" y1="7.5" x2="12" y2="14" />
      <line x1="12" y1="9.5" x2="8" y2="12" />
      <line x1="12" y1="9.5" x2="16" y2="12" />
      <line x1="12" y1="14" x2="9" y2="19" />
      <line x1="12" y1="14" x2="15" y2="19" />
    </svg>
  );
}

type Language = string;

export function AccessibilityButton({ language }: { language: Language }) {
  const [isOpen, setIsOpen] = useState(false);

  const [keyboardNav, setKeyboardNav] = useState(false);
  const [largerButtons, setLargerButtons] = useState(false);
  const [voiceControl, setVoiceControl] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);

  const text = {
    english: {
      aria: { open: "Accessibility options", close: "Close" },
      header: "Accessibility",
      keyboardNav: "Keyboard Navigation",
      largerButtons: "Larger Buttons",
      voiceControl: "Voice Control",
      voiceControlDesc: "Control the app with voice commands",
      cognitiveTitle: "Cognitive Accessibility",
      focusMode: "Focus Mode",
      focusModeDesc: "Reduce visual distractions",
      readingGuide: "Reading Guide",
      readingGuideDesc: "Guiding line for reading",
    },
    spanish: {
      aria: { open: "Opciones de accesibilidad", close: "Cerrar" },
      header: "Accesibilidad",
      keyboardNav: "Navegación por Teclado",
      largerButtons: "Botones Más Grandes",
      voiceControl: "Control por Voz",
      voiceControlDesc: "Controla la aplicación con comandos de voz",
      cognitiveTitle: "Accesibilidad Cognitiva",
      focusMode: "Modo Enfoque",
      focusModeDesc: "Reduce las distracciones visuales",
      readingGuide: "Guía de Lectura",
      readingGuideDesc: "Línea guía para leer",
    },
    catalan: {
      aria: { open: "Opcions d’accessibilitat", close: "Tancar" },
      header: "Accessibilitat",
      keyboardNav: "Navegació per Teclat",
      largerButtons: "Botons Més Grans",
      voiceControl: "Control per Veu",
      voiceControlDesc: "Controla l'aplicació amb comandes de veu",
      cognitiveTitle: "Accessibilitat Cognitiva",
      focusMode: "Mode Focus",
      focusModeDesc: "Redueix distraccions visuals",
      readingGuide: "Guia de Lectura",
      readingGuideDesc: "Línia guia per llegir",
    },
  };

  const content = text[language as keyof typeof text] || text.english;

  // ✅ Button size reduced
  const BUTTON_SIZE = 64; // h-16 w-16
  const MARGIN = 24;

  // ✅ Position: init bottom-right on client
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  // ✅ Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // ✅ Init bottom-right + update on resize
  useEffect(() => {
    const setBottomRight = () => {
      setPosition({
        x: window.innerWidth - BUTTON_SIZE - MARGIN,
        y: window.innerHeight - BUTTON_SIZE - MARGIN,
      });
    };

    setBottomRight();
    window.addEventListener("resize", setBottomRight);
    return () => window.removeEventListener("resize", setBottomRight);
  }, []);

  // Reading guide mouse tracking
  useEffect(() => {
    if (!readingGuide) return;

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty(
        "--reading-guide-position",
        `${e.clientY}px`
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [readingGuide]);

  // ✅ Only start dragging if user clicked the BUTTON (not the popover)
  const handleMouseDown = (e: React.MouseEvent) => {
    const clickedButton = (e.target as HTMLElement).closest(
      `button[aria-label="${content.aria.open}"]`
    );
    if (!clickedButton) return;

    const wrapper = e.currentTarget as HTMLElement;
    const rect = wrapper.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  // ✅ Drag listeners
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - dragOffset.x;
      const y = e.clientY - dragOffset.y;

      const maxX = window.innerWidth - BUTTON_SIZE;
      const maxY = window.innerHeight - BUTTON_SIZE;

      setPosition({
        x: Math.max(0, Math.min(x, maxX)),
        y: Math.max(0, Math.min(y, maxY)),
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const toggleKeyboardNav = (checked: boolean) => {
    setKeyboardNav(checked);
    document.documentElement.classList.toggle("keyboard-nav", checked);
  };

  const toggleLargerButtons = (checked: boolean) => {
    setLargerButtons(checked);
    document.documentElement.classList.toggle("larger-buttons", checked);
  };

  const toggleVoiceControl = (checked: boolean) => {
    setVoiceControl(checked);
    document.documentElement.classList.toggle("voice-control", checked);
  };

  const toggleFocusMode = (checked: boolean) => {
    setFocusMode(checked);
    document.documentElement.classList.toggle("focus-mode", checked);
  };

  const toggleReadingGuide = (checked: boolean) => {
    setReadingGuide(checked);
    document.documentElement.classList.toggle("reading-guide", checked);
  };

  if (!position) return null;

  return (
    <div
      className="fixed z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className="relative h-16 w-16 rounded-full shadow-2xl transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
            aria-label={content.aria.open}
            style={{
              background: "rgba(168, 85, 145, 0.4)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none",
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)",
              }}
            />
            <StickmanIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-white" />
          </button>
        </PopoverTrigger>

        {/* ✅ Scrollable Popover */}
        <PopoverContent
          className="w-96 bg-black/95 border-gray-800 text-white backdrop-blur-xl max-h-[calc(100vh-120px)] flex flex-col"
          side="top"
          align="end"
          sideOffset={16}
        >
          {/* Sticky header */}
          <div className="sticky top-0 z-10 bg-black/95 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StickmanIcon className="h-5 w-5" />
                <h4 className="font-semibold text-lg">{content.header}</h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 hover:bg-white/10 transition-colors"
                aria-label={content.aria.close}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <Separator className="bg-gray-800 mt-3" />
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 pt-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50">
              <Label
                htmlFor="keyboard-nav"
                className="cursor-pointer text-base font-normal"
              >
                {content.keyboardNav}
              </Label>
              <Switch
                id="keyboard-nav"
                checked={keyboardNav}
                onCheckedChange={toggleKeyboardNav}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50">
              <Label
                htmlFor="larger-buttons"
                className="cursor-pointer text-base font-normal"
              >
                {content.largerButtons}
              </Label>
              <Switch
                id="larger-buttons"
                checked={largerButtons}
                onCheckedChange={toggleLargerButtons}
              />
            </div>

            <div className="space-y-2 p-3 rounded-lg bg-zinc-900/50">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="voice-control"
                  className="cursor-pointer text-base font-normal"
                >
                  {content.voiceControl}
                </Label>
                <Switch
                  id="voice-control"
                  checked={voiceControl}
                  onCheckedChange={toggleVoiceControl}
                />
              </div>
              <p className="text-sm text-gray-400">
                {content.voiceControlDesc}
              </p>
            </div>

            <Separator className="bg-gray-800" />

            <div className="flex items-center gap-2">
              <Circle className="h-5 w-5" />
              <h5 className="font-semibold text-base">
                {content.cognitiveTitle}
              </h5>
            </div>

            <div className="space-y-2 p-3 rounded-lg bg-zinc-900/50">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="focus-mode"
                  className="cursor-pointer text-base font-normal"
                >
                  {content.focusMode}
                </Label>
                <Switch
                  id="focus-mode"
                  checked={focusMode}
                  onCheckedChange={toggleFocusMode}
                />
              </div>
              <p className="text-sm text-gray-400">{content.focusModeDesc}</p>
            </div>

            <div className="space-y-2 p-3 rounded-lg bg-zinc-900/50">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="reading-guide"
                  className="cursor-pointer text-base font-normal"
                >
                  {content.readingGuide}
                </Label>
                <Switch
                  id="reading-guide"
                  checked={readingGuide}
                  onCheckedChange={toggleReadingGuide}
                />
              </div>
              <p className="text-sm text-gray-400">
                {content.readingGuideDesc}
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
