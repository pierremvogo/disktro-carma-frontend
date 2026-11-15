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
  setReducedMotion: (enabled: boolean) => void;
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

  // Apply high contrast mode to the document. Previously this state was
  // tracked but never used anywhere, so toggling "High Contrast" in the
  // settings panel had no visible effect.
  useEffect(() => {
    if (!highContrastMode) return;
    document.documentElement.classList.add("high-contrast");
    return () => document.documentElement.classList.remove("high-contrast");
  }, [highContrastMode]);

  // Apply reduced motion to the document when the user has explicitly
  // enabled it (in addition to the OS-level "prefers-reduced-motion" media
  // query, which is handled separately in globals.css).
  useEffect(() => {
    if (!reducedMotion) return;
    document.documentElement.classList.add("reduce-motion");
    return () => document.documentElement.classList.remove("reduce-motion");
  }, [reducedMotion]);

  const announceMessage = (
    message: string,
    priority: "polite" | "assertive" = "polite"
  ) => {
    // Date.now() alone collides when two messages are announced in the same
    // millisecond (duplicate React keys, and both were removed together).
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setAnnouncements((prev) => [...prev, { id, message, priority }]);

    // Remove the announcement once screen readers have had time to pick it
    // up (1s was too short for longer messages).
    setTimeout(() => {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }, 4000);
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
        setReducedMotion,
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
    // Remember what had focus so it can be given back when the trap closes.
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const selector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      Array.from(container.querySelectorAll<HTMLElement>(selector));
    const firstElement = getFocusable()[0];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      // Re-query on every Tab: the content can change while the trap is open.
      const items = getFocusable();
      const firstElement = items[0];
      const lastElement = items[items.length - 1];

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
      previouslyFocused?.focus?.();
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
