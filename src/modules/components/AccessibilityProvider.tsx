"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AccessibilityContextType {
  announceMessage: (message: string, priority?: "polite" | "assertive") => void;
  enableKeyboardShortcuts: boolean;
  setEnableKeyboardShortcuts: (enabled: boolean) => void;
  highContrastMode: boolean;
  setHighContrastMode: (enabled: boolean) => void;
  reducedMotion: boolean;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider"
    );
  }
  return context;
}

interface AccessibilityProviderProps {
  children: ReactNode;
}

export function AccessibilityProvider({
  children,
}: AccessibilityProviderProps) {
  const [announcements, setAnnouncements] = useState<
    Array<{ id: string; message: string; priority: "polite" | "assertive" }>
  >([]);
  const [enableKeyboardShortcuts, setEnableKeyboardShortcuts] = useState(true);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect user's motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const announceMessage = (
    message: string,
    priority: "polite" | "assertive" = "polite"
  ) => {
    const id = Date.now().toString();
    setAnnouncements((prev) => [...prev, { id, message, priority }]);

    // Remove announcement after it's been read
    setTimeout(() => {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }, 1000);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        announceMessage,
        enableKeyboardShortcuts,
        setEnableKeyboardShortcuts,
        highContrastMode,
        setHighContrastMode,
        reducedMotion,
      }}
    >
      {/* Screen reader announcements */}
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcements
          .filter((a) => a.priority === "polite")
          .map((a) => (
            <div key={a.id}>{a.message}</div>
          ))}
      </div>
      <div
        className="sr-only"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {announcements
          .filter((a) => a.priority === "assertive")
          .map((a) => (
            <div key={a.id}>{a.message}</div>
          ))}
      </div>
      {children}
    </AccessibilityContext.Provider>
  );
}

// Screen reader only utility component
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

// Focus trap component for modals
export function FocusTrap({
  children,
  active,
}: {
  children: ReactNode;
  active: boolean;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener("keydown", handleTabKey);
    };
  }, [active]);

  return <div ref={containerRef}>{children}</div>;
}

// Skip link component
export function SkipLink({
  targetId,
  children,
}: {
  targetId: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:shadow-lg"
    >
      {children}
    </a>
  );
}
