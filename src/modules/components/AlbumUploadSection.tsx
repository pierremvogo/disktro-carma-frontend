import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ArtistModuleObject as ModuleObject } from "../artist/module";
import { useRouter } from "next/navigation";
import { AccessibilitySettingsPanel } from "./AccessibilitySettingsPanel";
import { MediaModuleObject as MediaModule } from "../file/module";
import { UserModuleObject as UserModule } from "../module";
import { getImageFile, getVideoFile } from "@/@disktro/utils";
import { MoodModuleObject as MoodModule } from "../mood/module";
import { TrackModuleObject as TrackModule } from "../track/module";
import { SingleModuleObject } from "../single/module";
import { SingleUploadSection } from "./SingleUploadSection";
import { AlbumModuleObject } from "../album/module";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import AlbumTracksEditor from "./AlbumTrackDetails";
import { getEpTexts } from "./i18n/epTranslation";
// Icon components
const Upload = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const TrendingUp = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const Users = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const DollarSign = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const PayoutIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Carte de paiement */}
    <rect x="3" y="5" width="18" height="14" rx="3" ry="3" />
    {/* Bande de la carte */}
    <line x1="3" y1="10" x2="21" y2="10" />
    {/* Petit rond (puce ou logo) */}
    <circle cx="9" cy="15" r="1.3" />
    {/* Petit rectangle (zone de code) */}
    <rect x="13" y="13.7" width="5" height="2.6" rx="0.5" />
  </svg>
);

const Music = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const Play = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const Search = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const Video = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const Image = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const FileText = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const X = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Icône Voir détails (Eye)
const Eye = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Icône Supprimer (Trash)
const Trash = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const Smartphone = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

type AlbumTrack = {
  id: string;
  audioFile: File | null;
  audioUrl: string;
  moodId: string;
  title: string;
  lyrics: string;
  audioUrlPrevew: string;
  brailleFileUrl: string;
  brailleFilePrevew: string;
  brailleFile: File | null;
  signLanguageVideoFile: File | null;
  signLanguageVideoPreview: string;
  signLanguageVideoUrl: string;
};

type AlbumCreationInfo = {
  id?: string;
  title?: string;
  slug?: string;
  duration?: number | null;
  coverUrl?: string;
  trackTitle: string; // titre principal / “nom de l’ALBUM”
  authors: string;
  producers: string;
  lyricists: string;
  musiciansVocals: string;
  musiciansPianoKeyboards: string;
  musiciansWinds: string;
  musiciansPercussion: string;
  musiciansStrings: string;
  mixingEngineer: string;
  masteringEngineer: string;
  lyrics: string;
  moodId: string;
};

const initialAlbumCreation: AlbumCreationInfo = {
  trackTitle: "",
  authors: "",
  producers: "",
  lyricists: "",
  musiciansVocals: "",
  musiciansPianoKeyboards: "",
  musiciansWinds: "",
  musiciansPercussion: "",
  musiciansStrings: "",
  mixingEngineer: "",
  masteringEngineer: "",
  lyrics: "",
  moodId: "",
};
type Mood = {
  id: string;
  name: string;
};

type AlbumUploadSectionProps = {
  text: any;
  language: string;
};

export function AlbumUploadSection({
  text,
  language,
}: AlbumUploadSectionProps) {
  // ==========
  // State ALBUM
  // ==========
  const [albumCreation, setAlbumCreation] =
    React.useState<AlbumCreationInfo>(initialAlbumCreation);
  const router = useRouter();

  const [tracks, setTracks] = React.useState<AlbumTrack[]>([
    {
      id: crypto.randomUUID(),
      audioFile: null,
      audioUrl: "",
      audioUrlPrevew: "",
      brailleFileUrl: "",
      brailleFile: null,
      brailleFilePrevew: "",
      title: "",
      moodId: "",
      signLanguageVideoFile: null,
      signLanguageVideoPreview: "",
      signLanguageVideoUrl: "",
      lyrics: "",
    },
  ]);
  const [albumToDelete, setAlbumToDelete] =
    React.useState<AlbumCreationInfo | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [selectedAlbumTitle, setSelectedAlbumTitle] = useState<string>("");

  const [brailleFile, setBrailleFile] = React.useState<File | null>(null);
  const [brailleFileUrl, setBrailleFileUrl] = React.useState<string>("");
  const [audioUrl, setAudioUrl] = React.useState<string>("");
  const [moods, setMoods] = React.useState<Mood[] | null>(null);
  const [signLanguageVideoUrl, setSignLanguageVideoUrl] =
    React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [artworkFile, setArtworkFile] = React.useState<File | null>(null);
  const [artworkPreview, setArtworkPreview] = React.useState<string>("");
  const [coverUrl, setCoverUrl] = React.useState<string>("");

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000); // 10 secondes

      return () => clearTimeout(timer); // cleanup
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000); // 10 secondes

      return () => clearTimeout(timer); // cleanup
    }
  }, [errorMessage]);

  type ALBUM = {
    id?: string;
    userId?: string;
    user?: any;
    title: string;
    artistId?: string;
    tagId?: string;
    coverFile?: File | null;
    coverUrl?: string;
    coverImageUrl?: string;
    trackALBUMs?: [];
  };
  const [albums, setALBUMs] = useState<AlbumCreationInfo[]>([]);

  useEffect(() => {
    if (albums.length === 0) fetchALBUMs();
  }, []);

  async function fetchALBUMs() {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(ModuleObject.localState.USER_ID);
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (!token || !userId) return;

      const res = await AlbumModuleObject.service.getAlbumByUser(userId, token);
      // en fonction de ce que renvoie réellement ton service :
      const albumList = res.data ?? res.albums ?? [];
      setALBUMs(albumList);
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleViewAlbumDetails = (albumId: string, title?: string) => {
    setSelectedAlbumId(albumId);
    setSelectedAlbumTitle(title || "");
  };

  const handleConfirmDelete = async () => {
    if (!albumToDelete) return;

    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await AlbumModuleObject.service.deleteAlbum(albumToDelete.id!);
      setALBUMs((prev) => prev.filter((e) => e.id !== albumToDelete.id));
      setSuccessMessage("ALBUM supprimé avec succès.");
      fetchALBUMs();
    } catch (error) {
      setErrorMessage("Erreur lors de la suppression de l'ALBUM.");
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      setAlbumToDelete(null);
    }
  };

  useEffect(() => {
    console.log("------------------------", tracks);
  }, [tracks]);

  // ==========
  // Fetch moods
  // ==========
  React.useEffect(() => {
    async function fetchMoods() {
      try {
        const token = localStorage.getItem(MoodModule.localState.ACCESS_TOKEN);
        if (!token) return;
        const res = await MoodModule.service.getMoods(token);
        setMoods(res.data);
      } catch (error) {
        console.error("Erreur récupération des moods :", error);
      }
    }
    if (!moods) fetchMoods();
  }, [moods]);

  // ==========
  // Upload audio par piste
  // ==========
  const handleArtwork = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const file = e.target.files?.[0];

    if (!file) return;

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    setArtworkFile(file);
    setArtworkPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await MediaModule.service.uploadImageFile(fd);

      if (res && res.url) {
        setCoverUrl(res.url);
        setSuccessMessage("Artwork uploadé avec succès.");
      } else {
        setErrorMessage("Erreur lors de l'upload de l'artwork.");
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleTrackAudioChange =
    (trackId: string) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setErrorMessage("");
      setSuccessMessage("");
      setIsLoading(true);
      setTracks((prev) =>
        prev.map((t) =>
          t.id === trackId
            ? {
                ...t,
                audioFile: file,
              }
            : t
        )
      );
      const fd = new FormData();
      fd.append("file", file);

      try {
        const res = await MediaModule.service.uploadAudioFile(fd);

        if (res && (res.fileName || res.url)) {
          const uploadedAudioUrl = res.url ?? res.fileName;
          setAudioUrl(uploadedAudioUrl);
          setTracks((prev) =>
            prev.map((t) =>
              t.id === trackId
                ? {
                    ...t,
                    audioFile: file,
                    audioUrl: uploadedAudioUrl || "",
                  }
                : t
            )
          );

          setSuccessMessage("Fichier audio de la piste uploadé avec succès.");
        } else {
          setErrorMessage("Erreur lors de l'upload du fichier audio.");
        }
      } catch (error) {
        console.error("Erreur upload audio ALBUM :", error);
        setErrorMessage(
          (error as Error).message ||
            "Erreur lors de l'upload du fichier audio."
        );
      } finally {
        setIsLoading(false);
      }
    };

  // ==========
  // Upload vidéo langue des signes par piste
  // ==========
  const handleTrackSignLanguage =
    (trackId: string) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setErrorMessage("");
      setSuccessMessage("");
      setIsLoading(true);

      setTracks((prev) =>
        prev.map((t) =>
          t.id === trackId
            ? {
                ...t,
                signLanguageVideoFile: file,
              }
            : t
        )
      );

      const fd = new FormData();
      fd.append("file", file);

      try {
        const res = await MediaModule.service.uploadVideoFile(fd);

        if (res && res.url) {
          const previewUrl = URL.createObjectURL(file);
          setSignLanguageVideoUrl(res.url);
          setTracks((prev) =>
            prev.map((t) =>
              t.id === trackId
                ? {
                    ...t,
                    signLanguageVideoFile: file,
                    signLanguageVideoPreview: previewUrl,
                    signLanguageVideoUrl: res.url,
                  }
                : t
            )
          );

          setSuccessMessage(
            "Vidéo en langue des signes de la piste uploadée avec succès."
          );
        } else {
          setErrorMessage(
            "Erreur lors de l'upload de la vidéo en langue des signes."
          );
        }
      } catch (error) {
        console.error("Erreur upload vidéo langue des signes ALBUM :", error);
        setErrorMessage(
          (error as Error).message ||
            "Erreur lors de l'upload de la vidéo en langue des signes."
        );
      } finally {
        setIsLoading(false);
      }
    };

  // ==========
  // Upload braille global (pour l’ALBUM)
  // ==========
  const handleBrailleFile =
    (trackId: string) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setErrorMessage("");
      setSuccessMessage("");
      setIsLoading(true);

      setBrailleFile(file);
      setTracks((prev) =>
        prev.map((t) =>
          t.id === trackId
            ? {
                ...t,
                brailleFile: file,
              }
            : t
        )
      );
      const fd = new FormData();
      fd.append("file", file);

      try {
        const res = await MediaModule.service.uploadBrailleFile(fd);

        if (res && res.url) {
          setBrailleFileUrl(res.url);
          setTracks((prev) =>
            prev.map((t) =>
              t.id === trackId
                ? {
                    ...t,
                    brailleFileUrl: res.url,
                  }
                : t
            )
          );
          setSuccessMessage("Fichier braille uploadé avec succès.");
        } else {
          setErrorMessage("Erreur lors de l'upload du fichier braille.");
        }
      } catch (error) {
        console.error("Erreur upload fichier braille ALBUM :", error);
        setErrorMessage(
          (error as Error).message ||
            "Erreur lors de l'upload du fichier braille."
        );
      } finally {
        setIsLoading(false);
      }
    };

  // ==========
  // allUploadsDone : chaque piste doit avoir un audioUrl
  // ==========
  const allUploadsDone = !!coverUrl;
  // ==========
  // handleAddTrack ALBUM
  // ==========

  const handleAddAlbum = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!allUploadsDone) {
      setErrorMessage(
        "Veuillez compléter les fichiers audio, les paroles et le mood avant de continuer."
      );
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      const userId = localStorage.getItem(ModuleObject.localState.USER_ID);

      if (!userId || !token) {
        setIsLoading(false);
        setErrorMessage("Utilisateur non authentifié.");
        return;
      }

      const {
        trackTitle,
        authors,
        producers,
        lyricists,
        musiciansVocals,
        musiciansPianoKeyboards,
        musiciansWinds,
        musiciansPercussion,
        musiciansStrings,
        mixingEngineer,
        masteringEngineer,
        lyrics,
        moodId,
      } = albumCreation;

      // 1️⃣ Création de l'ALBUM
      const payload = {
        title: trackTitle,
        userId,
        coverUrl,
        // ajoute ce que ton backend attend pour l'ALBUM :
        brailleFileUrl: brailleFileUrl || undefined,
        authors: authors || undefined,
        producers: producers || undefined,
        lyricists: lyricists || undefined,
        musiciansVocals: musiciansVocals || undefined,
        musiciansPianoKeyboards: musiciansPianoKeyboards || undefined,
        musiciansWinds: musiciansWinds || undefined,
        musiciansPercussion: musiciansPercussion || undefined,
        musiciansStrings: musiciansStrings || undefined,
        mixingEngineer: mixingEngineer || undefined,
        masteringEngineer: masteringEngineer || undefined,
        // tu peux aussi ajouter une description, etc.
      };

      const newAlbum = await AlbumModuleObject.service.createAlbum(
        payload,
        token
      );

      const albumId = (newAlbum as any)?.data?.id ?? (newAlbum as any)?.id;

      if (!albumId) {
        throw new Error(
          "Impossible de récupérer l'identifiant de l'ALBUM créé."
        );
      }

      // 2️⃣ Création des tracks + association à l’ALBUM
      for (const track of tracks) {
        if (!track.audioUrl) {
          console.warn("Track sans audioUrl, ignoré :", track);
          continue;
        }

        const newTrackPayload = {
          type: "TRACK_ALBUM", // adapte si ton backend attend autre chose
          moodId: (track as any).moodId || moodId, // si tu as moodId par piste, sinon moodId global
          audioUrl: track.audioUrl,
          title: track.title || trackTitle,
          userId,
          lyrics: track.lyrics || lyrics || undefined,
          signLanguageVideoUrl: track.signLanguageVideoUrl || undefined,
          brailleFileUrl: brailleFileUrl || undefined,
        };

        const res = await TrackModule.service.createTrack(
          newTrackPayload,
          token!
        );

        if (!res || !res.data?.id) {
          throw new Error(
            "Impossible de récupérer l'identifiant d'un track créé pour l'ALBUM."
          );
        }

        const trackId = res.data.id;

        // Associer le track à l’ALBUM
        await TrackModule.service.addTrackToAlbum(albumId, trackId);
      }

      // 3️⃣ Re-fetch des ALBUMs si tu as une liste à jour
      if (typeof fetchALBUMs === "function") {
        await fetchALBUMs();
      }

      console.log("ALBUM CREATION PAYLOAD ====>", {
        albumCreation,
        tracks,
        brailleFileUrl,
      });

      // 4️⃣ RESET COMPLET DU FORMULAIRE ALBUM
      setAlbumCreation(initialAlbumCreation);

      setTracks([
        {
          id: crypto.randomUUID(),
          audioFile: null,
          audioUrl: "",
          title: "",
          lyrics: "",
          moodId: "",
          signLanguageVideoFile: null,
          signLanguageVideoPreview: "",
          signLanguageVideoUrl: "",
          audioUrlPrevew: "",
          brailleFileUrl: "",
          brailleFilePrevew: "",
          brailleFile: null,
        },
      ]);

      setBrailleFile(null);
      setBrailleFileUrl("");

      setArtworkFile(null);
      if (artworkPreview) {
        URL.revokeObjectURL(artworkPreview);
      }
      setArtworkPreview("");
      setCoverUrl("");

      setSuccessMessage("ALBUM et pistes créés et associés avec succès !");
    } catch (error) {
      console.error("Erreur création ALBUM :", error);
      setErrorMessage(
        (error as Error).message ||
          "Erreur lors de la création de l'ALBUM et des pistes."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ==========
  // Rendu JSX
  // ==========
  return (
    <div className="space-y-6">
      {/* ALBUM Title */}
      {!selectedAlbumId && (
        <>
          <div className="mb-6">
            <label className="block text-white/90 drop-shadow mb-2">
              {text.albumTitle}
            </label>
            <input
              type="text"
              value={albumCreation.trackTitle}
              onChange={(e) =>
                setAlbumCreation((prev) => ({
                  ...prev,
                  trackTitle: e.target.value,
                }))
              }
              className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl text-white drop-shadow mb-4">
                {text.uploadArtwork}
              </h3>

              {artworkPreview ? (
                <div className="relative aspect-square rounded-xl overflow-hidden bgwhite/5 border-2 border-white/20">
                  <img
                    src={artworkPreview}
                    alt="Artwork"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setArtworkFile(null);
                      setArtworkPreview("");
                      setCoverUrl("");
                    }}
                    className="absolute cursor-pointer top-2 right-2 bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600/80 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center bgwhite/5 hover:bg-white/10 transition-all cursor-pointer aspect-square flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleArtwork}
                    className="hidden"
                    id="single-artwork-upload"
                  />
                  <label
                    htmlFor="single-artwork-upload"
                    className="cursor-pointer text-center"
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mx-auto mb-4 text-white/60"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <p className="text-white drop-shadow text-sm">
                      {text.artworkDragDrop}
                    </p>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* ALBUM Tracks */}
          <div className="space-y-6"></div>

          {/* Creation Information ALBUM */}
          <div className="mt-8">
            <h3 className="text-xl text-white drop-shadow mb-4">
              {text.creationInfo}
            </h3>
            <form onSubmit={handleAddAlbum} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Title principal (même que ALBUM title) */}
                <div>
                  <label className="block text-white/90 drop-shadow mb-2 text-sm">
                    {text.trackTitle}
                  </label>
                  <input
                    type="text"
                    value={albumCreation.trackTitle}
                    onChange={(e) =>
                      setAlbumCreation((prev) => ({
                        ...prev,
                        trackTitle: e.target.value,
                      }))
                    }
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                  />
                </div>

                {/* Authors */}
                <div>
                  <label className="block text-white/90 drop-shadow mb-2 text-sm">
                    {text.authors}
                  </label>
                  <input
                    type="text"
                    value={albumCreation.authors}
                    onChange={(e) =>
                      setAlbumCreation((prev) => ({
                        ...prev,
                        authors: e.target.value,
                      }))
                    }
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                  />
                </div>

                {/* Producers */}
                <div>
                  <label className="block text-white/90 drop-shadow mb-2 text-sm">
                    {text.producers}
                  </label>
                  <input
                    type="text"
                    value={albumCreation.producers}
                    onChange={(e) =>
                      setAlbumCreation((prev) => ({
                        ...prev,
                        producers: e.target.value,
                      }))
                    }
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                  />
                </div>

                {/* Lyricists */}
                <div>
                  <label className="block text-white/90 drop-shadow mb-2 text-sm">
                    {text.lyricists}
                  </label>
                  <input
                    type="text"
                    value={albumCreation.lyricists}
                    onChange={(e) =>
                      setAlbumCreation((prev) => ({
                        ...prev,
                        lyricists: e.target.value,
                      }))
                    }
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                  />
                </div>

                {/* Musicians */}
                <div className="col-span-2">
                  <label className="block text-white/90 drop-shadow mb-3">
                    {text.musicians}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    {/* Vocals */}
                    <div>
                      <label className="block text-white/70 drop-shadow mb-2 text-sm">
                        {text.musiciansVocals}
                      </label>
                      <input
                        type="text"
                        value={albumCreation.musiciansVocals}
                        onChange={(e) =>
                          setAlbumCreation((prev) => ({
                            ...prev,
                            musiciansVocals: e.target.value,
                          }))
                        }
                        className="w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all text-sm"
                      />
                    </div>

                    {/* Piano/Keyboards */}
                    <div>
                      <label className="block text-white/70 drop-shadow mb-2 text-sm">
                        {text.musiciansPianoKeyboards}
                      </label>
                      <input
                        type="text"
                        value={albumCreation.musiciansPianoKeyboards}
                        onChange={(e) =>
                          setAlbumCreation((prev) => ({
                            ...prev,
                            musiciansPianoKeyboards: e.target.value,
                          }))
                        }
                        className="w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all text-sm"
                      />
                    </div>

                    {/* Winds */}
                    <div>
                      <label className="block text-white/70 drop-shadow mb-2 text-sm">
                        {text.musiciansWinds}
                      </label>
                      <input
                        type="text"
                        value={albumCreation.musiciansWinds}
                        onChange={(e) =>
                          setAlbumCreation((prev) => ({
                            ...prev,
                            musiciansWinds: e.target.value,
                          }))
                        }
                        className="w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all text-sm"
                      />
                    </div>

                    {/* Percussion */}
                    <div>
                      <label className="block text-white/70 drop-shadow mb-2 text-sm">
                        {text.musiciansPercussion}
                      </label>
                      <input
                        type="text"
                        value={albumCreation.musiciansPercussion}
                        onChange={(e) =>
                          setAlbumCreation((prev) => ({
                            ...prev,
                            musiciansPercussion: e.target.value,
                          }))
                        }
                        className="w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all text-sm"
                      />
                    </div>

                    {/* Strings */}
                    <div className="md:col-span-2">
                      <label className="block text-white/70 drop-shadow mb-2 text-sm">
                        {text.musiciansStrings}
                      </label>
                      <input
                        type="text"
                        value={albumCreation.musiciansStrings}
                        onChange={(e) =>
                          setAlbumCreation((prev) => ({
                            ...prev,
                            musiciansStrings: e.target.value,
                          }))
                        }
                        className="w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Mixing Engineer */}
                <div>
                  <label className="block text-white/90 drop-shadow mb-2 text-sm">
                    {text.mixingEngineer}
                  </label>
                  <input
                    type="text"
                    value={albumCreation.mixingEngineer}
                    onChange={(e) =>
                      setAlbumCreation((prev) => ({
                        ...prev,
                        mixingEngineer: e.target.value,
                      }))
                    }
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                  />
                </div>

                {/* Mastering Engineer */}
                <div>
                  <label className="block text-white/90 drop-shadow mb-2 text-sm">
                    {text.masteringEngineer}
                  </label>
                  <input
                    type="text"
                    value={albumCreation.masteringEngineer}
                    onChange={(e) =>
                      setAlbumCreation((prev) => ({
                        ...prev,
                        masteringEngineer: e.target.value,
                      }))
                    }
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                  />
                </div>
              </div>

              {successMessage && <CustomSuccess message={successMessage} />}
              {errorMessage && <CustomAlert message={errorMessage} />}

              {allUploadsDone && (
                <button
                  type="submit"
                  className="cursor-pointer w-full py-4 px-6 bg-white/30 backdrop-blur-md border border-white/40 rounded-lg text-white drop-shadow hover:bg-white/40 transition-all flex items-center justify-center gap-2"
                >
                  <Upload size={20} />

                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>{text.uploadButton}...</span>
                    </div>
                  ) : (
                    text.uploadButton
                  )}
                </button>
              )}
            </form>
          </div>
          {/* Recent ALBUM Uploads */}
          <div className="mt-8">
            <h3 className="text-xl text-white drop-shadow mb-4">
              {/* tu peux aussi créer text.recentAlbumUploads dans ton système de traduction */}
              {text.recentAlbumUploads || "Recent ALBUM Uploads"}
            </h3>

            <div className="space-y-3">
              {albums && albums.length > 0 ? (
                albums.slice(0, 5).map((album) => (
                  <div
                    key={album.id}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between"
                  >
                    {/* Infos ALBUM (gauche) */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center overflow-hidden">
                        {album.coverUrl ? (
                          <img
                            src={album.coverUrl}
                            alt={album.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Music size={20} className="text-white" />
                        )}
                      </div>
                      <div>
                        <span className="text-white drop-shadow">
                          {album.title}
                        </span>
                        {album.authors && (
                          <span className="block text-white/60 text-xs">
                            {album.authors}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Boutons (droite) */}
                    <div className="flex items-center gap-3">
                      {/* Voir détails */}
                      <button
                        type="button"
                        onClick={() =>
                          handleViewAlbumDetails(album.id!, album.title!)
                        }
                        className="cursor-pointer p-2 rounded-lg bg-white/20 hover:bg-white/30 
    text-white backdrop-blur-sm transition-all flex items-center justify-center"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Supprimer avec modale */}
                      <button
                        type="button"
                        onClick={() => {
                          setAlbumToDelete(album);
                          setIsDeleteModalOpen(true);
                        }}
                        className="cursor-pointer p-2 rounded-lg bg-red-500/80 hover:bg-red-600/80 
               text-white backdrop-blur-sm transition-all flex items-center justify-center"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white/60 text-sm">
                  {text.noAlbumUploadedYet ||
                    "Aucun ALBUM uploadé pour l’instant."}
                </p>
              )}
            </div>
          </div>
        </>
      )}
      {/* Éditeur de pistes pour l’ALBUM sélectionné */}
      {selectedAlbumId && (
        <div
          className="
        mt-10
        rounded-xl
        bg-white/5
        backdrop-blur-sm
        border border-white/15
        p-6 md:p-8
        space-y-4
      "
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xl text-white font-semibold drop-shadow">
                {text.albumTracksTitle || "Pistes de l'ALBUM"}
              </h3>
              <p className="text-white/70 text-sm">
                <span className="font-medium text-white">
                  {selectedAlbumTitle || "—"}
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedAlbumId(null);
                setSelectedAlbumTitle("");
              }}
              className="cursor-pointer px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 
          text-white text-xs flex items-center gap-1"
            >
              <X size={14} />
              {text.closeTracksEditor || "Close"}
            </button>
          </div>

          {/* Composant qui gère l'ajout de tracks pour cet ALBUM */}
          <AlbumTracksEditor albumId={selectedAlbumId} text={text} />
        </div>
      )}

      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        itemName={albumToDelete?.title}
        isLoading={isLoading}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setAlbumToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
