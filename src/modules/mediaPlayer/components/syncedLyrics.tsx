import { useState, useEffect, useRef } from "react";

export default function SyncedLyrics({ lyrics, currentTime }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        setActiveIndex(i);
        break;
      }
    }
  }, [currentTime, lyrics]);

  // Scroll automatique pour garder la ligne active visible
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!containerRef.current) return;
    const activeLine = containerRef.current.children[activeIndex];
    if (activeLine) {
      activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className="bg-white rounded shadow-md p-4 max-h-64 overflow-y-auto"
    >
      <h3 className="font-semibold text-lg mb-2">Paroles synchronisées</h3>
      <ul className="space-y-1">
        {/* {lyrics.map((line: any, i: any) => (
          <li
            key={i}
            className={`transition-colors duration-300 ${
              i === activeIndex ? "text-blue-600 font-bold" : "text-gray-700"
            }`}
          >
            {line.text}
          </li>
        ))} */}
        {lyrics}
      </ul>
    </div>
  );
}
