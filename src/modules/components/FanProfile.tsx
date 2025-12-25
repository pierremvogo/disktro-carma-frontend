import React, { ChangeEvent, useEffect, useState } from "react";
import { UserModuleObject as UserModule } from "../module";
import { getImageFile } from "@/@disktro/utils";
import { MediaModuleObject as MediaModule } from "../file/module";
// Icon components
const User = ({ size = 24, className = "" }) => (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Lock = ({ size = 24, className = "" }) => (
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
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const CreditCard = ({ size = 24, className = "" }) => (
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
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const Mail = ({ size = 24, className = "" }) => (
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const Save = ({ size = 24, className = "" }) => (
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
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const Eye = ({ size = 24, className = "" }) => (
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
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = ({ size = 24, className = "" }) => (
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
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const Smartphone = ({ size = 24, className = "" }) => (
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
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

interface FanProfileProps {
  onBack: () => void;
  language: string;
}

type AccountErrors = {
  name?: string;
  email?: string;
  profilePicture?: string;
};

export function FanProfile({ onBack, language }: FanProfileProps) {
  const [activeTab, setActiveTab] = useState("account");

  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Payment states
  const [paymentType, setPaymentType] = useState<
    "card" | "paypal" | "bizum" | "ideal" | "mobilemoney" | "orangemoney"
  >("card");

  // Card payment states
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // PayPal states
  const [paypalEmail, setPaypalEmail] = useState("");

  // Bizum states
  const [bizumPhone, setBizumPhone] = useState("");

  // iDEAL states
  const [idealBank, setIdealBank] = useState("");
  const [idealAccountHolder, setIdealAccountHolder] = useState("");

  // Mobile Money states
  const [mobileMoneyPhone, setMobileMoneyPhone] = useState("");
  const [mobileMoneyProvider, setMobileMoneyProvider] = useState("");

  // Orange Money states
  const [orangeMoneyPhone, setOrangeMoneyPhone] = useState("");

  const [savedPaymentMethods, setSavedPaymentMethods] = useState<
    Array<{
      id: string;
      type:
        | "card"
        | "paypal"
        | "bizum"
        | "ideal"
        | "mobilemoney"
        | "orangemoney";
      displayInfo: string;
      details?: string;
    }>
  >([
    { id: "1", type: "card", displayInfo: "Visa •••• 4242", details: "12/25" },
    {
      id: "2",
      type: "paypal",
      displayInfo: "user@example.com",
      details: "PayPal",
    },
  ]);

  const text = {
    spanish: {
      title: "Mi Perfil",
      back: "Volver",
      saving: "...",
      updating: "...",
      account: "Cuenta",
      password: "Contraseña",
      payment: "Pago",
      accountInfo: "Información de Cuenta",
      name: "Nombre",
      email: "Correo Electrónico",
      profilePicture: "Foto de Perfil",
      uploadPicture: "Subir Foto",
      changePassword: "Cambiar Contraseña",
      currentPassword: "Contraseña Actual",
      newPassword: "Nueva Contraseña",
      confirmPassword: "Confirmar Contraseña",
      updatePassword: "Actualizar Contraseña",
      passwordRequirements: "La contraseña debe tener al menos 8 caracteres",
      paymentMethods: "Métodos de Pago Guardados",
      addPaymentMethod: "Agregar Método de Pago",
      selectPaymentType: "Seleccionar Tipo de Pago",
      creditCard: "Tarjeta de Crédito/Débito",
      cardNumber: "Número de Tarjeta",
      cardHolderName: "Nombre del Titular",
      expiryDate: "Fecha de Vencimiento",
      cvv: "CVV",
      paypalAccount: "Cuenta PayPal",
      paypalEmail: "Correo de PayPal",
      bizumPhone: "Número de Teléfono Bizum",
      idealBank: "Banco iDEAL",
      accountHolder: "Titular de la Cuenta",
      selectBank: "Seleccionar banco",
      mobileMoneyPhone: "Número de Teléfono Mobile Money",
      mobileMoneyProvider: "Proveedor",
      selectProvider: "Seleccionar proveedor",
      orangeMoneyPhone: "Número de Teléfono Orange Money",
      savePayment: "Guardar Método de Pago",
      remove: "Eliminar",
      saveChanges: "Guardar Cambios",
      show: "Mostrar",
      hide: "Ocultar",
      phoneNumber: "Número de Teléfono",
      emailAddress: "Correo Electrónico",
      errors: {
        generic: "Algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      },
    },
    english: {
      errors: {
        generic: "Something went wrong. Please try again later.",
      },
      noAlbumUploadedYet: "No album uploaded yet.",

      saving: "Saving...",
      updating: "Updating...",
      title: "My Profile",
      back: "Back",
      account: "Account",
      password: "Password",
      payment: "Payment",
      accountInfo: "Account Information",
      name: "Name",
      email: "Email",
      profilePicture: "Profile Picture",
      uploadPicture: "Upload Picture",
      changePassword: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      updatePassword: "Update Password",
      passwordRequirements: "Password must be at least 8 characters",
      paymentMethods: "Saved Payment Methods",
      addPaymentMethod: "Add Payment Method",
      selectPaymentType: "Select Payment Type",
      creditCard: "Credit/Debit Card",
      cardNumber: "Card Number",
      cardHolderName: "Cardholder Name",
      expiryDate: "Expiry Date",
      cvv: "CVV",
      paypalAccount: "PayPal Account",
      paypalEmail: "PayPal Email",
      bizumPhone: "Bizum Phone Number",
      idealBank: "iDEAL Bank",
      accountHolder: "Account Holder",
      selectBank: "Select bank",
      mobileMoneyPhone: "Mobile Money Phone Number",
      mobileMoneyProvider: "Provider",
      selectProvider: "Select provider",
      orangeMoneyPhone: "Orange Money Phone Number",
      savePayment: "Save Payment Method",
      remove: "Remove",
      saveChanges: "Save Changes",
      show: "Show",
      hide: "Hide",
      phoneNumber: "Phone Number",
      emailAddress: "Email Address",
    },
    catalan: {
      errors: {
        generic:
          "Alguna cosa ha anat malament. Si us plau, torna-ho a provar més tard.",
      },
      saving: "...",
      updating: "...",
      title: "El Meu Perfil",
      back: "Tornar",
      account: "Compte",
      password: "Contrasenya",
      payment: "Pagament",
      accountInfo: "Informació del Compte",
      name: "Nom",
      email: "Correu Electrònic",
      profilePicture: "Foto de Perfil",
      uploadPicture: "Pujar Foto",
      changePassword: "Canviar Contrasenya",
      currentPassword: "Contrasenya Actual",
      newPassword: "Nova Contrasenya",
      confirmPassword: "Confirmar Contrasenya",
      updatePassword: "Actualitzar Contrasenya",
      passwordRequirements: "La contrasenya ha de tenir almenys 8 caràcters",
      paymentMethods: "Mètodes de Pagament Guardats",
      addPaymentMethod: "Afegir Mètode de Pagament",
      selectPaymentType: "Seleccionar Tipus de Pagament",
      creditCard: "Targeta de Crèdit/Dèbit",
      cardNumber: "Número de Targeta",
      cardHolderName: "Nom del Titular",
      expiryDate: "Data de Venciment",
      cvv: "CVV",
      paypalAccount: "Compte PayPal",
      paypalEmail: "Correu de PayPal",
      bizumPhone: "Número de Telèfon Bizum",
      idealBank: "Banc iDEAL",
      accountHolder: "Titular del Compte",
      selectBank: "Seleccionar banc",
      mobileMoneyPhone: "Número de Telèfon Mobile Money",
      mobileMoneyProvider: "Proveïdor",
      selectProvider: "Seleccionar proveïdor",
      orangeMoneyPhone: "Número de Telèfon Orange Money",
      savePayment: "Guardar Mètode de Pagament",
      remove: "Eliminar",
      saveChanges: "Guardar Canvis",
      show: "Mostrar",
      hide: "Amagar",
      phoneNumber: "Número de Telèfon",
      emailAddress: "Correu Electrònic",
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "FAN",
    profileImageUrl: "",
  });

  const [profilePicturePreview, setProfilePicturePreview] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [errors, setErrors] = useState<AccountErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  type PasswordErrors = {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };

  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});

  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [successPassword, setSuccessPassword] = useState(false);
  const [successPasswordMessage, setSuccessPasswordMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

  // Account states
  const [name, setName] = useState(formData.name);
  const [email, setEmail] = useState(formData.email);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000); // 10 secondes

      return () => clearTimeout(timer); // cleanup
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000); // 10 secondes

      return () => clearTimeout(timer); // cleanup
    }
  }, [errorMessage]);

  const content = text[language as keyof typeof text] || text.english;

  const handleUpdatePassword = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const userId = localStorage.getItem(UserModule.localState.USER_ID);
    if (!userId) return;

    const newErrors: PasswordErrors = {};

    // 🔐 1. Current obligatoire
    if (!currentPassword) {
      newErrors.currentPassword =
        language === "english"
          ? "Please enter your current password"
          : language === "spanish"
          ? "Por favor ingresa tu contraseña actual"
          : "Si us plau introdueix la contrasenya actual";
    }

    // 🔐 2. New obligatoire + min 8
    if (!newPassword) {
      newErrors.newPassword =
        language === "english"
          ? "Please enter your new password"
          : language === "spanish"
          ? "Por favor ingresa tu nueva contraseña"
          : "Si us plau introdueix la nova contrasenya";
    } else if (newPassword.length < 8) {
      newErrors.newPassword =
        language === "english"
          ? "Password must be at least 8 characters long"
          : language === "spanish"
          ? "La contraseña debe tener al menos 8 caracteres"
          : "La contrasenya ha de tenir almenys 8 caràcters";
    }

    // 🔐 3. Confirm obligatoire + match
    if (!confirmPassword) {
      newErrors.confirmPassword =
        language === "english"
          ? "Please confirm your new password"
          : language === "spanish"
          ? "Por favor, confirma tu nueva contraseña"
          : "Si us plau, confirma la nova contrasenya";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword =
        language === "english"
          ? "Passwords do not match"
          : language === "spanish"
          ? "Las contraseñas no coinciden"
          : "Les contrasenyes no coincideixen";
    }

    setPasswordErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsLoadingPassword(true);
    setSuccessPassword(false);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const payload = {
        oldPassword: currentPassword,
        newPassword,
        confirmNewPassword: confirmPassword, // si ton backend attend ce nom
      };

      await UserModule.service.updateUser(userId, payload);

      setSuccessPassword(true);
      setSuccessMessage(
        language === "english"
          ? "Password updated successfully."
          : language === "spanish"
          ? "Contraseña actualizada con éxito."
          : "Contrasenya actualitzada correctament."
      );
      setErrorMessage("");

      // reset fields
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      fetchUser?.();
    } catch (error) {
      setSuccessPassword(false);
      setErrorMessage(content.errors.generic);
    } finally {
      setIsLoadingPassword(false);
    }
  };

  const handleSubmitAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const language =
      (typeof window !== "undefined" &&
        localStorage.getItem("disktro_language")) ||
      "english";
    const userId = localStorage.getItem(UserModule.localState.USER_ID);
    const token = localStorage.getItem(UserModule.localState.ACCESS_TOKEN);
    if (!userId || !token) return;

    const newErrors: AccountErrors = {};

    // ✅ validations
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      newErrors.name =
        language === "english"
          ? "Please enter your name"
          : language === "spanish"
          ? "Por favor, ingrese su nombre"
          : "Si us plau, introdueix el teu nom";
    } else if (trimmedName.length < 2) {
      newErrors.name =
        language === "english"
          ? "Name must be at least 2 characters"
          : language === "spanish"
          ? "El nombre debe tener al menos 2 caracteres"
          : "El nom ha de tenir almenys 2 caràcters";
    }

    if (!trimmedEmail) {
      newErrors.email =
        language === "english"
          ? "Please enter your email"
          : language === "spanish"
          ? "Por favor ingrese su correo electrónico"
          : "Si us plau, introdueix el teu correu electrònic";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email =
        language === "english"
          ? "Please enter a valid email address"
          : language === "spanish"
          ? "Por favor ingrese una dirección de correo electrónico válida"
          : "Si us plau, introdueix una adreça de correu electrònic vàlida";
    }
    // Récupérer la langue dans localStorage

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setSuccess(false);
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      // ✅ payload fan account (sans image car tu l'as déjà gérée ailleurs)
      const payload = {
        name: trimmedName,
        email: trimmedEmail,
        language,
      };

      const res = await UserModule.service.updateUser(userId, payload);

      setSuccess(true);
      setSuccessMessage(res.message);
      fetchUser?.(); // resync si tu veux
    } catch (error) {
      setErrorMessage(content.errors.generic);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePicture = async (e: ChangeEvent<HTMLInputElement>) => {
    const token = localStorage.getItem(MediaModule.localState.ACCESS_TOKEN);
    const file = e.target.files?.[0];

    if (!file) return;

    setErrorMessage("");
    setSuccess(false);
    setIsLoading(true);

    // On garde le fichier en state si besoin
    setProfilePicture(file);
    // Preview local
    setProfilePicturePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await MediaModule.service.uploadImageFile(formData);
      const userId = localStorage.getItem(UserModule.localState.USER_ID);
      if (res && res.fileName) {
        // On stocke le nom de fichier / url dans le form
        setFormData((prev: any) => ({
          ...prev,
          profileImageUrl: res.url, // 👉 adapte le nom du champ si nécessaire
        }));
        if (res && res.url) {
          setSuccessMessage(
            language === "english"
              ? "Profile Image saved successfully."
              : language === "spanish"
              ? "Imagen de perfil guardada con éxito."
              : "Imatge de perfil guardada amb èxit."
          );
          await UserModule.service.updateUser(userId!, {
            profileImageUrl: res.url,
          });
          setSuccess(true);
          setIsLoading(false);
          setErrorMessage("");
        } else {
        }
        setSuccess(true);
        setIsLoading(false);
        setErrorMessage("");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage(content.errors.generic);
      setIsLoading(false);
      setSuccess(false);
    }
  };

  const fetchUser = async () => {
    const token = localStorage.getItem(UserModule.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(UserModule.localState.USER_ID);
    if (!userId || !token) return;

    try {
      setIsLoading(true);
      setSuccess(false);
      setErrorMessage("");

      const user = await UserModule.service.getUser(userId);

      // ✅ Fan: on garde uniquement les champs utiles pour l'onglet Account
      setFormData((prev) => ({
        ...prev,
        name: user.data.name ?? "",
        email: user.data.email ?? "",
        type: user.data.type, // si tu l'utilises côté fan
        profileImageUrl: user.data.profileImageUrl ?? "", // URL backend
      }));

      // ✅ Preview image de profil (si URL backend)
      if (user.data.profileImageUrl) {
        const imageObjectUrl = await getImageFile(
          user.data.profileImageUrl,
          token
        );
        setProfilePicturePreview(imageObjectUrl);
      } else {
        setProfilePicturePreview("");
      }

      setIsLoading(false);
      setSuccess(true);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(content.errors.generic);
      setIsLoading(false);
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (!formData.name) {
      fetchUser();
    }
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto p-8  bg-gradient-to-br from-slate-900 via-purple-900 to-black">
      <button
        onClick={onBack}
        className="cursor-pointer flex items-center gap-2 text-white drop-shadow hover:opacity-70 transition-opacity mb-6"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        {content.back}
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl text-white drop-shadow-lg mb-8">
          {content.title}
        </h1>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {[
            { id: "account", label: content.account, icon: User },
            { id: "password", label: content.password, icon: Lock },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`cursor-pointer flex items-center gap-2 px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === id
                  ? "bg-white/30 backdrop-blur-md border-2 border-white/50"
                  : "bg-white/10 backdrop-blur-md border-2 border-white/20 hover:bg-white/20"
              }`}
            >
              <Icon size={20} className="text-white" />
              <span className="text-white drop-shadow">{label}</span>
            </button>
          ))}
        </div>

        {/* Account Tab */}
        {activeTab === "account" && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl text-white drop-shadow-lg mb-6">
              {content.accountInfo}
            </h2>

            <form onSubmit={handleSubmitAccount} className="space-y-6">
              {/* Profile Picture */}
              <div>
                <label className="block text-white drop-shadow mb-3">
                  {content.profilePicture}
                </label>

                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center overflow-hidden">
                    {profilePicturePreview ? (
                      <img
                        src={profilePicturePreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={40} className="text-white/40" />
                    )}
                  </div>

                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicture}
                      className="hidden"
                      id="profile-picture-upload"
                    />

                    <label
                      htmlFor="profile-picture-upload"
                      className="cursor-pointer px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all inline-block"
                    >
                      {content.uploadPicture}
                    </label>

                    {errors.profilePicture && (
                      <p className="text-red-300 text-sm mt-2">
                        {errors.profilePicture}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-white drop-shadow mb-3">
                  {content.name}
                </label>
                <input
                  type="text"
                  value={name || formData.name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={content.name}
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                />
                {errors.name && (
                  <p className="text-red-300 text-sm mt-2">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-white drop-shadow mb-3">
                  {content.email}
                </label>
                <input
                  type="email"
                  value={email || formData.email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={content.email}
                  className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                />
                {errors.email && (
                  <p className="text-red-300 text-sm mt-2">{errors.email}</p>
                )}
              </div>
              {/* Alerts */}
              {(successMessage || errorMessage) && (
                <div className="mb-6">
                  {successMessage && (
                    <div className="p-4 rounded-lg border border-green-300/40 bg-green-500/10 text-green-100">
                      {successMessage}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="p-4 rounded-lg border border-red-300/40 bg-red-500/10 text-red-100 mt-3">
                      {errorMessage}
                    </div>
                  )}
                </div>
              )}

              {/* Save Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex cursor-pointer items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500/40 to-pink-500/40 backdrop-blur-md border-2 border-white/40 rounded-xl text-white hover:from-purple-500/50 hover:to-pink-500/50 hover:border-white/60 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {isLoading ? <>{"Loding..."}</> : content.saveChanges}
              </button>
            </form>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === "password" && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl text-white drop-shadow-lg mb-6">
              {content.changePassword}
            </h2>

            <form onSubmit={handleUpdatePassword} className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-white drop-shadow mb-3">
                  {content.currentPassword}
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder={content.currentPassword}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-black placeholder-white/40 focus:outline-none focus:ring-2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-black transition-colors"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {passwordErrors.currentPassword && (
                  <p className="text-red-300 text-sm mt-2">
                    {passwordErrors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-white drop-shadow mb-3">
                  {content.newPassword}
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={content.newPassword}
                    className="w-full p-4 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-black transition-colors"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <p className="text-red-300 text-sm mt-2">
                    {passwordErrors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-white drop-shadow mb-3">
                  {content.confirmPassword}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={content.confirmPassword}
                    className="w-full p-4 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-black transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="text-red-300 text-sm mt-2">
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>

              <p className="text-white/60 text-sm">
                {content.passwordRequirements}
              </p>

              {/* Alerts */}
              {(successMessage || errorMessage) && (
                <div className="mb-6">
                  {successMessage && (
                    <div className="p-4 rounded-lg border border-green-300/40 bg-green-500/10 text-green-100">
                      {successMessage}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="p-4 rounded-lg border border-red-300/40 bg-red-500/10 text-red-100 mt-3">
                      {errorMessage}
                    </div>
                  )}
                </div>
              )}

              {/* Update Button */}
              <button
                type="submit"
                disabled={isLoadingPassword}
                className="cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 backdrop-blur-md border-2 border-white/40 rounded-xl text-white hover:from-blue-500/50 hover:to-cyan-500/50 hover:border-white/60 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Lock size={20} />
                {isLoadingPassword ? "Loading..." : content.updatePassword}
              </button>
            </form>
          </div>
        )}

        {/* Payment Tab */}
        {/* {activeTab === "payment" && (
          <div className="space-y-6">
            {savedPaymentMethods.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 lg:p-8 border border-white/20">
                <h2 className="text-xl sm:text-2xl text-white drop-shadow-lg mb-4 sm:mb-6">
                  {content.paymentMethods}
                </h2>

                <div className="space-y-3 sm:space-y-4">
                  {savedPaymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        {getPaymentIcon(method.type)}
                        <div className="min-w-0">
                          <p className="text-white drop-shadow text-sm sm:text-base truncate">
                            {method.displayInfo}
                          </p>
                          {method.details && (
                            <p className="text-white/60 text-xs sm:text-sm truncate">
                              {method.details}
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemovePayment(method.id)}
                        className="w-full sm:w-auto px-4 py-2 bg-red-500/40 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm sm:text-base hover:bg-red-500/60 transition-all"
                      >
                        {content.remove}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            Add Payment Method
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h2 className="text-2xl text-white drop-shadow-lg mb-6">
                {content.addPaymentMethod}
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-white drop-shadow mb-3">
                    {content.selectPaymentType}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {[
                      {
                        value: "card",
                        label: content.creditCard,
                        icon: <CreditCard size={18} />,
                      },
                      {
                        value: "paypal",
                        label: "PayPal",
                        icon: <Mail size={18} />,
                      },
                      {
                        value: "bizum",
                        label: "Bizum",
                        icon: <Smartphone size={18} />,
                      },
                      {
                        value: "ideal",
                        label: "iDEAL",
                        icon: <CreditCard size={18} />,
                      },
                      {
                        value: "mobilemoney",
                        label: "Mobile Money",
                        icon: <Smartphone size={18} />,
                      },
                      {
                        value: "orangemoney",
                        label: "Orange Money",
                        icon: <Smartphone size={18} />,
                      },
                    ].map(({ value, label, icon }) => (
                      <button
                        key={value}
                        onClick={() => setPaymentType(value as any)}
                        className={`w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 text-sm sm:text-base transition-all ${
                          paymentType === value
                            ? "bg-white/30 border-white/50 text-white"
                            : "bg-white/10 border-white/20 text-white/80 hover:bg-white/20"
                        }`}
                      >
                        <span className="text-white">{icon}</span>
                        <span className="text-inherit text-xs sm:text-sm md:text-base text-center">
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {paymentType === "card" && (
                  <>
                    <div>
                      <label className="block text-white drop-shadow mb-3">
                        {content.cardNumber}
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(
                            e.target.value.replace(/\D/g, "").slice(0, 16)
                          )
                        }
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white drop-shadow mb-3">
                        {content.cardHolderName}
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white drop-shadow mb-3">
                          {content.expiryDate}
                        </label>
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-white drop-shadow mb-3">
                          {content.cvv}
                        </label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) =>
                            setCvv(
                              e.target.value.replace(/\D/g, "").slice(0, 4)
                            )
                          }
                          placeholder="123"
                          className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}

                {paymentType === "paypal" && (
                  <div>
                    <label className="block text-white drop-shadow mb-3">
                      {content.paypalEmail}
                    </label>
                    <input
                      type="email"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                    />
                  </div>
                )}

                {paymentType === "bizum" && (
                  <div>
                    <label className="block text-white drop-shadow mb-3">
                      {content.bizumPhone}
                    </label>
                    <input
                      type="tel"
                      value={bizumPhone}
                      onChange={(e) => setBizumPhone(e.target.value)}
                      placeholder="+34 600 000 000"
                      className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                    />
                  </div>
                )}

                {paymentType === "ideal" && (
                  <>
                    <div>
                      <label className="block text-white drop-shadow mb-3">
                        {content.idealBank}
                      </label>
                      <select
                        value={idealBank}
                        onChange={(e) => setIdealBank(e.target.value)}
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black focus:outline-none focus:border-white/40 transition-all"
                      >
                        <option value="" className="bg-white">
                          {content.selectBank}
                        </option>
                        <option value="ABN AMRO" className="bg-white">
                          ABN AMRO
                        </option>
                        <option value="ING" className="bg-white">
                          ING
                        </option>
                        <option value="Rabobank" className="bg-white">
                          Rabobank
                        </option>
                        <option value="SNS Bank" className="bg-white">
                          SNS Bank
                        </option>
                        <option value="ASN Bank" className="bg-white">
                          ASN Bank
                        </option>
                        <option value="Bunq" className="bg-white">
                          Bunq
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white drop-shadow mb-3">
                        {content.accountHolder}
                      </label>
                      <input
                        type="text"
                        value={idealAccountHolder}
                        onChange={(e) => setIdealAccountHolder(e.target.value)}
                        placeholder="John Doe"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>
                  </>
                )}

                {paymentType === "mobilemoney" && (
                  <>
                    <div>
                      <label className="block text-white drop-shadow mb-3">
                        {content.mobileMoneyProvider}
                      </label>
                      <select
                        value={mobileMoneyProvider}
                        onChange={(e) => setMobileMoneyProvider(e.target.value)}
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black focus:outline-none focus:border-white/40 transition-all"
                      >
                        <option value="" className="bg-white">
                          {content.selectProvider}
                        </option>
                        <option value="MTN" className="bg-white">
                          MTN Mobile Money
                        </option>
                        <option value="Vodafone" className="bg-white">
                          Vodafone Cash
                        </option>
                        <option value="Airtel" className="bg-white">
                          Airtel Money
                        </option>
                        <option value="Tigo" className="bg-white">
                          Tigo Cash
                        </option>
                        <option value="M-Pesa" className="bg-white">
                          M-Pesa
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white drop-shadow mb-3">
                        {content.mobileMoneyPhone}
                      </label>
                      <input
                        type="tel"
                        value={mobileMoneyPhone}
                        onChange={(e) => setMobileMoneyPhone(e.target.value)}
                        placeholder="+233 000 000 000"
                        className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>
                  </>
                )}

                {paymentType === "orangemoney" && (
                  <div>
                    <label className="block text-white drop-shadow mb-3">
                      {content.orangeMoneyPhone}
                    </label>
                    <input
                      type="tel"
                      value={orangeMoneyPhone}
                      onChange={(e) => setOrangeMoneyPhone(e.target.value)}
                      placeholder="+225 00 00 00 00"
                      className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                    />
                  </div>
                )}

                <button
                  onClick={handleSavePayment}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500/40 to-emerald-500/40 backdrop-blur-md border-2 border-white/40 rounded-xl text-white hover:from-green-500/50 hover:to-emerald-500/50 hover:border-white/60 transition-all shadow-lg"
                >
                  <Save size={20} />
                  {content.savePayment}
                </button>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
