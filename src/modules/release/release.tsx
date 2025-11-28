"use client";

import React, { useEffect, useState, ChangeEvent, useRef } from "react";
import { Loader, PlusCircle } from "lucide-react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { AlbumModuleObject as AlbumModule } from "../album/module";
import { MediaModuleObject as MediaModule } from "../file/module";
import { ReleaseModuleObject as ModuleObject } from "./module";
import { EpModuleObject as EpModule } from "../ep/module";
import { SingleModuleObject as SingleModule } from "../single/module";
import { getImageFile, wait } from "@/@disktro/utils";
import CustomAlert from "@/@disktro/CustomAlert";
import CustomSuccess from "@/@disktro/CustomSuccess";
import Image from "next/image";
import { SingleModuleObject } from "../single/module";

type Release = {
  id?: string;
  title: string;
  description?: string;
  releaseDate: string;
  releaseType: "single" | "ep" | "album";
  relatedId?: string; // id du single/ep/album existant
  coverUrl?: string;
  coverImageUrl?: string;
};

export default function ReleaseCreatePage() {
  const [form, setForm] = useState<Release>({
    title: "",
    description: "",
    releaseDate: "",
    releaseType: "single",
    relatedId: "",
    coverUrl: "",
  });

  const [singles, setSingles] = useState<any[]>([]);
  const [eps, setEps] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** 🔹 Chargement des contenus déjà créés (albums, EP, singles) */
  useEffect(() => {
    fetchExistingContent();
  }, []);

  async function fetchExistingContent() {
    const token = localStorage.getItem(AlbumModule.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(AlbumModule.localState.USER_ID);
    if (!token || !userId) return;

    setIsLoading(true);
    try {
      const [albumRes, epRes, singleRes] = await Promise.all([
        AlbumModule.service.getAlbumByUser(userId, token),
        EpModule.service.getEpByUser(userId, token),
        SingleModule.service.getSingleByUser(userId, token),
      ]);
      setAlbums(albumRes.albums || []);
      setEps(epRes.eps || []);
      setSingles(singleRes.singles || []);
    } catch (error) {
      setErrorMessage("Erreur lors du chargement des contenus existants.");
    }
    setIsLoading(false);
  }

  /** 🔹 Gestion upload cover */
  const handleCoverUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const token = localStorage.getItem(AlbumModule.localState.ACCESS_TOKEN);

    setPreviewUrl(URL.createObjectURL(file));
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await MediaModule.service.uploadImageFile(formData, token!);
      if (res && res.fileName) {
        setForm((prev) => ({ ...prev, coverUrl: res.fileName }));
        setSuccessMessage("Image téléchargée avec succès !");
      } else {
        setErrorMessage("Erreur lors de l'upload de l'image.");
      }
    } catch (err) {
      setErrorMessage("Impossible d'uploader l'image.");
    }
    setIsLoading(false);
  };

  /** 🔹 Validation & soumission */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    const newErrors: { [key: string]: string } = {};
    if (!form.title) newErrors.title = "Le titre est requis.";
    if (!form.releaseDate) newErrors.releaseDate = "La date est requise.";
    if (!form.relatedId)
      newErrors.relatedId = "Veuillez sélectionner un contenu à sortir.";
    if (!form.coverUrl)
      newErrors.coverUrl = "Veuillez ajouter une image de couverture.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem(AlbumModule.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(AlbumModule.localState.USER_ID);
    if (!token) return;

    try {
      const payload = { ...form, userId };
      const res = await ModuleObject.service.createRelease(payload, token);
      setSuccessMessage("Release créée avec succès !");
      setForm({
        title: "",
        description: "",
        releaseDate: "",
        releaseType: "single",
        relatedId: "",
        coverUrl: "",
      });
      setPreviewUrl("");
    } catch (error) {
      setErrorMessage("Erreur lors de la création de la release.");
    }
    setIsLoading(false);
  }

  /** 🔹 Liste des contenus selon le type */
  const getAvailableItems = () => {
    switch (form.releaseType) {
      case "single":
        return singles;
      case "ep":
        return eps;
      case "album":
        return albums;
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-gray-100 p-6 w-full max-w-4xl rounded-md shadow">
          <h1 className="text-3xl font-bold mb-6 text-[#1F89A5]">
            Créer une nouvelle Release
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded p-6 shadow-md"
          >
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Titre de la release
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={`w-full border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Description (optionnelle)
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Date de sortie
                </label>
                <input
                  type="date"
                  value={form.releaseDate}
                  onChange={(e) =>
                    setForm({ ...form, releaseDate: e.target.value })
                  }
                  className={`w-full border ${
                    errors.releaseDate ? "border-red-500" : "border-gray-300"
                  } rounded px-3 py-2`}
                />
                {errors.releaseDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.releaseDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Type de release
                </label>
                <select
                  value={form.releaseType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      releaseType: e.target.value as "single" | "ep" | "album",
                      relatedId: "",
                    })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="single">Single</option>
                  <option value="ep">EP</option>
                  <option value="album">Album</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Sélectionnez un {form.releaseType.toUpperCase()} existant
              </label>
              <select
                value={form.relatedId}
                onChange={(e) =>
                  setForm({ ...form, relatedId: e.target.value })
                }
                className={`w-full border ${
                  errors.relatedId ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2`}
              >
                <option value="">
                  -- Choisir un {form.releaseType.toUpperCase()} --
                </option>
                {getAvailableItems().map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
              {errors.relatedId && (
                <p className="text-red-500 text-sm mt-1">{errors.relatedId}</p>
              )}
            </div>

            {/* Upload cover */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">
                Image de couverture
              </label>
              <div className="flex items-center space-x-4">
                <Image
                  src={previewUrl || "/image/vinyle.jpg"}
                  alt="cover"
                  width={80}
                  height={80}
                  className="rounded-md border border-gray-300 object-cover h-20 w-20"
                />
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleCoverUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-gray-100 border border-gray-400 rounded hover:bg-gray-200"
                  >
                    {previewUrl ? "Modifier l’image" : "Ajouter une image"}
                  </button>
                </div>
              </div>
              {errors.coverUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.coverUrl}</p>
              )}
            </div>

            {successMessage && <CustomSuccess message={successMessage} />}
            {errorMessage && <CustomAlert message={errorMessage} />}
            {isLoading && (
              <div className="flex justify-center">
                <Loader className="animate-spin text-[#1F89A5]" />
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#1F89A5] text-white px-6 py-2 rounded hover:bg-[#1A4C61] transition"
              >
                {isLoading ? "En cours..." : "Créer la Release"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
