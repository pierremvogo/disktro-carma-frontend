"use client";

import React from "react";
import { MoodModuleObject as MoodModule } from "../mood/module";
import { TrackModuleObject as TrackModule } from "../track/module";
import { MediaModuleObject as MediaModule } from "../file/module";
import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";
import { ArtistModuleObject as ModuleObject } from "../artist/module";
import { AlbumModuleObject } from "../album/module";
import { getEpTexts } from "./i18n/epTranslation";

// Icônes locales
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

const X = ({ size = 16, className = "" }) => (
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

const Play = ({ size = 18, className = "" }) => (
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

type Mood = {
  id: string;
  name: string;
};

type AlbumTrackForm = {
  id: string;
  audioFile: File | null;
  audioUrl: string;
  moodId: string;
  title: string;
  lyrics: string;
  audioUrlPreview: string;
  brailleFileUrl: string;
  brailleFile: File | null;
  signLanguageVideoFile: File | null;
  signLanguageVideoPreview: string;
  signLanguageVideoUrl: string;
};

const makeEmptyTrack = (): AlbumTrackForm => ({
  id: crypto.randomUUID(),
  audioFile: null,
  audioUrl: "",
  moodId: "",
  title: "",
  lyrics: "",
  audioUrlPreview: "",
  brailleFileUrl: "",
  brailleFile: null,
  signLanguageVideoFile: null,
  signLanguageVideoPreview: "",
  signLanguageVideoUrl: "",
});

type SavedTrack = {
  id: string;
  title: string;
  audioUrl: string;
  createdAt?: string;
  signLanguageVideoUrl?: string;
  brailleFileUrl?: string;
};

type AlbumTracksEditorProps = {
  albumId: string;
  text: any; // système de traductions
};

export default function AlbumTracksEditor({
  albumId,
  text,
}: AlbumTracksEditorProps) {
  const [tracks, setTracks] = React.useState<AlbumTrackForm[]>([
    makeEmptyTrack(),
  ]);
  const [moods, setMoods] = React.useState<Mood[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  // Tracks déjà enregistrés
  const [savedTracks, setSavedTracks] = React.useState<SavedTrack[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 5;

  let allUploadsDone =
    tracks.length > 0 &&
    tracks.every(
      (t) =>
        t.audioUrl?.trim() !== "" &&
        t.brailleFileUrl?.trim() !== "" &&
        t.signLanguageVideoUrl?.trim() !== ""
    );

  // ========== Fetch moods ==========
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

  // ========== Fetch tracks déjà existants pour cet ALBUM ==========
  React.useEffect(() => {
    async function fetchSavedTracks() {
      try {
        const token = localStorage.getItem(
          ModuleObject.localState.ACCESS_TOKEN
        );
        if (!token || !albumId) return;

        // adapte le nom de la méthode à ton backend :
        // par ex. getAlbumById(albumId, token) ou getAlbum(albumId, token)
        const res = await AlbumModuleObject.service.getAlbum(albumId, token);
        const album = res.album ?? res.data?.album ?? res.data ?? {};

        const tracksFromApi: SavedTrack[] = (album.tracks || []).map(
          (t: any) => ({
            id: t.id,
            title: t.title,
            audioUrl: t.audioUrl,
            createdAt: t.createdAt,
            signLanguageVideoUrl: t.signLanguageVideoUrl,
            brailleFileUrl: t.brailleFileUrl,
          })
        );

        setSavedTracks(tracksFromApi);
        setCurrentPage(1);
      } catch (error) {
        console.error("Erreur récupération des tracks de l'ALBUM :", error);
      }
    }

    fetchSavedTracks();
  }, [albumId]);

  React.useEffect(() => {
    if (successMessage) {
      const t = setTimeout(() => setSuccessMessage(""), 4000);
      return () => clearTimeout(t);
    }
  }, [successMessage]);

  React.useEffect(() => {
    if (errorMessage) {
      const t = setTimeout(() => setErrorMessage(""), 4000);
      return () => clearTimeout(t);
    }
  }, [errorMessage]);

  // ========== Upload audio ==========
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
                audioUrlPreview: URL.createObjectURL(file),
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
          setTracks((prev) =>
            prev.map((t) =>
              t.id === trackId
                ? {
                    ...t,
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

  // ========== Upload vidéo LSF ==========
  const handleTrackSignLanguage =
    (trackId: string) => async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setErrorMessage("");
      setSuccessMessage("");
      setIsLoading(true);

      const previewUrl = URL.createObjectURL(file);

      setTracks((prev) =>
        prev.map((t) =>
          t.id === trackId
            ? {
                ...t,
                signLanguageVideoFile: file,
                signLanguageVideoPreview: previewUrl,
              }
            : t
        )
      );

      const fd = new FormData();
      fd.append("file", file);

      try {
        const res = await MediaModule.service.uploadVideoFile(fd);
        if (res && res.url) {
          setTracks((prev) =>
            prev.map((t) =>
              t.id === trackId
                ? {
                    ...t,
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
        console.error("Erreur upload vidéo LSF ALBUM :", error);
        setErrorMessage(
          (error as Error).message ||
            "Erreur lors de l'upload de la vidéo en langue des signes."
        );
      } finally {
        setIsLoading(false);
      }
    };

  // ========== Upload braille ==========
  const handleTrackBrailleFile =
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
        console.error("Erreur upload braille ALBUM :", error);
        setErrorMessage(
          (error as Error).message ||
            "Erreur lors de l'upload du fichier braille."
        );
      } finally {
        setIsLoading(false);
      }
    };

  const handleAddTrackForm = () => {
    setTracks((prev) => [...prev, makeEmptyTrack()]);
  };

  const handleRemoveTrackForm = (trackId: string) => {
    setTracks((prev) => prev.filter((t) => t.id !== trackId));
  };

  // ========== Sauvegarde des nouveaux tracks ==========
  const handleSaveTracks = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    allUploadsDone = false;
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(ModuleObject.localState.USER_ID);

    if (!token || !userId) {
      setErrorMessage("Utilisateur non authentifié.");
      return;
    }

    const invalid = tracks.some((t) => !t.audioUrl || !t.title || !t.moodId);
    if (invalid) {
      setErrorMessage(
        "Chaque piste doit avoir au minimum un audio, un titre et un mood."
      );
      return;
    }

    setIsLoading(true);

    try {
      for (const t of tracks) {
        if (!t.audioUrl) continue;

        const trackPayload = {
          type: "TRACK_ALBUM",
          moodId: t.moodId,
          audioUrl: t.audioUrl,
          title: t.title,
          userId,
          lyrics: t.lyrics || undefined,
          signLanguageVideoUrl: t.signLanguageVideoUrl || undefined,
          brailleFileUrl: t.brailleFileUrl || undefined,
        };

        const res = await TrackModule.service.createTrack(trackPayload, token);
        const trackId = res?.data?.id;
        if (!trackId) {
          throw new Error(
            "Impossible de récupérer l'identifiant d'un track créé."
          );
        }

        await TrackModule.service.addTrackToAlbum(albumId, trackId);
      }

      setSuccessMessage("Pistes créées et associées à l'ALBUM avec succès !");
      setTracks([makeEmptyTrack()]);

      // Rechargement des tracks déjà enregistrés
      const token2 = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (token2) {
        const res = await AlbumModuleObject.service.getAlbum(albumId, token2);
        const album = res.album ?? res.data?.album ?? res.data ?? {};
        const tracksFromApi: SavedTrack[] = (album.tracks || []).map(
          (t: any) => ({
            id: t.id,
            title: t.title,
            audioUrl: t.audioUrl,
            createdAt: t.createdAt,
            signLanguageVideoUrl: t.signLanguageVideoUrl,
            brailleFileUrl: t.brailleFileUrl,
          })
        );
        setSavedTracks(tracksFromApi);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Erreur création pistes ALBUM :", error);
      setErrorMessage(
        (error as Error).message ||
          "Erreur lors de la création des pistes pour cet ALBUM."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ========== Pagination ==========
  const totalPages = Math.max(1, Math.ceil(savedTracks.length / pageSize));
  const page = Math.min(currentPage, totalPages);
  const startIndex = (page - 1) * pageSize;
  const pageItems = savedTracks.slice(startIndex, startIndex + pageSize);

  // ========== JSX ==========
  return (
    <div className="space-y-8">
      {/* Formulaire d'ajout de nouvelles pistes */}
      <div className="space-y-6">
        <h3 className="text-xl text-white drop-shadow mb-2">
          {text.albumTracksTitle || ""}
        </h3>

        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg text-white drop-shadow">
                {text.trackNumber} {index + 1}
              </h4>
              {tracks.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveTrackForm(track.id)}
                  className="px-3 py-1.5 bg-red-500/80 backdrop-blur-sm text-white rounded-lg hover:bg-red-600/80 transition-all flex items-center gap-1 cursor-pointer text-xs"
                >
                  <X size={14} />
                  {text.removeTrack}
                </button>
              )}
            </div>

            {/* Upload audio */}
            <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
              <input
                type="file"
                accept="audio/*"
                onChange={handleTrackAudioChange(track.id)}
                className="hidden"
                id={`album-track-upload-${track.id}`}
              />
              <label
                htmlFor={`album-track-upload-${track.id}`}
                className="cursor-pointer"
              >
                <Music size={32} className="mx-auto mb-3 text-white/60" />
                <p className="text-white drop-shadow text-sm">
                  {track.audioFile
                    ? track.audioFile.name
                    : track.audioUrlPreview
                    ? track.audioUrlPreview
                    : text.dragDrop}
                </p>
              </label>
            </div>

            {/* Titre piste */}
            <div>
              <label className="block text-white/90 drop-shadow mb-2 text-sm">
                {text.trackTitle}
              </label>
              <input
                type="text"
                value={track.title}
                onChange={(e) =>
                  setTracks((prev) =>
                    prev.map((t) =>
                      t.id === track.id ? { ...t, title: e.target.value } : t
                    )
                  )
                }
                className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
              />
            </div>

            {/* Lyrics */}
            <div>
              <h5 className="text-sm text-white drop-shadow mb-2">
                {text.uploadLyrics}
              </h5>
              <textarea
                name="lyrics"
                value={track.lyrics}
                onChange={(e) =>
                  setTracks((prev) =>
                    prev.map((t) =>
                      t.id === track.id ? { ...t, lyrics: e.target.value } : t
                    )
                  )
                }
                placeholder={text.lyricsPlaceholder}
                className="w-full h-32 p-4 bg:white/10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
                   text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 
                   transition-all resize-none"
              />
            </div>

            {/* Mood */}
            <div className="mt-1">
              <label className="block text-white/80 drop-shadow mb-1 text-xs">
                {text.trackMood}
              </label>
              <select
                value={track.moodId}
                onChange={(e) =>
                  setTracks((prev) =>
                    prev.map((t) =>
                      t.id === track.id ? { ...t, moodId: e.target.value } : t
                    )
                  )
                }
                className="cursor-pointer w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg 
                     text:black text-black text-sm focus:outline-none focus:border-white/40 transition-all"
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

            {/* Vidéo LSF */}
            <div>
              <label className="block text-white/80 drop-shadow mb-2 text-sm">
                {text.signLanguageVideo}
              </label>
              {track.signLanguageVideoPreview ? (
                <div className="relative rounded-lg bg-black border-2 border-white/20 p-0 aspect-video overflow-hidden">
                  <video
                    src={track.signLanguageVideoPreview}
                    controls
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setTracks((prev) =>
                        prev.map((t) =>
                          t.id === track.id
                            ? {
                                ...t,
                                signLanguageVideoFile: null,
                                signLanguageVideoPreview: "",
                                signLanguageVideoUrl: "",
                              }
                            : t
                        )
                      )
                    }
                    className="absolute top-2 right-2 cursor-pointer bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600/80 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer h-[120px] flex items-center justify-center">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleTrackSignLanguage(track.id)}
                    className="hidden"
                    id={`album-sign-language-${track.id}`}
                  />
                  <label
                    htmlFor={`album-sign-language-${track.id}`}
                    className="cursor-pointer text-center"
                  >
                    <Upload size={24} className="mx-auto mb-2 text-white/60" />
                    <p className="text-white/80 drop-shadow text-xs">
                      {text.signLanguageVideoDragDrop}
                    </p>
                  </label>
                </div>
              )}
            </div>

            {/* Braille */}
            <div>
              <label className="block text-white/90 drop-shadow mb-2 text-sm">
                {text.brailleFile}
              </label>
              {track.brailleFile ? (
                <div className="relative rounded-lg p-6 bg-white/10 border-2 border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText size={32} className="text-white/80" />
                    <span className="text-white text-sm">
                      {track.brailleFile.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setTracks((prev) =>
                        prev.map((t) =>
                          t.id === track.id
                            ? { ...t, brailleFile: null, brailleFileUrl: "" }
                            : t
                        )
                      )
                    }
                    className="cursor-pointer bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600/80 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                  <input
                    type="file"
                    accept=".brf,.brl,.txt"
                    onChange={handleTrackBrailleFile(track.id)}
                    className="hidden"
                    id={`album-braille-upload-${track.id}`}
                  />
                  <label
                    htmlFor={`album-braille-upload-${track.id}`}
                    className="cursor-pointer"
                  >
                    <FileText
                      size={32}
                      className="mx-auto mb-2 text-white/60"
                    />
                    <p className="text-white/80 drop-shadow text-xs">
                      {text.brailleFileDragDrop}
                    </p>
                  </label>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Bouton ajouter un formulaire de piste */}
        {/* <button
          type="button"
          onClick={handleAddTrackForm}
          className="w-full py-3 px-4 bg-white/10 backdrop-blur-md border border-dashed border-white/30 rounded-lg text-white text-sm drop-shadow hover:bg-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {text.addTrack || "Ajouter une piste"}
        </button> */}

        {successMessage && <CustomSuccess message={successMessage} />}
        {errorMessage && <CustomAlert message={errorMessage} />}

        <button
          type="button"
          onClick={handleSaveTracks}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-white/30 backdrop-blur-md border border-white/40 rounded-lg text-white drop-shadow hover:bg-white/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading && !allUploadsDone && (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>{text.saveTracks || "Save Track"}</span>
        </button>
      </div>

      {/* ========== SECTION TRACKS DÉJÀ ENREGISTRÉS (mini pagination) ========== */}
      <div className="mt-4">
        <h4 className="text-lg text-white drop-shadow mb-3">
          {text.savedTracksTitle || "Tracks Already saved"}
        </h4>

        {savedTracks.length === 0 ? (
          <p className="text-white/60 text-sm">
            {text.noSavedTracks ||
              "Aucun track enregistré pour cet ALBUM pour l’instant."}
          </p>
        ) : (
          <>
            <div className="space-y-3">
              {pageItems.map((t) => (
                <div
                  key={t.id}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center overflow-hidden">
                      <Music size={18} className="text-white" />
                    </div>
                    <div>
                      <span className="text-white text-sm drop-shadow">
                        {t.title}
                      </span>
                      <span className="block text-white/60 text-xs">
                        {t.createdAt
                          ? new Date(t.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {t.audioUrl && (
                      <>
                        <audio
                          id={`saved-track-audio-${t.id}`}
                          src={t.audioUrl}
                          className="hidden"
                          onContextMenu={(e) => e.preventDefault()}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const audioEl = document.getElementById(
                              `saved-track-audio-${t.id}`
                            ) as HTMLAudioElement | null;
                            if (!audioEl) return;
                            if (audioEl.paused) audioEl.play();
                            else audioEl.pause();
                          }}
                          className="cursor-pointer text-white/70 hover:text-white transition"
                        >
                          <Play />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-3">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 text-xs rounded-lg border border-white/20 bg-white/10 text-white/80 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {text.prevPage || "Précédent"}
              </button>
              <span className="text-white/70 text-xs">
                {text.pageLabel || "Page"} {page} / {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="px-3 py-1.5 text-xs rounded-lg border border-white/20 bg-white/10 text-white/80 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {text.nextPage || "Suivant"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
