import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ArtistModuleObject as ModuleObject } from "../artist/module";
import { useRouter } from "next/navigation";
import { AccessibilitySettingsPanel } from "./AccessibilitySettingsPanel";
import { MediaModuleObject as MediaModule } from "../file/module";
import { UserModuleObject as UserModule } from "../module";
import { getImageFile, getVideoFile } from "@/@disktro/utils";
import CustomSuccess from "@/@disktro/CustomSuccess";
import CustomAlert from "@/@disktro/CustomAlert";
import { MoodModuleObject as MoodModule } from "../mood/module";
import { TrackModuleObject as TrackModule } from "../track/module";
// Icon components
const Upload = ({ size = 24, className = "" }) => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const TrendingUp = ({ size = 24, className = "" }) => (
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
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const Users = ({ size = 24, className = "" }) => (
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
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const DollarSign = ({ size = 24, className = "" }) => (
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
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const Music = ({ size = 24, className = "" }) => (
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
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const Play = ({ size = 24, className = "" }) => (
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
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const Search = ({ size = 24, className = "" }) => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const Video = ({ size = 24, className = "" }) => (
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
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const Image = ({ size = 24, className = "" }) => (
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
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const FileText = ({ size = 24, className = "" }) => (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const X = ({ size = 24, className = "" }) => (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
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

interface ArtistDashboardProps {
  language: string;
  onGoToStreaming?: () => void;
}
interface User {
  id?: string;
  name?: string;
  surname?: string;
  email?: string;
  bio?: string;
  artistName?: string;
  genre?: string;
  twoFactorEnabled?: boolean;
  type?: string;
  isSubscribed?: boolean;
  emailVerified?: boolean;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  createdAt?: string;
  updatedAt?: string;
  profileImageUrl?: string;
  videoIntroUrl?: string;
  miniVideoLoopUrl?: string;
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
type PasswordErrors = {
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
};
type Mood = {
  id: string;
  name: string;
};
type TrackForm = {
  id?: string;
  title: string;
  duration?: number;
  moodId: string;

  // fichiers côté front (pour l’UI uniquement)
  brailleFile?: File | null;
  signLanguageVideo?: File | null;

  // URLs qui partent vers le backend Track
  brailleFileUrl?: string | null;
  signLanguageVideoUrl?: string | null;

  lyrics?: string;
  audioUrl?: string;
};

export function ArtistDashboard({
  language,
  onGoToStreaming,
}: ArtistDashboardProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [bioOneWord, setBioOneWord] = useState<string>("");
  const [monthlyPrice, setMonthlyPrice] = useState<string>("");

  // Email and authentication states
  const [email, setEmail] = useState<string>("artist@example.com");
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [showVerificationSent, setShowVerificationSent] =
    useState<boolean>(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(false);

  // Payment receiving states
  const [bankAccountHolder, setBankAccountHolder] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [routingNumber, setRoutingNumber] = useState<string>("");
  const [swiftCode, setSwiftCode] = useState<string>("");
  const [iban, setIban] = useState<string>("");
  const [paypalEmail, setPaypalEmail] = useState<string>("");
  const [bizumPhone, setBizumPhone] = useState<string>("");
  const [mobileMoneyPhone, setMobileMoneyPhone] = useState<string>("");
  const [mobileMoneyProvider, setMobileMoneyProvider] = useState<string>("");
  const [orangeMoneyPhone, setOrangeMoneyPhone] = useState<string>("");
  const [paymentSaved, setPaymentSaved] = useState<boolean>(false);
  const [moodId, setMoodId] = useState("");
  const [brailleUploadError, setBrailleUploadError] = useState<string | null>(
    null
  );
  const [brailleUploadingTrackIndex, setBrailleUploadingTrackIndex] = useState<
    number | null
  >(null);
  const [file, setFile] = useState<File | null>(null);

  const [signLanguageVideoUrl, setSignLanguageVideoUrl] = useState<
    string | null
  >(null);
  const [brailleFileUrl, setBrailleFileUrl] = useState<string | null>(null);

  // Exclusive content states
  const [exclusiveContentType, setExclusiveContentType] =
    useState<string>("music");
  const [exclusiveContentTitle, setExclusiveContentTitle] =
    useState<string>("");
  const [exclusiveContentDescription, setExclusiveContentDescription] =
    useState<string>("");
  const [exclusiveContentFile, setExclusiveContentFile] = useState<File | null>(
    null
  );
  const [uploadedExclusiveContent, setUploadedExclusiveContent] = useState<
    Array<{
      id: string;
      type: string;
      title: string;
      description: string;
      uploadDate: string;
    }>
  >([]);
  const [artwork, setArtwork] = useState<File | null>(null);
  const [miniVideo, setMiniVideo] = useState<File | null>(null);
  const [lyrics, setLyrics] = useState<string>("");
  const [signLanguageVideo, setSignLanguageVideo] = useState<File | null>(null);
  const [brailleFile, setBrailleFile] = useState<File | null>(null);
  const [trackTitle, setTrackTitle] = useState<string>("");
  const [authors, setAuthors] = useState<string>("");
  const [producers, setProducers] = useState<string>("");
  const [lyricists, setLyricists] = useState<string>("");
  const [musiciansVocals, setMusiciansVocals] = useState<string>("");
  const [musiciansPianoKeyboards, setMusiciansPianoKeyboards] =
    useState<string>("");
  const [musiciansWinds, setMusiciansWinds] = useState<string>("");
  const [musiciansPercussion, setMusiciansPercussion] = useState<string>("");
  const [musiciansStrings, setMusiciansStrings] = useState<string>("");
  const [mixingEngineer, setMixingEngineer] = useState<string>("");
  const [masteringEngineer, setMasteringEngineer] = useState<string>("");
  const [trackFilter, setTrackFilter] = useState<string>("all");
  const [trackSearch, setTrackSearch] = useState<string>("");
  const [uploadType, setUploadType] = useState<"single" | "ep" | "album">(
    "single"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [profilePicturePreview, setProfilePicturePreview] =
    useState<string>("");
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [videoIntro, setVideoIntro] = useState<File | null>(null);
  const [videoIntroPreview, setVideoIntroPreview] = useState<string>("");
  const [moods, setMoods] = useState<Mood[] | null>(null);

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

  const [formData, setFormData] = useState<User>({
    name: "",
    surname: "",
    bio: "",
    email: "",
    type: "",
    oldPassword: "",
    videoIntroUrl: "",
    miniVideoLoopUrl: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");

  const [errors, setErrors] = useState<PasswordErrors>(DefaultValue);

  const [miniVideoPreview, setMiniVideoPreview] = useState<string>("");
  const [miniVideoUrl, setMiniVideoUrl] = useState<string>("");

  const handleAudioFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    // On garde le fichier en state
    setFile(file);

    // Preview local : on nettoie l’ancienne URL si besoin
    setAudioPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      // appel backend via ton module media
      const res = await MediaModule.service.uploadAudioFile(formData);

      if (res && (res.fileName || res.url)) {
        // on garde l’URL pour la création du track
        const uploadedAudioUrl = res.url ?? res.fileName;
        setAudioUrl(uploadedAudioUrl);

        setSuccessMessage("Fichier audio uploadé avec succès.");
        setErrorMessage("");
      } else {
        setErrorMessage("Erreur lors de l'upload du fichier audio.");
      }
    } catch (error) {
      console.error("Erreur upload audio :", error);
      setErrorMessage(
        (error as Error).message || "Erreur lors de l'upload du fichier audio."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("FORM DATA : ", formData);
    if (!formData.name) {
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(UserModule.localState.USER_ID);
    if (!userId || !token) return;

    try {
      setIsLoading(true);
      setSuccess(false);
      setErrorMessage("");

      const user = await UserModule.service.getUser(userId);

      // On garde EXACTEMENT ce que renvoie le backend dans formData
      setFormData({
        name: user.data.name,
        surname: user.data.surname,
        email: user.data.email,
        type: user.data.type,
        profileImageUrl: user.data.profileImageUrl, // 👉 URL backend
        bio: user.data.bio,
        artistName: user.data.artistName,
        videoIntroUrl: user.data.videoIntroUrl,
        miniVideoLoopUrl: user.data.miniVideoLoopUrl,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      // 👉 Preview image de profil
      if (user.data.profileImageUrl) {
        const imageObjectUrl = await getImageFile(
          user.data.profileImageUrl,
          token
        );
        setProfilePicturePreview(imageObjectUrl);
      } else {
        setProfilePicturePreview("");
      }

      // 👉 Preview vidéo d'intro
      if (user.data.videoIntroUrl) {
        const videoObjectUrl = await getVideoFile(
          user.data.videoIntroUrl,
          token
        );
        setVideoIntroPreview(videoObjectUrl);
      } else {
        setVideoIntroPreview("");
      }

      // 👉 Preview mini loop vidéo
      if (user.data.miniVideoLoopUrl) {
        const miniVideoObjectUrl = await getVideoFile(
          user.data.miniVideoLoopUrl,
          token
        );
        setMiniVideoPreview(miniVideoObjectUrl);
      } else {
        setMiniVideoPreview("");
      }

      setIsLoading(false);
      setSuccess(true);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage((error as Error).message);
      setIsLoading(false);
      setSuccess(false);
    }
  };

  const [artworkPreview, setArtworkPreview] = useState<string>("");

  const handleArtwork = async (e: ChangeEvent<HTMLInputElement>) => {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const file = e.target.files?.[0];

    if (!file) return;

    setErrorMessage("");
    setSuccess(false);
    setIsLoading(true);

    // On garde le fichier en state
    setArtwork(file);
    // Preview local
    setArtworkPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    try {
      // upload via ton module Media
      const res = await MediaModule.service.uploadImageFile(formData);

      if (res && res.url) {
        // stocker l'URL dans ton form (single / album / ep)
        setFormData((prev: any) => ({
          ...prev,
          coverUrl: res.url, // 👉 adapte le nom: singleCoverUrl / albumCoverUrl...
        }));

        setSuccessMessage("Artwork uploadé avec succès.");
        setSuccess(true);
        setErrorMessage("");
      } else {
        setErrorMessage("Erreur lors de l'upload de l'artwork.");
        setSuccess(false);
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Ajouter un morceau ---
  async function handleAddTrack(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!file || !trackTitle || !moodId) {
      setErrorMessage(
        "Veuillez renseigner le fichier audio, le titre et le mood du morceau."
      );
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      const userId = localStorage.getItem(UserModule.localState.USER_ID);
      if (!userId || !token) {
        setIsLoading(false);
        setErrorMessage("Utilisateur non authentifié.");
        return;
      }

      const audioFile = file;
      const formData = new FormData();

      const duration = await new Promise<number>((resolve, reject) => {
        const audio = document.createElement("audio");
        audio.src = URL.createObjectURL(audioFile);
        audio.preload = "metadata";

        audio.onloadedmetadata = () => {
          const d = audio.duration;
          URL.revokeObjectURL(audio.src);
          resolve(d);
        };

        audio.onerror = () => {
          reject(new Error("Impossible de lire le fichier audio"));
        };
      });

      formData.append("file", audioFile);
      const uploadRes = await MediaModule.service.uploadAudioFile(formData);

      if (!uploadRes || (!uploadRes.fileName && !uploadRes.url)) {
        throw new Error("Réponse d'upload audio invalide.");
      }

      const audioUrl = uploadRes.url ?? uploadRes.fileName;

      const newTrack = {
        title: trackTitle,
        duration,
        moodId,
        userId,
        audioUrl,
        type: "TRACK_SINGLE" as const,
        lyrics: lyrics || "",
        signLanguageVideoUrl: signLanguageVideoUrl || null,
        brailleFileUrl: brailleFileUrl || null,
      };

      await TrackModule.service.createTrack(newTrack, token);

      // ✅ RESET complet, incluant l’URL de preview
      setTrackTitle("");
      setMoodId("");
      setLyrics("");
      setFile(null);

      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
        setAudioPreviewUrl(null);
      }

      setSuccessMessage("Track ajouté avec succès !");
    } catch (error) {
      console.error("Erreur ajout track :", error);
      setErrorMessage(
        (error as Error).message || "Erreur lors de l'ajout du track."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const handleBrailleFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    trackIndex: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // reset erreurs et set loading pour ce track
    setBrailleUploadError(null);
    setBrailleUploadingTrackIndex(trackIndex);

    // On garde le fichier en state pour l'UI (nom, etc.)
    setAlbumTracks((prev) => {
      const copy = [...prev];
      copy[trackIndex] = {
        ...copy[trackIndex],
        brailleFile: file,
      };
      return copy;
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const userId = localStorage.getItem(UserModule.localState.USER_ID);
      // appel backend via ton module Media
      const res = await MediaModule.service.uploadBrailleFile(formData);

      if (res && res.fileName && res.url) {
        // On stocke l'URL Cloudinary dans le track
        setAlbumTracks((prev) => {
          const copy = [...prev];
          copy[trackIndex] = {
            ...copy[trackIndex],
            brailleFile: res.url,
          };
          return copy;
        });
        setBrailleUploadError(null);
        await UserModule.service.updateUser(userId!, {
          videoIntroUrl: res.url,
        });
      } else {
        setBrailleUploadError("Erreur lors de l'upload du fichier braille.");
      }
    } catch (error) {
      console.error("Erreur upload braille :", error);
      setBrailleUploadError(
        (error as Error).message ||
          "Erreur lors de l'upload du fichier braille."
      );
    } finally {
      setBrailleUploadingTrackIndex(null);
    }
  };

  async function fetchMoods() {
    try {
      const token = localStorage.getItem(MoodModule.localState.ACCESS_TOKEN);
      if (!token) return;
      const res = await MoodModule.service.getMoods(token);
      setMoods(res.data);
      console.log("MY MOOD : ", res.data);
    } catch (error) {
      console.error("Erreur récupération des moods :", error);
    }
  }

  useEffect(() => {
    if (!moods) {
      fetchMoods();
    }
  }, []);

  const handleVideoIntro = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem(MediaModule.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(UserModule.localState.USER_ID);

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    // garder le fichier en state
    setVideoIntro(file);

    // preview local
    setVideoIntroPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await MediaModule.service.uploadVideoFile(formData);

      if (res && res.url) {
        // stocker l’URL backend dans ton form
        setFormData((prev: any) => ({
          ...prev,
          videoIntroUrl: res.url,
        }));

        // éventuellement synchro côté backend user
        if (userId && token) {
          await UserModule.service.updateUser(userId, {
            videoIntroUrl: res.url,
          });
        }

        setSuccessMessage("Vidéo de présentation uploadée avec succès.");
      } else {
        setErrorMessage("Erreur lors de l'upload de la vidéo.");
      }
    } catch (error) {
      console.error("Erreur upload vidéo intro :", error);
      setErrorMessage(
        (error as Error).message || "Erreur lors de l'upload de la vidéo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePicture = async (e: ChangeEvent<HTMLInputElement>) => {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
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
          setProfileImageUrl(res.url);
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
        setSuccess(true);
        setIsLoading(false);
        setErrorMessage("");
      } else {
        setErrorMessage("Erreur lors de l'upload de l'image.");
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
      setIsLoading(false);
      setSuccess(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitBio = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem(ModuleObject.localState.USER_ID);
    if (!userId) return;
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
      fetchUser(); // si tu veux re-synchroniser les données
      setSuccessMessage("Profil mis à jour avec succès.");
    } catch (error) {
      setErrorMessage((error as Error).message);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMiniVideo = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    // garder le fichier localement
    setMiniVideo(file);

    // preview local
    setMiniVideoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await MediaModule.service.uploadVideoFile(formData);

      if (res && res.url) {
        // stock prématuré de l'URL cloudinary
        setMiniVideoUrl(res.url);

        // si tu veux aussi le stocker dans un form global :
        setFormData((prev: any) => ({
          ...prev,
          miniVideoUrl: res.url,
        }));

        setSuccessMessage("Mini-video uploadée avec succès.");
      } else {
        setErrorMessage("Erreur lors de l'upload de la mini-video.");
      }
    } catch (error) {
      console.error("Erreur upload mini-video :", error);
      setErrorMessage(
        (error as Error).message || "Erreur lors de l'upload de la mini-video."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem(ModuleObject.localState.USER_ID);
    if (!userId) return;

    const newErrors: PasswordErrors = {};

    // 🔐 1. Ancien mot de passe obligatoire
    if (!formData.oldPassword) {
      newErrors.oldPassword = "Please enter your current password";
    }

    // 🔐 2. Nouveau mot de passe obligatoire + min 8 caractères
    if (!formData.newPassword) {
      newErrors.newPassword = "Please enter your new password";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    }

    // 🔐 3. Confirmation obligatoire
    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    // 👉 on pousse les erreurs dans le state
    setErrors(newErrors);

    // S'il y a au moins une erreur, on stoppe là
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Aucune erreur -> on peut appeler l'API
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
      fetchUser(); // si tu veux re-synchroniser les données
      setSuccessMessage("Profil mis à jour avec succès.");
    } catch (error) {
      setErrorMessage((error as Error).message);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const [albumTracks, setAlbumTracks] = useState<
    Array<{
      file: File | null;
      title: string;
      lyrics: string;
      signLanguageVideo: File | null;
      brailleFile: File | null;

      authors: string;
      producers: string;
      lyricists: string;
      musiciansVocals: string;
      musiciansPianoKeyboards: string;
      musiciansWinds: string;
      musiciansPercussion: string;
      musiciansStrings: string;
      mixingEngineer: string;
      masteringEngineer: string;
    }>
  >([
    {
      file: null,
      title: "",
      lyrics: "",
      signLanguageVideo: null,
      brailleFile: null,
      authors: "",
      producers: "",
      lyricists: "",
      musiciansVocals: "",
      musiciansPianoKeyboards: "",
      musiciansWinds: "",
      musiciansPercussion: "",
      musiciansStrings: "",
      mixingEngineer: "",
      masteringEngineer: "",
    },
  ]);

  const content = {
    spanish: {
      title: "Panel del Artista",
      profile: "Perfil",
      upload: "Subir Música",
      streams: "Reproducciones",
      trackMood: "Estado de ánimo",
      selectMoodPlaceholder: "eleccionar el estado de ánimo",
      subscriptions: "Suscripciones",
      royalties: "Regalías",
      profileTitle: "Tu Perfil de Artista",
      uploadPicture: "Subir Foto de Perfil",
      uploadVideo: "Subir Video de Presentación",
      pictureDragDrop: "Arrastra tu foto aquí o haz clic (JPG, PNG)",
      videoDragDrop: "Arrastra tu video aquí o haz clic (MP4, MOV)",
      bioTitle: "Bio",
      bioPrompt: "Descríbete en unas palabras",
      saveProfile: "Guardar Perfil",
      uploadTitle: "Sube tu música",
      uploadSubtitle: "Formatos soportados: MP3, WAV, FLAC",
      selectType: "Selecciona el tipo",
      typeLabel: "Tipo de lanzamiento",
      single: "Single",
      updateBio: "",
      ep: "EP",
      album: "Álbum",
      dragDrop: "Arrastra y suelta tu archivo aquí o haz clic para seleccionar",
      uploadButton: "Subir Música",
      albumTitle: "Título del Álbum",
      epTitle: "Título del EP",
      addTrack: "Añadir Pista",
      removeTrack: "Eliminar Pista",
      trackNumber: "Pista",
      uploadArtwork: "Subir Art-Work",
      artworkDragDrop: "Arrastra tu portada aquí (JPG, PNG)",
      uploadMiniVideo: "Subir Mini Video Loop",
      miniVideoDragDrop: "Arrastra tu video loop aquí (MP4, MOV)",
      uploadLyrics: "Sube la Letra",
      lyricsPlaceholder: "Escribe o pega la letra de tu canción aquí...",
      signLanguageVideo: "Video en Lenguaje de Signos",
      signLanguageVideoDragDrop:
        "Arrastra tu video en lenguaje de signos (MP4, MOV)",
      brailleFile: "Archivo Braille",
      brailleFileDragDrop: "Arrastra tu archivo Braille (BRF, BRL, TXT)",
      creationInfo: "Información sobre la Creación",
      trackTitle: "Título",
      authors: "Autores",
      producers: "Productores",
      lyricists: "Letristas",
      musicians: "Músicos",
      musiciansVocals: "Voz",
      musiciansPianoKeyboards: "Piano/Teclados",
      musiciansWinds: "Vientos",
      musiciansPercussion: "Percusión",
      musiciansStrings: "Cuerdas",
      mixingEngineer: "Ingeniera de Mezcla",
      masteringEngineer: "Ingeniera de Masterización",
      totalStreams: "Reproducciones Totales",
      monthlyStreams: "Reproducciones Mensuales",
      totalSubscribers: "Suscriptores Totales",
      activeSubscribers: "Suscriptores Activos",
      totalRevenue: "Ingresos Totales",
      subscriptionPricing: "Precio de Suscripción",
      setPriceLabel: "¿Qué precio le pones a tu suscripción?",
      monthly: "Mensual",
      quarterly: "Trimestral",
      annual: "Anual",
      pricePerMonth: "por mes",
      pricePerQuarter: "por trimestre",
      pricePerYear: "por año",
      savePrice: "Guardar Precios",
      exclusiveContent: "Material Exclusivo para Suscriptores",
      uploadExclusiveContent: "Subir Contenido Exclusivo",
      contentType: "Tipo de Contenido",
      selectContentType: "Selecciona el tipo",
      music: "Música",
      video: "Video",
      photo: "Foto",
      document: "Documento",
      contentTitle: "Título del contenido",
      contentDescription: "Descripción",
      uploadFile: "Subir Archivo",
      uploadedContent: "Contenido Subido",
      noContent: "Aún no has subido contenido exclusivo",
      totalRoyalties: "Regalías Totales",
      thisMonth: "Este Mes",
      back: "Volver",
      continueToStreaming: "Continuar a la Plataforma de Streaming",
      tracks: "Pistas",
      listeners: "Oyentes",
      revenue: "Ingresos",
      byLocation: "Por Ubicación",
      topTracks: "Mejores Pistas",
      streamsPerTrack: "Reproducciones por Pista",
      locationPerTrack: "Ubicación por Pista",
      filterByType: "Filtrar por Tipo",
      all: "Todas",
      searchTrack: "Buscar pista, EP o álbum...",
      recentSubscribers: "Suscriptores Recientes",
      accountSecurity: "Seguridad de la Cuenta",
      email: "Correo Electrónico",
      emailVerified: "Verificado",
      emailNotVerified: "No verificado",
      verifyEmail: "Verificar Correo",
      resendVerification: "Reenviar Verificación",
      verificationSent:
        "¡Correo de verificación enviado! Revisa tu bandeja de entrada.",
      twoFactorAuth: "Autenticación de Dos Factores",
      twoFactorEnabled: "Activado",
      twoFactorDisabled: "Desactivado",
      enableTwoFactor: "Activar 2FA",
      disableTwoFactor: "Desactivar 2FA",
      changePassword: "Cambiar Contraseña",
      currentPassword: "Contraseña Actual",
      newPassword: "Nueva Contraseña",
      confirmPassword: "Confirmar Contraseña",
      updatePassword: "Actualizar Contraseña",
      paymentSettings: "Configuración de Pago",
      receivePayments: "Recibir Pagos",
      paymentMethodsTitle: "Métodos de Pago para Recibir Regalías",
      bankAccount: "Cuenta Bancaria",
      accountHolderName: "Nombre del Titular",
      bankNameLabel: "Nombre del Banco",
      accountNumberLabel: "Número de Cuenta",
      routingNumberLabel: "Número de Ruta (Routing)",
      swiftCodeLabel: "Código SWIFT/BIC",
      ibanLabel: "IBAN",
      paypalEmailLabel: "Correo de PayPal",
      bizumPhoneLabel: "Número de Teléfono Bizum",
      mobileMoneyPhoneLabel: "Número de Teléfono Mobile Money",
      mobileMoneyProviderLabel: "Proveedor de Mobile Money",
      orangeMoneyPhoneLabel: "Número de Teléfono Orange Money",
      savePaymentDetails: "Guardar Detalles de Pago",
      paymentDetailsSaved: "¡Detalles de pago guardados exitosamente!",
      selectProvider: "--Seleccionar proveedor--",
    },
    english: {
      title: "Artist Dashboard",
      profile: "Profile",
      upload: "Upload Music",
      streams: "Streams",
      subscriptions: "Subscriptions",
      royalties: "Royalties",
      trackMood: "Mood",
      selectMoodPlaceholder: "Select the mood",
      profileTitle: "Your Artist Profile",
      uploadPicture: "Upload Profile Picture",
      uploadVideo: "Upload Video Introduction",
      pictureDragDrop: "Drag your photo here or click (JPG, PNG)",
      videoDragDrop: "Drag your video here or click (MP4, MOV)",
      bioTitle: "Bio",
      bioPrompt: "Describe yourself in a few words",
      saveProfile: "Save Profile",
      uploadTitle: "Upload your music",
      uploadSubtitle: "Supported formats: MP3, WAV, FLAC",
      selectType: "Select type",
      typeLabel: "Release type",
      single: "Single",
      updateBio: "Update your biography",
      ep: "EP",
      album: "Album",
      dragDrop: "Drag and drop your file here or click to select",
      uploadButton: "Upload Music",
      albumTitle: "Album Title",
      epTitle: "EP Title",
      addTrack: "Add Track",
      removeTrack: "Remove Track",
      trackNumber: "Track",
      uploadArtwork: "Upload Art-Work",
      artworkDragDrop: "Drag your artwork here (JPG, PNG)",
      uploadMiniVideo: "Upload Mini Video Loop",
      miniVideoDragDrop: "Drag your video loop here (MP4, MOV)",
      uploadLyrics: "Upload Lyrics",
      lyricsPlaceholder: "Write or paste your song lyrics here...",
      signLanguageVideo: "Sign Language Video",
      signLanguageVideoDragDrop:
        "Drag your sign language video here (MP4, MOV)",
      brailleFile: "Braille File",
      brailleFileDragDrop: "Drag your Braille file here (BRF, BRL, TXT)",
      creationInfo: "Creation Information",
      trackTitle: "Title",
      authors: "Authors",
      producers: "Producers",
      lyricists: "Lyricists",
      musicians: "Musicians",
      musiciansVocals: "Vocals",
      musiciansPianoKeyboards: "Piano/Keyboards",
      musiciansWinds: "Winds",
      musiciansPercussion: "Percussion",
      musiciansStrings: "Strings",
      mixingEngineer: "Mixing Eng.",
      masteringEngineer: "Mastering Eng.",
      totalStreams: "Total Streams",
      monthlyStreams: "Monthly Streams",
      totalSubscribers: "Total Subscribers",
      activeSubscribers: "Active Subscribers",
      totalRevenue: "Total Revenue",
      subscriptionPricing: "Subscription Pricing",
      setPriceLabel: "What price do you set for your subscription?",
      monthly: "Monthly",
      quarterly: "Quarterly",
      annual: "Annual",
      pricePerMonth: "per month",
      pricePerQuarter: "per quarter",
      pricePerYear: "per year",
      savePrice: "Save Prices",
      exclusiveContent: "Exclusive Content for Subscribers",
      uploadExclusiveContent: "Upload Exclusive Content",
      contentType: "Content Type",
      selectContentType: "Select type",
      music: "Music",
      video: "Video",
      photo: "Photo",
      document: "Document",
      contentTitle: "Content title",
      contentDescription: "Description",
      uploadFile: "Upload File",
      uploadedContent: "Uploaded Content",
      noContent: "You haven't uploaded exclusive content yet",
      totalRoyalties: "Total Royalties",
      thisMonth: "This Month",
      back: "Back",
      continueToStreaming: "Continue to Streaming Platform",
      tracks: "Tracks",
      listeners: "Listeners",
      revenue: "Revenue",
      byLocation: "By Location",
      topTracks: "Top Tracks",
      streamsPerTrack: "Streams per Track",
      locationPerTrack: "Location per Track",
      filterByType: "Filter by Type",
      all: "All",
      searchTrack: "Search track, EP or album...",
      recentSubscribers: "Recent Subscribers",
      accountSecurity: "Account Security",
      email: "Email Address",
      emailVerified: "Verified",
      emailNotVerified: "Not verified",
      verifyEmail: "Verify Email",
      resendVerification: "Resend Verification",
      verificationSent: "Verification email sent! Check your inbox.",
      twoFactorAuth: "Two-Factor Authentication",
      twoFactorEnabled: "Enabled",
      twoFactorDisabled: "Disabled",
      enableTwoFactor: "Enable 2FA",
      disableTwoFactor: "Disable 2FA",
      changePassword: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      updatePassword: "Update Password",
      paymentSettings: "Payment Settings",
      receivePayments: "Receive Payments",
      paymentMethodsTitle: "Payment Methods to Receive Royalties",
      bankAccount: "Bank Account",
      accountHolderName: "Account Holder Name",
      bankNameLabel: "Bank Name",
      accountNumberLabel: "Account Number",
      routingNumberLabel: "Routing Number",
      swiftCodeLabel: "SWIFT/BIC Code",
      ibanLabel: "IBAN",
      paypalEmailLabel: "PayPal Email",
      bizumPhoneLabel: "Bizum Phone Number",
      mobileMoneyPhoneLabel: "Mobile Money Phone Number",
      mobileMoneyProviderLabel: "Mobile Money Provider",
      orangeMoneyPhoneLabel: "Orange Money Phone Number",
      savePaymentDetails: "Save Payment Details",
      paymentDetailsSaved: "Payment details saved successfully!",
      selectProvider: "--Select provider--",
    },
    catalan: {
      title: "Panell de l'Artista",
      profile: "Perfil",
      upload: "Pujar Música",
      streams: "Reproduccions",
      subscriptions: "Subscripcions",
      royalties: "Regalies",
      profileTitle: "El teu Perfil d'Artista",
      uploadPicture: "Pujar Foto de Perfil",
      uploadVideo: "Pujar Video de Presentació",
      pictureDragDrop: "Arrossega la teva foto aquí o fes clic (JPG, PNG)",
      videoDragDrop: "Arrossega el teu video aquí o fes clic (MP4, MOV)",
      bioTitle: "Bio",
      trackMood: "Estat d’ànim",
      selectMoodPlaceholder: "Seleccionar l’estat d’ànim",
      bioPrompt: "Descriu-te en unes paraules",
      saveProfile: "Guardar Perfil",
      uploadTitle: "Puja la teva música",
      uploadSubtitle: "Formats suportats: MP3, WAV, FLAC",
      selectType: "Selecciona el tipus",
      typeLabel: "Tipus de llançament",
      single: "Single",
      ep: "EP",
      album: "Àlbum",
      updateBio: "",
      dragDrop:
        "Arrossega i deixa anar el teu fitxer aquí o fes clic per seleccionar",
      uploadButton: "Pujar Música",
      albumTitle: "Títol de l'Àlbum",
      epTitle: "Títol de l'EP",
      addTrack: "Afegir Pista",
      removeTrack: "Eliminar Pista",
      trackNumber: "Pista",
      uploadArtwork: "Pujar Art-Work",
      artworkDragDrop: "Arrossega la teva portada aquí (JPG, PNG)",
      uploadMiniVideo: "Pujar Mini Video Loop",
      miniVideoDragDrop: "Arrossega el teu video loop aquí (MP4, MOV)",
      uploadLyrics: "Puja la Lletra",
      lyricsPlaceholder: "Escriu o enganxa la lletra de la teva cançó aquí...",
      signLanguageVideo: "Vídeo en Llenguatge de Signes",
      signLanguageVideoDragDrop:
        "Arrossega el teu vídeo en llenguatge de signes (MP4, MOV)",
      brailleFile: "Arxiu Braille",
      brailleFileDragDrop: "Arrossega el teu arxiu Braille (BRF, BRL, TXT)",
      creationInfo: "Informació sobre la Creació",
      trackTitle: "Títol",
      authors: "Autors",
      producers: "Productors",
      lyricists: "Lletristes",
      musicians: "Músics",
      musiciansVocals: "Veu",
      musiciansPianoKeyboards: "Piano/Teclats",
      musiciansWinds: "Vents",
      musiciansPercussion: "Percussió",
      musiciansStrings: "Cordes",
      mixingEngineer: "Enginyer de Mescla",
      masteringEngineer: "Enginyer de Masterització",
      totalStreams: "Reproduccions Totals",
      monthlyStreams: "Reproduccions Mensuals",
      totalSubscribers: "Subscriptors Totals",
      activeSubscribers: "Subscriptors Actius",
      totalRevenue: "Ingressos Totals",
      subscriptionPricing: "Preu de Subscripció",
      setPriceLabel: "Quin preu li poses a la teva subscripció?",
      monthly: "Mensual",
      quarterly: "Trimestral",
      annual: "Anual",
      pricePerMonth: "per mes",
      pricePerQuarter: "per trimestre",
      pricePerYear: "per any",
      savePrice: "Guardar Preus",
      exclusiveContent: "Material Exclusiu per a Subscriptors",
      uploadExclusiveContent: "Pujar Contingut Exclusiu",
      contentType: "Tipus de Contingut",
      selectContentType: "Selecciona el tipus",
      music: "Música",
      video: "Vídeo",
      photo: "Foto",
      document: "Document",
      contentTitle: "Títol del contingut",
      contentDescription: "Descripció",
      uploadFile: "Pujar Arxiu",
      uploadedContent: "Contingut Pujat",
      noContent: "Encara no has pujat contingut exclusiu",
      totalRoyalties: "Regalies Totals",
      thisMonth: "Aquest Mes",
      back: "Tornar",
      continueToStreaming: "Continuar a la Plataforma de Streaming",
      tracks: "Pistes",
      listeners: "Oients",
      revenue: "Ingressos",
      byLocation: "Per Ubicació",
      topTracks: "Millors Pistes",
      streamsPerTrack: "Reproduccions per Pista",
      locationPerTrack: "Ubicació per Pista",
      filterByType: "Filtrar per Tipus",
      all: "Totes",
      searchTrack: "Cercar pista, EP o àlbum...",
      recentSubscribers: "Subscriptors Recents",
      accountSecurity: "Seguretat del Compte",
      email: "Correu Electrònic",
      emailVerified: "Verificat",
      emailNotVerified: "No verificat",
      verifyEmail: "Verificar Correu",
      resendVerification: "Reenviar Verificació",
      verificationSent:
        "Correu de verificació enviat! Revisa la teva safata d'entrada.",
      twoFactorAuth: "Autenticació de Dos Factors",
      twoFactorEnabled: "Activat",
      twoFactorDisabled: "Desactivat",
      enableTwoFactor: "Activar 2FA",
      disableTwoFactor: "Desactivar 2FA",
      changePassword: "Canviar Contrasenya",
      currentPassword: "Contrasenya Actual",
      newPassword: "Nova Contrasenya",
      confirmPassword: "Confirmar Contrasenya",
      updatePassword: "Actualitzar Contrasenya",
      paymentSettings: "Configuració de Pagament",
      receivePayments: "Rebre Pagaments",
      paymentMethodsTitle: "Mètodes de Pagament per Rebre Regalies",
      bankAccount: "Compte Bancari",
      accountHolderName: "Nom del Titular",
      bankNameLabel: "Nom del Banc",
      accountNumberLabel: "Número de Compte",
      routingNumberLabel: "Número de Ruta (Routing)",
      swiftCodeLabel: "Codi SWIFT/BIC",
      ibanLabel: "IBAN",
      paypalEmailLabel: "Correu de PayPal",
      bizumPhoneLabel: "Número de Telèfon Bizum",
      mobileMoneyPhoneLabel: "Número de Telèfon Mobile Money",
      mobileMoneyProviderLabel: "Proveïdor de Mobile Money",
      orangeMoneyPhoneLabel: "Número de Telèfon Orange Money",
      savePaymentDetails: "Guardar Detalls de Pagament",
      paymentDetailsSaved: "Detalls de pagament guardats amb èxit!",
      selectProvider: "--Seleccionar proveïdor--",
    },
  };

  const text = content[language as keyof typeof content];

  // Calculate quarterly and annual prices based on monthly
  const calculateQuarterlyPrice = () => {
    if (!monthlyPrice) return "";
    const monthly = parseFloat(monthlyPrice);
    if (isNaN(monthly)) return "";
    return (monthly * 4).toFixed(2);
  };

  const calculateAnnualPrice = () => {
    if (!monthlyPrice) return "";
    const monthly = parseFloat(monthlyPrice);
    if (isNaN(monthly)) return "";
    return (monthly * 12).toFixed(2);
  };

  const quarterlyPrice = calculateQuarterlyPrice();
  const annualPrice = calculateAnnualPrice();

  // Mock data
  const mockStreams = {
    total: "2,547,893",
    monthly: "145,672",
    tracks: 24,
    listeners: "89,234",
  };

  const mockSubscriptions = {
    total: "12,456",
    active: "11,892",
    growth: "+8.3%",
  };

  const mockRoyalties = {
    total: "$45,678.90",
    thisMonth: "$3,245.50",
    pending: "$892.30",
  };

  const mockTracks = [
    { name: "Summer Vibes", streams: "345,678", revenue: "$1,234" },
    { name: "Midnight Dreams", streams: "298,543", revenue: "$1,087" },
    { name: "Electric Soul", streams: "234,890", revenue: "$856" },
    { name: "Ocean Waves", streams: "187,654", revenue: "$678" },
  ];

  const mockTracksWithLocations = [
    {
      name: "Summer Vibes",
      type: "single",
      totalStreams: "345,678",
      topLocations: [
        { location: "United States", streams: "87,456", percentage: "25.3%" },
        { location: "Spain", streams: "65,234", percentage: "18.9%" },
        { location: "Mexico", streams: "52,345", percentage: "15.1%" },
        { location: "Brazil", streams: "43,567", percentage: "12.6%" },
        { location: "United Kingdom", streams: "34,567", percentage: "10.0%" },
      ],
    },
    {
      name: "Midnight Dreams",
      type: "album",
      totalStreams: "298,543",
      topLocations: [
        { location: "France", streams: "68,765", percentage: "23.0%" },
        { location: "United States", streams: "59,876", percentage: "20.0%" },
        { location: "Germany", streams: "47,234", percentage: "15.8%" },
        { location: "Italy", streams: "38,543", percentage: "12.9%" },
        { location: "Spain", streams: "29,854", percentage: "10.0%" },
      ],
    },
    {
      name: "Electric Soul",
      type: "single",
      totalStreams: "234,890",
      topLocations: [
        { location: "United Kingdom", streams: "56,234", percentage: "23.9%" },
        { location: "Australia", streams: "42,345", percentage: "18.0%" },
        { location: "Canada", streams: "35,432", percentage: "15.1%" },
        { location: "United States", streams: "28,234", percentage: "12.0%" },
        { location: "Japan", streams: "23,489", percentage: "10.0%" },
      ],
    },
    {
      name: "Ocean Waves",
      type: "album",
      totalStreams: "187,654",
      topLocations: [
        { location: "Mexico", streams: "48,765", percentage: "26.0%" },
        { location: "Argentina", streams: "39,234", percentage: "20.9%" },
        { location: "Colombia", streams: "28,654", percentage: "15.3%" },
        { location: "Spain", streams: "22,543", percentage: "12.0%" },
        { location: "Brazil", streams: "18,765", percentage: "10.0%" },
      ],
    },
    {
      name: "Neon Lights",
      type: "single",
      totalStreams: "156,432",
      topLocations: [
        { location: "Japan", streams: "39,108", percentage: "25.0%" },
        { location: "United States", streams: "31,286", percentage: "20.0%" },
        { location: "United Kingdom", streams: "23,465", percentage: "15.0%" },
        { location: "Germany", streams: "18,772", percentage: "12.0%" },
        { location: "France", streams: "15,643", percentage: "10.0%" },
      ],
    },
    {
      name: "Cosmic Journey EP",
      type: "ep",
      totalStreams: "198,765",
      topLocations: [
        { location: "Netherlands", streams: "49,691", percentage: "25.0%" },
        { location: "Belgium", streams: "39,753", percentage: "20.0%" },
        { location: "Germany", streams: "29,815", percentage: "15.0%" },
        { location: "France", streams: "23,852", percentage: "12.0%" },
        { location: "United Kingdom", streams: "19,877", percentage: "10.0%" },
      ],
    },
    {
      name: "Urban Stories",
      type: "album",
      totalStreams: "423,876",
      topLocations: [
        { location: "United States", streams: "127,163", percentage: "30.0%" },
        { location: "Spain", streams: "84,775", percentage: "20.0%" },
        { location: "Mexico", streams: "63,581", percentage: "15.0%" },
        { location: "Argentina", streams: "50,865", percentage: "12.0%" },
        { location: "Colombia", streams: "42,388", percentage: "10.0%" },
      ],
    },
    {
      name: "Sunset Boulevard",
      type: "single",
      totalStreams: "276,543",
      topLocations: [
        { location: "Spain", streams: "69,136", percentage: "25.0%" },
        { location: "France", streams: "55,309", percentage: "20.0%" },
        { location: "Italy", streams: "41,481", percentage: "15.0%" },
        { location: "United States", streams: "33,185", percentage: "12.0%" },
        { location: "Brazil", streams: "27,654", percentage: "10.0%" },
      ],
    },
    {
      name: "Midnight Sessions EP",
      type: "ep",
      totalStreams: "134,567",
      topLocations: [
        { location: "United Kingdom", streams: "33,642", percentage: "25.0%" },
        { location: "Australia", streams: "26,913", percentage: "20.0%" },
        { location: "Canada", streams: "20,185", percentage: "15.0%" },
        { location: "United States", streams: "16,148", percentage: "12.0%" },
        { location: "Ireland", streams: "13,457", percentage: "10.0%" },
      ],
    },
    {
      name: "Echoes of Tomorrow",
      type: "album",
      totalStreams: "312,987",
      topLocations: [
        { location: "Germany", streams: "78,247", percentage: "25.0%" },
        { location: "United Kingdom", streams: "62,597", percentage: "20.0%" },
        { location: "France", streams: "46,948", percentage: "15.0%" },
        { location: "Netherlands", streams: "37,558", percentage: "12.0%" },
        { location: "Belgium", streams: "31,299", percentage: "10.0%" },
      ],
    },
  ];

  const filteredTracks = mockTracksWithLocations
    .filter((track) => trackFilter === "all" || track.type === trackFilter)
    .filter((track) =>
      track.name.toLowerCase().includes(trackSearch.toLowerCase())
    );

  const mockStreamsByLocation = [
    { location: "United States", streams: "487,234", percentage: "19.1%" },
    { location: "Spain", streams: "398,567", percentage: "15.6%" },
    { location: "Mexico", streams: "356,789", percentage: "14.0%" },
    { location: "United Kingdom", streams: "289,456", percentage: "11.4%" },
    { location: "France", streams: "178,234", percentage: "7.0%" },
    { location: "Germany", streams: "165,432", percentage: "6.5%" },
    { location: "Brazil", streams: "145,678", percentage: "5.7%" },
    { location: "Argentina", streams: "132,456", percentage: "5.2%" },
    { location: "Italy", streams: "112,345", percentage: "4.4%" },
    { location: "Canada", streams: "98,765", percentage: "3.9%" },
    { location: "Colombia", streams: "87,654", percentage: "3.4%" },
    { location: "Japan", streams: "56,432", percentage: "2.2%" },
    { location: "Australia", streams: "38,851", percentage: "1.5%" },
  ];

  const mockSubscriptionsByLocation = [
    { location: "United States", subscribers: "2,345", percentage: "18.8%" },
    { location: "Spain", subscribers: "1,987", percentage: "15.9%" },
    { location: "Mexico", subscribers: "1,756", percentage: "14.1%" },
    { location: "United Kingdom", subscribers: "1,432", percentage: "11.5%" },
    { location: "France", subscribers: "892", percentage: "7.2%" },
    { location: "Germany", subscribers: "823", percentage: "6.6%" },
    { location: "Brazil", subscribers: "734", percentage: "5.9%" },
    { location: "Argentina", subscribers: "678", percentage: "5.4%" },
    { location: "Italy", subscribers: "567", percentage: "4.5%" },
    { location: "Canada", subscribers: "489", percentage: "3.9%" },
    { location: "Colombia", subscribers: "432", percentage: "3.5%" },
    { location: "Japan", subscribers: "234", percentage: "1.9%" },
    { location: "Australia", subscribers: "87", percentage: "0.7%" },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };
  const [isArtist, setIsArtist] = useState(false);

  const handleUpload = () => {
    if (uploadedFile) {
      alert(`Uploading: ${uploadedFile.name}`);
      setUploadedFile(null);
    }
  };
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem(ModuleObject.localState.ACCESS_TOKEN);
    localStorage.removeItem(ModuleObject.localState.USER_ID);
    localStorage.removeItem(ModuleObject.localState.USER_DATA);
    localStorage.removeItem(ModuleObject.localState.USER_ROLE);
    router.push("/home");
  };
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedRole = localStorage.getItem(ModuleObject.localState.USER_ROLE);
    // Tu avais fait: JSON.stringify(res1.data.type), donc ça ressemble à '"artist"'
    let role: string | null = null;
    try {
      // Si c'est du JSON stringify, on parse
      role = storedRole ? JSON.parse(storedRole) : null;
    } catch {
      // Si ce n’est pas du JSON, on le prend brut
      role = storedRole;
    }
    if (role === "artist") {
      setIsArtist(true);
    } else {
      setIsArtist(false);
    }
  }, []);

  return (
    <div className="w-full h-full min-h-screen overflow-y-auto p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-black">
      {isArtist && (
        <button
          onClick={() => router.push("/dashboard/artist/select")}
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
          {text.back}
        </button>
      )}
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl text-white drop-shadow-lg">{text.title}</h1>

          {onGoToStreaming && (
            <button
              onClick={onGoToStreaming}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 backdrop-blur-md border-2 border-white/40 rounded-xl text-white hover:from-blue-500/50 hover:to-cyan-500/50 hover:border-white/60 transition-all shadow-lg"
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
                <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
              </svg>
              {language === "spanish" && "Ir a Plataforma de Streaming"}
              {language === "english" && "Go to Streaming Platform"}
              {language === "catalan" && "Anar a Plataforma d'Streaming"}
            </button>
          )}

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gradient-to-r cursor-pointer from-red-500/40 to-orange-500/40 
    backdrop-blur-md border border-white/30 rounded-lg text-white
    hover:from-red-500/60 hover:to-orange-500/60 transition-all flex items-center gap-2"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>

            {language === "spanish" && "Cerrar sesión"}
            {language === "english" && "Logout"}
            {language === "catalan" && "Tancar sessió"}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6 overflow-x-auto pb-1">
          {[
            { id: "profile", label: text.profile, icon: Users },
            { id: "upload", label: text.upload, icon: Upload },
            { id: "streams", label: text.streams, icon: TrendingUp },
            { id: "subscriptions", label: text.subscriptions, icon: Users },
            { id: "royalties", label: text.royalties, icon: DollarSign },
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
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <h2 className="text-2xl text-white drop-shadow-lg mb-6">
              {text.profileTitle}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Profile Picture Upload */}
              <div>
                <h3 className="text-xl text-white drop-shadow mb-4">
                  {text.uploadPicture}
                </h3>

                {profilePicturePreview ? (
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border-2 border-white/20">
                    <img
                      src={profilePicturePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setProfilePicture(null);
                        setProfilePicturePreview("");
                        setFormData((prev: any) => ({
                          ...prev,
                          profileImageUrl: "",
                        }));
                      }}
                      className="absolute cursor-pointer top-2 right-2 bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600/80 transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-white/30 rounded-xl p-12 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer aspect-square flex items-center justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicture}
                      className="hidden"
                      id="picture-upload"
                    />
                    <label
                      htmlFor="picture-upload"
                      className="cursor-pointer text-center"
                    >
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mx-auto mb-4 text-white/60"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <p className="text-white drop-shadow">
                        {text.pictureDragDrop}
                      </p>
                    </label>
                  </div>
                )}
              </div>

              {/* Video Introduction Upload */}
              <div>
                <h3 className="text-xl text-white drop-shadow mb-4">
                  {text.uploadVideo}
                </h3>

                {videoIntroPreview ? (
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-black border-2 border-white/20">
                    <video
                      src={videoIntroPreview || formData.videoIntroUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setVideoIntro(null);
                        setVideoIntroPreview("");
                        // si tu stockes l’URL dans un form user:
                        setFormData((prev: any) => ({
                          ...prev,
                          videoIntroUrl: "",
                        }));
                      }}
                      className="absolute top-2 right-2 bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600/80 transition-all"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-white/30 rounded-xl p-12 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer aspect-square flex items-center justify-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoIntro}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="cursor-pointer text-center"
                    >
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mx-auto mb-4 text-white/60"
                      >
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect
                          x="1"
                          y="5"
                          width="15"
                          height="14"
                          rx="2"
                          ry="2"
                        />
                      </svg>
                      <p className="text-white drop-shadow">
                        {text.videoDragDrop}
                      </p>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-8">
              <h3 className="text-xl text-white drop-shadow mb-4">
                {text.bioTitle}
              </h3>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <form onSubmit={handleSubmitBio} className="space-y-6">
                  <label className="block text-white/80 drop-shadow mb-3 text-sm">
                    {text.bioPrompt}
                  </label>

                  <textarea
                    rows={4}
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    name="bio"
                    value={formData.bio}
                    maxLength={300}
                    placeholder={text.bioPrompt}
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg 
           text-black placeholder:text-white/40 focus:outline-none 
           focus:border-white/40 transition-all text-xl resize-none"
                  />

                  {bioOneWord && (
                    <p className="text-white/60 text-sm mt-2 text-center">
                      {bioOneWord.length}/50
                    </p>
                  )}
                  {successMessage && <CustomSuccess message={successMessage} />}

                  {errorMessage && <CustomAlert message={errorMessage} />}

                  {/* Bouton pour valider le form */}
                  <button
                    type="submit"
                    className="mt-4 cursor-pointer w-full py-3 px-4 bg-white/20 backdrop-blur-md 
                 border border-white/30 rounded-lg text-white drop-shadow 
                 hover:bg-white/30 transition-all"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>{text.updateBio}...</span>
                      </div>
                    ) : (
                      text.updateBio
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Account Security Section */}
            <div className="mt-8">
              <h3 className="text-xl text-white drop-shadow mb-4">
                {text.accountSecurity}
              </h3>

              {/* Change Password */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="text-white drop-shadow mb-4">
                  {text.changePassword}
                </h4>
                <div className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-white/80 drop-shadow mb-2 text-sm">
                        {text.currentPassword}
                      </label>
                      <input
                        name="oldPassword"
                        type="password"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                      {errors.oldPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.oldPassword}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white/80 drop-shadow mb-2 text-sm">
                        {text.newPassword}
                      </label>
                      <input
                        name="newPassword"
                        type="password" // 🟢 corrigé
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                      {errors.newPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.newPassword}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-white/80 drop-shadow mb-2 text-sm">
                        {text.confirmPassword}
                      </label>
                      <input
                        name="confirmNewPassword"
                        type="password" // 🟢 corrigé aussi
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                      {errors.confirmNewPassword && (
                        <p className="text-red-500 text-sm">
                          {errors.confirmNewPassword}
                        </p>
                      )}
                    </div>

                    {successMessage && (
                      <CustomSuccess message={successMessage} />
                    )}

                    {errorMessage && <CustomAlert message={errorMessage} />}

                    <button
                      type="submit"
                      className="cursor-pointer w-full py-3 px-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white drop-shadow hover:bg-white/30 transition-all"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>{text.updatePassword}...</span>
                        </div>
                      ) : (
                        text.updatePassword
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Save Button */}
            {(profilePicture || videoIntro || bioOneWord) && (
              <button
                onClick={() => {
                  alert("Profile saved successfully!");
                }}
                className="mt-8 w-full py-4 px-6 bg-white/30 backdrop-blur-md border border-white/40 rounded-lg text-white drop-shadow hover:bg-white/40 transition-all flex items-center justify-center gap-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {text.saveProfile}
              </button>
            )}
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === "upload" && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 space-y-8">
            <div>
              <h2 className="text-2xl text-white drop-shadow-lg mb-2">
                {text.uploadTitle}
              </h2>
              <p className="text-white/80 drop-shadow mb-6">
                {text.uploadSubtitle}
              </p>

              {/* Type Selection */}
              <div className="mb-6">
                <label className="block text-white/90 drop-shadow mb-3">
                  {text.typeLabel}
                </label>

                {/* 1 colonne sur mobile, 3 colonnes à partir de sm */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <button
                    onClick={() => setUploadType("single")}
                    className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg border-2 text-sm sm:text-base transition-all ${
                      uploadType === "single"
                        ? "bg-white/30 border-white/60 text-white"
                        : "bg-white/10 border-white/20 text-white/70 hover:bg-white/15"
                    }`}
                  >
                    {text.single}
                  </button>

                  <button
                    onClick={() => setUploadType("ep")}
                    className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg border-2 text-sm sm:text-base transition-all ${
                      uploadType === "ep"
                        ? "bg-white/30 border-white/60 text-white"
                        : "bg-white/10 border-white/20 text-white/70 hover:bg-white/15"
                    }`}
                  >
                    {text.ep}
                  </button>

                  <button
                    onClick={() => setUploadType("album")}
                    className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg border-2 text-sm sm:text-base transition-all ${
                      uploadType === "album"
                        ? "bg-white/30 border-white/60 text-white"
                        : "bg-white/10 border-white/20 text-white/70 hover:bg-white/15"
                    }`}
                  >
                    {text.album}
                  </button>
                </div>
              </div>

              {uploadType === "single" ? (
                // Single Upload
                <div className="border-2 border-dashed border-white/30 rounded-xl p-12 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Music size={48} className="mx-auto mb-4 text-white/60" />
                    <p className="text-white drop-shadow mb-2">
                      {uploadedFile ? uploadedFile.name : text.dragDrop}
                    </p>
                  </label>
                  {audioPreviewUrl && (
                    <div className="mt-4">
                      <audio controls src={audioPreviewUrl} className="w-full">
                        Votre navigateur ne supporte pas l’élément audio.
                      </audio>
                    </div>
                  )}
                </div>
              ) : (
                // Album/EP Title
                <div className="mb-6">
                  <label className="block text-white/90 drop-shadow mb-2">
                    {uploadType === "ep" ? text.epTitle : text.albumTitle}
                  </label>
                  <input
                    type="text"
                    value={trackTitle}
                    onChange={(e) => setTrackTitle(e.target.value)}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                  />
                </div>
              )}
            </div>

            {/* Album/EP Tracks */}
            {(uploadType === "album" || uploadType === "ep") && (
              <div className="space-y-6">
                {albumTracks.map((track, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 space-y-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl text-white drop-shadow">
                        {text.trackNumber} {index + 1}
                      </h3>
                      {albumTracks.length > 1 && (
                        <button
                          onClick={() => {
                            const newTracks = albumTracks.filter(
                              (_, i) => i !== index
                            );
                            setAlbumTracks(newTracks);
                          }}
                          className="px-4 py-2 bg-red-500/80 backdrop-blur-sm text-white rounded-lg hover:bg-red-600/80 transition-all flex items-center gap-2"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                          {text.removeTrack}
                        </button>
                      )}
                    </div>

                    {/* Track Upload */}
                    <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const newTracks = [...albumTracks];
                            newTracks[index].file = file;
                            setAlbumTracks(newTracks);
                          }
                        }}
                        className="hidden"
                        id={`track-upload-${index}`}
                      />
                      <label
                        htmlFor={`track-upload-${index}`}
                        className="cursor-pointer"
                      >
                        <Music
                          size={32}
                          className="mx-auto mb-3 text-white/60"
                        />

                        <p className="text-white drop-shadow text-sm">
                          {track.file ? track.file.name : text.dragDrop}
                        </p>
                      </label>
                    </div>

                    {/* Track Title */}
                    <div>
                      <label className="block text-white/90 drop-shadow mb-2 text-sm">
                        {text.trackTitle}
                      </label>
                      <input
                        type="text"
                        value={track.title}
                        onChange={(e) => {
                          const newTracks = [...albumTracks];
                          newTracks[index].title = e.target.value;
                          setAlbumTracks(newTracks);
                        }}
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>

                    {/* Track Lyrics */}
                    <div>
                      <label className="block text-white/90 drop-shadow mb-2 text-sm">
                        {text.uploadLyrics}
                      </label>
                      <textarea
                        value={track.lyrics}
                        onChange={(e) => {
                          const newTracks = [...albumTracks];
                          newTracks[index].lyrics = e.target.value;
                          setAlbumTracks(newTracks);
                        }}
                        placeholder={text.lyricsPlaceholder}
                        className="w-full h-24 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all resize-none text-sm"
                      />
                      <div className="mt-3">
                        <label className="block text-white/80 drop-shadow mb-1 text-xs">
                          {text.trackMood}
                        </label>

                        <select
                          value={moodId}
                          onChange={(e) => setMoodId(e.target.value)}
                          className="w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg 
                 text-black text-sm focus:outline-none focus:border-white/40 transition-all"
                        >
                          <option value="">
                            -- {text.selectMoodPlaceholder} --
                          </option>

                          {moods &&
                            moods.map((mood) => (
                              <option key={mood.id} value={mood.id}>
                                {mood.name}
                              </option>
                            ))}
                        </select>
                      </div>

                      {/* Accessibility Options for Track */}
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        {/* Sign Language Video */}
                        <div>
                          <label className="block text-white/80 drop-shadow mb-1 text-xs">
                            {text.signLanguageVideo}
                          </label>
                          {track.signLanguageVideo ? (
                            <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-white/20">
                              <video
                                src={URL.createObjectURL(
                                  track.signLanguageVideo
                                )}
                                controls
                                className="w-full h-full object-contain"
                              />
                              <button
                                onClick={() => {
                                  const newTracks = [...albumTracks];
                                  newTracks[index].signLanguageVideo = null;
                                  setAlbumTracks(newTracks);
                                }}
                                className="absolute top-1 right-1 bg-red-500/80 backdrop-blur-sm text-white p-1 rounded hover:bg-red-600/80 transition-all"
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18" />
                                  <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div className="border-2 border-dashed border-white/30 rounded-lg p-3 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const newTracks = [...albumTracks];
                                    newTracks[index].signLanguageVideo = file;
                                    setAlbumTracks(newTracks);
                                  }
                                }}
                                className="hidden"
                                id={`sign-language-track-${index}`}
                              />
                              <label
                                htmlFor={`sign-language-track-${index}`}
                                className="cursor-pointer"
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  className="mx-auto mb-1 text-white/60"
                                >
                                  <path d="M9 11l3 3L22 4" />
                                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                                </svg>
                                <p className="text-white/70 drop-shadow text-xs">
                                  {text.signLanguageVideoDragDrop}
                                </p>
                              </label>
                            </div>
                          )}
                        </div>
                        {/* Braille File */}
                        <div>
                          <label className="block text-white/80 drop-shadow mb-1 text-xs">
                            {text.brailleFile}
                          </label>
                          {track.brailleFile ? (
                            <div className="relative rounded-lg p-3 bg-white/10 border border-white/20 flex flex-col items-center justify-center gap-2 min-h-[80px]">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-white/80"
                              >
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                              <span className="text-white text-xs truncate max-w-full">
                                {track.brailleFile.name}
                              </span>
                              <button
                                onClick={() => {
                                  const newTracks = [...albumTracks];
                                  newTracks[index].brailleFile = null;
                                  setAlbumTracks(newTracks);
                                }}
                                className="bg-red-500/80 backdrop-blur-sm text-white p-1 rounded hover:bg-red-600/80 transition-all"
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <line x1="18" y1="6" x2="6" y2="18" />
                                  <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div className="border-2 border-dashed border-white/30 rounded-lg p-3 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer min-h-[80px] flex items-center justify-center">
                              <input
                                type="file"
                                accept=".brf,.brl,.txt"
                                onChange={(e) =>
                                  handleBrailleFileChange(e, index)
                                }
                                className="hidden"
                                id={`braille-track-${index}`}
                              />
                              <label
                                htmlFor={`braille-track-${index}`}
                                className="cursor-pointer"
                              >
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  className="mx-auto mb-1 text-white/60"
                                >
                                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                  <polyline points="14 2 14 8 20 8" />
                                  <circle cx="10" cy="12" r="1" />
                                  <circle cx="14" cy="12" r="1" />
                                  <circle cx="10" cy="16" r="1" />
                                </svg>
                                <p className="text-white/70 drop-shadow text-xs">
                                  {text.brailleFileDragDrop}
                                </p>
                              </label>
                            </div>
                          )}
                        </div>
                        Upload Video Introduction{" "}
                      </div>
                    </div>

                    {/* Track Credits */}
                    <div className="grid md:grid-cols-2 gap-3"></div>

                    {/* Musicians for this track */}
                    <div>
                      <div className="grid grid-cols-2 gap-2"></div>
                    </div>
                  </div>
                ))}

                {/* Add Track Button */}
                <button
                  onClick={() => {
                    setAlbumTracks([
                      ...albumTracks,
                      {
                        file: null,
                        title: "",
                        lyrics: "",
                        signLanguageVideo: null,
                        brailleFile: null,
                        authors: "",
                        producers: "",
                        lyricists: "",
                        musiciansVocals: "",
                        musiciansPianoKeyboards: "",
                        musiciansWinds: "",
                        musiciansPercussion: "",
                        musiciansStrings: "",
                        mixingEngineer: "",
                        masteringEngineer: "",
                      },
                    ]);
                  }}
                  className="w-full py-4 px-6 bg-white/20 backdrop-blur-md border-2 border-dashed border-white/40 rounded-lg text-white drop-shadow hover:bg-white/30 transition-all flex items-center justify-center gap-2"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  {text.addTrack}
                </button>
              </div>
            )}

            {/* Additional Upload Options */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Artwork Upload */}
              <div>
                <h3 className="text-xl text-white drop-shadow mb-4">
                  {text.uploadArtwork}
                </h3>

                {artworkPreview ? (
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border-2 border-white/20">
                    <img
                      src={artworkPreview}
                      alt="Artwork"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setArtwork(null);
                        setArtworkPreview("");
                        // si tu stockes aussi l'URL dans un form (ex: coverUrl)
                        setFormData((prev: any) => ({
                          ...prev,
                          coverUrl: "", // 👉 adapte le nom du champ: singleCoverUrl / albumCoverUrl / etc.
                        }));
                      }}
                      className="absolute cursor-pointer top-2 right-2 bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600/80 transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer aspect-square flex items-center justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleArtwork}
                      className="hidden"
                      id="artwork-upload"
                    />
                    <label
                      htmlFor="artwork-upload"
                      className="cursor-pointer text-center"
                    >
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mx-auto mb-4 text-white/60"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <p className="text-white drop-shadow text-sm">
                        {text.artworkDragDrop}
                      </p>
                    </label>
                  </div>
                )}
              </div>

              {/* Mini Video Loop Upload */}
              <div>
                <h3 className="text-xl text-white drop-shadow mb-4">
                  {text.uploadMiniVideo}
                </h3>
                {miniVideoPreview ? (
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-black border-2 border-white/20">
                    <video
                      src={miniVideoPreview}
                      loop
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setMiniVideo(null);
                        setMiniVideoPreview("");
                        setMiniVideoUrl(""); // URL Cloudinary reset

                        // si c’est stocké dans un form global
                        setFormData((prev: any) => ({
                          ...prev,
                          miniVideoUrl: "",
                        }));
                      }}
                      className="absolute top-2 right-2 bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600/80 transition-all"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer aspect-square flex items-center justify-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleMiniVideo}
                      className="hidden"
                      id="mini-video-upload"
                    />
                    <label
                      htmlFor="mini-video-upload"
                      className="cursor-pointer text-center"
                    >
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mx-auto mb-4 text-white/60"
                      >
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect
                          x="1"
                          y="5"
                          width="15"
                          height="14"
                          rx="2"
                          ry="2"
                        />
                      </svg>
                      <p className="text-white drop-shadow text-sm">
                        {text.miniVideoDragDrop}
                      </p>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Lyrics Upload */}
            <div>
              <h3 className="text-xl text-white drop-shadow mb-4">
                {text.uploadLyrics}
              </h3>
              <textarea
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                placeholder={text.lyricsPlaceholder}
                className="w-full h-40 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all resize-none"
              />
              <div className="mt-3">
                <label className="block text-white/80 drop-shadow mb-1 text-xs">
                  {text.trackMood}
                </label>

                <select
                  value={moodId}
                  onChange={(e) => setMoodId(e.target.value)}
                  className="cursor-pointer w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg 
                 text-black text-sm focus:outline-none focus:border-white/40 transition-all"
                >
                  <option value="">-- {text.selectMoodPlaceholder} --</option>

                  {moods &&
                    moods.map((mood) => (
                      <option key={mood.id} value={mood.id}>
                        {mood.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Accessibility Options */}
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {/* Sign Language Video */}
                <div>
                  <label className="block text-white/90 drop-shadow mb-2 text-sm">
                    {text.signLanguageVideo}
                  </label>
                  {signLanguageVideo ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-black border-2 border-white/20">
                      <video
                        src={URL.createObjectURL(signLanguageVideo)}
                        controls
                        className="w-full h-full object-contain"
                      />
                      <button
                        onClick={() => setSignLanguageVideo(null)}
                        className="absolute top-2 right-2 bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600/80 transition-all"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setSignLanguageVideo(file);
                        }}
                        className="hidden"
                        id="sign-language-upload"
                      />
                      <label
                        htmlFor="sign-language-upload"
                        className="cursor-pointer"
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="mx-auto mb-2 text-white/60"
                        >
                          <path d="M9 11l3 3L22 4" />
                          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                        </svg>
                        <p className="text-white/80 drop-shadow text-xs">
                          {text.signLanguageVideoDragDrop}
                        </p>
                      </label>
                    </div>
                  )}
                </div>

                {/* Braille File */}
                <div>
                  <label className="block text-white/90 drop-shadow mb-2 text-sm">
                    {text.brailleFile}
                  </label>
                  {brailleFile ? (
                    <div className="relative rounded-lg p-6 bg-white/10 border-2 border-white/20 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-white/80"
                        >
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <span className="text-white text-sm">
                          {brailleFile.name}
                        </span>
                      </div>
                      <button
                        onClick={() => setBrailleFile(null)}
                        className="bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-red-600/80 transition-all"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                      <input
                        type="file"
                        accept=".brf,.brl,.txt"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setBrailleFile(file);
                        }}
                        className="hidden"
                        id="braille-upload"
                      />
                      <label
                        htmlFor="braille-upload"
                        className="cursor-pointer"
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="mx-auto mb-2 text-white/60"
                        >
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <circle cx="10" cy="12" r="1" />
                          <circle cx="14" cy="12" r="1" />
                          <circle cx="10" cy="16" r="1" />
                        </svg>
                        <p className="text-white/80 drop-shadow text-xs">
                          {text.brailleFileDragDrop}
                        </p>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Creation Information */}
            <div>
              <h3 className="text-xl text-white drop-shadow mb-4">
                {text.creationInfo}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-white/90 drop-shadow mb-2 text-sm">
                    {text.trackTitle}
                  </label>
                  <input
                    type="text"
                    value={trackTitle}
                    onChange={(e) => setTrackTitle(e.target.value)}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                  />
                </div>

                {/* Authors */}
                <div>
                  <label className="block text-white/90 drop-shadow mb-2 text-sm">
                    {text.authors}
                  </label>
                  <input
                    type="text"
                    value={authors}
                    onChange={(e) => setAuthors(e.target.value)}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                  />
                </div>

                {/* Producers */}
                <div>
                  <label className="block text-white/90 drop-shadow mb-2 text-sm">
                    {text.producers}
                  </label>
                  <input
                    type="text"
                    value={producers}
                    onChange={(e) => setProducers(e.target.value)}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                  />
                </div>

                {/* Lyricists */}
                <div>
                  <label className="block text-white/90 drop-shadow mb-2 text-sm">
                    {text.lyricists}
                  </label>
                  <input
                    type="text"
                    value={lyricists}
                    onChange={(e) => setLyricists(e.target.value)}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                  />
                </div>

                {/* Musicians Section */}
                <div className="col-span-2">
                  <label className="block text-white/90 drop-shadow mb-3">
                    {text.musicians}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    {/* Vocals */}
                    <div>
                      <label className="block text-white/70 drop-shadow mb-2 text-sm">
                        {text.musiciansVocals}
                      </label>
                      <input
                        type="text"
                        value={musiciansVocals}
                        onChange={(e) => setMusiciansVocals(e.target.value)}
                        className="w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all text-sm"
                      />
                    </div>

                    {/* Piano/Keyboards */}
                    <div>
                      <label className="block text-white/70 drop-shadow mb-2 text-sm">
                        {text.musiciansPianoKeyboards}
                      </label>
                      <input
                        type="text"
                        value={musiciansPianoKeyboards}
                        onChange={(e) =>
                          setMusiciansPianoKeyboards(e.target.value)
                        }
                        className="w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all text-sm"
                      />
                    </div>

                    {/* Winds */}
                    <div>
                      <label className="block text-white/70 drop-shadow mb-2 text-sm">
                        {text.musiciansWinds}
                      </label>
                      <input
                        type="text"
                        value={musiciansWinds}
                        onChange={(e) => setMusiciansWinds(e.target.value)}
                        className="w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all text-sm"
                      />
                    </div>

                    {/* Percussion */}
                    <div>
                      <label className="block text-white/70 drop-shadow mb-2 text-sm">
                        {text.musiciansPercussion}
                      </label>
                      <input
                        type="text"
                        value={musiciansPercussion}
                        onChange={(e) => setMusiciansPercussion(e.target.value)}
                        className="w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all text-sm"
                      />
                    </div>

                    {/* Strings */}
                    <div className="md:col-span-2">
                      <label className="block text-white/70 drop-shadow mb-2 text-sm">
                        {text.musiciansStrings}
                      </label>
                      <input
                        type="text"
                        value={musiciansStrings}
                        onChange={(e) => setMusiciansStrings(e.target.value)}
                        className="w-full p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Mixing Engineer */}
                <div>
                  <label className="block text-white/90 drop-shadow mb-2 text-sm">
                    {text.mixingEngineer}
                  </label>
                  <input
                    type="text"
                    value={mixingEngineer}
                    onChange={(e) => setMixingEngineer(e.target.value)}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                  />
                </div>

                {/* Mastering Engineer */}
                <div>
                  <label className="block text-white/90 drop-shadow mb-2 text-sm">
                    {text.masteringEngineer}
                  </label>
                  <input
                    type="text"
                    value={masteringEngineer}
                    onChange={(e) => setMasteringEngineer(e.target.value)}
                    className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Upload Button */}
            {!uploadedFile && (
              <button
                onClick={handleUpload}
                className="cursor-pointer w-full py-4 px-6 bg-white/30 backdrop-blur-md border border-white/40 rounded-lg text-white drop-shadow hover:bg-white/40 transition-all flex items-center justify-center gap-2"
              >
                <Upload size={20} />
                {text.uploadButton}
              </button>
            )}

            {/* Recent Uploads */}
            <div className="mt-8">
              <h3 className="text-xl text-white drop-shadow mb-4">
                Recent Uploads
              </h3>
              <div className="space-y-3">
                {mockTracks.map((track, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <Music size={20} className="text-white" />
                      </div>
                      <span className="text-white drop-shadow">
                        {track.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white/80 text-sm">
                        {track.streams} streams
                      </span>
                      <button className="text-white/60 hover:text-white transition-colors">
                        <Play size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Streams Tab */}
        {activeTab === "streams" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={20} className="text-white" />
                  <h3 className="text-white/80 drop-shadow">
                    {text.totalStreams}
                  </h3>
                </div>
                <p className="text-3xl text-white drop-shadow">
                  {mockStreams.total}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={20} className="text-white" />
                  <h3 className="text-white/80 drop-shadow">
                    {text.monthlyStreams}
                  </h3>
                </div>
                <p className="text-3xl text-white drop-shadow">
                  {mockStreams.monthly}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Music size={20} className="text-white" />
                  <h3 className="text-white/80 drop-shadow">{text.tracks}</h3>
                </div>
                <p className="text-3xl text-white drop-shadow">
                  {mockStreams.tracks}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={20} className="text-white" />
                  <h3 className="text-white/80 drop-shadow">
                    {text.listeners}
                  </h3>
                </div>
                <p className="text-3xl text-white drop-shadow">
                  {mockStreams.listeners}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Tracks */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl text-white drop-shadow mb-4">
                  {text.topTracks}
                </h3>
                <div className="space-y-3">
                  {mockTracks.map((track, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl text-white/60">
                          #{index + 1}
                        </span>
                        <span className="text-white drop-shadow">
                          {track.name}
                        </span>
                      </div>
                      <span className="text-white/80">{track.streams}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Streams by Location */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl text-white drop-shadow mb-4">
                  {text.byLocation}
                </h3>
                <div className="space-y-4">
                  {mockStreamsByLocation.map((location, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white drop-shadow">
                          {location.location}
                        </span>
                        <span className="text-white/80">
                          {location.streams}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-white/50 h-2 rounded-full transition-all"
                          style={{ width: location.percentage }}
                        ></div>
                      </div>
                      <span className="text-white/60 text-sm">
                        {location.percentage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Streams per Track with Locations */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl text-white drop-shadow">
                  {text.streamsPerTrack}
                </h3>

                {/* Filter Dropdown */}
                <div className="flex items-center gap-3">
                  <label className="text-white/90 drop-shadow">
                    {text.filterByType}:
                  </label>
                  <select
                    value={trackFilter}
                    onChange={(e) => setTrackFilter(e.target.value)}
                    className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-black cursor-pointer focus:outline-none focus:border-white/40 transition-all"
                  >
                    <option value="all" className="bg-gray-800">
                      {text.all}
                    </option>
                    <option value="single" className="bg-gray-800">
                      {text.single}
                    </option>
                    <option value="ep" className="bg-gray-800">
                      {text.ep}
                    </option>
                    <option value="album" className="bg-gray-800">
                      {text.album}
                    </option>
                  </select>
                </div>
              </div>

              {/* Search Track Input */}
              <div className="relative">
                <input
                  type="text"
                  value={trackSearch}
                  onChange={(e) => setTrackSearch(e.target.value)}
                  placeholder={text.searchTrack}
                  className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                />
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                  size={20}
                />
              </div>

              <div className="max-h-[800px] overflow-y-auto space-y-6 pr-2">
                {filteredTracks.map((track, trackIndex) => (
                  <div
                    key={trackIndex}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <Play size={24} className="text-white/80" />
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="text-xl text-white drop-shadow">
                              {track.name}
                            </h4>
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white/90 uppercase">
                              {track.type === "single"
                                ? text.single
                                : text.album}
                            </span>
                          </div>
                          <p className="text-white/60 mt-1">
                            {track.totalStreams}{" "}
                            {text.totalStreams.toLowerCase()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <h5 className="text-white/90 drop-shadow mb-4">
                      {text.locationPerTrack}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {track.topLocations.map((location, locIndex) => (
                        <div
                          key={locIndex}
                          className="bg-white/5 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white drop-shadow">
                              {location.location}
                            </span>
                            <span className="text-white/80">
                              {location.streams}
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                            <div
                              className="bg-white/50 h-2 rounded-full transition-all"
                              style={{ width: location.percentage }}
                            ></div>
                          </div>
                          <span className="text-white/60 text-sm">
                            {location.percentage}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === "subscriptions" && (
          <div className="space-y-6">
            {/* Subscription Pricing Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h2 className="text-2xl text-white drop-shadow-lg mb-6">
                {text.subscriptionPricing}
              </h2>
              <div>
                <label className="block text-white drop-shadow mb-6 text-lg">
                  {text.setPriceLabel}
                </label>

                {/* Pricing Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Monthly */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-white drop-shadow mb-4">
                      {text.monthly}
                    </h3>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xl">
                        €
                      </span>
                      <input
                        type="number"
                        value={monthlyPrice}
                        onChange={(e) => setMonthlyPrice(e.target.value)}
                        placeholder="9.99"
                        step="0.01"
                        min="0"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>
                    <p className="text-white/60 text-sm mt-2">
                      {text.pricePerMonth}
                    </p>
                  </div>

                  {/* Quarterly */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-white drop-shadow mb-4">
                      {text.quarterly}
                    </h3>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xl">
                        €
                      </span>
                      <input
                        type="text"
                        value={quarterlyPrice}
                        readOnly
                        placeholder="—"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 cursor-not-allowed opacity-80"
                      />
                    </div>
                    <p className="text-white/60 text-sm mt-2">
                      {text.pricePerQuarter}
                    </p>
                    {monthlyPrice && (
                      <p className="text-white/50 text-xs mt-1">
                        {language === "es" && "(Calculado automáticamente)"}
                        {language === "en" && "(Calculated automatically)"}
                        {language === "ca" && "(Calculat automàticament)"}
                      </p>
                    )}
                  </div>

                  {/* Annual */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-white drop-shadow mb-4">
                      {text.annual}
                    </h3>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xl">
                        €
                      </span>
                      <input
                        type="text"
                        value={annualPrice}
                        readOnly
                        placeholder="—"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 cursor-not-allowed opacity-80"
                      />
                    </div>
                    <p className="text-white/60 text-sm mt-2">
                      {text.pricePerYear}
                    </p>
                    {monthlyPrice && (
                      <p className="text-white/50 text-xs mt-1">
                        {language === "es" && "(Calculado automáticamente)"}
                        {language === "en" && "(Calculated automatically)"}
                        {language === "ca" && "(Calculat automàticament)"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Save Button */}
                {monthlyPrice && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        const monthly = parseFloat(monthlyPrice);
                        const quarterly = monthly * 4;
                        const annual = monthly * 12;
                        const message =
                          language === "es"
                            ? `Precios configurados:\nMensual: €${monthly.toFixed(
                                2
                              )}\nTrimestral: €${quarterly.toFixed(
                                2
                              )}\nAnual: €${annual.toFixed(2)}`
                            : language === "en"
                            ? `Prices set:\nMonthly: €${monthly.toFixed(
                                2
                              )}\nQuarterly: €${quarterly.toFixed(
                                2
                              )}\nAnnual: €${annual.toFixed(2)}`
                            : `Preus configurats:\nMensual: €${monthly.toFixed(
                                2
                              )}\nTrimestral: €${quarterly.toFixed(
                                2
                              )}\nAnual: €${annual.toFixed(2)}`;
                        alert(message);
                      }}
                      className="px-8 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all"
                    >
                      {text.savePrice}
                    </button>
                  </div>
                )}

                {/* Info Message */}
                {monthlyPrice && (
                  <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/20">
                    <p className="text-white/80 text-sm mb-2">
                      {language === "es" &&
                        "Los fans podrán elegir entre las opciones de suscripción que hayas configurado:"}
                      {language === "en" &&
                        "Fans will be able to choose from the subscription options you have configured:"}
                      {language === "ca" &&
                        "Els fans podran triar entre les opcions de subscripció que hagis configurat:"}
                    </p>
                    <ul className="text-white/70 text-sm space-y-1 ml-4">
                      <li>
                        • {text.monthly}: €{monthlyPrice} {text.pricePerMonth}
                      </li>
                      <li>
                        • {text.quarterly}: €{quarterlyPrice}{" "}
                        {text.pricePerQuarter}
                      </li>
                      <li>
                        • {text.annual}: €{annualPrice} {text.pricePerYear}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={20} className="text-white" />
                  <h3 className="text-white/80 drop-shadow">
                    {text.totalRevenue}
                  </h3>
                </div>
                <p className="text-3xl text-white drop-shadow">€12,450</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={20} className="text-white" />
                  <h3 className="text-white/80 drop-shadow">
                    {text.totalSubscribers}
                  </h3>
                </div>
                <p className="text-3xl text-white drop-shadow">
                  {mockSubscriptions.total}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={20} className="text-white" />
                  <h3 className="text-white/80 drop-shadow">
                    {text.activeSubscribers}
                  </h3>
                </div>
                <p className="text-3xl text-white drop-shadow">
                  {mockSubscriptions.active}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={20} className="text-white" />
                  <h3 className="text-white/80 drop-shadow">Growth</h3>
                </div>
                <p className="text-3xl text-white drop-shadow">
                  {mockSubscriptions.growth}
                </p>
              </div>
            </div>

            {/* Exclusive Content Upload Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h2 className="text-2xl text-white drop-shadow-lg mb-6">
                {text.exclusiveContent}
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Upload Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-white drop-shadow mb-2">
                      {text.contentType}
                    </label>
                    <select
                      value={exclusiveContentType}
                      onChange={(e) => setExclusiveContentType(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black focus:outline-none focus:border-white/40 transition-all"
                    >
                      <option value="music">{text.music}</option>
                      <option value="video">{text.video}</option>
                      <option value="photo">{text.photo}</option>
                      <option value="document">{text.document}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white drop-shadow mb-2">
                      {text.contentTitle}
                    </label>
                    <input
                      type="text"
                      value={exclusiveContentTitle}
                      onChange={(e) => setExclusiveContentTitle(e.target.value)}
                      placeholder={text.contentTitle}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-white drop-shadow mb-2">
                      {text.contentDescription}
                    </label>
                    <textarea
                      value={exclusiveContentDescription}
                      onChange={(e) =>
                        setExclusiveContentDescription(e.target.value)
                      }
                      placeholder={text.contentDescription}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white drop-shadow mb-2">
                      {text.uploadFile}
                    </label>
                    <div
                      className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-white/50 transition-all cursor-pointer bg-white/5"
                      onClick={() =>
                        document
                          .getElementById("exclusive-content-file")
                          ?.click()
                      }
                    >
                      <Upload
                        size={32}
                        className="text-white/60 mx-auto mb-2"
                      />
                      <p className="text-white/60 text-sm">
                        {exclusiveContentFile
                          ? exclusiveContentFile.name
                          : text.uploadFile}
                      </p>
                      <input
                        id="exclusive-content-file"
                        type="file"
                        onChange={(e) =>
                          setExclusiveContentFile(e.target.files?.[0] || null)
                        }
                        className="hidden"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (exclusiveContentTitle && exclusiveContentFile) {
                        const newContent = {
                          id: Date.now().toString(),
                          type: exclusiveContentType,
                          title: exclusiveContentTitle,
                          description: exclusiveContentDescription,
                          uploadDate: new Date().toLocaleDateString(),
                        };
                        setUploadedExclusiveContent([
                          ...uploadedExclusiveContent,
                          newContent,
                        ]);
                        setExclusiveContentTitle("");
                        setExclusiveContentDescription("");
                        setExclusiveContentFile(null);
                        alert(
                          language === "es"
                            ? "Contenido subido exitosamente"
                            : language === "en"
                            ? "Content uploaded successfully"
                            : "Contingut pujat amb èxit"
                        );
                      }
                    }}
                    disabled={!exclusiveContentTitle || !exclusiveContentFile}
                    className="w-full px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {text.uploadExclusiveContent}
                  </button>
                </div>

                {/* Uploaded Content List */}
                <div>
                  <h3 className="text-lg text-white drop-shadow mb-4">
                    {text.uploadedContent}
                  </h3>
                  {uploadedExclusiveContent.length === 0 ? (
                    <div className="bg-white/5 rounded-lg p-8 text-center border border-white/20">
                      <Music size={48} className="text-white/40 mx-auto mb-4" />
                      <p className="text-white/60">{text.noContent}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {uploadedExclusiveContent.map((content) => (
                        <div
                          key={content.id}
                          className="bg-white/5 rounded-lg p-4 border border-white/20"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {content.type === "music" && (
                                  <Music size={16} className="text-white" />
                                )}
                                {content.type === "video" && (
                                  <Video size={16} className="text-white" />
                                )}
                                {content.type === "photo" && (
                                  <Image size={16} className="text-white" />
                                )}
                                {content.type === "document" && (
                                  <FileText size={16} className="text-white" />
                                )}
                                <span className="text-white/80 text-sm uppercase">
                                  {content.type}
                                </span>
                              </div>
                              <h4 className="text-white drop-shadow mb-1">
                                {content.title}
                              </h4>
                              {content.description && (
                                <p className="text-white/60 text-sm mb-2">
                                  {content.description}
                                </p>
                              )}
                              <p className="text-white/50 text-xs">
                                {content.uploadDate}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setUploadedExclusiveContent(
                                  uploadedExclusiveContent.filter(
                                    (c) => c.id !== content.id
                                  )
                                );
                              }}
                              className="text-white/60 hover:text-white transition-colors"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Subscribers */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl text-white drop-shadow mb-4">
                  {text.recentSubscribers}
                </h3>
                <div className="space-y-3">
                  {[
                    "Alex M.",
                    "Sarah K.",
                    "Mike R.",
                    "Emma L.",
                    "James P.",
                  ].map((name, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <Users size={20} className="text-white" />
                        </div>
                        <span className="text-white drop-shadow">{name}</span>
                      </div>
                      <span className="text-white/60 text-sm">
                        {index + 1} days ago
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscriptions by Location */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h3 className="text-xl text-white drop-shadow mb-4">
                  {text.byLocation}
                </h3>
                <div className="space-y-4">
                  {mockSubscriptionsByLocation.map((location, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white drop-shadow">
                          {location.location}
                        </span>
                        <span className="text-white/80">
                          {location.subscribers}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-white/50 h-2 rounded-full transition-all"
                          style={{ width: location.percentage }}
                        ></div>
                      </div>
                      <span className="text-white/60 text-sm">
                        {location.percentage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Royalties Tab */}
        {activeTab === "royalties" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={20} className="text-white" />
                  <h3 className="text-white/80 drop-shadow">
                    {text.totalRoyalties}
                  </h3>
                </div>
                <p className="text-3xl text-white drop-shadow">
                  {mockRoyalties.total}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={20} className="text-white" />
                  <h3 className="text-white/80 drop-shadow">
                    {text.thisMonth}
                  </h3>
                </div>
                <p className="text-3xl text-white drop-shadow">
                  {mockRoyalties.thisMonth}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={20} className="text-white" />
                  <h3 className="text-white/80 drop-shadow">Pending</h3>
                </div>
                <p className="text-3xl text-white drop-shadow">
                  {mockRoyalties.pending}
                </p>
              </div>
            </div>

            {/* Payment Receiving Settings */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h2 className="text-2xl text-white drop-shadow-lg mb-6">
                {text.paymentMethodsTitle}
              </h2>

              {paymentSaved && (
                <div className="mb-6 p-4 bg-green-500/20 backdrop-blur-sm border border-green-400/40 rounded-lg">
                  <p className="text-green-200 drop-shadow">
                    {text.paymentDetailsSaved}
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {/* Bank Account Section */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl text-white drop-shadow mb-4 flex items-center gap-2">
                    <DollarSign size={20} />
                    {text.bankAccount}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 drop-shadow mb-2 text-sm">
                        {text.accountHolderName}
                      </label>
                      <input
                        type="text"
                        value={bankAccountHolder}
                        onChange={(e) => setBankAccountHolder(e.target.value)}
                        placeholder="John Doe"
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 drop-shadow mb-2 text-sm">
                        {text.bankNameLabel}
                      </label>
                      <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="Bank of America"
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 drop-shadow mb-2 text-sm">
                        {text.accountNumberLabel}
                      </label>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        placeholder="123456789"
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 drop-shadow mb-2 text-sm">
                        {text.routingNumberLabel}
                      </label>
                      <input
                        type="text"
                        value={routingNumber}
                        onChange={(e) => setRoutingNumber(e.target.value)}
                        placeholder="021000021"
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 drop-shadow mb-2 text-sm">
                        {text.swiftCodeLabel}
                      </label>
                      <input
                        type="text"
                        value={swiftCode}
                        onChange={(e) => setSwiftCode(e.target.value)}
                        placeholder="BOFAUS3N"
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 drop-shadow mb-2 text-sm">
                        {text.ibanLabel}
                      </label>
                      <input
                        type="text"
                        value={iban}
                        onChange={(e) => setIban(e.target.value)}
                        placeholder="GB29 NWBK 6016 1331 9268 19"
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Digital Payment Methods */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl text-white drop-shadow mb-4 flex items-center gap-2">
                    <Smartphone size={20} />
                    {language === "spanish"
                      ? "Métodos de Pago Digital"
                      : language === "english"
                      ? "Digital Payment Methods"
                      : "Mètodes de Pagament Digital"}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* PayPal */}
                    <div>
                      <label className="block text-white/80 drop-shadow mb-2 text-sm">
                        {text.paypalEmailLabel}
                      </label>
                      <input
                        type="email"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        placeholder="artist@example.com"
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>

                    {/* Bizum */}
                    <div>
                      <label className="block text-white/80 drop-shadow mb-2 text-sm">
                        {text.bizumPhoneLabel}
                      </label>
                      <input
                        type="tel"
                        value={bizumPhone}
                        onChange={(e) => setBizumPhone(e.target.value)}
                        placeholder="+34 600 000 000"
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>

                    {/* Mobile Money Provider */}
                    <div>
                      <label className="block text-white/80 drop-shadow mb-2 text-sm">
                        {text.mobileMoneyProviderLabel}
                      </label>
                      <select
                        value={mobileMoneyProvider}
                        onChange={(e) => setMobileMoneyProvider(e.target.value)}
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black focus:outline-none focus:border-white/40 transition-all"
                      >
                        <option value="" className="bg-white">
                          {text.selectProvider}
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

                    {/* Mobile Money Phone */}
                    <div>
                      <label className="block text-white/80 drop-shadow mb-2 text-sm">
                        {text.mobileMoneyPhoneLabel}
                      </label>
                      <input
                        type="tel"
                        value={mobileMoneyPhone}
                        onChange={(e) => setMobileMoneyPhone(e.target.value)}
                        placeholder="+233 000 000 000"
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>

                    {/* Orange Money */}
                    <div className="md:col-span-2">
                      <label className="block text-white/80 drop-shadow mb-2 text-sm">
                        {text.orangeMoneyPhoneLabel}
                      </label>
                      <input
                        type="tel"
                        value={orangeMoneyPhone}
                        onChange={(e) => setOrangeMoneyPhone(e.target.value)}
                        placeholder="+225 00 00 00 00"
                        className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <button
                  onClick={() => {
                    setPaymentSaved(true);
                    setTimeout(() => setPaymentSaved(false), 3000);
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-500/40 to-emerald-500/40 backdrop-blur-md border-2 border-white/40 rounded-xl text-white hover:from-green-500/50 hover:to-emerald-500/50 hover:border-white/60 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <DollarSign size={20} />
                  {text.savePaymentDetails}
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl text-white drop-shadow mb-4">
                {text.revenue} by Track
              </h3>
              <div className="space-y-3">
                {mockTracks.map((track, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <Music size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white drop-shadow">{track.name}</p>
                        <p className="text-white/60 text-sm">
                          {track.streams} streams
                        </p>
                      </div>
                    </div>
                    <span className="text-xl text-white drop-shadow">
                      {track.revenue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
