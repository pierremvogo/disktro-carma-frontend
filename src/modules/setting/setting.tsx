"use client";

import { ChangeEvent, useRef, useState } from "react";
import { SettingModuleObject as ModuleObject } from "./module";

interface User {
  id: string;
  name?: string;
  email?: string;
  type?: string;
  isSubscribed?: boolean;
  emailVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
  profileImageUrl?: string;
}

export default function ProfileSettings() {
  const [user, setUser] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    name: user[0]?.name,
    email: user[0]?.email,
    type: user[0]?.type || "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(user[0]?.profileImageUrl || "");

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      // Remplace par ton propre endpoint API
      const res = await fetch("/api/user/update", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setMessage("Profil mis à jour avec succès.");
      } else {
        setMessage("Erreur lors de la mise à jour.");
      }
    } catch (error) {
      setMessage("Une erreur s'est produite.");
    }

    setIsSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Paramètres du profil</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ID - readonly */}
        <div>
          <label className="block text-sm font-medium text-gray-700">ID</label>
          <input
            type="text"
            value={user[0]?.id}
            readOnly
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm"
          />
        </div>
        {/* Photo de profil */}
        <div className="flex items-center space-x-4">
          <img
            src={previewUrl || "/default-avatar.png"}
            alt="Photo de profil"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gray-100 border rounded hover:bg-gray-200"
            >
              Changer la photo
            </button>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
          />
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <input
            name="type"
            type="text"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
          />
        </div>

        {/* Email Verified (read only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email vérifié
          </label>
          <input
            type="text"
            value={user[0]?.emailVerified ? "Oui" : "Non"}
            readOnly
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm"
          />
        </div>

        {/* Subscription status (read only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Abonné
          </label>
          <input
            type="text"
            value={user[0]?.isSubscribed ? "Oui" : "Non"}
            readOnly
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm"
          />
        </div>

        {/* Created / Updated */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Créé le
            </label>
            <input
              type="text"
              value={new Date(user[0]?.createdAt!).toLocaleString()}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mis à jour le
            </label>
            <input
              type="text"
              value={new Date(user[0]?.updatedAt!).toLocaleString()}
              readOnly
              className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSaving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>

        {/* Message */}
        {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
      </form>
    </div>
  );
}
