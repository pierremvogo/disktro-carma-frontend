"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Trash2, Edit2, Loader, EyeIcon } from "lucide-react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { TagModuleObject } from "../../modules/tag/module";
import { ArtistModuleObject } from "../../modules/artist/module";
import { SingleModuleObject as ModuleObject } from "./module";
import { MediaModuleObject as MediaModule } from "../file/module";
import { getImageFile, wait } from "@/@disktro/utils";
import CustomSuccess from "@/@disktro/CustomSuccess";
import CustomAlert from "@/@disktro/CustomAlert";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Single = {
  id?: string;
  userId?: string;
  user?: any;
  title: string;
  artistId?: string;
  tagId?: string;
  coverFile?: File | null;
  coverUrl?: string;
  coverImageUrl?: string;
  duration?: string;
};

export default function SinglesPage() {
  const [singles, setSingles] = useState<Single[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingSingle, setEditingSingle] = useState<Single | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<Single>({
    title: "",
    userId: "",
    tagId: "",
    coverUrl: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [previewUrl, setPreviewUrl] = useState(form.coverUrl || "");
  const [artists, setArtists] = useState<{ id: string; name: string }[]>([]);
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const [singleData, setSingleData] = useState(singles);
  const router = useRouter();

  // Récupération artistes & tags
  useEffect(() => {
    if (artists.length === 0) fetchArtists();
    if (tags.length === 0) getTags();
  }, []);

  async function fetchArtists() {
    const token = localStorage.getItem(
      ArtistModuleObject.localState.ACCESS_TOKEN
    );
    setIsLoading(true);
    try {
      if (!token) return;
      const res = await ArtistModuleObject.service.getArtists(token);
      setArtists(res.data);
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

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

  // Charger les singles
  useEffect(() => {
    if (singles.length === 0) fetchSingles();
  }, []);

  useEffect(() => {
    const fetchCovers = async () => {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      const updatedSingles = await Promise.all(
        singles.map(async (single) => {
          const coverImageUrl = await getImageFile(single.coverUrl!, token!);
          return { ...single, coverImageUrl };
        })
      );
      setSingleData(updatedSingles);
    };
    fetchCovers();
  }, [singles]);

  async function fetchSingles() {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(ModuleObject.localState.USER_ID);
    setIsLoading(true);
    try {
      if (!token) return;
      const res = await ModuleObject.service.getSingleByUser(userId!, token);
      setSingles(res.singles);
      setSuccess(true);
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
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
      } else {
        setErrorMessage("Erreur lors de l'upload de l'image.");
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  function resetForm() {
    setForm({ title: "", artistId: "", tagId: "" });
    setEditingSingle(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setErrors({});
    const newErrors: { [key: string]: string } = {};
    if (!form.title) newErrors.title = "Le titre du single est requis.";
    if (!form.tagId) newErrors.tagId = "Veuillez sélectionner un tag.";
    if (!form.coverUrl)
      newErrors.coverUrl = "Veuillez ajouter une image de couverture.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(ModuleObject.localState.USER_ID);
    if (!token) return;

    try {
      if (editingSingle) {
        await ModuleObject.service.updateSingle(editingSingle.id!, {
          title: form.title,
          coverUrl: form.coverUrl,
        });
      } else {
        const payload = {
          ...form,
          userId,
        };
        const newSingle = await ModuleObject.service.createSingle(
          payload,
          token
        );
        if (form.tagId) {
          await ModuleObject.service.createSingleTag(
            form.tagId,
            newSingle.data.id
          );
        }
      }
      resetForm();
      fetchSingles();
    } catch (err) {
      setErrorMessage("Erreur lors de la sauvegarde du single");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer ce single ?")) return;
    setLoading(true);
    try {
      await ModuleObject.service.deleteSingle(id);
      fetchSingles();
    } catch {
      setError("Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(single: Single) {
    setEditingSingle(single);
    setForm({
      title: single.title,
      tagId: single.tagId,
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="min-h-screen bg-gray-100 p-6 w-full max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-[#1F89A5]">
            Gestion des Singles
          </h1>

          {/* Formulaire */}
          <form
            onSubmit={handleSubmit}
            className="mb-8 bg-white p-6 rounded shadow"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#1A4C61]">
              {editingSingle ? "Modifier un single" : "Ajouter un single"}
            </h2>

            {/* Titre */}
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

            {/* Tag */}
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

            {/* Image de couverture */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Image de couverture
              </label>
              <div className="flex items-center space-x-4">
                <img
                  src={previewUrl || "/image/vinyle.jpg"}
                  alt="Cover"
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
                    className="px-4 py-2 bg-gray-100 border border-gray-400 rounded hover:bg-gray-200"
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

            <div className="flex gap-4 justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#1F89A5] text-white px-5 py-2 rounded hover:bg-[#1A4C61] transition"
              >
                {editingSingle ? "Mettre à jour" : "Ajouter"}
              </button>
              {editingSingle && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2 border border-gray-300 rounded hover:bg-gray-200 transition"
                >
                  Annuler
                </button>
              )}
            </div>
          </form>

          {/* Liste des singles */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-4 text-[#1A4C61]">
              Vos Singles
            </h2>
            {loading && <p>Chargement...</p>}
            {!loading && singles.length === 0 && (
              <p>Aucun single disponible.</p>
            )}
            <div className="flex justify-center">{isLoading && <Loader />}</div>

            <ul>
              {singleData.map((single) => (
                <li
                  key={single.id}
                  className="flex bg-gray-200 justify-between rounded-md items-center border-b m-5 border-gray-400 py-2"
                >
                  <div>
                    <div className="relative rounded-md overflow-hidden border border-primary w-[40px] h-[40px]">
                      <Image
                        src={single.coverImageUrl || "/image/vinyle.jpg"}
                        alt=""
                        className="object-cover h-full w-full"
                        width={80}
                        height={80}
                      />
                    </div>
                    <p className="font-semibold">
                      <span className="text-[#1A4C61]">Artiste : </span>
                      <span className="text-[#1F89A5]">
                        {single.user?.name}
                      </span>
                    </p>
                    <p className="font-semibold">
                      <span className="text-[#1A4C61]">Titre : </span>
                      <span className="text-[#1F89A5]">{single.title}</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => router.push(`single/${single.id}/details`)}
                      className="text-[#1F89A5] hover:text-[#1A4C61]"
                      title="Détails"
                    >
                      <EyeIcon size={18} />
                    </button>
                    <button
                      onClick={() => startEdit(single)}
                      className="text-[#1F89A5] hover:text-[#1A4C61]"
                      title="Modifier"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(single.id!)}
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
