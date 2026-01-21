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
import { EpModuleObject } from "../ep/module";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EpTracksEditor from "./EpTrackDetails";
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

type EpTrack = {
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

type EpCreationInfo = {
  id?: string;
  title?: string;
  slug?: string;
  duration?: number | null;
  coverUrl?: string;
  epTitle: string;
  trackTitle: string; // titre principal / “nom de l’EP”
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

const initialEpCreation: EpCreationInfo = {
  epTitle: "",
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

type EpUploadSectionProps = {
  text: any;
  language: string;
};

export function EpUploadSection({ text, language }: EpUploadSectionProps) {
  // ==========
  // State EP
  // ==========
  const [epCreation, setEpCreation] =
    React.useState<EpCreationInfo>(initialEpCreation);
  const router = useRouter();

  const [tracks, setTracks] = React.useState<EpTrack[]>([
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
  const [epToDelete, setEpToDelete] = React.useState<EpCreationInfo | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedEpId, setSelectedEpId] = useState<string | null>(null);
  const [selectedEpTitle, setSelectedEpTitle] = useState<string>("");

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

  type EP = {
    id?: string;
    userId?: string;
    user?: any;
    title: string;
    artistId?: string;
    tagId?: string;
    coverFile?: File | null;
    coverUrl?: string;
    coverImageUrl?: string;
    trackEPs?: [];
  };
  const [eps, setEPs] = useState<EpCreationInfo[]>([]);

  useEffect(() => {
    if (eps.length === 0) fetchEPs();
  }, []);

  async function fetchEPs() {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(ModuleObject.localState.USER_ID);
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (!token || !userId) return;

      const res = await EpModuleObject.service.getEpByUser(userId, token);
      // en fonction de ce que renvoie réellement ton service :
      const epList = res.data ?? res.eps ?? [];
      setEPs(epList);
    } catch (error) {
      setErrorMessage(text.errors.generic);
    } finally {
      setIsLoading(false);
    }
  }

  const handleViewEpDetails = (epId: string, title?: string) => {
    setSelectedEpId(epId);
    setSelectedEpTitle(title || "");
  };

  const handleConfirmDelete = async () => {
    if (!epToDelete) return;

    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await EpModuleObject.service.deleteEp(epToDelete.id!);
      setEPs((prev) => prev.filter((e) => e.id !== epToDelete.id));
      setSuccessMessage(text.epDeletedSuccess);
      fetchEPs();
    } catch (error) {
      setErrorMessage(text.errors.generic);
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      setEpToDelete(null);
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
      } else {
      }
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(text.errors.generic);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========
  // allUploadsDone : chaque piste doit avoir un audioUrl
  // ==========
  const allUploadsDone = !!coverUrl;
  // ==========
  // handleAddTrack EP
  // ==========

  const handleAddEp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!allUploadsDone) {
      setErrorMessage(text.completeAudioLyricsMood);
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      const userId = localStorage.getItem(ModuleObject.localState.USER_ID);

      if (!userId || !token) {
        setIsLoading(false);
        setErrorMessage(text.unauthenticatedUser);
        return;
      }

      const {
        epTitle,
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
      } = epCreation;

      // 1️⃣ Création de l'EP
      const payload = {
        title: epTitle,
        userId,
        coverUrl,
        // ajoute ce que ton backend attend pour l'EP :
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

      const newEp = await EpModuleObject.service.createEp(payload, token);

      const epId = (newEp as any)?.data?.id ?? (newEp as any)?.id;

      if (!epId) {
        throw new Error(text.errors.generic);
      }

      // 2️⃣ Création des tracks + association à l’EP
      for (const track of tracks) {
        if (!track.audioUrl) {
          continue;
        }

        const newTrackPayload = {
          type: "TRACK_EP", // adapte si ton backend attend autre chose
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
          throw new Error(text.errors.generic);
        }

        const trackId = res.data.id;

        // Associer le track à l’EP
        await TrackModule.service.addTrackToEp(epId, trackId);
      }

      // 3️⃣ Re-fetch des EPs si tu as une liste à jour
      if (typeof fetchEPs === "function") {
        await fetchEPs();
      }

      console.log("EP CREATION PAYLOAD ====>", {
        epCreation,
        tracks,
        brailleFileUrl,
      });

      // 4️⃣ RESET COMPLET DU FORMULAIRE EP
      setEpCreation(initialEpCreation);

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
      setSuccessMessage(text.epCreatedSuccess);
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur création EP :", error);
      setErrorMessage(text.errors.generic);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========
  // Rendu JSX
  // ==========
  return (
    <div className="space-y-6">
      {/* EP Title */}
      {!selectedEpId && (
        <>
          <div className="mb-6">
            <label className="block text-white/90 drop-shadow mb-2">
              {text.epTitle}
            </label>
            <input
              type="text"
              value={epCreation.epTitle}
              onChange={(e) =>
                setEpCreation((prev) => ({
                  ...prev,
                  epTitle: e.target.value,
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
                <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border-2 border-white/20">
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
                <div
                  className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer aspect-square flex items-center justify-center"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith("image/")) {
                      handleArtwork({ target: { files: [file] } } as any);
                    }
                  }}
                >
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

          {/* EP Tracks */}
          <div className="space-y-6"></div>

          {/* Creation Information EP */}
          <div className="mt-8">
            <h3 className="text-xl text-white drop-shadow mb-4">
              {text.creationInfoEp}
            </h3>
            <form onSubmit={handleAddEp} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Title principal (même que EP title) */}
                <div>
                  <label className="block text-white/90 drop-shadow mb-2 text-sm">
                    {text.trackTitle}
                  </label>
                  <input
                    type="text"
                    value={epCreation.trackTitle}
                    onChange={(e) =>
                      setEpCreation((prev) => ({
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
                    value={epCreation.authors}
                    onChange={(e) =>
                      setEpCreation((prev) => ({
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
                    value={epCreation.producers}
                    onChange={(e) =>
                      setEpCreation((prev) => ({
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
                    value={epCreation.lyricists}
                    onChange={(e) =>
                      setEpCreation((prev) => ({
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
                        value={epCreation.musiciansVocals}
                        onChange={(e) =>
                          setEpCreation((prev) => ({
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
                        value={epCreation.musiciansPianoKeyboards}
                        onChange={(e) =>
                          setEpCreation((prev) => ({
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
                        value={epCreation.musiciansWinds}
                        onChange={(e) =>
                          setEpCreation((prev) => ({
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
                        value={epCreation.musiciansPercussion}
                        onChange={(e) =>
                          setEpCreation((prev) => ({
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
                        value={epCreation.musiciansStrings}
                        onChange={(e) =>
                          setEpCreation((prev) => ({
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
                    value={epCreation.mixingEngineer}
                    onChange={(e) =>
                      setEpCreation((prev) => ({
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
                    value={epCreation.masteringEngineer}
                    onChange={(e) =>
                      setEpCreation((prev) => ({
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

              <button
                type="submit"
                disabled={isLoading}
                className="disabled:cursor-not-allowed cursor-pointer w-full py-4 px-6 bg-white/30 backdrop-blur-md border border-white/40 rounded-lg text-white drop-shadow hover:bg-white/40 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{text.uploadButtonEp}...</span>
                  </div>
                ) : (
                  <>
                    <Upload size={20} />
                    {text.uploadButtonEp}
                  </>
                )}
              </button>
            </form>
          </div>
          {/* Recent EP Uploads */}
          <div className="mt-8">
            <h3 className="text-xl text-white drop-shadow mb-4">
              {/* tu peux aussi créer text.recentEpUploads dans ton système de traduction */}
              {text.recentEpUploads || "Recent EP Uploads"}
            </h3>

            <div className="space-y-3">
              {eps && eps.length > 0 ? (
                eps.slice(0, 5).map((ep) => (
                  <div
                    key={ep.id}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between"
                  >
                    {/* Infos EP (gauche) */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center overflow-hidden">
                        {ep.coverUrl ? (
                          <img
                            src={ep.coverUrl}
                            alt={ep.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Music size={20} className="text-white" />
                        )}
                      </div>
                      <div>
                        <span className="text-white drop-shadow">
                          {ep.title}
                        </span>
                        {ep.authors && (
                          <span className="block text-white/60 text-xs">
                            {ep.authors}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Boutons (droite) */}
                    <div className="flex items-center gap-3">
                      {/* Voir détails */}
                      <button
                        type="button"
                        onClick={() => handleViewEpDetails(ep.id!, ep.title!)}
                        className="cursor-pointer p-2 rounded-lg bg-white/20 hover:bg-white/30 
    text-white backdrop-blur-sm transition-all flex items-center justify-center"
                      >
                        <Eye size={18} />
                      </button>

                      {/* Supprimer avec modale */}
                      <button
                        type="button"
                        onClick={() => {
                          setEpToDelete(ep);
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
                  {text.noEpUploadedYet || "Aucun EP uploadé pour l’instant."}
                </p>
              )}
            </div>
          </div>
        </>
      )}
      {/* Éditeur de pistes pour l’EP sélectionné */}
      {selectedEpId && (
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
              <p className="text-white/70 text-sm">
                {text.forEp || "EP"}{" "}
                <span className="font-medium text-white">
                  {selectedEpTitle || "—"}
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedEpId(null);
                setSelectedEpTitle("");
              }}
              className="cursor-pointer px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 
          text-white text-xs flex items-center gap-1"
            >
              <X size={14} />
              {text.closeTracksEditor || "Close"}
            </button>
          </div>

          {/* Composant qui gère l'ajout de tracks pour cet EP */}
          <EpTracksEditor text={text} epId={selectedEpId} language={language} />
        </div>
      )}

      <ConfirmDeleteModal
        text={text}
        open={isDeleteModalOpen}
        itemName={epToDelete?.title}
        isLoading={isLoading}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setEpToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
