"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import { UserModuleObject as UserModule } from "../module";
import { MediaModuleObject as ModuleObject } from "../file/module";
import CustomSuccess from "@/@disktro/CustomSuccess";
import CustomAlert from "@/@disktro/CustomAlert";
import { getImageFile, isTokenExpired } from "@/@disktro/utils";

interface User {
  id?: string;
  name?: string;
  surname?: string;
  email?: string;
  type?: string;
  isSubscribed?: boolean;
  emailVerified?: boolean;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  createdAt?: string;
  updatedAt?: string;
  profileImageUrl?: string;
}
type FormSetting = {
  name: string;
  surname: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
const DefaultValue: FormSetting = {
  name: "",
  surname: "",
  email: "",
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function ProfileSettings() {
  const [formData, setFormData] = useState<User>({
    name: "",
    surname: "",
    email: "",
    type: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [user, setUser] = useState<User>();
  const [errors, setErrors] = useState<FormSetting>(DefaultValue);
  const [previewUrl, setPreviewUrl] = useState(formData.profileImageUrl || "");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!formData.name) {
      fetchUser();
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

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(UserModule.localState.USER_ID);
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMessage("");
    setSuccess(false);
    setIsLoading(true);
    setPreviewUrl(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await ModuleObject.service.uploadImageFile(formData);
      if (res && res.url) {
        setFormData((prev) => ({ ...prev, profileImageUrl: res.url }));
        setSuccessMessage("Image uploadée avec succès.");
        await UserModule.service.updateUser(userId!, {
          profileImageUrl: res.url,
        });
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

  const fetchUser = async () => {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(UserModule.localState.USER_ID);
    if (!userId) return;
    if (!token) return;
    try {
      setIsLoading(true);
      setSuccess(false);
      setErrorMessage("");
      const user = await UserModule.service.getUser(userId);
      setFormData({
        name: user.data.name,
        surname: user.data.surname,
        email: user.data.email,
        type: user.data.type,
        profileImageUrl: user.data.profileImageUrl,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setIsLoading(false);
      setSuccess(true);
      setErrorMessage("");
      if (user.data.profileImageUrl) {
        const imageObjectUrl = await getImageFile(
          user.data.profileImageUrl,
          token!
        );
        setPreviewUrl(imageObjectUrl);
        setFormData((prev) => ({ ...prev, profileImageUrl: imageObjectUrl }));
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
      setIsLoading(false);
      setSuccess(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem(ModuleObject.localState.USER_ID);
    const newErrors: any = {};
    if (formData.newPassword) {
      if (!formData.oldPassword) {
        newErrors.oldPassword = "Please enter your current password";
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        newErrors.confirmNewPassword = "Passwords do not match";
      }
    }
    setErrors(newErrors);
    if (!userId) return;
    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage("");
      setErrorMessage("");
      setIsLoading(true);
      setSuccess(false);
      try {
        const payload = {
          ...formData,
        };
        await UserModule.service.updateUser(userId, payload);
        setErrorMessage("");
        setSuccess(true);
        fetchUser();
        setSuccessMessage("Profil mis à jour avec succès.");
        setIsLoading(false);
      } catch (error) {
        setErrorMessage((error as Error).message);
        setIsLoading(false);
        setSuccess(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-3xl mx-auto p-6">
          <h2 className="text-[#1F89A5] text-2xl font-semibold mb-6">
            Paramètres du profil
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src={previewUrl || "/image/profile_default.png"}
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
                  className="px-4 py-2 bg-gray-100 border rounded cursor-pointer border-gray-400 hover:bg-gray-200"
                >
                  {previewUrl
                    ? "Modifier la photo du profil"
                    : "Ajouter une photo de profil"}
                </button>
              </div>
            </div>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                name="name"
                type="text"
                value={formData?.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              />
            </div>
            {/* SurName */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Surname
              </label>
              <input
                name="surname"
                type="text"
                value={formData?.surname}
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
                disabled
                name="email"
                type="email"
                value={formData?.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              />
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="oldPassword"
                type="password"
                value={formData.oldPassword}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              />
              {errors.oldPassword && (
                <p className="text-red-500 text-sm">{errors.oldPassword}</p>
              )}
            </div>
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                name="newPassword"
                type="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                name="confirmNewPassword"
                type="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
              />
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmNewPassword}
                </p>
              )}
            </div>
            {/* Submit button */}
            {successMessage && <CustomSuccess message={successMessage} />}
            {errorMessage && <CustomAlert message={errorMessage} />}
            <div className="flex pt-4 justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 ${
                  isLoading ? "cursor-not-allowed" : "cursor-pointer"
                } bg-[#1F89A5] text-white rounded-md hover:bg-[#1A4C61] transition disabled:bg-[#1A4C61]`}
              >
                {isLoading ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
