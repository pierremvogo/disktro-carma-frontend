"use client";

import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import {
  Trash2,
  Play,
  Pause,
  PlusCircle,
  Loader,
  ArrowLeft,
  FolderPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Header from "../layouts/header";
import Footer from "../layouts/footer";

import { PlaylistModuleObject as PlaylistModule } from "./module";
import { TrackModuleObject as TrackModule } from "../track/module";
import { MediaModuleObject as MediaModule } from "../file/module";
import { getAudioFile, getImageFile, getUserRole } from "@/@disktro/utils";
import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";

type Track = {
  id?: string;
  title: string;
  audioUrl: string;
};

type Playlist = {
  id?: string;
  nom: string;
  slug: string;
  userId: string;
  coverUrl?: string;
  coverImageUrl?: string;
  tracks?: Track[];
  createdAt?: string;
};

export default function MyPlaylist() {
  const params = useParams();

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("user");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // States formulaire
  const [file, setFile] = useState<File | null>(null);
  const [trackTitle, setTrackTitle] = useState("");
  const [selectedTrackId, setSelectedTrackId] = useState<string>("");
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Feedback
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // --- Au montage ---
  useEffect(() => {
    const role = getUserRole();
    const userId = localStorage.getItem(PlaylistModule.localState.USER_ID);
    setUserRole(role || "user");
    fetchTracks();
    if (userId) fetchPlaylistDetails();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer); // nettoyage si le composant change
    }
  }, [successMessage]);

  async function fetchPlaylistDetails() {
    setIsLoading(true);
    try {
      const token = localStorage.getItem(
        PlaylistModule.localState.ACCESS_TOKEN
      );
      const userId = localStorage.getItem(PlaylistModule.localState.USER_ID);

      const res = await PlaylistModule.service.getPlaylistByUser(
        userId!,
        token!
      );

      // ⚠️ ton payload contient "data" -> [ ... ]
      const playlists = res.data || [];

      if (playlists.length === 0) {
        throw new Error("Aucune playlist trouvée pour cet utilisateur.");
      }
      const data = playlists[0]; // on prend la première playlist
      const coverImageUrl = "/image/playlist.jpg";
      const tracksWithAudio = await Promise.all(
        (data.tracks || []).map(async (t: any) => {
          const audioUrl = await getAudioFile(t.audioUrl, token!);
          if (audioUrl) return { ...t, audioUrl };
        })
      );
      setPlaylist({ ...data, coverImageUrl, tracks: tracksWithAudio });
    } catch (error) {
      setErrorMessage((error as Error).message);
      setPlaylist(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchTracks() {
    try {
      const token = localStorage.getItem(
        PlaylistModule.localState.ACCESS_TOKEN
      );
      const res = await TrackModule.service.getTracks(token!);
      setTracks(res.data);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  }

  // --- Créer une playlist ---
  async function handleCreatePlaylist(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!newPlaylistName) {
      setErrorMessage("Veuillez entrer un nom de playlist.");
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem(
        PlaylistModule.localState.ACCESS_TOKEN
      );
      const userId = localStorage.getItem(PlaylistModule.localState.USER_ID);
      if (!token || !userId) {
        setErrorMessage("Utilisateur non authentifié.");
        return;
      }
      const payload = {
        nom: newPlaylistName,
        userId,
      };

      const res = await PlaylistModule.service.createPlaylist(payload, token);
      setPlaylist(res.data);
      setNewPlaylistName("");
      setSuccessMessage("Playlist créée avec succès !");
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  // --- Lecture ---
  const handlePlay = (track: Track) => {
    if (playingTrack === track.id) {
      audioRef.current?.pause();
      setPlayingTrack(null);
    } else {
      if (audioRef.current && track.audioUrl) {
        audioRef.current.src = track.audioUrl;
        audioRef.current.load();
        audioRef.current.oncanplay = () => {
          audioRef.current?.play();
        };
        setPlayingTrack(track.id!);
      }
    }
  };

  // --- Ajout d’un morceau ---
  async function handleAddTrack(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!playlist?.id) {
      setErrorMessage("Aucune playlist sélectionnée.");
      return;
    }
    const token = localStorage.getItem(PlaylistModule.localState.ACCESS_TOKEN);
    const userRole = localStorage.getItem(PlaylistModule.localState.USER_ROLE);
    if (!token) return;
    try {
      setIsLoading(true);
      let trackIdToAdd = selectedTrackId;
      // Si ARTIST → peut créer un nouveau morceau
      if (userRole === "artist" && file && trackTitle) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await MediaModule.service.uploadAudioFile(
          formData,
          token
        );
        const newTrack = {
          title: trackTitle,
          audioUrl: uploadRes.fileName,
        };
        const createdTrack = await TrackModule.service.createTrack(
          newTrack,
          token
        );
        trackIdToAdd = createdTrack.data.id;
      }
      if (!trackIdToAdd && !file) {
        setErrorMessage("Veuillez sélectionner ou créer un morceau.");
        return;
      }
      await PlaylistModule.service.addTrackToPlaylist(
        playlist.id,
        trackIdToAdd
      );
      setTrackTitle("");
      setFile(null);
      setSelectedTrackId("");
      setSuccessMessage("Morceau ajouté à la playlist !");
      fetchPlaylistDetails();
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  // --- Supprimer un morceau ---
  async function handleDeleteTrack(trackId: string) {
    if (!confirm("Supprimer ce morceau de la playlist ?")) return;
    try {
      const token = localStorage.getItem(
        PlaylistModule.localState.ACCESS_TOKEN
      );
      await PlaylistModule.service.deleteTrackPlaylist(trackId);
      setSuccessMessage("Morceau supprimé !");
      fetchPlaylistDetails();
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 bg-gray-100 py-10 px-6">
        {/* <div className="flex items-center mb-6">
          <Link
            href={`/playlist`}
            className="text-sm cursor-pointer text-[#1F89A5] font-bold rounded whitespace-nowrap flex items-center"
          >
            <ArrowLeft size={12} className="mr-3" />
            Retour
          </Link>
        </div> */}

        <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
          {/* --- Cas Aucune Playlist --- */}
          {!playlist ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold text-[#1A4C61] mb-4">
                Vous n’avez pas encore de playlist
              </h2>
              <form
                onSubmit={handleCreatePlaylist}
                className="flex flex-col items-center gap-4"
              >
                <input
                  type="text"
                  placeholder="Nom de votre playlist"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="border rounded px-3 py-2 w-64"
                />
                {errorMessage && (
                  <div className="mt-4">
                    <CustomAlert message={errorMessage} />
                  </div>
                )}
                {successMessage && (
                  <div className="mt-4">
                    <CustomSuccess message={successMessage} />
                  </div>
                )}
                {isLoading && (
                  <div className="flex justify-center p-10 items-center text-gray-600">
                    <Loader className="animate-spin mr-2" /> Chargement...
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex cursor-pointer items-center gap-2 bg-[#1F89A5] text-white px-4 py-2 rounded hover:bg-[#1A4C61]"
                >
                  <FolderPlus size={18} />
                  {isLoading ? "Création..." : "Créer ma playlist"}
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* --- Infos Playlist --- */}
              <div className="flex items-center gap-6">
                <Image
                  src={playlist.coverImageUrl || "/image/playlist.jpg"}
                  alt={playlist.nom}
                  width={150}
                  height={150}
                  className="rounded border object-cover"
                />
                <div>
                  <h1 className="text-3xl font-bold text-[#1F89A5]">
                    {playlist.nom}
                  </h1>
                  <p className="text-gray-600">Slug : {playlist.slug}</p>
                  <p className="text-gray-600">
                    Morceaux : {playlist.tracks?.length || 0}
                  </p>
                </div>
              </div>

              {/* --- Liste Tracks --- */}
              <h2 className="mt-8 text-2xl font-semibold text-[#1A4C61]">
                Morceaux
              </h2>
              <ul className="mt-4 space-y-3">
                {playlist.tracks && playlist.tracks.length > 0 ? (
                  playlist.tracks.map((track) => (
                    <li
                      key={track.id}
                      className="flex justify-between items-center border border-gray-400 p-3 rounded hover:bg-gray-50"
                    >
                      <div>
                        <p className="font-medium">{track.title}</p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <button
                          onClick={() => handlePlay(track)}
                          className="text-[#1F89A5] hover:text-[#1A4C61] cursor-pointer"
                        >
                          {playingTrack === track.id ? <Pause /> : <Play />}
                        </button>
                        <button
                          onClick={() => handleDeleteTrack(track.id!)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">
                    Aucun morceau dans cette playlist.
                  </p>
                )}
              </ul>

              {/* --- Formulaire ajout --- */}
              <form
                onSubmit={handleAddTrack}
                className="mt-8 border-t border-gray-400 pt-6 flex flex-col gap-4"
              >
                <h3 className="text-xl font-semibold text-[#1A4C61]">
                  Ajouter un morceau
                </h3>

                {/* Sélection d’un morceau existant */}
                <select
                  value={selectedTrackId}
                  onChange={(e) => setSelectedTrackId(e.target.value)}
                  className="border rounded px-3 py-2"
                >
                  <option value="">
                    -- Sélectionner un morceau existant --
                  </option>
                  {tracks.map((track) => (
                    <option key={track.id} value={track.id}>
                      {track.title}
                    </option>
                  ))}
                </select>

                {/* Si ARTIST → possibilité d’ajouter un nouveau morceau */}
                {/* {userRole === "artist" && (
                  <>
                    <div className="border-t pt-4 mt-4">
                      <h4 className="text-lg font-semibold text-[#1F89A5] mb-2">
                        Ou créer un nouveau morceau
                      </h4>
                      <input
                        type="text"
                        placeholder="Titre du morceau"
                        value={trackTitle}
                        onChange={(e) => setTrackTitle(e.target.value)}
                        className="border rounded px-3 py-2 w-full mb-2"
                      />
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setFile(e.target.files?.[0] || null)
                        }
                        className="border rounded px-3 py-2 w-full"
                      />
                    </div>
                  </>
                )} */}

                {errorMessage && <CustomAlert message={errorMessage} />}
                {successMessage && <CustomSuccess message={successMessage} />}
                {isLoading && (
                  <div className="flex justify-center p-10 items-center text-gray-600">
                    <Loader className="animate-spin mr-2" /> Chargement...
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex cursor-pointer items-center justify-center gap-2 bg-[#1F89A5] text-white px-4 py-2 rounded hover:bg-[#1A4C61]"
                >
                  <PlusCircle size={18} />
                  {isLoading ? "Ajout en cours..." : "Ajouter à la playlist"}
                </button>
              </form>
            </>
          )}

          <audio ref={audioRef} controls className="mt-8 w-full hidden" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
