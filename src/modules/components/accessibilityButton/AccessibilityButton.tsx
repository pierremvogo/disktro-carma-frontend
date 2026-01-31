import { useState, useEffect } from "react";
import { X, Circle } from "lucide-react";
import { Button } from "./ui/button";
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
    >
      {/* Head */}
      <circle cx="12" cy="5" r="2.5" />
      {/* Body */}
      <line x1="12" y1="7.5" x2="12" y2="14" />
      {/* Arms */}
      <line x1="12" y1="9.5" x2="8" y2="12" />
      <line x1="12" y1="9.5" x2="16" y2="12" />
      {/* Legs */}
      <line x1="12" y1="14" x2="9" y2="19" />
      <line x1="12" y1="14" x2="15" y2="19" />
    </svg>
  );
}

export function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [largerButtons, setLargerButtons] = useState(false);
  const [voiceControl, setVoiceControl] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);

  // Dragging state
  const [position, setPosition] = useState({ x: 24, y: 24 }); // top-left position
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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

  // Dragging functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent dragging if clicking on the button itself (to allow opening popover)
    if (
      (e.target as HTMLElement).closest(
        'button[aria-label="Accessibility options"]'
      )
    ) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const toggleKeyboardNav = (checked: boolean) => {
    setKeyboardNav(checked);
    if (checked) {
      document.documentElement.classList.add("keyboard-nav");
    } else {
      document.documentElement.classList.remove("keyboard-nav");
    }
  };

  const toggleLargerButtons = (checked: boolean) => {
    setLargerButtons(checked);
    if (checked) {
      document.documentElement.classList.add("larger-buttons");
    } else {
      document.documentElement.classList.remove("larger-buttons");
    }
  };

  const toggleVoiceControl = (checked: boolean) => {
    setVoiceControl(checked);
    if (checked) {
      document.documentElement.classList.add("voice-control");
      // Voice control implementation would go here
    } else {
      document.documentElement.classList.remove("voice-control");
    }
  };

  const toggleFocusMode = (checked: boolean) => {
    setFocusMode(checked);
    if (checked) {
      document.documentElement.classList.add("focus-mode");
    } else {
      document.documentElement.classList.remove("focus-mode");
    }
  };

  const toggleReadingGuide = (checked: boolean) => {
    setReadingGuide(checked);
    if (checked) {
      document.documentElement.classList.add("reading-guide");
    } else {
      document.documentElement.classList.remove("reading-guide");
    }
  };

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
            className="relative h-20 w-20 rounded-full shadow-2xl transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30"
            aria-label="Accessibility options"
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
            <StickmanIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-white" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-96 bg-black/95 border-gray-800 text-white backdrop-blur-xl"
          side="top"
          align="start"
          sideOffset={16}
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StickmanIcon className="h-5 w-5" />
                <h4 className="font-semibold text-lg">Accessibilitat</h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <Separator className="bg-gray-800" />

            {/* Keyboard Navigation */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50">
              <Label
                htmlFor="keyboard-nav"
                className="cursor-pointer text-base font-normal"
              >
                Navegació per Teclat
              </Label>
              <Switch
                id="keyboard-nav"
                checked={keyboardNav}
                onCheckedChange={toggleKeyboardNav}
              />
            </div>

            {/* Larger Buttons */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/50">
              <Label
                htmlFor="larger-buttons"
                className="cursor-pointer text-base font-normal"
              >
                Botons Més Grans
              </Label>
              <Switch
                id="larger-buttons"
                checked={largerButtons}
                onCheckedChange={toggleLargerButtons}
              />
            </div>

            {/* Voice Control */}
            <div className="space-y-2 p-3 rounded-lg bg-zinc-900/50">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="voice-control"
                  className="cursor-pointer text-base font-normal"
                >
                  Control per Veu
                </Label>
                <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300">
                  Experimental
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Controla l'aplicació amb comandes de veu
              </p>
            </div>

            <Separator className="bg-gray-800" />

            {/* Cognitive Accessibility Section */}
            <div className="flex items-center gap-2">
              <Circle className="h-5 w-5" />
              <h5 className="font-semibold text-base">
                Accessibilitat Cognitiva
              </h5>
            </div>

            {/* Focus Mode */}
            <div className="space-y-2 p-3 rounded-lg bg-zinc-900/50">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="focus-mode"
                  className="cursor-pointer text-base font-normal"
                >
                  Mode Focus
                </Label>
                <Switch
                  id="focus-mode"
                  checked={focusMode}
                  onCheckedChange={toggleFocusMode}
                />
              </div>
              <p className="text-sm text-gray-400">
                Redueix distraccions visuals
              </p>
            </div>

            {/* Reading Guide */}
            <div className="space-y-2 p-3 rounded-lg bg-zinc-900/50">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="reading-guide"
                  className="cursor-pointer text-base font-normal"
                >
                  Guia de Lectura
                </Label>
                <Switch
                  id="reading-guide"
                  checked={readingGuide}
                  onCheckedChange={toggleReadingGuide}
                />
              </div>
              <p className="text-sm text-gray-400">Línia guia per llegir</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
