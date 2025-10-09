"use client";

import React, { useEffect, useState } from "react";
import { Trash2, Edit2, PlusCircle } from "lucide-react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { TagModuleObject as TagModuleObject } from "../../modules/tag/module";
import { ArtistModuleObject as ArtistModuleObject } from "../../modules/artist/module";
import { AlbumModuleObject as ModulueObject } from "./module";
import { wait } from "@/@disktro/utils";

// Mock de tes services (remplace par tes vrais imports)

type Album = {
  id?: string;
  title: string;
  duration: number;
  artistId?: string;
  tagId?: string;
  coverFile?: File | null;
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
  const [form, setForm] = useState<Album>({
    title: "",
    duration: 0,
    artistId: "",
    tagId: "",
  });

  const [artists, setArtists] = useState<{ id: string; name: string }[]>([]);

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
      setIsLoading(false);
      setErrorMessage("");
    } catch (error) {
      setError("Erreur lors du chargement des artistes");
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

  async function fetchAlbums() {
    const token = localStorage.getItem(ModulueObject.localState.ACCESS_TOKEN);
    setLoading(true);
    setError(null);
    try {
      if (!token) return;
      const res = await ModulueObject.service.getAlbums(token);
      setAlbums(res.data);
    } catch {
      setError("Erreur lors du chargement des albums");
    }
    setLoading(false);
  }

  function resetForm() {
    setForm({ title: "", duration: 0, artistId: "", tagId: "" });
    setEditingAlbum(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    const token = localStorage.getItem(ModulueObject.localState.ACCESS_TOKEN);
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.title || !form.coverFile || !form.duration) {
      setError("Tous les champs sont obligatoires");
      setLoading(false);
      return;
    }
    try {
      if (!token) return;
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("duration", String(form.duration));
      // if (form.artistId) formData.append("artistId", form.artistId);
      // if (form.tagId) formData.append("tagId", form.tagId);
      if (form.coverFile) formData.append("coverUrl", "http://www.google.com");
      if (editingAlbum) {
        await ModulueObject.service.updateAlbum(editingAlbum.id!, {
          title: form.title,
          duration: Number(form.duration),
        });
      } else {
        const newAlbum = await ModulueObject.service.createAlbum(
          formData,
          token
        );

        // Ajouter le tag à l'album
        if (form.tagId) {
          await ModulueObject.service.createAlbumTag(
            form.tagId,
            newAlbum.data.id
          );
        }

        // Lier l'album à l’artiste
        if (form.artistId) {
          await ModulueObject.service.addAlbumToArtist(
            form.artistId,
            newAlbum.data.id
          );
        }
      }
      resetForm();
      fetchAlbums();
    } catch {
      setError("Erreur lors de la sauvegarde");
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer cet album ?")) return;
    setLoading(true);
    setError(null);
    try {
      await ModulueObject.service.deleteAlbum(id);
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
        <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-3xl font-bold mb-6 text-[#1F89A5]">
            Gestion des Albums
          </h1>

          {/* Formulaire création / édition */}
          <form
            onSubmit={handleSubmit}
            className="mb-8 max-w-xl bg-white p-6 rounded shadow"
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
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1F89A5]"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Durée (minutes)
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1F89A5]"
                value={form.duration}
                onChange={(e) =>
                  setForm({ ...form, duration: Number(e.target.value) })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Artiste
              </label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
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
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Tag
              </label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
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
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700 ">
                Image de couverture
              </label>
              <input
                className="bg-gray-200 cursor-pointer"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, coverFile: e.target.files?.[0] || null })
                }
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#1F89A5] cursor-pointer text-white px-5 py-2 rounded hover:bg-[#1A4C61] transition"
              >
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
              Albums existants
            </h2>
            {error && (
              <div className="mb-4 text-red-500 font-medium">{error}</div>
            )}
            {loading && <p>Chargement...</p>}
            {!loading && albums.length === 0 && <p>Aucun album disponible.</p>}

            <ul>
              {albums.map((album) => (
                <li
                  key={album.id}
                  className="flex justify-between items-center border-b border-gray-200 py-2"
                >
                  <div>
                    <p className="font-semibold">{album.title}</p>
                    <p className="text-sm text-gray-600">
                      {album.duration} Minutes
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(album)}
                      className="text-[#1F89A5] hover:text-[#1A4C61]"
                      title="Modifier"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(album.id!)}
                      className="text-red-500 hover:text-red-700"
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
