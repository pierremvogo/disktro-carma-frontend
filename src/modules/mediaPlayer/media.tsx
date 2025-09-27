"use client";

import { useEffect, useState } from "react";
import AudioPlayer from "./components/audioPlayer";
import VideoPlayer from "./components/videoPlayer";
import SyncedLyrics from "./components/syncedLyrics";
import { MediaModuleObject as ModuleObject } from "../module";
import { wait } from "@/@disktro/utils";
import Loading from "@/@disktro/loading";
import Footer from "../layouts/footer";
import Header from "../layouts/header";

const playlist = [
  {
    id: 1,
    title: "mistral gagnant",
    artist: "coeur_de_pirate",
    audioSrc: "/media/audio.mp3",
    videoSrc: "/media/video.mp4",
    cover: "/media/cover.jpg",
    lyrics: [
      { time: 0, text: "[Couplet 1]" },
      { time: 5, text: "Voici les paroles de ta chanson" },
      { time: 10, text: "Synchronisées ou non, elles défilent lentement" },
      { time: 15, text: "[Refrain]" },
      { time: 20, text: "Chante, danse, ressens le son" },
      { time: 25, text: "Next.js te donne toute la direction 🎶" },
    ],
  },
  {
    id: 2,
    title: "mistral gagnant",
    artist: "coeur_de_pirate",
    audioSrc: "/media/audio.mp3",
    videoSrc: "/media/video.mp4",
    cover: "/media/cover.jpg",
    lyrics: [
      { time: 0, text: "[Intro]" },
      { time: 4, text: "Bienvenue sur la deuxième chanson" },
      { time: 9, text: "Profite du son et de la vidéo" },
      { time: 14, text: "[Refrain]" },
      { time: 19, text: "La musique fait vibrer l’âme" },
      { time: 23, text: "Avec Next.js et Tailwind CSS" },
    ],
  },
];

export default function Media() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [lyrics, setLyrics] = useState<{ lyrics: string }>({ lyrics: "" });
  const currentTrack = playlist[currentIndex];
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fetchLyrics = async () => {
      try {
        setIsLoading(true);
        const lyrics = await ModuleObject.service.getLyrics(
          playlist[0].artist,
          playlist[0].title
        );
        await wait();
        setLyrics(lyrics);
        setIsLoading(false);
      } catch (err) {
        setError((err as Error).message);
        console.error(err);
      }
    };

    fetchLyrics();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <main className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto space-y-8">
              <h1 className="text-3xl font-bold text-center text-blue-600">
                🎧 Lecteur Audio / Vidéo + Lyrics synchronisées
              </h1>

              {/* Playlist */}
              <div className="flex flex-wrap justify-center gap-4">
                {playlist.map((track, i) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      setCurrentIndex(i);
                      setCurrentTime(0);
                    }}
                    className={`px-4 py-2 rounded ${
                      i === currentIndex
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-300 hover:bg-blue-100"
                    }`}
                  >
                    {track.title}
                  </button>
                ))}
              </div>

              {/* Audio Player */}
              <AudioPlayer
                key={currentTrack.audioSrc}
                src={currentTrack.audioSrc}
                title={currentTrack.title}
                cover={currentTrack.cover}
                onTimeUpdate={setCurrentTime}
              />

              {/* Lyrics synchronisées */}
              <SyncedLyrics lyrics={lyrics.lyrics} currentTime={currentTime} />
              {isLoading && <Loading />}
              {error && error}
              {/* Video Player */}
              <VideoPlayer
                key={currentTrack.videoSrc}
                src={currentTrack.videoSrc}
              />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
