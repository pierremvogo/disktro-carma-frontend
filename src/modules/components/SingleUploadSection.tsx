import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";
import { ArtistModuleObject as ModuleObject } from "../artist/module";
import { useRouter } from "next/navigation";
import { AccessibilitySettingsPanel } from "./AccessibilitySettingsPanel";
import { MediaModuleObject as MediaModule } from "../file/module";
import { UserModuleObject as UserModule } from "../module";
import { getImageFile, getVideoFile } from "@/@disktro/utils";
import { MoodModuleObject as MoodModule } from "../mood/module";
import { TrackModuleObject as TrackModule } from "../track/module";
import { SingleModuleObject } from "../single/module";
import React, { useEffect, useState } from "react";
import { TrackStreamModuleObject } from "../trackSTreams/module";

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
const Pause = ({ size = 24, className = "" }) => (
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
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
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

type CreationInfoForm = {
  trackTitle: string;
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

const initialCreationInfo: CreationInfoForm = {
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

type SingleUploadSectionProps = {
  text: any;
  language: string;
};
type Mood = {
  id: string;
  name: string;
};
type Single = {
  id: string;
  title: string;
  slug: string;
  duration: number | null;
  coverUrl: string;
  audioUrl: string;
  authors: string;
  producers: string;
  lyricists: string;
  mixingEngineer: string;
  masteringEngineer: string;
};

export function SingleUploadSection({
  text,
  language,
}: SingleUploadSectionProps) {
  const [loggedSingles, setLoggedSingles] = useState<Record<string, boolean>>(
    {}
  );
  const [singleTrackMap, setSingleTrackMap] = useState<Record<string, string>>(
    {}
  );

  const [creation, setCreation] =
    React.useState<CreationInfoForm>(initialCreationInfo);

  // fichiers
  const [audioFile, setAudioFile] = React.useState<File | null>(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = React.useState<string | null>(
    null
  );
  const [audioUrl, setAudioUrl] = React.useState<string>("");

  const [artworkFile, setArtworkFile] = React.useState<File | null>(null);
  const [artworkPreview, setArtworkPreview] = React.useState<string>("");
  const [coverUrl, setCoverUrl] = React.useState<string>("");

  const [miniVideoFile, setMiniVideoFile] = React.useState<File | null>(null);
  const [miniVideoPreview, setMiniVideoPreview] = React.useState<string>("");
  const [miniVideoLoopUrl, setMiniVideoLoopUrl] = React.useState<string>("");

  const [signLanguageVideoFile, setSignLanguageVideoFile] =
    React.useState<File | null>(null);
  const [signLanguageVideoPreview, setSignLanguageVideoPreview] =
    React.useState<string>("");
  const [signLanguageVideoUrl, setSignLanguageVideoUrl] =
    React.useState<string>("");

  const [brailleFile, setBrailleFile] = React.useState<File | null>(null);
  const [brailleFileUrl, setBrailleFileUrl] = React.useState<string>("");

  const [moods, setMoods] = React.useState<Mood[] | null>(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

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
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);

  const handleTogglePlaySingle = async (singleId: string) => {
    const userId = localStorage.getItem(ModuleObject.localState.USER_ID);
    const audioEl = document.getElementById(
      `single-audio-${singleId}`
    ) as HTMLAudioElement | null;

    if (!audioEl) return;

    // Si on reclique sur celui en cours → pause
    if (currentPlayingId === singleId) {
      audioEl.pause();
      setCurrentPlayingId(null);
      return;
    }

    // Stopper l'ancien son si un autre joue
    if (currentPlayingId) {
      const prevAudio = document.getElementById(
        `single-audio-${currentPlayingId}`
      ) as HTMLAudioElement | null;

      if (prevAudio) {
        prevAudio.pause();
        prevAudio.currentTime = 0;
      }
    }

    try {
      await audioEl.play();
      setCurrentPlayingId(singleId);

      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      const trackId = singleTrackMap[singleId];

      // Log stream
      // if (token && trackId && userId) {
      //   await TrackStreamModuleObject.service.createTrackStream(
      //     userId,
      //     trackId,
      //     token
      //   );
      // }
    } catch (err) {
      console.error("Error playing audio:", err);
    }
  };

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

  // ==========
  // Handlers upload
  // ==========
  const [singles, setSingles] = useState<Single[]>([]);
  useEffect(() => {
    if (singles.length === 0) fetchSingles();
  }, []);

  async function fetchSingles() {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(ModuleObject.localState.USER_ID);
    setIsLoading(true);
    try {
      if (!token || !userId) return;

      const res = await SingleModuleObject.service.getSingleByUser(
        userId,
        token
      );

      const fetchedSingles = res.singles ?? [];
      setSingles(fetchedSingles);

      // remplir la map singleId -> trackId pour TOUS les singles
      const map: Record<string, string> = {};

      fetchedSingles.forEach((single: any) => {
        // priorité à mainTrackId
        if (single.mainTrackId) {
          map[single.id] = single.mainTrackId;
        } else if (single.tracks && single.tracks.length > 0) {
          map[single.id] = single.tracks[0].id;
        }
      });

      setSingleTrackMap(map);
    } catch (error) {
      setErrorMessage(text.errors.generic);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAudioFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    setAudioFile(file);
    setAudioPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await MediaModule.service.uploadAudioFile(fd);

      if (res && (res.fileName || res.url)) {
        const uploadedAudioUrl = res.url ?? res.fileName;
        setAudioUrl(uploadedAudioUrl);
      } else {
      }
    } catch (error) {
      console.error("Erreur upload audio :", error);
      setErrorMessage(text.errors.generic);
    } finally {
      setIsLoading(false);
    }
  };

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
    } catch (error) {
      setErrorMessage(text.errors.generic);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMiniVideoLoop = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    setMiniVideoFile(file);
    setMiniVideoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await MediaModule.service.uploadVideoFile(fd);

      if (res && res.url) {
        setMiniVideoLoopUrl(res.url);
      } else {
      }
    } catch (error) {
      console.error("Erreur upload mini-video :", error);
      setErrorMessage(text.errors.generic);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignLanguageVideo = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem(MediaModule.localState.ACCESS_TOKEN);

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    setSignLanguageVideoFile(file);
    setSignLanguageVideoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await MediaModule.service.uploadVideoFile(fd);

      if (res && res.url) {
        setSignLanguageVideoUrl(res.url);
      } else {
      }
    } catch (error) {
      console.error("Erreur upload vidéo langue des signes :", error);
      setErrorMessage(text.errors.generic);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBrailleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem(MediaModule.localState.ACCESS_TOKEN);

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    setBrailleFile(file);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await MediaModule.service.uploadBrailleFile(fd);

      if (res && res.url) {
        setBrailleFileUrl(res.url);
      } else {
      }
    } catch (error) {
      console.error("Erreur upload fichier braille :", error);
      setErrorMessage(text.errors.generic);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========
  // allUploadsDone => contrôle du bouton Upload
  // ==========
  const allUploadsDone =
    !!audioUrl && !!coverUrl && !!signLanguageVideoUrl && !!brailleFileUrl;

  // ==========
  // handleAddTrack : logique Single (createSingle + createTrack + addTrackToSingle)
  // ==========
  const handleAddTrack = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const {
      trackTitle,
      authors,
      producers,
      lyricists,
      lyrics,
      moodId,
      musiciansVocals,
      musiciansPianoKeyboards,
      musiciansWinds,
      musiciansPercussion,
      musiciansStrings,
      mixingEngineer,
      masteringEngineer,
    } = creation;

    if (
      !audioUrl ||
      !coverUrl ||
      !trackTitle ||
      !moodId ||
      !authors ||
      !producers ||
      !lyricists ||
      !lyrics
    ) {
      setErrorMessage(text.requiredFields);

      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      const userId = localStorage.getItem(UserModule.localState.USER_ID);

      if (!userId || !token) {
        setIsLoading(false);
        setErrorMessage(text.unauthenticatedUser);
        return;
      }

      // 1️⃣ Création du Single
      const singlePayload = {
        title: trackTitle,
        coverUrl: coverUrl,
        userId,
        audioUrl: audioUrl || undefined,
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
      };

      const newSingle = await SingleModuleObject.service.createSingle(
        singlePayload,
        token
      );

      const singleId = (newSingle as any)?.data?.id ?? (newSingle as any)?.id;

      if (!singleId) {
        throw new Error(text.errore.generic);
      }

      // 2️⃣ Création du Track
      const newTrack = {
        type: "TRACK_SINGLE",
        moodId,
        audioUrl,
        title: trackTitle || undefined,
        userId: userId || undefined,
        lyrics: lyrics || undefined,
        signLanguageVideoUrl: signLanguageVideoUrl || undefined,
        brailleFileUrl: brailleFileUrl || undefined,
      };

      const res = await TrackModule.service.createTrack(newTrack, token);

      if (!res || !res.data?.id) {
        throw new Error(text.errors.generic);
      }

      const trackId = res.data.id;

      // 3️⃣ Associer le track au single
      await TrackModule.service.addTrackToSingle(singleId, trackId);
      setSingleTrackMap((prev) => ({
        ...prev,
        [singleId]: trackId,
      }));
      // 4️⃣ Reset local
      setCreation(initialCreationInfo);
      setAudioFile(null);
      setAudioUrl("");
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
        setAudioPreviewUrl(null);
      }

      setArtworkFile(null);
      if (artworkPreview) {
        URL.revokeObjectURL(artworkPreview);
        setArtworkPreview("");
      }
      setCoverUrl("");

      setMiniVideoFile(null);
      if (miniVideoPreview) {
        URL.revokeObjectURL(miniVideoPreview);
        setMiniVideoPreview("");
      }
      setMiniVideoLoopUrl("");

      setSignLanguageVideoFile(null);
      if (signLanguageVideoPreview) {
        URL.revokeObjectURL(signLanguageVideoPreview);
        setSignLanguageVideoPreview("");
      }
      setSignLanguageVideoUrl("");

      setBrailleFile(null);
      setBrailleFileUrl("");

      fetchSingles();
    } catch (error) {
      console.error("Erreur ajout track :", error);
      setErrorMessage(text.errors.generic);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========
  // Rendu JSX (upload audio, artwork, mini-video, lyrics, accessibilité, creation info)
  // ==========
  return (
    <div className="space-y-8">
      {/* 1. Upload audio single */}
      <div className="relative">
        {audioPreviewUrl ? (
          <div className="relative rounded-xl overflow-hidden bg-white/5 border-2 border-white/20 p-6">
            <audio controls src={audioPreviewUrl} className="w-full">
              Votre navigateur ne supporte pas l’élément audio.
            </audio>
            <button
              type="button"
              onClick={() => {
                setAudioFile(null);
                setAudioPreviewUrl("");
              }}
              className="absolute top-2 right-2 bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600/80 transition-all"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-white/30 rounded-xl p-12 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file && file.type.startsWith("audio/")) {
                handleAudioFileChange({ target: { files: [file] } } as any);
              }
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioFileChange}
              className="hidden"
              id="single-audio-upload"
            />
            <label htmlFor="single-audio-upload" className="cursor-pointer">
              <Music size={48} className="mx-auto mb-4 text-white/60" />
              <p className="text-white drop-shadow mb-2 text-sm">
                {text.dragDrop}
              </p>
            </label>
          </div>
        )}
      </div>

      {/* 2. Artwork + mini video */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Artwork Upload */}
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

        {/* Mini Video Loop Upload */}
        <div>
          <h3 className="text-xl text-white drop-shadow mb-4">
            {text.uploadMiniVideo}
          </h3>
          {miniVideoPreview ? (
            <div className="relative aspect-square rounded-xl overflow-hidden bg-black border-2 border-white/20">
              <video
                src={miniVideoPreview}
                loop
                autoPlay
                muted
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() => {
                  setMiniVideoFile(null);
                  setMiniVideoPreview("");
                  setMiniVideoLoopUrl("");
                }}
                className="cursor-pointer absolute top-2 right-2 bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600/80 transition-all"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center bgwhite/5 hover:bg-white/10 transition-all cursor-pointer aspect-square flex items-center justify-center">
              <input
                type="file"
                accept="video/*"
                onChange={handleMiniVideoLoop}
                className="hidden"
                id="single-mini-video-upload"
              />
              <label
                htmlFor="single-mini-video-upload"
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
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
                <p className="text-white drop-shadow text-sm">
                  {text.miniVideoDragDrop}
                </p>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* 3. Lyrics + mood + accessibilité */}
      <div>
        <h3 className="text-xl text-white drop-shadow mb-4">
          {text.uploadLyrics}
        </h3>
        <textarea
          name="lyrics"
          value={creation.lyrics}
          onChange={(e) =>
            setCreation((prev) => ({ ...prev, lyrics: e.target.value }))
          }
          placeholder={text.lyricsPlaceholder}
          className="w-full h-40 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all resize-none"
        />

        <div className="mt-3">
          <label className="block text-white/80 drop-shadow mb-1 text-xs">
            {text.trackMood}
          </label>

          <select
            value={creation.moodId}
            onChange={(e) =>
              setCreation((prev) => ({ ...prev, moodId: e.target.value }))
            }
            className="cursor-pointer w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg 
                   text-black text-sm focus:outline-none focus:border-white/40 transition-all"
          >
            <option value="">-- {text.selectMoodPlaceholder} --</option>

            {moods &&
              moods.map((mood) => (
                <option key={mood.id} value={mood.id}>
                  {mood.name}
                </option>
              ))}
          </select>
        </div>

        {/* Accessibilité */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Sign Language Video */}
          <div>
            <label className="block text-white/90 drop-shadow mb-2 text-sm">
              {text.signLanguageVideo}
            </label>
            {signLanguageVideoPreview ? (
              <div className="relative rounded-lg bg-black border-2 border-white/20 p-6 flex items-center justify-between aspect-video">
                <video
                  src={signLanguageVideoPreview}
                  controls
                  className="h-full w-auto object-contain"
                />

                <button
                  type="button"
                  onClick={() => {
                    setSignLanguageVideoFile(null);
                    setSignLanguageVideoPreview("");
                    setSignLanguageVideoUrl("");
                  }}
                  className="cursor-pointer bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600/80 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer h-[120px] flex items-center justify-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleSignLanguageVideo}
                  className="hidden"
                  id="sign-language-upload-single"
                />
                <label
                  htmlFor="sign-language-upload-single"
                  className="cursor-pointer text-center"
                >
                  <Upload size={32} className="mx-auto mb-2 text-white/60" />
                  <p className="text-white/80 drop-shadow text-xs">
                    {text.signLanguageVideoDragDrop}
                  </p>
                </label>
              </div>
            )}
          </div>
          {/* Braille File */}
          <div>
            <label className="block text-white/90 drop-shadow mb-2 text-sm">
              {text.brailleFile}
            </label>
            {brailleFile ? (
              <div className="relative rounded-lg p-6 bg-white/10 border-2 border-white/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText size={32} className="text-white/80" />
                  <span className="text-white text-sm">{brailleFile.name}</span>
                </div>
                <button
                  onClick={() => {
                    setBrailleFile(null);
                    setBrailleFileUrl("");
                  }}
                  className="bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600/80 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                <input
                  type="file"
                  accept=".brf,.brl,.txt"
                  onChange={handleBrailleFile}
                  className="hidden"
                  id="braille-upload-single"
                />
                <label
                  htmlFor="braille-upload-single"
                  className="cursor-pointer"
                >
                  <FileText size={32} className="mx-auto mb-2 text-white/60" />
                  <p className="text-white/80 drop-shadow text-xs">
                    {text.brailleFileDragDrop}
                  </p>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Creation Information */}
      <div>
        <h3 className="text-xl text-white drop-shadow mb-4">
          {text.creationInfo}
        </h3>
        <form onSubmit={handleAddTrack} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-white/90 drop-shadow mb-2 text-sm">
                {text.trackTitle}
              </label>
              <input
                type="text"
                value={creation.trackTitle}
                onChange={(e) =>
                  setCreation((prev) => ({
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
                value={creation.authors}
                onChange={(e) =>
                  setCreation((prev) => ({
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
                value={creation.producers}
                onChange={(e) =>
                  setCreation((prev) => ({
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
                value={creation.lyricists}
                onChange={(e) =>
                  setCreation((prev) => ({
                    ...prev,
                    lyricists: e.target.value,
                  }))
                }
                className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
              />
            </div>

            {/* Musicians Section */}
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
                    value={creation.musiciansVocals}
                    onChange={(e) =>
                      setCreation((prev) => ({
                        ...prev,
                        musiciansVocals: e.target.value,
                      }))
                    }
                    className="w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all text-sm"
                  />
                </div>

                {/* Piano / Keyboards */}
                <div>
                  <label className="block text-white/70 drop-shadow mb-2 text-sm">
                    {text.musiciansPianoKeyboards}
                  </label>
                  <input
                    type="text"
                    value={creation.musiciansPianoKeyboards}
                    onChange={(e) =>
                      setCreation((prev) => ({
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
                    value={creation.musiciansWinds}
                    onChange={(e) =>
                      setCreation((prev) => ({
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
                    value={creation.musiciansPercussion}
                    onChange={(e) =>
                      setCreation((prev) => ({
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
                    value={creation.musiciansStrings}
                    onChange={(e) =>
                      setCreation((prev) => ({
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
                value={creation.mixingEngineer}
                onChange={(e) =>
                  setCreation((prev) => ({
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
                value={creation.masteringEngineer}
                onChange={(e) =>
                  setCreation((prev) => ({
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
            className="cursor-pointer disabled:cursor-not-allowed w-full py-4 px-6 bg-white/30 backdrop-blur-md border border-white/40 rounded-lg text-white drop-shadow hover:bg-white/40 transition-all flex items-center justify-center gap-2"
          >
            <Upload size={20} />

            {isLoading && !allUploadsDone ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2   border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>{text.uploadButton}...</span>
              </div>
            ) : (
              text.uploadButton
            )}
          </button>
        </form>
      </div>
      <div className="mt-8">
        <div className="mt-8">
          <h3 className="text-xl text-white drop-shadow mb-4">
            {text.recentSingleUploads}
          </h3>
          <div className="space-y-3">
            {singles && singles.length > 0 ? (
              singles.slice(0, 5).map((single) => (
                <div
                  key={single.id}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/15 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    {/* Infos Single */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        {single.coverUrl ? (
                          <img
                            src={single.coverUrl}
                            alt={single.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Music size={20} className="text-white" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <span className="text-white drop-shadow font-medium truncate block">
                          {single.title}
                        </span>
                        <span className="block text-white/60 text-xs truncate">
                          {single.authors || "—"}
                        </span>
                      </div>
                    </div>

                    {/* Streams + Play */}
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <span className="text-white/80 text-sm whitespace-nowrap">
                        {(single as any).streamsCount
                          ? `${(single as any).streamsCount} streams`
                          : "0 streams"}
                      </span>

                      {/* audio caché + bouton play */}
                      <div className="flex items-center gap-2">
                        {single.audioUrl && (
                          <audio
                            id={`single-audio-${single.id}`}
                            src={single.audioUrl}
                            onContextMenu={(e) => e.preventDefault()}
                            className="hidden"
                          />
                        )}

                        <button
                          type="button"
                          disabled={!single.audioUrl}
                          onClick={() => handleTogglePlaySingle(single.id)}
                          className="cursor-pointer text-white/60 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed p-2 rounded-lg bg-white/10 hover:bg-white/20"
                          aria-label={
                            currentPlayingId === single.id ? "Pause" : "Play"
                          }
                        >
                          {currentPlayingId === single.id ? (
                            <Pause size={18} />
                          ) : (
                            <Play size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white/60 text-sm">
                {text.noSingleUploadedYet}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
