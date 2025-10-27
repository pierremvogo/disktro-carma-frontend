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
} from "lucide-react";
import Image from "next/image";

import Header from "../layouts/header";
import Footer from "../layouts/footer";

import { AlbumModuleObject as ModuleObject } from "./module";
import { MediaModuleObject as MediaModule } from "../file/module";
import { TrackModuleObject as TrackModule } from "../track/module";
import { MoodModuleObject as MoodModule } from "../mood/module";
import { getAudioFile, getImageFile } from "@/@disktro/utils";
import { nanoid } from "nanoid";
import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";
import Link from "next/link";

type Mood = {
  id: string;
  name: string;
};

type Artist = {
  id: string;
  name: string;
  location: string;
};

type Track = {
  id?: string;
  title: string;
  isrcCode: string;
  slug: string;
  duration?: number;
  moodId: string;
  audioUrl: string;
};

type Album = {
  id?: string;
  title: string;
  duration: number;
  artistName?: string;
  coverImageUrl?: string;
  coverUrl?: string;
  tracks?: Track[];
  artists?: Artist[];
};

export default function DetailsPage() {
  const params = useParams();
  const albumId = params.albumId as string;
  const [album, setAlbum] = useState<Album | null>(null);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // form states
  const [file, setFile] = useState<File | null>(null);
  const [trackTitle, setTrackTitle] = useState("");
  const [moodId, setMoodId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [moods, setMoods] = useState<Mood[]>([]);
  const [duration, setDuration] = useState<number | null>(null);

  // feedback
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // --- Charger les détails de l'album ---
  useEffect(() => {
    console.log("ID FOR ALBUM : ", albumId);
    if (albumId) {
      fetchAlbumDetails();
      fetchMoods();
    }
  }, []);
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer); // nettoyage si le composant change
    }
  }, [successMessage]);

  async function fetchAlbumDetails() {
    setIsLoading(true);
    try {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      const res = await ModuleObject.service.getAlbum(albumId, token!);

      const data = res.album;
      const coverImageUrl = data.coverUrl
        ? await getImageFile(data.coverUrl, token!)
        : "/image/vinyle.jpg";

      // Récupérer les URLs audio des tracks
      const tracksWithAudioUrl = await Promise.all(
        (data.tracks || []).map(async (track: any) => {
          const audioUrl = await getAudioFile(track.audioUrl, token!); // 🔥 même helper si compatible
          return { ...track, audioUrl };
        })
      );
      setAlbum({
        ...data,
        coverImageUrl,
        tracks: tracksWithAudioUrl,
      });
      console.log("ALBUM DETAILS : ", data);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage((error as Error).message);
      setIsLoading(false);
      setIsLoading(false);
    }
  }

  // --- Charger la liste des moods ---
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

  // --- Jouer / mettre en pause ---
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

  // --- Ajouter un morceau ---
  async function handleAddTrack(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!file || !trackTitle || !moodId) {
      setErrorMessage("Veuillez remplir tous les champs requis.");
      return;
    }
    setIsLoading(true);
    try {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      const formData = new FormData();
      const audio = document.createElement("audio");
      audio.src = URL.createObjectURL(file);
      audio.preload = "metadata";
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
        URL.revokeObjectURL(audio.src);
      };
      formData.append("file", file);
      // upload audio
      const uploadRes = await MediaModule.service.uploadAudioFile(
        formData,
        token!
      );
      console.log("duration of audio file : ", duration);
      const newTrack = {
        title: trackTitle,
        duration: duration,
        moodId,
        audioUrl: uploadRes.fileName,
      };
      const res = await TrackModule.service.createTrack(newTrack, token!);

      if (albumId) {
        await TrackModule.service.addTrackToAlbum(albumId, res.data.id);
      }
      // reset form
      setTrackTitle("");
      setMoodId("");
      setFile(null);
      setSuccessMessage("Track ajouté avec succès !");
      fetchAlbumDetails();
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur ajout track :", error);
      setErrorMessage((error as Error).message);
      setIsLoading(false);
    }
  }

  // --- Supprimer un morceau ---
  async function handleDeleteTrack(trackId: string) {
    if (!confirm("Supprimer ce morceau ?")) return;
    try {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      await TrackModule.service.deleteTrack(trackId);
      setSuccessMessage("Track supprimé avec succès.");
      fetchAlbumDetails();
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 bg-gray-100 py-10 px-6">
        <div className="flex items-center">
          <Link
            href={`/album`}
            className="text-sm cursor-pointer text-[#1F89A5] font-bold py-5 rounded whitespace-nowrap flex items-center"
          >
            <ArrowLeft size={12} className="mr-3" />
            Retour
          </Link>
        </div>
        <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
          {/* --- Infos Album --- */}
          <div className="flex items-center gap-6">
            <Image
              src={album?.coverImageUrl || "/image/vinyle.jpg"}
              alt={album?.title || "Image"}
              width={150}
              height={150}
              className="rounded border object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-[#1F89A5]">
                {album?.title}
              </h1>
              <p className="text-gray-600">
                Artiste :{" "}
                {album?.artists && album.artists.map((artist) => artist.name)}
              </p>
              <p className="text-gray-600">
                Durée totale : {album?.duration} min
              </p>
            </div>
          </div>

          {/* --- Liste des morceaux --- */}
          <h2 className="mt-8 text-2xl font-semibold text-[#1A4C61]">
            Morceaux
          </h2>
          <ul className="mt-4 space-y-3">
            {album?.tracks && album.tracks.length > 0 ? (
              album.tracks.map((track) => (
                <li
                  key={track.id}
                  className="flex justify-between items-center border border-gray-400 p-3 rounded hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{track.title}</p>
                    <p className="text-sm text-gray-500">
                      ISRC: {track.isrcCode} | Mood ID: {track.moodId}
                    </p>
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
              <p className="text-gray-500">Aucun morceau pour cet album.</p>
            )}
          </ul>

          {/* --- Formulaire ajout de morceau --- */}
          <form
            onSubmit={handleAddTrack}
            className="mt-8 border-t border-gray-400 pt-6 flex flex-col gap-4"
          >
            <h3 className="text-xl font-semibold text-[#1A4C61]">
              Ajouter un morceau
            </h3>

            <input
              type="text"
              placeholder="Titre du morceau"
              value={trackTitle}
              onChange={(e) => setTrackTitle(e.target.value)}
              className="border rounded px-3 py-2"
              required
            />

            <select
              value={moodId}
              onChange={(e) => setMoodId(e.target.value)}
              className="border rounded px-3 py-2"
              required
            >
              <option value="">-- Sélectionner un mood --</option>
              {moods.map((mood) => (
                <option key={mood.id} value={mood.id}>
                  {mood.name}
                </option>
              ))}
            </select>

            <input
              type="file"
              accept="audio/*"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFile(e.target.files?.[0] || null)
              }
              className="border rounded px-3 py-2"
            />

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
              {isLoading ? "Ajout en cours..." : "Ajouter le morceau"}
            </button>
          </form>

          <audio ref={audioRef} controls className="mt-8 w-full hidden" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
