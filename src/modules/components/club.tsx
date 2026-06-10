"use client";
import { useRouter } from "next/navigation";

export function ComingSoonClub() {
  const navigate = useRouter();

  return (
    <div
      className="size-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "#1a1a1a" }}
    >
      {/* Dark background */}
      <img
        src="https://images.unsplash.com/photo-1533563906091-fdfdffc3e3c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
        alt="dark leaves background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "brightness(0.35) blur(2px)" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-8">
        <p className="text-white/50 text-sm tracking-widest uppercase">
          Magazine • Music & Sports Entertainment • Store{" "}
        </p>
        <h1
          className="text-white"
          style={{
            fontSize: "clamp(2.5rem, 10vw, 5rem)",
            fontWeight: 300,
            letterSpacing: "0.15em",
          }}
        >
          Coming Soon
        </h1>
        <div className="w-16 h-px bg-white/30" />
        <p className="text-white/40 text-sm max-w-xs">
          We're working on something beautiful. Stay tuned.
        </p>
        <button
          onClick={() => navigate.push("/")}
          className="mt-4 text-white/50 text-xs hover:text-white transition tracking-widest uppercase"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
