import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { ArtistCard } from "./ArtistCard";
import { MusicPlayer } from "./MusicPlayer";
import { ArtistProfileSidebar } from "./ArtistProfileSidebar";
import { useState } from "react";

const artists = [
  {
    id: 1,
    name: "c",
    genres: ["chillout", "cinematic", "indie", "lofi", "punk", "soundtrack"],
    subscribers: 0,
    hasSubscription: false,
    bio: "An emerging artist blending multiple genres to create unique soundscapes. Known for experimental compositions that push boundaries.",
    previewSong: {
      title: "Midnight Dreams",
      duration: "4:12",
    },
  },
  {
    id: 2,
    name: "d",
    genres: ["cinematic", "edm", "metal"],
    subscribers: 0,
    hasSubscription: false,
    bio: "Bringing together the intensity of metal with electronic beats and cinematic atmospheres.",
    previewSong: {
      title: "Electric Storm",
      duration: "3:45",
    },
  },
  {
    id: 3,
    name: "Artist-255",
    genres: ["chillout", "cinematic"],
    subscribers: 0,
    imageUrl: "/image/vinyle.jpg",
    hasSubscription: true,
    bio: "Creating atmospheric music perfect for relaxation and contemplation. Specializing in ambient soundscapes.",
    previewSong: {
      title: "Serene Waters",
      duration: "5:30",
    },
  },
  {
    id: 4,
    name: "omer-alt",
    genres: ["afrobeat", "pop", "rap"],
    subscribers: 0,
    hasSubscription: false,
    bio: "Fusing traditional afrobeat rhythms with contemporary pop and hip-hop influences.",
    previewSong: {
      title: "Rhythm of Life",
      duration: "3:18",
    },
  },
  {
    id: 5,
    name: "GFHHH",
    genres: ["chillout", "cinematic", "metal"],
    subscribers: 0,
    imageUrl: "/image/vinyle.jpg",
    hasSubscription: false,
    bio: "An eclectic mix of heavy riffs and serene melodies. Music for every mood.",
    previewSong: {
      title: "Duality",
      duration: "4:55",
    },
  },
  {
    id: 6,
    name: "fgvbfgh",
    genres: ["chillout"],
    subscribers: 0,
    imageUrl: "/image/vinyle.jpg",
    hasSubscription: false,
    bio: "Pure chill vibes. Perfect background music for studying, working, or unwinding.",
    previewSong: {
      title: "Lazy Afternoon",
      duration: "3:02",
    },
  },
  {
    id: 7,
    name: "BO-PIERRE",
    genres: ["edm", "metal"],
    subscribers: 0,
    imageUrl: "/image/vinyle.jpg",
    hasSubscription: false,
    bio: "High-energy electronic music meets heavy metal. Expect the unexpected.",
    previewSong: {
      title: "Digital Chaos",
      duration: "4:38",
    },
  },
];

export default function ArtistProfile() {
  const [selectedArtist, setSelectedArtist] = useState<
    (typeof artists)[0] | null
  >(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleViewProfile = (artist: (typeof artists)[0]) => {
    setSelectedArtist(artist);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3d1952] via-[#4a1f5c] to-[#5a2772] pb-28">
      <Header />
      <Navigation />

      <main className="px-8 py-8">
        <h2 className="text-white text-2xl font-medium mb-6">Artists</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artists.map((artist) => (
            <ArtistCard
              key={artist.id}
              name={artist.name}
              genres={artist.genres}
              subscribers={artist.subscribers}
              imageUrl={artist.imageUrl}
              hasSubscription={artist.hasSubscription}
              onViewProfile={() => handleViewProfile(artist)}
            />
          ))}
        </div>
      </main>

      <MusicPlayer />
    </div>
  );
}
