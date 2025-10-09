"use client";

import React, { useEffect, useState } from "react";
import { Trash2, Edit2, PlusCircle } from "lucide-react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { ArtistModuleObject as ModuleObject } from "./module";
import { TagModuleObject as TagModuleObject } from "../../modules/tag/module";
import { wait } from "@/@disktro/utils";
import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";
import Loader from "@/@disktro/Loader";
import { errorMonitor } from "events";

type Artist = {
  id?: string;
  name: string;
  slug: string;
  tagId?: string;
};

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingArtist, setEditingArtist] = useState<Artist | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState<Artist>({
    name: "",
    slug: "",
    tagId: "",
  });

  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);

  // Charger les tags
  const getTags = async () => {
    try {
      const accessToken = localStorage.getItem(
        ModuleObject.localState.ACCESS_TOKEN
      );
      if (!accessToken) return;
      const res = await TagModuleObject.service.getTags(accessToken);
      setTags(res.data);
      await wait();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (tags.length === 0) {
      getTags();
    }
  }, []);

  // Charger tous les artistes
  useEffect(() => {
    fetchArtists();
  }, []);

  async function fetchArtists() {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    setIsLoading(true);
    setErrorMessage("");
    try {
      if (!token) return;
      const res = await ModuleObject.service.getArtists(token);
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

  function resetForm() {
    setForm({ name: "", slug: "", tagId: "" });
    setEditingArtist(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    e.preventDefault();
    if (!form.name) {
      setErrorMessage("Les champs Nom et Slug sont obligatoires");
      setIsLoading(false);
      return;
    }
    try {
      if (!token) return;
      setSuccessMessage("");
      setErrorMessage("");
      setIsLoading(true);
      setSuccess(false);
      if (editingArtist) {
        await ModuleObject.service.updateArtist(editingArtist.id!, {
          name: form.name,
          slug: form.slug,
        });
      } else {
        const newArtist = await ModuleObject.service.createArtist(
          {
            name: form.name,
            slug: form.slug,
          },
          token
        );
        if (form.tagId) {
          await ModuleObject.service.createArtistTag(
            form.tagId!,
            newArtist.data.id
          );
        }
      }
      setIsLoading(false);
      setSuccessMessage("Success");
      setSuccess(true);
      resetForm();
      fetchArtists();
    } catch (error) {
      setErrorMessage((error as Error).message);
      setIsLoading(false);
      setSuccess(false);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer cet artiste ?")) return;
    setLoading(true);
    setError(null);
    try {
      await ModuleObject.service.deleteArtist(id);
      fetchArtists();
    } catch {
      setError("Erreur lors de la suppression");
    }
    setLoading(false);
  }

  function startEdit(artist: Artist) {
    setEditingArtist(artist);
    setForm({
      name: artist.name,
      slug: artist.slug,
      tagId: artist.tagId || "",
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="min-h-screen bg-gray-100 p-6 w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-[#1F89A5]">
            Gestion des Artistes
          </h1>

          {/* Formulaire création / édition */}
          <form
            onSubmit={handleSubmit}
            className="mb-8 bg-white p-6 rounded shadow"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#1A4C61]">
              {editingArtist ? "Modifier un artiste" : "Ajouter un artiste"}
            </h2>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1F89A5]"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
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

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#1F89A5] cursor-pointer text-white px-5 py-2 rounded hover:bg-[#1A4C61] transition"
              >
                {editingArtist ? (
                  "Mettre à jour"
                ) : isLoading ? (
                  <Loader />
                ) : (
                  "Ajouter"
                )}
              </button>
              {editingArtist && (
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
            {errorMonitor && (
              <p className="mt-4 text-red-500">{errorMessage}</p>
            )}
          </form>

          {/* Liste des artistes */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-4 text-[#1A4C61]">
              Artistes existants
            </h2>
            {loading && <p>Chargement...</p>}

            {!loading && artists.length === 0 && (
              <p>Aucun artiste disponible.</p>
            )}

            <ul>
              {!isLoading &&
                artists.map((artist) => (
                  <li
                    key={artist.id}
                    className="flex justify-between items-center border-b border-gray-200 py-2"
                  >
                    <div>
                      <p className="font-semibold">{artist.name}</p>
                      <p className="text-sm text-gray-600">
                        Slug: {artist.slug}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => startEdit(artist)}
                        className="text-[#1F89A5] hover:text-[#1A4C61]"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(artist.id!)}
                        className="text-red-500 hover:text-red-700"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </li>
                ))}
              {isLoading && <Loader />}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
