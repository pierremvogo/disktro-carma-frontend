"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Trash2, Edit2, PlusCircle, Loader } from "lucide-react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { TagModuleObject as TagModuleObject } from "../../modules/tag/module";
import { ArtistModuleObject as ArtistModuleObject } from "../../modules/artist/module";
import { AlbumModuleObject as ModuleObject } from "./module";
import { MediaModuleObject as MediaModule } from "../file/module";
import { getImageFile, wait } from "@/@disktro/utils";
import CustomSuccess from "@/@disktro/CustomSuccess";
import CustomAlert from "@/@disktro/CustomAlert";
import Image from "next/image";

// Mock de tes services (remplace par tes vrais imports)

type Album = {
  id?: string;
  title: string;
  duration: number;
  artistId?: string;
  tagId?: string;
  coverFile?: File | null;
  coverUrl?: string;
  coverImageUrl?: string;
};

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<Album>({
    title: "",
    duration: 0,
    artistId: "",
    tagId: "",
    coverUrl: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [previewUrl, setPreviewUrl] = useState(form.coverUrl || "");
  const [artists, setArtists] = useState<{ id: string; name: string }[]>([]);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (artists.length === 0) fetchArtists();
  }, []);

  async function fetchArtists() {
    const token = localStorage.getItem(
      ArtistModuleObject.localState.ACCESS_TOKEN
    );
    setIsLoading(true);
    setErrorMessage("");
    try {
      if (!token) return;
      const res = await ArtistModuleObject.service.getArtists(token);
      setArtists(res.data);
      console.log("res data artist: ", res.data);
      setIsLoading(false);
      setErrorMessage("");
    } catch (error) {
      setIsLoading(false);
      setErrorMessage((error as Error).message);
    }
    setLoading(false);
  }

  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const getTags = async () => {
    const accessToken = localStorage.getItem(
      TagModuleObject.localState.ACCESS_TOKEN
    );
    try {
      if (!accessToken) return;
      const res = await TagModuleObject.service.getTags(accessToken);
      setTags(res.data);
      await wait();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (tags.length === 0) getTags();
  }, []);

  // Charger tous les albums
  useEffect(() => {
    if (albums.length == 0) fetchAlbums();
  }, []);

  const [albumData, setAlbumData] = useState(albums);

  useEffect(() => {
    const fetchCovers = async () => {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      const updatedAlbums = await Promise.all(
        albums.map(async (album) => {
          const coverImageUrl = await getImageFile(album.coverUrl!, token!);
          return { ...album, coverImageUrl };
        })
      );
      console.log("UPDATE ALBUMS : ", updatedAlbums);
      setAlbumData(updatedAlbums);
    };
    fetchCovers();
  }, [albums]);

  async function fetchAlbums() {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    setIsLoading(true);
    setErrorMessage("");
    setSuccess(false);
    try {
      if (!token) return;
      const res = await ModuleObject.service.getAlbums(token);
      setAlbums(res.data);
      setErrorMessage("");
      setSuccess(true);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage((error as Error).message);
      setSuccess(false);
      setIsLoading(false);
    }
  }

  const handleCoverImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMessage("");
    setSuccess(false);
    setIsLoading(true);
    setPreviewUrl(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await MediaModule.service.uploadImageFile(formData, token!);
      if (res && res.fileName) {
        setForm((prev) => ({ ...prev, coverUrl: res.fileName }));
        setSuccess(true);
        setIsLoading(false);
        setErrorMessage("");
      } else {
        setErrorMessage("Erreur lors de l'upload de l'image.");
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
      setIsLoading(false);
      setSuccess(false);
    }
  };

  function resetForm() {
    setForm({ title: "", duration: 0, artistId: "", tagId: "" });
    setEditingAlbum(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setErrors({}); // reset previous errors
    const newErrors: { [key: string]: string } = {};
    if (!form.title) newErrors.title = "Le titre de l'album est requis.";
    if (!form.duration || form.duration <= 0)
      newErrors.duration = "La durée de l'album doit être supérieure à 0.";
    if (!form.artistId)
      newErrors.artistId = "Veuillez sélectionner un artiste.";
    if (!form.tagId) newErrors.tagId = "Veuillez sélectionner un tag.";
    if (!form.coverUrl)
      newErrors.coverUrl = "Veuillez ajouter une image de couverture.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) return;
    try {
      if (editingAlbum) {
        await ModuleObject.service.updateAlbum(editingAlbum.id!, {
          title: form.title,
          duration: Number(form.duration),
          coverUrl: form.coverUrl,
        });
      } else {
        const payload = {
          ...form,
          coverUrl: form.coverUrl,
        };
        const newAlbum = await ModuleObject.service.createAlbum(payload, token);

        if (form.tagId) {
          await ModuleObject.service.createAlbumTag(
            form.tagId,
            newAlbum.data.id
          );
        }
        if (form.artistId) {
          await ModuleObject.service.addAlbumToArtist(
            form.artistId,
            newAlbum.data.id
          );
        }
      }
      resetForm();
      fetchAlbums();
    } catch (err) {
      setErrorMessage("Erreur lors de la sauvegarde");
    }

    setIsLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer cet album ?")) return;
    setLoading(true);
    setError(null);
    try {
      await ModuleObject.service.deleteAlbum(id);
      fetchAlbums();
    } catch {
      setError("Erreur lors de la suppression");
    }
    setLoading(false);
  }

  function startEdit(album: Album) {
    setEditingAlbum(album);
    setForm({
      title: album.title,
      duration: album.duration,
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="min-h-screen bg-gray-100 p-6 w-full  max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-[#1F89A5]">
            Gestion des Albums
          </h1>

          {/* Formulaire création / édition */}
          <form
            onSubmit={handleSubmit}
            className="mb-8 bg-white p-6 rounded shadow"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#1A4C61]">
              {editingAlbum ? "Modifier un album" : "Ajouter un album"}
            </h2>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Titre
              </label>
              <input
                type="text"
                className={`w-full border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.title ? "focus:ring-red-500" : "focus:ring-[#1F89A5]"
                }`}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Durée (minutes)
              </label>
              <input
                type="number"
                className={`w-full border ${
                  errors.duration ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.duration
                    ? "focus:ring-red-500"
                    : "focus:ring-[#1F89A5]"
                }`}
                value={form.duration}
                onChange={(e) =>
                  setForm({ ...form, duration: Number(e.target.value) })
                }
              />
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Artiste
              </label>
              <select
                className={`w-full border ${
                  errors.artistId ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.artistId
                    ? "focus:ring-red-500"
                    : "focus:ring-[#1F89A5]"
                }`}
                value={form.artistId}
                onChange={(e) => setForm({ ...form, artistId: e.target.value })}
              >
                <option value="">-- Sélectionner un artiste --</option>
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
              {errors.artistId && (
                <p className="text-red-500 text-sm mt-1">{errors.artistId}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Tag
              </label>
              <select
                className={`w-full border ${
                  errors.tagId ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.tagId ? "focus:ring-red-500" : "focus:ring-[#1F89A5]"
                }`}
                value={form.tagId}
                onChange={(e) => setForm({ ...form, tagId: e.target.value })}
              >
                <option value="">-- Sélectionner un tag --</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
              {errors.tagId && (
                <p className="text-red-500 text-sm mt-1">{errors.tagId}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 ">
                Image de couverture
              </label>
              <div className="flex items-center space-x-4">
                <img
                  src={previewUrl || "/image/vinyle.jpg"}
                  alt="Photo de profil"
                  className="w-20 h-20 rounded-md object-cover border border-gray-300"
                />

                <div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleCoverImage}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-gray-100 cursor-pointer border border-gray-400 rounded hover:bg-gray-200"
                  >
                    {previewUrl
                      ? "Modifier l'image de couverture"
                      : "Ajouter une image de couverture"}
                  </button>
                </div>
              </div>
            </div>
            {successMessage && <CustomSuccess message={successMessage} />}
            {errorMessage && <CustomAlert message={errorMessage} />}
            {isLoading && <Loader />}
            <div className="flex gap-4 justify-end items-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#1F89A5] cursor-pointer text-white px-5 py-2 rounded hover:bg-[#1A4C61] transition"
              >
                {isLoading && <Loader />}
                {editingAlbum ? "Mettre à jour" : "Ajouter"}
              </button>
              {editingAlbum && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={resetForm}
                  className="px-5 py-2 border border-gray-300 rounded hover:bg-gray-200 transition"
                >
                  Annuler
                </button>
              )}
            </div>
          </form>

          {/* Liste des albums */}
          <div className="max-w-4xl mx-auto bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-4 text-[#1A4C61]">
              Vos Albums
            </h2>
            {loading && <p>Chargement...</p>}
            {!loading && albums.length === 0 && <p>Aucun album disponible.</p>}

            <ul>
              {albumData.map((album) => {
                return (
                  <li
                    key={album.id}
                    className="flex bg-gray-200 justify-between rounded-md items-center border-b m-5 border-gray-400 py-2"
                  >
                    <div>
                      <div className="relative cursor-pointer rounded-md border-gray-200 overflow-hidden border border-primary w-[40px] h-[40px]">
                        <Image
                          src={album.coverImageUrl || "/image/vinyle.jpg"}
                          alt=""
                          className="object-cover h-full w-full"
                          width={80}
                          height={80}
                        />
                      </div>
                      <p className="font-semibold">{album.title}</p>
                      <p className="text-sm text-gray-600">
                        Durée : {album.duration} Minutes
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => startEdit(album)}
                        className="text-[#1F89A5] hover:text-[#1A4C61] cursor-pointer"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(album.id!)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
