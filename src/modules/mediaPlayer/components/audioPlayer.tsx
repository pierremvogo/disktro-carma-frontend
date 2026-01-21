import { useRef, useState, useEffect } from "react";

export default function AudioPlayer({ src, title, cover, onTimeUpdate }: any) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current as any;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = audioRef.current as any;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (onTimeUpdate) onTimeUpdate(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onTimeUpdate) onTimeUpdate(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [onTimeUpdate]);

  return (
    <div className="bg-white rounded shadow-md p-4 flex items-center space-x-4">
      <img src={cover} alt="cover" className="w-20 h-20 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <audio ref={audioRef} src={src} controls />
        <button
          onClick={togglePlay}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
