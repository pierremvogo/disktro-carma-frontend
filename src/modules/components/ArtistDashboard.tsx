import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { ArtistModuleObject as ModuleObject } from "../artist/module";
import { useRouter } from "next/navigation";
import { MediaModuleObject as MediaModule } from "../file/module";
import { UserModuleObject as UserModule } from "../module";
import { getImageFile, getVideoFile } from "@/@disktro/utils";
import CustomSuccess from "@/@disktro/CustomSuccess";
import CustomAlert from "@/@disktro/CustomAlert";
import { MoodModuleObject as MoodModule } from "../mood/module";
import { TrackModuleObject as TrackModule } from "../track/module";
import { SingleModuleObject } from "../single/module";
import { SingleUploadSection } from "./SingleUploadSection";
import { AlbumUploadSection } from "./AlbumUploadSection";
import { EpUploadSection } from "./EpUploadSection";
import { EpModuleObject } from "../ep/module";
import { AlbumModuleObject } from "../album/module";
import { getCountryName } from "@/@disktro/utils";
import { PlanModuleObject } from "../plan/module";
import { SubscriptionModuleObject } from "../subscription/module";
import { ExclusiveContentModuleObject } from "./exclusiveContent/module";
import { RoyaltiesModuleObject } from "../royalties/module";
import { PayoutModuleObject } from "../payout/module";
import { AccessibilityButton } from "./accessibilityButton/AccessibilityButton";
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
const PayoutIcon = ({ size = 24, className = "" }) => (
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
    {/* Carte de paiement */}
    <rect x="3" y="5" width="18" height="14" rx="3" ry="3" />
    {/* Bande de la carte */}
    <line x1="3" y1="10" x2="21" y2="10" />
    {/* Petit rond (puce ou logo) */}
    <circle cx="9" cy="15" r="1.3" />
    {/* Petit rectangle (zone de code) */}
    <rect x="13" y="13.7" width="5" height="2.6" rx="0.5" />
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
  miniVideoLoopUrl?: string;
  lyrics?: string;
  trackTitle?: string;
  audioUrl?: string;
  authors?: string;
  producers?: string;
  lyricists?: string;
  coverUrl?: string;
  musiciansVocals?: string;
  musiciansPianoKeyboards?: string;
  musiciansWinds?: string;
  musiciansPercussion?: string;
  musiciansStrings?: string;
  moodId?: string;
  mixingEngineer?: string;
  masteringEngineer?: string;

  // médias annexes
  miniVideoUrl?: string;
  videoIntroUrl?: string;
  signLanguageVideoUrl?: string;
  brailleFileUrl?: string;
}
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
type ReleaseType = "single" | "ep" | "album";

type LocationStat = {
  location: string;
  streams: number;
  percentage: string;
};

type TrackStat = {
  id: string;
  name: string;
  type: ReleaseType;
  totalStreams: number;
  listenersCount?: number;
  monthlyStreamsCount?: number;
  topLocations?: {
    location: string;
    streams: number;
    percentage?: string;
  }[];
};
const ACCEPT_BY_TYPE: Record<string, string> = {
  music: "audio/*",
  video: "video/*",
  photo: "image/*",
  document: ".txt,text/plain",
};

const isValidFileForType = (type: string, file: File) => {
  const mime = file.type; // ex "audio/mpeg"
  const name = file.name.toLowerCase();

  if (type === "music") return mime.startsWith("audio/");
  if (type === "video") return mime.startsWith("video/");
  if (type === "photo") return mime.startsWith("image/");
  if (type === "document") {
    // certains navigateurs mettent type="" pour .txt, donc on check extension aussi
    return mime === "text/plain" || name.endsWith(".txt");
  }
  return false;
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

  const [subStats, setSubStats] = useState({
    currency: "EUR",
    totalRevenue: "0.00",
    totalSubscribers: 0,
    activeSubscribers: 0,
    growth: "0%",
  });

  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);

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
  // Streams global stats
  const [totalStreams, setTotalStreams] = useState(0);
  const [monthlyStreams, setMonthlyStreams] = useState(0);
  const [totalTracksCount, setTotalTracksCount] = useState(0);
  const [totalListeners, setTotalListeners] = useState(0);

  // Tracks + locations
  const [tracksStats, setTracksStats] = useState<TrackStat[]>([]);
  const [streamsByLocation, setStreamsByLocation] = useState<LocationStat[]>(
    []
  );

  const [payoutLoading, setPayoutLoading] = useState(false);
  const [payoutSaving, setPayoutSaving] = useState(false);
  const [payoutError, setPayoutError] = useState<string | null>(null);

  // loading/error pour la section streams (optionnel)
  const [isStreamsLoading, setIsStreamsLoading] = useState(false);
  const [streamsError, setStreamsError] = useState<string | null>(null);

  // Si tu ne l’as pas déjà :
  const [trackFilter, setTrackFilter] = useState<ReleaseType | "all">("all");
  const [trackSearch, setTrackSearch] = useState("");

  const [file, setFile] = useState<File | null>(null);

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

  // Ajoute ces states en haut du composant
  const [isDraggingPic, setIsDraggingPic] = useState(false);
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);

  // Petits helpers
  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDropProfile = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    setIsDraggingPic(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    // Utilise la même logique que handleProfilePicture
    const fakeEvent = { target: { files: [file] } } as any;
    handleProfilePicture(fakeEvent);
  };

  const handleDropVideo = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e);
    setIsDraggingVideo(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) return;

    const fakeEvent = { target: { files: [file] } } as any;
    handleVideoIntro(fakeEvent);
  };

  const [uploadedExclusiveContent, setUploadedExclusiveContent] = useState<
    Array<{
      id: string;
      type: string;
      title: string;
      description: string;
      uploadDate: string;
      fileUrl: string;
      createdAt: Date;
    }>
  >([]);
  const [artwork, setArtwork] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<"single" | "ep" | "album">(
    "single"
  );

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

  const [quarterlyPrice, setQuarterlyPrice] = useState("");
  const [annualPrice, setAnnualPrice] = useState("");

  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingSaving, setPricingSaving] = useState(false);
  const [pricingError, setPricingError] = useState<string | null>(null);
  const [pricingSaved, setPricingSaved] = useState(false);

  const [exclusiveContentPreview, setExclusiveContentPreview] = useState("");
  const [exclusiveContentUrl, setExclusiveContentUrl] = useState("");

  const [isUploadingExclusive, setIsUploadingExclusive] = useState(false);
  const [exclusiveError, setExclusiveError] = useState("");
  const [exclusiveSuccess, setExclusiveSuccess] = useState("");

  const [isExclusiveLoading, setIsExclusiveLoading] = useState(false);
  const [isExclusiveSubmitting, setIsExclusiveSubmitting] = useState(false);

  const [recentSubscribers, setRecentSubscribers] = useState<any[]>([]);
  const [recentLoading, setRecentLoading] = useState(false);
  const [recentError, setRecentError] = useState<string | null>(null);

  const fetchMyPayoutSettings = async () => {
    try {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) return;

      setPayoutLoading(true);
      setPayoutError(null);

      const res = await PayoutModuleObject.service.getMyPayoutSettings(token);
      const data = res?.data?.data ?? res?.data ?? {};

      setBankAccountHolder(data.bankAccountHolder ?? "");
      setBankName(data.bankName ?? "");
      setAccountNumber(data.accountNumber ?? "");
      setRoutingNumber(data.routingNumber ?? "");
      setSwiftCode(data.swiftCode ?? "");
      setIban(data.iban ?? "");

      setPaypalEmail(data.paypalEmail ?? "");
      setBizumPhone(data.bizumPhone ?? "");
      setMobileMoneyProvider(data.mobileMoneyProvider ?? "");
      setMobileMoneyPhone(data.mobileMoneyPhone ?? "");
      setOrangeMoneyPhone(data.orangeMoneyPhone ?? "");
    } catch (e: any) {
      console.log((e as Error).message);
      setPayoutError(text.errors.generic);
    } finally {
      setPayoutLoading(false);
    }
  };

  const handleSavePayoutSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) return;

      setPayoutSaving(true);
      setPayoutError(null);

      const payload = {
        bankAccountHolder,
        bankName,
        accountNumber,
        routingNumber,
        swiftCode,
        iban,
        paypalEmail,
        bizumPhone,
        mobileMoneyProvider,
        mobileMoneyPhone,
        orangeMoneyPhone,
      };

      await PayoutModuleObject.service.saveMyPayoutSettings(payload, token);

      setPaymentSaved(true);
      setTimeout(() => setPaymentSaved(false), 3000);
    } catch (e: any) {
      console.log((e as Error).message);
      setPayoutError(text.errors.generic);
    } finally {
      setPayoutSaving(false);
    }
  };

  // Appel quand tu ouvres l'onglet payout
  useEffect(() => {
    if (activeTab === "payout") {
      fetchMyPayoutSettings();
    }
  }, [activeTab]);

  const fetchRecentSubscribers = async (limit = 5) => {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) return;
    try {
      setRecentLoading(true);
      setRecentError(null);

      const res =
        await SubscriptionModuleObject.service.getMyRecentActiveSubscribers(
          limit,
          token
        );

      // backend: { message, data: [...] }
      const items = res?.data?.data ?? res?.data ?? res ?? [];

      setRecentSubscribers(Array.isArray(items) ? items : []);
    } catch (e: any) {
      console.log((e as Error).message);
      setRecentError(text.errors.generic);
    } finally {
      setRecentLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "subscriptions") {
      fetchRecentSubscribers(5);
    }
  }, [activeTab]);

  const fetchSubscriptionsByLocation = async () => {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) return;
    try {
      setSubsLocLoading(true);
      setSubsLocError(null);

      const res =
        await SubscriptionModuleObject.service.getMyActiveSubscriptionsByLocation(
          token
        );

      // backend: { message, data: [...] }
      const items = res?.data?.data ?? res?.data ?? res ?? [];
      setSubsByLocation(Array.isArray(items) ? items : []);
    } catch (e: any) {
      console.log((e as Error).message);
      setSubsLocError(text.errors.generic);
    } finally {
      setSubsLocLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "subscriptions") {
      fetchSubscriptionsByLocation();
    }
  }, [activeTab]);

  const fetchExclusiveContents = async () => {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) return;
    try {
      setIsExclusiveLoading(true);
      setExclusiveError("");

      const artistId = localStorage.getItem(ModuleObject.localState.USER_ID);
      if (!artistId) return;

      const res =
        await ExclusiveContentModuleObject.service.getExclusiveContentByArtist(
          artistId,
          token
        );
      // ✅ ton backend renvoie { message, contents: [...] }
      const items = res?.data?.contents ?? res?.contents ?? [];

      setUploadedExclusiveContent(items);
    } catch (e: any) {
      console.log((e as Error).message);
      setExclusiveError(text.errors.generic);
    } finally {
      setIsExclusiveLoading(false);
    }
  };

  const [subsByLocation, setSubsByLocation] = useState<
    { location: string; subscribers: number; percentage: string }[]
  >([]);
  const [subsLocLoading, setSubsLocLoading] = useState(false);
  const [subsLocError, setSubsLocError] = useState<string | null>(null);

  const [royaltiesSummary, setRoyaltiesSummary] = useState({
    currency: "EUR",
    totalRoyalties: "0.00",
    thisMonth: "0.00",
    pending: "0.00",
  });

  const [royaltiesTracks, setRoyaltiesTracks] = useState<any[]>([]);

  const [royaltiesLoading, setRoyaltiesLoading] = useState(false);
  const [royaltiesError, setRoyaltiesError] = useState<string | null>(null);

  const fetchRoyalties = async () => {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) return;
    try {
      setRoyaltiesLoading(true);
      setRoyaltiesError(null);

      const [summaryRes, tracksRes] = await Promise.all([
        RoyaltiesModuleObject.service.getMyRoyaltiesSummary(token),
        RoyaltiesModuleObject.service.getMyRoyaltiesByTrack(10, token),
      ]);

      // backend: { message, data: {...} }
      const summary = summaryRes?.data?.data ?? summaryRes?.data ?? {};
      const tracks = tracksRes?.data?.data ?? tracksRes?.data ?? [];

      setRoyaltiesSummary({
        currency: summary.currency ?? "EUR",
        totalRoyalties: summary.totalRoyalties ?? "0.00",
        thisMonth: summary.thisMonth ?? "0.00",
        pending: summary.pending ?? "0.00",
      });

      setRoyaltiesTracks(Array.isArray(tracks) ? tracks : []);
    } catch (e: any) {
      console.log((e as Error).message);
      setRoyaltiesError(text.errors.generic);
    } finally {
      setRoyaltiesLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "royalties") {
      fetchRoyalties();
    }
  }, [activeTab]);

  const handleExclusiveFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setExclusiveError("");
    setExclusiveSuccess("");

    if (!isValidFileForType(exclusiveContentType, file)) {
      setExclusiveError(
        language === "english"
          ? "Invalid file type for the selected content type."
          : language === "spanish"
          ? "Tipo de archivo inválido para el tipo de contenido seleccionado."
          : "Tipus de fitxer invàlid per al tipus de contingut seleccionat."
      );
      e.target.value = "";
      return;
    }

    setIsExclusiveSubmitting(true);

    setExclusiveContentFile(file);

    // preview local
    if (exclusiveContentType !== "document") {
      setExclusiveContentPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
    } else {
      setExclusiveContentPreview("");
    }

    const fd = new FormData();
    fd.append("file", file);

    try {
      let res: any = null;

      if (exclusiveContentType === "photo") {
        res = await MediaModule.service.uploadImageFile(fd);
      } else if (exclusiveContentType === "video") {
        res = await MediaModule.service.uploadVideoFile(fd);
      } else if (exclusiveContentType === "music") {
        res = await MediaModule.service.uploadAudioFile(fd);
      } else {
        res = await MediaModule.service.uploadDocumentFile(fd);
      }

      if (res?.url) {
        setExclusiveContentUrl(res.url);
        setExclusiveSuccess(
          language === "english"
            ? "File uploaded successfully."
            : language === "spanish"
            ? "Archivo subido con éxito."
            : "Fitxer pujat amb èxit."
        );
      } else {
        setExclusiveError("Upload failed.");
      }
    } catch (err: any) {
      console.log((err as Error).message);
      setExclusiveError(text.errors.generic);
    } finally {
      setIsExclusiveSubmitting(false);
    }
  };

  const handleSubmitExclusiveContent = async () => {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) return;
    try {
      setExclusiveError("");
      setExclusiveSuccess("");

      if (!exclusiveContentTitle.trim()) {
        setExclusiveError("Title is required.");
        return;
      }
      if (!exclusiveContentUrl) {
        setExclusiveError("Please upload a file first.");
        return;
      }

      setIsExclusiveSubmitting(true);

      await ExclusiveContentModuleObject.service.createExclusiveContent(
        {
          type: exclusiveContentType,
          title: exclusiveContentTitle.trim(),
          description: exclusiveContentDescription?.trim() || null,
          fileUrl: exclusiveContentUrl,
        },
        token
      );

      setExclusiveSuccess(
        language === "english"
          ? "Exclusive content published."
          : language === "spanish"
          ? "Contenido exclusivo publicado."
          : "Contingut exclusiu publicat."
      );

      // reset form
      setExclusiveContentTitle("");
      setExclusiveContentDescription("");
      setExclusiveContentFile(null);
      setExclusiveContentPreview("");
      setExclusiveContentUrl("");

      await fetchExclusiveContents();
    } catch (err: any) {
      console.log((err as Error).message);
      setExclusiveError(text.errors.generic);
    } finally {
      setIsExclusiveSubmitting(false);
    }
  };
  useEffect(() => {
    if (activeTab === "subscriptions") {
      fetchExclusiveContents();
    }
  }, [activeTab]);

  const daysAgoLabel = (isoDate?: string) => {
    if (!isoDate) return "";
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

    if (language === "spanish") return `hace ${days} días`;
    if (language === "catalan") return `fa ${days} dies`;
    return `${days} days ago`;
  };

  const handleDeleteExclusiveContent = async (id: string) => {
    try {
      setExclusiveError("");
      await ExclusiveContentModuleObject.service.deleteExclusiveContent(id);
      await fetchExclusiveContents();
    } catch (err: any) {
      console.log((err as Error).message);
      setExclusiveError(text.errors.generic);
    }
  };

  // calc auto (même logique que ton UI)
  const recalcDerivedPrices = (monthlyStr: string) => {
    const m = Number(monthlyStr);
    if (!monthlyStr || Number.isNaN(m)) {
      setQuarterlyPrice("");
      setAnnualPrice("");
      return;
    }
    setQuarterlyPrice((m * 4).toFixed(2));
    setAnnualPrice((m * 12).toFixed(2));
  };

  async function fetchSubscriptionStats() {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) return;
    try {
      setStatsLoading(true);
      setStatsError(null);

      const res = await SubscriptionModuleObject.service.getMySubscriptionStats(
        token
      );
      // ou fetch("/subscription/artist/me/stats") selon ton infra

      const payload = res?.data?.data ?? res?.data ?? res;

      setSubStats({
        currency: payload.currency ?? "EUR",
        totalRevenue: payload.totalRevenue ?? "0.00",
        totalSubscribers: payload.totalSubscribers ?? 0,
        activeSubscribers: payload.activeSubscribers ?? 0,
        growth: payload.growth ?? "0%",
      });
    } catch (e: any) {
      console.log((e as Error).message);
      setStatsError(text.errors.generic);
    } finally {
      setStatsLoading(false);
    }
  }
  useEffect(() => {
    if (activeTab === "subscriptions") {
      fetchSubscriptionStats();
      fetchMyPlansPricing();
    }
  }, [activeTab]);

  // quand monthly change => recalcul auto
  useEffect(() => {
    recalcDerivedPrices(monthlyPrice);
  }, [monthlyPrice]);

  async function fetchMyPlansPricing() {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) return;
    const res = await PlanModuleObject.service.getMyPlans(token);

    // selon ton backend, ça peut être res.data.data, res.data, res.plans...
    // Je te mets une extraction robuste :
    const plans: any[] =
      res?.data?.data ?? res?.data?.plans ?? res?.data ?? res?.plans ?? [];

    const monthly = plans.find((p) => p.billingCycle === "monthly");
    const quarterly = plans.find((p) => p.billingCycle === "quarterly");
    const annual = plans.find((p) => p.billingCycle === "annual");

    setMonthlyPrice(monthly?.price ? String(monthly.price) : "");
    setQuarterlyPrice(quarterly?.price ? String(quarterly.price) : "");
    setAnnualPrice(annual?.price ? String(annual.price) : "");
  }

  async function saveMyPricing(monthlyStr: string) {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) return;
    const monthly = Number(monthlyStr);

    if (!Number.isFinite(monthly) || monthly < 0) {
      throw new Error("Invalid monthly price");
    }

    const res = await PlanModuleObject.service.upsertMyPricing(monthly, token);

    // Si ton backend renvoie directement les prix recalculés (recommandé)
    const payload = res?.data?.data ?? res?.data ?? res;

    if (payload?.monthlyPrice !== undefined) {
      setMonthlyPrice(String(payload.monthlyPrice));
      setQuarterlyPrice(String(payload.quarterlyPrice));
      setAnnualPrice(String(payload.annualPrice));
      return;
    }

    // sinon refetch pour être sûr
    await fetchMyPlansPricing();
  }

  const handleSubmitPricing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setPricingSaving(true);
      setPricingError(null);
      setPricingSaved(false);

      await saveMyPricing(monthlyPrice);

      setPricingSaved(true);
      setTimeout(() => setPricingSaved(false), 2500);
    } catch (e: any) {
      console.log((e as Error).message);
      setPricingError(text.errors.generic);
    } finally {
      setPricingSaving(false);
    }
  };

  useEffect(() => {
    // appelle-le quand tu ouvres l'onglet subscriptions
    // si tu as activeTab dans ton composant : if (activeTab === "subscriptions") ...
    (async () => {
      try {
        setPricingLoading(true);
        setPricingError(null);
        await fetchMyPlansPricing();
      } catch (e: any) {
        console.log((e as Error).message);
        setPricingError(text.errors.generic);
      } finally {
        setPricingLoading(false);
      }
    })();
  }, []); // ou dépendance [activeTab]

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
    lyrics: "",
    oldPassword: "",
    videoIntroUrl: "",
    miniVideoLoopUrl: "",
    newPassword: "",
    confirmNewPassword: "",
    trackTitle: "",
    coverUrl: "",
    authors: "",
    producers: "",
    lyricists: "",
    moodId: "",
    musiciansVocals: "",
    musiciansPianoKeyboards: "",
    musiciansWinds: "",
    musiciansPercussion: "",
    musiciansStrings: "",
    mixingEngineer: "",
    masteringEngineer: "",

    // médias annexes
    miniVideoUrl: "",
    signLanguageVideoUrl: "",
    brailleFileUrl: "",
  });

  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");

  const [errors, setErrors] = useState<PasswordErrors>(DefaultValue);

  const [miniVideoPreview, setMiniVideoPreview] = useState<string>("");

  const [singles, setSingles] = useState<Single[]>([]);
  useEffect(() => {
    if (singles.length === 0) fetchSingles();
  }, []);

  async function fetchSingles() {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    const userId = localStorage.getItem(ModuleObject.localState.USER_ID);
    setIsLoading(true);
    try {
      if (!token) return;
      const res = await SingleModuleObject.service.getSingleByUser(
        userId!,
        token
      );
      setSingles(res.singles);
      setSuccess(true);
    } catch (error) {
      console.log((error as Error).message);
      setErrorMessage(text.errors.generic);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchStreamsData() {
    try {
      setIsStreamsLoading(true);
      setStreamsError(null);

      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      const userId = localStorage.getItem(ModuleObject.localState.USER_ID);

      if (!token || !userId) {
        setStreamsError("Utilisateur non authentifié.");
        return;
      }

      // On récupère singles, EPs, albums en parallèle
      const [singlesRes, epsRes, albumsRes] = await Promise.all([
        SingleModuleObject.service.getSingleByUser(userId, token),
        EpModuleObject.service.getEpByUser(userId, token),
        AlbumModuleObject.service.getAlbumByUser(userId, token),
      ]);

      const singles = singlesRes.singles ?? singlesRes.data ?? [];
      const eps = epsRes.eps ?? epsRes.data ?? [];
      const albums = albumsRes.albums ?? albumsRes.data ?? [];

      // On mappe tout en TrackStat homogène
      const singleStats: TrackStat[] = singles.map((s: any) => ({
        id: s.id,
        name: s.title,
        type: "single",
        totalStreams: s.streamsCount ?? 0,
        listenersCount: s.listenersCount ?? 0,
        monthlyStreamsCount: s.monthlyStreamsCount ?? 0,
        topLocations: s.topLocations ?? [], // si ton backend les fournit
      }));

      const epStats: TrackStat[] = eps.map((ep: any) => ({
        id: ep.id,
        name: ep.title,
        type: "ep",
        totalStreams: ep.streamsCount ?? 0,
        listenersCount: ep.listenersCount ?? 0,
        monthlyStreamsCount: ep.monthlyStreamsCount ?? 0,
        topLocations: ep.topLocations ?? [],
      }));

      const albumStats: TrackStat[] = albums.map((alb: any) => ({
        id: alb.id,
        name: alb.title,
        type: "album",
        totalStreams: alb.streamsCount ?? 0,
        listenersCount: alb.listenersCount ?? 0,
        monthlyStreamsCount: alb.monthlyStreamsCount ?? 0,
        topLocations: alb.topLocations ?? [],
      }));

      const allTracks = [...singleStats, ...epStats, ...albumStats];

      // ======= Stats globales =======
      const totalStreamsValue = allTracks.reduce(
        (sum, t) => sum + (t.totalStreams || 0),
        0
      );

      const totalListenersValue = allTracks.reduce(
        (sum, t) => sum + (t.listenersCount ?? 0),
        0
      );

      const totalTracksValue = allTracks.length;

      // Si ton backend fournit un champ monthlyStreams, adapte ici
      const monthlyStreamsValue = allTracks.reduce(
        (sum, t: any) => sum + (t.monthlyStreamsCount ?? 0),
        0
      );

      // ======= Agrégation par localisation =======
      const locationMap = new Map<string, number>();

      allTracks.forEach((t) => {
        (t.topLocations ?? []).forEach((loc) => {
          const prev = locationMap.get(loc.location) ?? 0;
          locationMap.set(loc.location, prev + (loc.streams ?? 0));
        });
      });

      const totalLocStreams = Array.from(locationMap.values()).reduce(
        (sum, v) => sum + v,
        0
      );

      const streamsByLocationArr: LocationStat[] = Array.from(
        locationMap.entries()
      )
        .map(([location, streams]) => ({
          location,
          streams,
          percentage:
            totalLocStreams > 0
              ? `${((streams / totalLocStreams) * 100).toFixed(1)}%`
              : "0%",
        }))
        .sort((a, b) => b.streams - a.streams);

      // Tri des tracks par totalStreams pour le top
      const sortedTracks = [...allTracks].sort(
        (a, b) => b.totalStreams - a.totalStreams
      );

      // Mise à jour du state
      setTracksStats(sortedTracks);
      setTotalStreams(totalStreamsValue);
      setMonthlyStreams(monthlyStreamsValue);
      setTotalTracksCount(totalTracksValue);
      setTotalListeners(totalListenersValue);
      setStreamsByLocation(streamsByLocationArr);
    } catch (error) {
      console.log((error as Error).message);
      setStreamsError(text.errors.generic);
    } finally {
      setIsStreamsLoading(false);
    }
  }

  useEffect(() => {
    if (activeTab === "streams") {
      fetchStreamsData();
    }
  }, [activeTab]);

  useEffect(() => {
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
      console.log((error as Error).message);
      setErrorMessage(text.errors.generic);
      setIsLoading(false);
      setSuccess(false);
    }
  };
  useEffect(() => {
    console.log("formData updated :", formData);
  }, [formData]);

  // --- Ajouter un morceau ---
  async function handleAddTrack(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    console.log("HANDLE ADD TRACK ....");
    const {
      trackTitle,
      authors,
      producers,
      lyricists,
      coverUrl,
      lyrics,
      signLanguageVideoUrl,
      brailleFileUrl,
      musiciansVocals,
      musiciansPianoKeyboards,
      musiciansWinds,
      musiciansPercussion,
      musiciansStrings,
      mixingEngineer,
      masteringEngineer,
    } = formData;

    // ✅ 1. Validation des champs obligatoires
    if (
      !trackTitle ||
      !moodId ||
      !authors ||
      !producers ||
      !lyricists ||
      !lyrics
    ) {
      setErrorMessage(
        "Veuillez renseigner le fichier audio, le titre, le mood, les auteurs, les producteurs, les paroliers et les paroles du morceau."
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

      // ✅ 2. Création du SINGLE
      const {} = formData;

      const singlePayload = {
        title: trackTitle,
        coverUrl: coverUrl,
        userId,
        audioUrl: audioUrl || undefined,
        authors: authors || undefined,
        producers: producers || undefined,
        lyricists: lyricists || undefined,
        musiciansVocals: musiciansVocals || undefined,
        musiciansPianoKeyboards: musiciansPianoKeyboards || undefined,
        musiciansWinds: musiciansWinds || undefined,
        musiciansPercussion: musiciansPercussion || undefined,
        musiciansStrings: musiciansStrings || undefined,
        mixingEngineer: mixingEngineer || undefined,
        masteringEngineer: masteringEngineer || undefined,
      };

      const newSingle = await SingleModuleObject.service.createSingle(
        singlePayload,
        token
      );

      const singleId = (newSingle as any)?.data?.id ?? (newSingle as any)?.id;

      if (!singleId) {
        throw new Error(
          "Impossible de récupérer l'identifiant du single créé."
        );
      }

      // ✅ 3. Création du TRACK
      const newTrack = {
        type: "TRACK_SINGLE",
        moodId,
        audioUrl,
        title: trackTitle || undefined,
        userId: userId || undefined,
        lyrics: lyrics || undefined,
        signLanguageVideoUrl: signLanguageVideoUrl || undefined,
        brailleFileUrl: brailleFileUrl || undefined,
      };

      const res = await TrackModule.service.createTrack(newTrack, token);

      if (!res || !res.data?.id) {
        throw new Error("Impossible de récupérer l'identifiant du track créé.");
      }

      const trackId = res.data.id;

      // ✅ 4. Associer le track au single
      await TrackModule.service.addTrackToSingle(singleId, trackId);

      // ✅ 5. RESET du formulaire + audio local
      setFormData((prev) => ({
        ...prev,
        trackTitle: "",
        moodId: "",
        audioUrl: "",
        authors: "",
        producers: "",
        lyricists: "",
        lyrics: "",
        musiciansVocals: "",
        musiciansPianoKeyboards: "",
        musiciansWinds: "",
        musiciansPercussion: "",
        musiciansStrings: "",
        mixingEngineer: "",
        masteringEngineer: "",
        signLanguageVideoUrl: "",
        brailleFileUrl: "",
        coverUrl: "",
      }));

      setFile(null);

      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
        setAudioPreviewUrl(null);
      }

      setSuccessMessage("Track et single créés et associés avec succès !");
    } catch (error) {
      console.log((error as Error).message);
      setErrorMessage(text.errors.generic);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchMoods() {
    try {
      const token = localStorage.getItem(MoodModule.localState.ACCESS_TOKEN);
      if (!token) return;
      const res = await MoodModule.service.getMoods(token);
      setMoods(res.data);
      console.log("MY MOOD : ", res.data);
    } catch (error) {
      console.log((error as Error).message);
      console.error(text.errors.generic);
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
      console.log((error as Error).message);
      setErrorMessage(text.errors.generic);
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
      console.log((error as Error).message);
      setErrorMessage(text.errors.generic);
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
      console.log((error as Error).message);
      setErrorMessage(text.errors.generic);
      setSuccess(false);
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
      newErrors.oldPassword = text.oldPasswordRequired;
    }

    // 🔐 2. Nouveau mot de passe obligatoire + min 8 caractères
    if (!formData.newPassword) {
      newErrors.newPassword = text.newPasswordRequired;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = text.newPasswordMinLength;
    }

    // 🔐 3. Confirmation obligatoire
    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = text.confirmPasswordRequired;
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = text.passwordsDoNotMatch;
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
        language,
      };

      await UserModule.service.updateUser(userId, payload);

      setErrorMessage("");
      setSuccess(true);
      fetchUser(); // si tu veux re-synchroniser les données
      setSuccessMessage(text.profileUpdateSuccess);
    } catch (error) {
      console.log((error as Error).message);
      setErrorMessage(text.errors.generic);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const content = {
    spanish: {
      // ES
      recentAlbumUploads: "Subidas recientes de álbumes",
      epTitle: "Título del EP",
      uploadArtwork: "Subir Portada",
      artworkDragDrop: "Arrastra tu portada aquí o haz clic para subirla",
      creationInfo: "Información de creación del EP",
      trackTitle: "Título de la pista principal",
      authors: "Autores",
      producers: "Productores",
      lyricists: "Letristas",
      musicians: "Músicos",
      musiciansVocals: "Vocales",
      musiciansPianoKeyboards: "Piano / Teclados",
      musiciansWinds: "Vientos",
      musiciansPercussion: "Percusión",
      musiciansStrings: "Cuerdas",
      mixingEngineer: "Ingeniero de Mezcla",
      masteringEngineer: "Ingeniero de Mastering",
      uploadButtonEp: "Subir ep",
      uploadButtonSingle: "Subir single",
      uploadButtonAlbum: "Subir álbum",
      recentEpUploads: "Últimos EP subidos",
      noEpUploadedYet: "Aún no se ha subido ningún EP.",
      forEp: "Para el EP",
      closeTracksEditor: "Cerrar",
      recentSingleUploads: "Subidas recientes",
      remove: "Quitar",
      albumTracksTitle: "Pistas del álbum",
      saveTracks: "Guardar pista",
      savedTracksTitle: "Pistas ya guardadas",
      noSavedTracks: "Todavía no hay pistas guardadas para este álbum.",
      prevPage: "Anterior",
      nextPage: "Siguiente",
      pageLabel: "Página",

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
      payout: "Payout",
      album: "Álbum",
      dragDrop: "Arrastra y suelta tu archivo aquí o haz clic para seleccionar",

      albumTitle: "Título del Álbum",

      addTrack: "Añadir Pista",
      removeTrack: "Eliminar Pista",
      trackNumber: "Pista",
      uploadMiniVideo: "Subir Mini Video Loop",
      miniVideoDragDrop: "Arrastra tu video loop aquí (MP4, MOV)",
      uploadLyrics: "Sube la Letra",
      lyricsPlaceholder: "Escribe o pega la letra de tu canción aquí...",
      signLanguageVideo: "Video en Lenguaje de Signos",
      signLanguageVideoDragDrop:
        "Arrastra tu video en lenguaje de signos (MP4, MOV)",
      brailleFile: "Archivo Braille",
      brailleFileDragDrop: "Arrastra tu archivo Braille (BRF, BRL, TXT)",

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
      noContent: "Aún no has subido contenido",
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

      singleAudioUploadSuccess: "Archivo de audio subido correctamente.",
      singleAudioUploadError:
        "Se produjo un error al subir el archivo de audio.",
      singleArtworkUploadSuccess: "Portada subida correctamente.",
      singleArtworkUploadError: "Se produjo un error al subir la portada.",
      singleMiniVideoUploadSuccess: "Mini vídeo subido correctamente.",
      singleMiniVideoError: "Se produjo un error al subir el mini vídeo.",
      singleSignLanguageVideoUploadSuccess:
        "Vídeo en lengua de signos subido correctamente.",
      singleSignLanguageVideoError:
        "Se produjo un error al subir el vídeo en lengua de signos.",
      singleBrailleUploadSuccess: "Archivo en braille subido correctamente.",
      singleBrailleUploadError:
        "Se produjo un error al subir el archivo en braille.",

      singleRequiredFieldsError:
        "Por favor, rellena todos los campos obligatorios (audio, portada, título, mood, autores, productores, letristas y letras).",

      authUserNotAuthenticated: "Usuario no autenticado.",
      singleIdNotFoundError: "No se pudo obtener el ID del single creado.",
      trackIdNotFoundError: "No se pudo obtener el ID de la pista creada.",

      singleCreateSuccess: "¡Single creado con éxito!",
      singleCreateError: "Se produjo un error al crear el single y la pista.",

      audioNotSupported: "Tu navegador no soporta el elemento de audio.",

      noSingleUploadedYet: "Todavía no se ha subido ningún single.",
      noAlbumUploadedYet: "Ningún álbum subido por el momento.",
      noSubscriptions: "No hay suscripciones",
      oldPasswordRequired: "Por favor, introduce tu contraseña actual",
      newPasswordRequired: "Por favor, introduce tu nueva contraseña",
      newPasswordMinLength: "La contraseña debe tener al menos 8 caracteres",
      confirmPasswordRequired: "Por favor, confirma tu nueva contraseña",
      passwordsDoNotMatch: "Las contraseñas no coinciden",

      profileUpdateSuccess: "Perfil actualizado con éxito.",
      errors: {
        generic: "Algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      },
      subscription: {
        title: "Suscribirse",
        subtitle: "Elige un plan para suscribirte a {{artistName}}",

        paymentMethods: {
          stripe: "Stripe",
          flutterwave: "Flutterwave",
        },

        buttons: {
          cancel: "Cancelar",
          continue: "Continuar al pago",
          redirecting: "Redirigiendo…",
        },

        messages: {
          redirecting: "Redirigiendo…",
          paymentFailed: "El pago ha fallado",
        },
      },
      epTracksTitle: "Canciones del EP",
      requiredFields:
        "Por favor, complete todos los campos obligatorios (audio, portada, título, mood, autores, productores, letristas y letras).",
      unauthenticatedUser: "Usuario no autenticado.",
      epDeletedSuccess: "EP eliminado con éxito.",
      completeAudioLyricsMood:
        "Por favor, completa toda la información requerida.",
      epCreatedSuccess: "¡EP creado con éxito!",
      deleteModaltitle: "Confirmar eliminación",
      deleteModalmessage:
        "¿Está seguro de que desea eliminar este elemento? Esta acción es permanente.",
      deleteModalcancel: "Cancelar",
      deleteModaldelete: "Eliminar",
      deleteModaldeleting: "Eliminando...",
      creationInfoEp: "Información de creación de EP",
      creationInfoSingle: "Información de creación de Single",
      creationInfoAlbum: "Información de creación de Álbum",

      // Espagnol
      epUploadSuccess: "EP subido con éxito",
      track: {
        errors: {
          notAuthenticated: "Usuario no autenticado.",
          fillAllFields:
            "Cada pista debe tener al menos un audio, un título y un mood.",
          generic: "Ocurrió un error al guardar las pistas.",
        },
        success: {
          tracksSaved: "¡Pistas creadas y asociadas al EP con éxito!",
        },
      },
      albumCreatedSuccess: "¡ALBUM creado con éxito!",
    },
    english: {
      // EN

      albumCreatedSuccess: "ALBUM created successfully!",
      epUploadSuccess: "EP uploaded successfully",

      deleteModaltitle: "Confirm deletion",
      deleteModalmessage:
        "Are you sure you want to delete this item? This action is permanent.",
      deleteModalcancel: "Cancel",
      deleteModaldelete: "Delete",
      deleteModaldeleting: "Deleting...",

      completeAudioLyricsMood: "Please complete all required informations.",

      unauthenticatedUser: "User not authenticated.",

      errors: {
        generic: "Something went wrong. Please try again later.",
      },

      track: {
        errors: {
          notAuthenticated: "User not authenticated.",
          fillAllFields:
            "Each track must have at least an audio, a title, and a mood.",
          generic: "Something went wrong while saving tracks.",
        },
        success: {
          tracksSaved: "Tracks created successfully!",
        },
      },

      subscription: {
        title: "Subscribe",
        subtitle: "Choose a plan to subscribe to {{artistName}}",

        paymentMethods: {
          stripe: "Stripe",
          flutterwave: "Flutterwave",
        },

        buttons: {
          cancel: "Cancel",
          continue: "Continue to Payment",
          redirecting: "Redirecting…",
        },

        messages: {
          redirecting: "Redirecting…",
          paymentFailed: "Payment failed",
        },
      },
      oldPasswordRequired: "Please enter your current password",
      newPasswordRequired: "Please enter your new password",
      newPasswordMinLength: "Password must be at least 8 characters long",
      confirmPasswordRequired: "Please confirm your new password",
      passwordsDoNotMatch: "Passwords do not match",
      profileUpdateSuccess: "Profile updated successfully.",
      epTitle: "EP Title",
      uploadArtwork: "Upload Artwork",
      artworkDragDrop: "Drag & drop your artwork here or click to upload",
      creationInfoEp: "EP Creation Information",
      creationInfoSingle: "Single Creation Information",
      creationInfoAlbum: "Album Creation Information",
      trackTitle: "Main Track Title",
      recentAlbumUploads: "Recent ALBUM Uploads",
      authors: "Authors",
      producers: "Producers",
      lyricists: "Lyricists",
      musicians: "Musicians",
      musiciansVocals: "Vocals",
      musiciansPianoKeyboards: "Piano / Keyboards",
      musiciansWinds: "Winds",
      musiciansPercussion: "Percussion",
      musiciansStrings: "Strings",
      mixingEngineer: "Mixing Engineer",
      masteringEngineer: "Mastering Engineer",
      uploadButtonEp: "Upload ep",
      uploadButtonSingle: "Upload single",
      uploadButtonAlbum: "Upload Album",
      recentEpUploads: "Recent EP Uploads",
      noEpUploadedYet: "No EP uploaded yet.",
      forEp: "For EP",
      closeTracksEditor: "Close",
      remove: "Remove",
      recentSingleUploads: "Recent Uploads",
      noSubscriptions: "No susbscription",
      singleAudioUploadSuccess: "Audio file uploaded successfully.",
      singleAudioUploadError:
        "An error occurred while uploading the audio file.",
      singleArtworkUploadSuccess: "Artwork uploaded successfully.",
      singleArtworkUploadError:
        "An error occurred while uploading the artwork.",
      singleMiniVideoUploadSuccess: "Mini video uploaded successfully.",
      singleMiniVideoUploadError:
        "An error occurred while uploading the mini video.",
      singleSignLanguageVideoUploadSuccess:
        "Sign language video uploaded successfully.",
      singleSignLanguageVideoError:
        "An error occurred while uploading the sign language video.",
      singleBrailleUploadSuccess: "Braille file uploaded successfully.",
      singleBrailleUploadError:
        "An error occurred while uploading the braille file.",

      singleRequiredFieldsError:
        "Please fill in all required fields (audio, artwork, title, mood, authors, producers, lyricists and lyrics).",

      authUserNotAuthenticated: "User not authenticated.",
      singleIdNotFoundError: "Unable to retrieve the ID of the created single.",
      trackIdNotFoundError: "Unable to retrieve the ID of the created track.",

      singleCreateSuccess: "Single created successfully!",
      singleCreateError:
        "An error occurred while creating the single and the track.",

      audioNotSupported: "Your browser does not support the audio element.",

      noSingleUploadedYet: "No single uploaded yet.",

      albumTracksTitle: "Album tracks",
      epTracksTitle: "Ep tracks",
      saveTracks: "Save track",
      savedTracksTitle: "Tracks already saved",
      noSavedTracks: "No track saved for this album yet.",
      prevPage: "Previous",
      nextPage: "Next",
      pageLabel: "Page",
      title: "Artist Dashboard",
      payout: "Payout",
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

      albumTitle: "Album Title",

      addTrack: "Add Track",
      removeTrack: "Remove Track",
      trackNumber: "Track",
      uploadMiniVideo: "Upload Mini Video Loop",
      miniVideoDragDrop: "Drag your video loop here (MP4, MOV)",
      uploadLyrics: "Upload Lyrics",
      lyricsPlaceholder: "Write or paste your song lyrics here...",
      signLanguageVideo: "Sign Language Video",
      signLanguageVideoDragDrop:
        "Drag your sign language video here (MP4, MOV)",
      brailleFile: "Braille File",
      brailleFileDragDrop: "Drag your Braille file here (BRF, BRL, TXT)",

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
      noContent: "You haven't uploaded content yet",
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
      paymentMethodsTitle:
        "Payment Methods to Receive Subscriptions and Royalties",
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
      noAlbumUploadedYet: "No album uploaded yet.",
      requiredFields:
        "Please fill in all required fields (audio, artwork, title, mood, authors, producers, lyricists, and lyrics).",
      epDeletedSuccess: "EP deleted successfully.",
      epCreatedSuccess: "EP created successfully!",
    },
    catalan: {
      // Catalan
      albumCreatedSuccess: "ÀLBUM creat amb èxit!",
      track: {
        errors: {
          notAuthenticated: "Usuari no autenticat.",
          fillAllFields:
            "Cada pista ha de tenir com a mínim un àudio, un títol i un mood.",
          generic: "S'ha produït un error en desar les pistes.",
        },
        success: {
          tracksSaved: "Pistes creades i associades a l'EP amb èxit!",
        },
      },
      epUploadSuccess: "EP pujat amb èxit",
      creationInfoEp: "Informació de creació d'EP",
      creationInfoSingle: "Informació de creació de Single",
      creationInfoAlbum: "Informació de creació d'Àlbum",
      deleteModaltitle: "Confirmeu l'eliminació",
      deleteModalmessage:
        "Esteu segur que voleu eliminar aquest element? Aquesta acció és permanent.",
      deleteModalcancel: "Cancel·lar",
      deleteModaldelete: "Eliminar",
      deleteModaldeleting: "Eliminant...",

      epCreatedSuccess: "EP creat amb èxit!",

      epDeletedSuccess: "EP eliminat amb èxit.",

      unauthenticatedUser: "Usuari no autenticat.",

      epTracksTitle: "Cançons de l'EP",
      requiredFields:
        "Si us plau, ompliu tots els camps obligatoris (àudio, portada, títol, mood, autors, productors, letristes i lletres).",
      errors: {
        generic:
          "Alguna cosa ha anat malament. Si us plau, torna-ho a provar més tard.",
      },
      subscription: {
        title: "Subscriure’s",
        subtitle: "Tria un pla per subscriure’t a {{artistName}}",

        paymentMethods: {
          stripe: "Stripe",
          flutterwave: "Flutterwave",
        },

        buttons: {
          cancel: "Cancel·lar",
          continue: "Continuar al pagament",
          redirecting: "Redirigint…",
        },

        messages: {
          redirecting: "Redirigint…",
          paymentFailed: "El pagament ha fallat",
        },
      },
      oldPasswordRequired: "Si us plau, introdueix la teva contrasenya actual",
      newPasswordRequired: "Si us plau, introdueix la teva nova contrasenya",
      newPasswordMinLength: "La contrasenya ha de tenir almenys 8 caràcters",
      confirmPasswordRequired: "Si us plau, confirma la teva nova contrasenya",
      passwordsDoNotMatch: "Les contrasenyes no coincideixen",

      profileUpdateSuccess: "Perfil actualitzat amb èxit.",
      recentAlbumUploads: "Àlbums pujats recentment",
      epTitle: "Títol de l'EP",
      uploadArtwork: "Pujar Portada",
      artworkDragDrop: "Arrossega la teva portada aquí o fes clic per pujar-la",
      creationInfo: "Informació de creació de l'EP",
      trackTitle: "Títol de la pista principal",
      authors: "Autors",
      producers: "Productors",
      lyricists: "Lletristes",
      musicians: "Músics",
      musiciansVocals: "Veus",
      musiciansPianoKeyboards: "Piano / Teclats",
      musiciansWinds: "Vent",
      musiciansPercussion: "Percussió",
      musiciansStrings: "Cordes",
      mixingEngineer: "Enginyer de Mescla",
      masteringEngineer: "Enginyer de Mastering",
      uploadButtonEp: "Pujar ep",
      uploadButtonSingle: "Pujar single",
      uploadButtonAlbum: "Pujar àlbum",
      recentEpUploads: "Últims EP pujats",
      noEpUploadedYet: "Encara no s'ha pujat cap EP.",
      forEp: "Per a l'EP",
      closeTracksEditor: "Tancar",
      remove: "Eliminar",
      noSubscriptions: "No hi ha subscripcions",
      // CA
      noAlbumUploadedYet: "Cap àlbum pujat de moment.",
      recentSingleUploads: "Càrregues recents",
      singleAudioUploadSuccess: "Fitxer d’àudio pujat correctament.",
      singleAudioUploadError:
        "S’ha produït un error en pujar el fitxer d’àudio.",
      singleArtworkUploadSuccess: "Portada pujada correctament.",
      singleArtworkUploadError: "S’ha produït un error en pujar la portada.",
      singleMiniVideoUploadSuccess: "Mini vídeo pujat correctament.",
      singleMiniVideoError: "S’ha produït un error en pujar el mini vídeo.",
      singleSignLanguageVideoUploadSuccess:
        "Vídeo en llengua de signes pujat correctament.",
      singleSignLanguageVideoError:
        "S’ha produït un error en pujar el vídeo en llengua de signes.",
      singleBrailleUploadSuccess: "Fitxer en braille pujat correctament.",
      singleBrailleUploadError:
        "S’ha produït un error en pujar el fitxer en braille.",

      singleRequiredFieldsError:
        "Si us plau, omple tots els camps obligatoris (àudio, portada, títol, mood, autors, productors, lletristes i lletra).",

      authUserNotAuthenticated: "Usuari no autenticat.",
      singleIdNotFoundError: "No s’ha pogut obtenir l’ID del single creat.",
      trackIdNotFoundError: "No s’ha pogut obtenir l’ID de la pista creada.",

      singleCreateSuccess: "Single creat correctament!",
      singleCreateError: "S’ha produït un error en crear el single i la pista.",

      audioNotSupported: "El teu navegador no admet l’element d’àudio.",

      noSingleUploadedYet: "Encara no s’ha pujat cap single.",

      albumTracksTitle: "Pistes de l’àlbum",
      saveTracks: "Desar pista",
      savedTracksTitle: "Pistes ja desades",
      noSavedTracks: "Encara no hi ha pistes desades per a aquest àlbum.",
      prevPage: "Anterior",
      nextPage: "Següent",
      pageLabel: "Pàgina",

      payout: "Payout",
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

      albumTitle: "Títol de l'Àlbum",

      addTrack: "Afegir Pista",
      removeTrack: "Eliminar Pista",
      trackNumber: "Pista",
      uploadMiniVideo: "Pujar Mini Video Loop",
      miniVideoDragDrop: "Arrossega el teu video loop aquí (MP4, MOV)",
      uploadLyrics: "Puja la Lletra",
      lyricsPlaceholder: "Escriu o enganxa la lletra de la teva cançó aquí...",
      signLanguageVideo: "Vídeo en Llenguatge de Signes",
      signLanguageVideoDragDrop:
        "Arrossega el teu vídeo en llenguatge de signes (MP4, MOV)",
      brailleFile: "Arxiu Braille",
      brailleFileDragDrop: "Arrossega el teu arxiu Braille (BRF, BRL, TXT)",

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
      noContent: "Encara no has pujat contingut",
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
      completeAudioLyricsMood:
        "Si us plau, completa tota la informació requerida.",
    },
  };

  const text = content[language as keyof typeof content];

  const filteredTracks = React.useMemo(() => {
    return tracksStats.filter((t) => {
      const matchesType = trackFilter === "all" ? true : t.type === trackFilter;
      const matchesSearch = trackSearch
        ? t.name.toLowerCase().includes(trackSearch.toLowerCase())
        : true;
      return matchesType && matchesSearch;
    });
  }, [tracksStats, trackFilter, trackSearch]);

  const [isArtist, setIsArtist] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem(ModuleObject.localState.ACCESS_TOKEN);
    localStorage.removeItem(ModuleObject.localState.USER_ID);
    localStorage.removeItem(ModuleObject.localState.USER_DATA);
    localStorage.removeItem(ModuleObject.localState.USER_ROLE);
    router.replace("/home?view=logout");
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
    <div
      className="
      relative w-full h-[100dvh]
      overflow-hidden
      bg-gradient-to-br from-slate-900 via-purple-900 to-black
      text-white
    "
    >
      <div
        className="
    relative z-10
    h-[100dvh]
    overflow-y-auto overscroll-contain
    touch-pan-y
    px-4 sm:px-6 md:px-8
    pt-[calc(env(safe-area-inset-top)+1.25rem)]
    pb-[calc(env(safe-area-inset-bottom)+1.25rem)]
  "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {isArtist && (
          <button
            style={{
              outline: "3px solid #ffffff",
              outlineOffset: "3px",
            }}
            type="button"
            onClick={() => router.push("/dashboard/artist/select")}
            className="cursor-pointer rounded-2xl flex items-center gap-2 text-white drop-shadow hover:opacity-70 transition-opacity mb-6"
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
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-white drop-shadow-lg">
              {text.title}
            </h1>

            {onGoToStreaming && (
              <button
                style={{
                  outline: "3px solid #ffffff",
                  outlineOffset: "3px",
                }}
                type="button"
                onClick={onGoToStreaming}
                className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 backdrop-blur-md border-2 border-white/40 rounded-xl text-white hover:from-blue-500/50 hover:to-cyan-500/50 hover:border-white/60 transition-all shadow-lg"
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
              style={{
                outline: "3px solid #ffffff",
                outlineOffset: "3px",
              }}
              onClick={() => {
                router.push("/subscription");
              }}
              className="
                  flex cursor-pointer items-center gap-2
                  px-3 sm:px-1 py-2
                  bg-white/20 backdrop-blur-md
                  border border-white/30
                  rounded-lg
                  text-white text-sm sm:text-base
                  drop-shadow
                  hover:bg-white/30 transition-all
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Subscription"
              type="button"
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
              >
                <path d="M12 2L3 7v6c0 5 3.8 8.7 9 9 5.2-.3 9-4 9-9V7l-9-5z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              Unlimited Access
            </button>
            <button
              style={{
                outline: "3px solid #ffffff",
                outlineOffset: "3px",
              }}
              onClick={handleLogout}
              type="button"
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
          <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: "profile", label: text.profile, icon: Users },
              { id: "upload", label: text.upload, icon: Upload },
              { id: "streams", label: text.streams, icon: TrendingUp },
              { id: "subscriptions", label: text.subscriptions, icon: Users },
              { id: "royalties", label: text.royalties, icon: DollarSign },

              // 👉 Nouvel onglet ajouté ici
              { id: "payout", label: text.payout, icon: PayoutIcon },
            ].map(({ id, label, icon: Icon }) => (
              <button
                type="button"
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
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border border-white/20">
              <h2 className="text-xl sm:text-2xl text-white drop-shadow-lg mb-6">
                {text.profileTitle}
              </h2>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {/* Profile Picture Upload */}
                <div>
                  <h3 className="text-lg sm:text-xl text-white drop-shadow mb-4">
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
                    <div
                      onDragEnter={(e) => {
                        preventDefaults(e);
                        setIsDraggingPic(true);
                      }}
                      onDragOver={preventDefaults}
                      onDragLeave={(e) => {
                        preventDefaults(e);
                        setIsDraggingPic(false);
                      }}
                      onDrop={handleDropProfile}
                      className={`border-2 border-dashed rounded-xl p-8 sm:p-10 md:p-12 text-center transition-all cursor-pointer aspect-square flex items-center justify-center
              ${
                isDraggingPic
                  ? "border-white/80 bg-white/15"
                  : "border-white/30 bg-white/5 hover:bg-white/10"
              }`}
                    >
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
                  <h3 className="text-lg sm:text-xl text-white drop-shadow mb-4">
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
                    <div
                      onDragEnter={(e) => {
                        preventDefaults(e);
                        setIsDraggingVideo(true);
                      }}
                      onDragOver={preventDefaults}
                      onDragLeave={(e) => {
                        preventDefaults(e);
                        setIsDraggingVideo(false);
                      }}
                      onDrop={handleDropVideo}
                      className={`border-2 border-dashed rounded-xl p-8 sm:p-10 md:p-12 text-center transition-all cursor-pointer aspect-square flex items-center justify-center
              ${
                isDraggingVideo
                  ? "border-white/80 bg-white/15"
                  : "border-white/30 bg-white/5 hover:bg-white/10"
              }`}
                    >
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
                <h3 className="text-lg sm:text-xl text-white drop-shadow mb-4">
                  {text.bioTitle}
                </h3>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
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
              focus:border-white/40 transition-all text-base sm:text-xl resize-none"
                    />

                    {bioOneWord && (
                      <p className="text-white/60 text-sm mt-2 text-center">
                        {bioOneWord.length}/50
                      </p>
                    )}

                    {successMessage && (
                      <CustomSuccess message={successMessage} />
                    )}
                    {errorMessage && <CustomAlert message={errorMessage} />}

                    <button
                      type="submit"
                      className="mt-4 cursor-pointer w-full py-3 px-4 bg-white/20 backdrop-blur-md 
              border border-white/30 rounded-lg text-white drop-shadow 
              hover:bg-white/30 transition-all"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                <h3 className="text-lg sm:text-xl text-white drop-shadow mb-4">
                  {text.accountSecurity}
                </h3>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
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
                          type="password"
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
                          type="password"
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
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                  type="button"
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
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl text-white drop-shadow-lg mb-2">
                  {text.uploadTitle}
                </h2>
                <p className="text-white/80 drop-shadow mb-6 text-sm sm:text-base">
                  {text.uploadSubtitle}
                </p>

                {/* Type Selection */}
                <div className="mb-6">
                  <label className="block text-white/90 drop-shadow mb-3 text-sm sm:text-base">
                    {text.typeLabel}
                  </label>

                  {/* 1 colonne sur mobile, 3 colonnes à partir de sm */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setUploadType("single")}
                      className={`cursor-pointer w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg border-2 text-sm sm:text-base transition-all ${
                        uploadType === "single"
                          ? "bg-white/30 border-white/60 text-white"
                          : "bg-white/10 border-white/20 text-white/70 hover:bg-white/15"
                      }`}
                    >
                      {text.single}
                    </button>

                    <button
                      type="button"
                      onClick={() => setUploadType("ep")}
                      className={`cursor-pointer w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg border-2 text-sm sm:text-base transition-all ${
                        uploadType === "ep"
                          ? "bg-white/30 border-white/60 text-white"
                          : "bg-white/10 border-white/20 text-white/70 hover:bg-white/15"
                      }`}
                    >
                      {text.ep}
                    </button>

                    <button
                      type="button"
                      onClick={() => setUploadType("album")}
                      className={`cursor-pointer w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg border-2 text-sm sm:text-base transition-all ${
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
                  <SingleUploadSection text={text} language={language} />
                ) : (
                  // Album/EP Title
                  // <div className="mb-6">
                  //   <label className="block text-white/90 drop-shadow mb-2">
                  //     {uploadType === "ep" ? text.epTitle : text.albumTitle}
                  //   </label>
                  //   <input
                  //     type="text"
                  //     value={trackTitle}
                  //     onChange={(e) => setTrackTitle(e.target.value)}
                  //     className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all"
                  //   />
                  // </div>
                  <></>
                )}
              </div>

              {uploadType === "album" && (
                <AlbumUploadSection text={text} language={language} />
              )}

              {uploadType === "ep" && (
                <EpUploadSection text={text} language={language} />
              )}

              {/* Additional Upload Options */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Artwork Upload */}
                {/* Mini Video Loop Upload */}
              </div>

              {/* Recent Uploads */}
            </div>
          )}

          {/* Streams Tab */}
          {activeTab === "streams" && (
            <div className="space-y-6">
              {/* Cartes de stats globales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={20} className="text-white" />
                    <h3 className="text-white/80 drop-shadow text-sm sm:text-base">
                      {text.totalStreams}
                    </h3>
                  </div>
                  <p className="text-2xl sm:text-3xl text-white drop-shadow">
                    {totalStreams.toLocaleString()}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={20} className="text-white" />
                    <h3 className="text-white/80 drop-shadow text-sm sm:text-base">
                      {text.monthlyStreams}
                    </h3>
                  </div>
                  <p className="text-2xl sm:text-3xl text-white drop-shadow">
                    {monthlyStreams.toLocaleString()}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Music size={20} className="text-white" />
                    <h3 className="text-white/80 drop-shadow text-sm sm:text-base">
                      {text.tracks}
                    </h3>
                  </div>
                  <p className="text-2xl sm:text-3xl text-white drop-shadow">
                    {totalTracksCount}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={20} className="text-white" />
                    <h3 className="text-white/80 drop-shadow text-sm sm:text-base">
                      {text.listeners}
                    </h3>
                  </div>
                  <p className="text-2xl sm:text-3xl text-white drop-shadow">
                    {totalListeners.toLocaleString()}
                  </p>
                </div>
              </div>

              {streamsError && <CustomAlert message={streamsError} />}
              {isStreamsLoading && (
                <p className="text-white/60 text-sm">
                  {/* loader optionnel */}
                </p>
              )}

              {/* Top Tracks + By Location */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Tracks */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h3 className="text-lg sm:text-xl text-white drop-shadow mb-4">
                    {text.topTracks}
                  </h3>
                  <div className="space-y-3">
                    {tracksStats.slice(0, 5).map((track, index) => (
                      <div
                        key={track.id}
                        className="flex items-center justify-between gap-3 p-3 sm:p-4 bg-white/5 rounded-lg"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xl sm:text-2xl text-white/60 flex-shrink-0">
                            #{index + 1}
                          </span>
                          <span className="text-white drop-shadow truncate">
                            {track.name}
                          </span>
                        </div>
                        <span className="text-white/80 flex-shrink-0 text-sm sm:text-base">
                          {track.totalStreams.toLocaleString()}
                        </span>
                      </div>
                    ))}
                    {tracksStats.length === 0 && (
                      <p className="text-white/60 text-sm">
                        {text.noSavedTracks ||
                          "No track saved for this album yet."}
                      </p>
                    )}
                  </div>
                </div>

                {/* Streams by Location */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <h3 className="text-lg sm:text-xl text-white drop-shadow mb-4">
                    {text.byLocation}
                  </h3>
                  <div className="space-y-4">
                    {streamsByLocation.map((location, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="text-white drop-shadow truncate">
                            {getCountryName(location.location)}
                          </span>
                          <span className="text-white/80 flex-shrink-0 text-sm sm:text-base">
                            {location.streams.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="bg-white/50 h-2 rounded-full transition-all"
                            style={{ width: location.percentage }}
                          />
                        </div>
                        <span className="text-white/60 text-xs sm:text-sm">
                          {location.percentage}
                        </span>
                      </div>
                    ))}
                    {streamsByLocation.length === 0 && (
                      <p className="text-white/60 text-sm">
                        {text.noContent || "No location data yet."}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Streams per Track with Locations */}
              <div className="space-y-6">
                {/* Header + Filter */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg sm:text-2xl text-white drop-shadow">
                    {text.streamsPerTrack}
                  </h3>

                  {/* Filter Dropdown */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <label className="text-white/90 drop-shadow text-sm sm:text-base">
                      {text.filterByType}:
                    </label>
                    <select
                      value={trackFilter}
                      onChange={(e) => setTrackFilter(e.target.value as any)}
                      className="w-full sm:w-auto px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-black cursor-pointer focus:outline-none focus:border-white/40 transition-all"
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

                {/* List */}
                <div className="max-h-[70vh] sm:max-h-[800px] overflow-y-auto overscroll-contain space-y-4 sm:space-y-6 pr-0 sm:pr-2">
                  {filteredTracks.map((track) => (
                    <div
                      key={track.id}
                      className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20"
                    >
                      {/* Track header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                        <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                          <div className="mt-0.5 sm:mt-1 flex-shrink-0">
                            <Play size={22} className="text-white/80" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                              <h4 className="text-base sm:text-xl text-white drop-shadow font-medium break-words sm:truncate">
                                {track.name}
                              </h4>

                              <span className="w-fit px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[11px] sm:text-xs text-white/90 uppercase">
                                {track.type === "single"
                                  ? text.single
                                  : track.type === "ep"
                                  ? text.ep
                                  : text.album}
                              </span>
                            </div>

                            <p className="text-white/60 mt-1 text-sm">
                              {track.totalStreams.toLocaleString()}{" "}
                              {text.totalStreams.toLowerCase()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Location section title */}
                      <h5 className="text-white/90 drop-shadow mb-3 sm:mb-4 text-sm sm:text-base">
                        {text.locationPerTrack}
                      </h5>

                      {/* Locations grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {(track.topLocations ?? []).map(
                          (location, locIndex) => (
                            <div
                              key={locIndex}
                              className="bg-white/5 rounded-lg p-4 border border-white/10"
                            >
                              <div className="flex items-center justify-between gap-3 mb-2">
                                <span className="text-white drop-shadow truncate">
                                  {getCountryName(location.location)}
                                </span>
                                <span className="text-white/80 flex-shrink-0 text-sm">
                                  {location.streams.toLocaleString()}
                                </span>
                              </div>

                              <div className="w-full bg-white/10 rounded-full h-2 mb-1 overflow-hidden">
                                <div
                                  className="bg-white/50 h-2 rounded-full transition-all"
                                  style={{ width: location.percentage ?? "0%" }}
                                />
                              </div>

                              <span className="text-white/60 text-xs sm:text-sm">
                                {location.percentage ?? "0%"}
                              </span>
                            </div>
                          )
                        )}

                        {(track.topLocations ?? []).length === 0 && (
                          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <p className="text-white/60 text-sm">
                              {text.noContent ||
                                "No location data for this track."}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "subscriptions" && (
            <div className="space-y-6">
              {/* Subscription Pricing Section */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border border-white/20">
                <h2 className="text-xl sm:text-2xl text-white drop-shadow-lg mb-6">
                  {text.subscriptionPricing}
                </h2>

                <div>
                  <label className="block text-white drop-shadow mb-6 text-base sm:text-lg">
                    {text.setPriceLabel}
                  </label>

                  <form onSubmit={handleSubmitPricing}>
                    {/* Messages */}
                    {pricingLoading && (
                      <p className="text-white/70 text-sm mb-4">
                        Loading pricing…
                      </p>
                    )}

                    {pricingError && (
                      <div className="mb-4 p-3 bg-red-500/20 border border-red-400/40 rounded-lg">
                        <p className="text-red-200 text-sm">{pricingError}</p>
                      </div>
                    )}

                    {pricingSaved && (
                      <div className="mb-4 p-3 bg-green-500/20 border border-green-400/40 rounded-lg">
                        <p className="text-green-200 text-sm">
                          {language === "spanish"
                            ? "Precios guardados"
                            : language === "english"
                            ? "Prices saved"
                            : "Preus guardats"}
                        </p>
                      </div>
                    )}

                    {/* Pricing Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
                      {/* Monthly */}
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                        <h3 className="text-white drop-shadow mb-4 text-base sm:text-lg">
                          {text.monthly}
                        </h3>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xl">
                            €
                          </span>
                          <input
                            type="number"
                            value={monthlyPrice}
                            onChange={(e) => {
                              let value = parseFloat(e.target.value);
                              if (value < 1) value = 1;
                              if (value > 5) value = 5;
                              setMonthlyPrice(value.toString());
                            }}
                            placeholder="1.00"
                            step="0.01"
                            min="1"
                            max="5"
                            disabled={pricingLoading || pricingSaving}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all disabled:opacity-60"
                          />
                        </div>
                        <p className="text-white/60 text-sm mt-2">
                          {text.pricePerMonth}
                        </p>
                      </div>

                      {/* Quarterly */}
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                        <h3 className="text-white drop-shadow mb-4 text-base sm:text-lg">
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
                            {language === "spanish" &&
                              "(Calculado automáticamente)"}
                            {language === "english" &&
                              "(Calculated automatically)"}
                            {language === "catalan" &&
                              "(Calculat automàticament)"}
                          </p>
                        )}
                      </div>

                      {/* Annual */}
                      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                        <h3 className="text-white drop-shadow mb-4 text-base sm:text-lg">
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
                            {language === "spanish" &&
                              "(Calculado automáticamente)"}
                            {language === "english" &&
                              "(Calculated automatically)"}
                            {language === "catalan" &&
                              "(Calculat automàticament)"}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={
                          !monthlyPrice || pricingSaving || pricingLoading
                        }
                        className="px-6 sm:px-8 cursor-pointer py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {pricingSaving
                          ? language === "english"
                            ? "Saving..."
                            : language === "spanish"
                            ? "Guardando..."
                            : "Desant..."
                          : text.savePrice}
                      </button>
                    </div>
                  </form>

                  {(monthlyPrice || quarterlyPrice || annualPrice) && (
                    <div className="mt-6 p-4 sm:p-5 bg-white/5 backdrop-blur-md rounded-xl border border-white/20">
                      <p className="text-white/90 text-sm mb-4 font-medium">
                        {language === "spanish" &&
                          "Los fans podrán elegir entre estas opciones de suscripción:"}
                        {language === "english" &&
                          "Fans will be able to choose between these subscription options:"}
                        {language === "catalan" &&
                          "Els fans podran triar entre aquestes opcions de subscripció:"}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                          <p className="text-white/60 text-xs uppercase tracking-wide mb-1">
                            {text.monthly}
                          </p>
                          <p className="text-white text-2xl font-semibold">
                            €{monthlyPrice || "—"}
                          </p>
                          <p className="text-white/50 text-xs mt-1">
                            {text.pricePerMonth}
                          </p>
                        </div>

                        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                          <p className="text-white/60 text-xs uppercase tracking-wide mb-1">
                            {text.quarterly}
                          </p>
                          <p className="text-white text-2xl font-semibold">
                            €{quarterlyPrice || "—"}
                          </p>
                          <p className="text-white/50 text-xs mt-1">
                            {text.pricePerQuarter}
                          </p>
                        </div>

                        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                          <p className="text-white/60 text-xs uppercase tracking-wide mb-1">
                            {text.annual}
                          </p>
                          <p className="text-white text-2xl font-semibold">
                            €{annualPrice || "—"}
                          </p>
                          <p className="text-white/50 text-xs mt-1">
                            {text.pricePerYear}
                          </p>
                        </div>
                      </div>

                      <p className="text-white/40 text-xs mt-4">
                        {language === "spanish" &&
                          "Los precios se muestran tal como aparecerán para los fans."}
                        {language === "english" &&
                          "Prices are displayed exactly as fans will see them."}
                        {language === "catalan" &&
                          "Els preus es mostren exactament com els veuran els fans."}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign size={20} className="text-white" />
                    <h3 className="text-white/80 drop-shadow text-sm sm:text-base">
                      {text.totalRevenue}
                    </h3>
                  </div>
                  <p className="text-2xl sm:text-3xl text-white drop-shadow truncate">
                    {statsLoading ? "—" : `€${subStats.totalRevenue}`}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={20} className="text-white" />
                    <h3 className="text-white/80 drop-shadow text-sm sm:text-base">
                      {text.totalSubscribers}
                    </h3>
                  </div>
                  <p className="text-2xl sm:text-3xl text-white drop-shadow">
                    {statsLoading ? "—" : subStats.totalSubscribers}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={20} className="text-white" />
                    <h3 className="text-white/80 drop-shadow text-sm sm:text-base">
                      {text.activeSubscribers}
                    </h3>
                  </div>
                  <p className="text-2xl sm:text-3xl text-white drop-shadow">
                    {statsLoading ? "—" : subStats.activeSubscribers}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={20} className="text-white" />
                    <h3 className="text-white/80 drop-shadow text-sm sm:text-base">
                      Growth
                    </h3>
                  </div>
                  <p className="text-2xl sm:text-3xl text-white drop-shadow">
                    {statsLoading ? "—" : subStats.growth}
                  </p>
                </div>
              </div>

              {statsError && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-400/40 rounded-lg">
                  <p className="text-red-200 text-sm">{statsError}</p>
                </div>
              )}

              {/* Exclusive Content Upload Section */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border border-white/20">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <h2 className="text-xl sm:text-2xl text-white drop-shadow-lg">
                    {text.exclusiveContent}
                  </h2>

                  <button
                    type="button"
                    onClick={fetchExclusiveContents}
                    className="cursor-pointer px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 transition-all disabled:cursor-not-allowed"
                    disabled={isExclusiveLoading}
                  >
                    {isExclusiveLoading
                      ? "loading…"
                      : language === "english"
                      ? "Refresh"
                      : language === "spanish"
                      ? "Actualizar"
                      : "Actualitzar"}
                  </button>
                </div>

                {/* Le reste de ton bloc Exclusive Content reste IDENTIQUE */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl text-white drop-shadow-lg">
                      {text.exclusiveContent}
                    </h2>

                    <button
                      type="button"
                      onClick={fetchExclusiveContents}
                      className="cursor-pointer px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 transition-all disabled:cursor-not-allowed"
                      disabled={isExclusiveLoading}
                    >
                      {isExclusiveLoading
                        ? "loading…"
                        : language === "english"
                        ? "Refresh"
                        : language === "spanish"
                        ? "Actualizar"
                        : "Actualitzar"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Upload Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white drop-shadow mb-2">
                          {text.contentType}
                        </label>
                        <select
                          value={exclusiveContentType}
                          onChange={(e) => {
                            setExclusiveContentType(e.target.value);
                            // reset file when switching type
                            setExclusiveContentFile(null);
                            setExclusiveContentPreview("");
                            setExclusiveContentUrl("");
                          }}
                          className="cursor-pointer w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black focus:outline-none focus:border-white/40 transition-all"
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
                          onChange={(e) =>
                            setExclusiveContentTitle(e.target.value)
                          }
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

                      {/* File Upload */}
                      <div>
                        <label className="block text-white drop-shadow mb-2">
                          {text.uploadFile}
                        </label>

                        {exclusiveContentFile ? (
                          <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                            {/* Preview per type */}
                            {exclusiveContentType === "photo" &&
                              exclusiveContentPreview && (
                                <img
                                  src={exclusiveContentPreview}
                                  alt="Preview"
                                  className="w-full max-h-56 object-cover rounded-lg"
                                />
                              )}

                            {exclusiveContentType === "video" &&
                              exclusiveContentPreview && (
                                <video
                                  src={exclusiveContentPreview}
                                  controls
                                  className="w-full max-h-56 rounded-lg"
                                />
                              )}

                            {exclusiveContentType === "music" &&
                              exclusiveContentPreview && (
                                <audio
                                  src={exclusiveContentPreview}
                                  controls
                                  className="w-full"
                                />
                              )}

                            {exclusiveContentType === "document" && (
                              <div className="text-white/80 text-sm">
                                <p className="font-medium">
                                  {exclusiveContentFile.name}
                                </p>
                                <p className="text-white/50 text-xs mt-1">
                                  TXT document
                                </p>
                              </div>
                            )}
                            {/* Alerts */}
                            {exclusiveError && (
                              <div className="mb-6 p-4 bg-red-500/20 border border-red-400/40 rounded-lg">
                                <p className="text-red-200 text-sm">
                                  {exclusiveError}
                                </p>
                              </div>
                            )}

                            {exclusiveSuccess && (
                              <div className="mb-6 p-4 bg-green-500/20 border border-green-400/40 rounded-lg">
                                <p className="text-green-200 text-sm">
                                  {exclusiveSuccess}
                                </p>
                              </div>
                            )}

                            <div className="mt-4 flex gap-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setExclusiveContentFile(null);
                                  setExclusiveContentPreview("");
                                  setExclusiveContentUrl("");
                                }}
                                className="cursor-pointer flex-1 px-4 py-2 bg-red-500/30 border border-red-500/40 rounded-lg text-white hover:bg-red-500/40 transition-all"
                              >
                                {language === "english"
                                  ? "Remove"
                                  : language === "spanish"
                                  ? "Eliminar"
                                  : "Eliminar"}
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  document
                                    .getElementById("exclusive-content-file")
                                    ?.click()
                                }
                                className="cursor-pointer flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 transition-all"
                              >
                                {language === "english"
                                  ? "Change"
                                  : language === "spanish"
                                  ? "Cambiar"
                                  : "Canviar"}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-white/50 transition-all cursor-pointer bg-white/5"
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
                              {language === "english"
                                ? "Click to upload"
                                : language === "spanish"
                                ? "Haz clic para subir"
                                : "Fes clic per pujar"}
                            </p>

                            <input
                              id="exclusive-content-file"
                              type="file"
                              accept={
                                ACCEPT_BY_TYPE[exclusiveContentType] || "*/*"
                              }
                              onChange={handleExclusiveFile}
                              className="hidden"
                            />
                          </div>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="button"
                        onClick={handleSubmitExclusiveContent}
                        disabled={
                          isExclusiveSubmitting ||
                          isUploadingExclusive ||
                          !exclusiveContentTitle.trim() ||
                          !exclusiveContentUrl
                        }
                        className="cursor-pointer w-full px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isExclusiveSubmitting
                          ? language === "english"
                            ? "Publishing…"
                            : language === "spanish"
                            ? "Publicando…"
                            : "Publicant…"
                          : text.uploadExclusiveContent}
                      </button>

                      <p className="text-white/50 text-xs">
                        {exclusiveContentUrl
                          ? language === "english"
                            ? "File uploaded. Ready to publish."
                            : language === "spanish"
                            ? "Archivo subido. Listo para publicar."
                            : "Fitxer pujat. Llest per publicar."
                          : language === "english"
                          ? "Upload a file before publishing."
                          : language === "spanish"
                          ? "Sube un archivo antes de publicar."
                          : "Puja un fitxer abans de publicar."}
                      </p>
                    </div>

                    {/* Uploaded Content List */}
                    <div>
                      <h3 className="text-lg text-white drop-shadow mb-4">
                        {text.uploadedContent}
                      </h3>

                      {isExclusiveLoading ? (
                        <div className="bg-white/5 rounded-lg p-8 text-center border border-white/20">
                          <p className="text-white/60 text-sm">Loading…</p>
                        </div>
                      ) : uploadedExclusiveContent.length === 0 ? (
                        <div className="bg-white/5 rounded-lg p-8 text-center border border-white/20">
                          <Music
                            size={48}
                            className="text-white/40 mx-auto mb-4"
                          />
                          <p className="text-white/60">{text.noContent}</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {uploadedExclusiveContent.map((content) => {
                            const created = content.createdAt
                              ? new Date(content.createdAt).toLocaleDateString()
                              : "";

                            const typeLabel =
                              content.type?.toUpperCase?.() ?? "CONTENT";

                            const TypeIcon =
                              content.type === "music"
                                ? Music
                                : content.type === "video"
                                ? Video
                                : content.type === "photo"
                                ? Image
                                : FileText;

                            return (
                              <div
                                key={content.id}
                                className="bg-white/5 rounded-xl border border-white/20 overflow-hidden hover:bg-white/10 transition-all"
                              >
                                {/* TOP */}
                                <div className="p-4 flex flex-col sm:flex-row sm:items-start gap-4">
                                  {/* Thumbnail */}
                                  <div className="w-full sm:w-16 sm:h-16">
                                    <div className="w-full h-44 sm:w-16 sm:h-16 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center overflow-hidden">
                                      {content.type === "photo" &&
                                      content.fileUrl ? (
                                        <img
                                          src={content.fileUrl}
                                          alt={content.title}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : content.type === "video" &&
                                        content.fileUrl ? (
                                        <video
                                          src={content.fileUrl}
                                          className="w-full h-full object-cover"
                                          muted
                                          playsInline
                                          preload="metadata"
                                        />
                                      ) : (
                                        <TypeIcon
                                          size={26}
                                          className="text-white/70"
                                        />
                                      )}
                                    </div>
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    {/* Header row */}
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                      {/* Title + meta */}
                                      <div className="min-w-0">
                                        <h4 className="text-white drop-shadow font-medium break-words sm:truncate">
                                          {content.title}
                                        </h4>

                                        <div className="mt-2 flex items-center gap-2 flex-wrap">
                                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] bg-white/10 border border-white/20 text-white/80">
                                            <TypeIcon
                                              size={12}
                                              className="text-white/70"
                                            />
                                            {typeLabel}
                                          </span>

                                          {created && (
                                            <span className="text-white/50 text-xs">
                                              {language === "english"
                                                ? `Uploaded: ${created}`
                                                : language === "spanish"
                                                ? `Subido: ${created}`
                                                : `Pujat: ${created}`}
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      {/* Actions */}
                                      <div className="flex items-center gap-2 sm:justify-end">
                                        {content.fileUrl && (
                                          <a
                                            href={content.fileUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex-1 sm:flex-none text-center px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-all text-xs"
                                          >
                                            {language === "english"
                                              ? "Open"
                                              : language === "spanish"
                                              ? "Abrir"
                                              : "Obrir"}
                                          </a>
                                        )}

                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleDeleteExclusiveContent(
                                              content.id
                                            )
                                          }
                                          className="cursor-pointer p-2 rounded-lg bg-red-500/20 border border-red-400/30 text-white/80 hover:bg-red-500/30 hover:text-white transition-all"
                                          title={
                                            language === "english"
                                              ? "Delete"
                                              : language === "spanish"
                                              ? "Eliminar"
                                              : "Eliminar"
                                          }
                                        >
                                          <X size={18} />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Description */}
                                    {content.description && (
                                      <p className="text-white/60 text-sm mt-3 line-clamp-3 sm:line-clamp-2">
                                        {content.description}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* BOTTOM BAR */}
                                <div className="px-4 py-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-white/50">
                                  <span className="break-all sm:truncate">
                                    {content.fileUrl
                                      ? content.fileUrl.replace(
                                          /^https?:\/\//,
                                          ""
                                        )
                                      : ""}
                                  </span>

                                  <span className="sm:ml-4 flex-shrink-0">
                                    {content.type === "music"
                                      ? "Audio"
                                      : content.type === "video"
                                      ? "Video"
                                      : content.type === "photo"
                                      ? "Image"
                                      : "Document"}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Le reste (Recent subscribers, By location, etc.) reste IDENTIQUE */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Subscribers */}
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl text-white drop-shadow">
                        {text.recentSubscribers}
                      </h3>

                      <button
                        type="button"
                        onClick={() => fetchRecentSubscribers(5)}
                        className="cursor-pointer px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 transition-all text-xs disabled:cursor-not-allowed"
                        disabled={recentLoading}
                      >
                        {recentLoading
                          ? "loading…"
                          : language === "english"
                          ? "Refresh"
                          : language === "spanish"
                          ? "Actualizar"
                          : "Actualitzar"}
                      </button>
                    </div>

                    {recentError && (
                      <div className="mb-4 p-3 bg-red-500/20 border border-red-400/40 rounded-lg">
                        <p className="text-red-200 text-sm">{recentError}</p>
                      </div>
                    )}

                    {recentLoading ? (
                      <div className="bg-white/5 rounded-lg p-6 text-center border border-white/20">
                        <p className="text-white/60 text-sm">Loading…</p>
                      </div>
                    ) : recentSubscribers.length === 0 ? (
                      <div className="bg-white/5 rounded-lg p-6 text-center border border-white/20">
                        <p className="text-white/60 text-sm">
                          {text.noSubscriptions}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {recentSubscribers.map((s, index) => {
                          const displayName =
                            s.username?.trim?.() ||
                            `${s.name ?? ""} ${s.surname ?? ""}`.trim() ||
                            `Subscriber ${index + 1}`;

                          return (
                            <div
                              key={s.subscriptionId ?? s.fanId ?? index}
                              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-white/5 rounded-lg border border-white/10"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 bg-white/20 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                                  {s.profileImageUrl ? (
                                    <img
                                      src={s.profileImageUrl}
                                      alt={displayName}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <Users size={20} className="text-white" />
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <p className="text-white drop-shadow truncate">
                                    {displayName}
                                  </p>
                                  {s.country && (
                                    <p className="text-white/50 text-xs truncate">
                                      {s.country}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <span className="text-white/60 text-sm flex-shrink-0">
                                {daysAgoLabel(s.subscribedAt)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Subscriptions by Location */}
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl text-white drop-shadow">
                        {text.byLocation}
                      </h3>

                      <button
                        type="button"
                        onClick={fetchSubscriptionsByLocation}
                        className="cursor-pointer px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 transition-all text-xs disabled:cursor-not-allowed"
                        disabled={subsLocLoading}
                      >
                        {subsLocLoading
                          ? "loading…"
                          : language === "english"
                          ? "Refresh"
                          : language === "spanish"
                          ? "Actualizar"
                          : "Actualitzar"}
                      </button>
                    </div>

                    {subsLocError && (
                      <div className="mb-4 p-3 bg-red-500/20 border border-red-400/40 rounded-lg">
                        <p className="text-red-200 text-sm">{subsLocError}</p>
                      </div>
                    )}

                    {subsLocLoading ? (
                      <div className="bg-white/5 rounded-lg p-6 text-center border border-white/20">
                        <p className="text-white/60 text-sm">Loading…</p>
                      </div>
                    ) : subsByLocation.length === 0 ? (
                      <div className="bg-white/5 rounded-lg p-6 text-center border border-white/20">
                        <p className="text-white/60 text-sm">
                          {language === "english"
                            ? "No subscriptions by location yet"
                            : language === "spanish"
                            ? "Aún no hay suscripciones por ubicación"
                            : "Encara no hi ha subscripcions per ubicació"}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {subsByLocation.map((loc, index) => (
                          <div
                            key={`${loc.location}-${index}`}
                            className="space-y-2"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-white drop-shadow truncate">
                                {loc.location || "Unknown"}
                              </span>
                              <span className="text-white/80 flex-shrink-0">
                                {loc.subscribers}
                              </span>
                            </div>

                            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-white/50 h-2 rounded-full transition-all"
                                style={{ width: loc.percentage }}
                              />
                            </div>

                            <div className="flex items-center justify-between text-white/60 text-sm">
                              <span>{loc.percentage}</span>
                              <span className="text-xs text-white/40">
                                {language === "english"
                                  ? "Active subscribers"
                                  : language === "spanish"
                                  ? "Suscriptores activos"
                                  : "Subscriptors actius"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Royalties Tab */}
          {activeTab === "royalties" && (
            <div className="space-y-6">
              {/* Error */}
              {royaltiesError && (
                <div className="p-4 bg-red-500/20 border border-red-400/40 rounded-lg">
                  <p className="text-red-200 text-sm">{royaltiesError}</p>
                </div>
              )}

              {/* Royalties Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign size={20} className="text-white" />
                    <h3 className="text-white/80 drop-shadow text-sm sm:text-base">
                      {text.totalRoyalties}
                    </h3>
                  </div>
                  <p className="text-2xl sm:text-3xl text-white drop-shadow truncate">
                    {royaltiesLoading
                      ? "—"
                      : `€${royaltiesSummary.totalRoyalties}`}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign size={20} className="text-white" />
                    <h3 className="text-white/80 drop-shadow text-sm sm:text-base">
                      {text.thisMonth}
                    </h3>
                  </div>
                  <p className="text-2xl sm:text-3xl text-white drop-shadow truncate">
                    {royaltiesLoading ? "—" : `€${royaltiesSummary.thisMonth}`}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign size={20} className="text-white" />
                    <h3 className="text-white/80 drop-shadow text-sm sm:text-base">
                      Pending
                    </h3>
                  </div>
                  <p className="text-2xl sm:text-3xl text-white drop-shadow truncate">
                    {royaltiesLoading ? "—" : `€${royaltiesSummary.pending}`}
                  </p>
                </div>
              </div>

              {/* Revenue By Track */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h3 className="text-lg sm:text-xl text-white drop-shadow">
                    {text.revenue} by Track
                  </h3>

                  <button
                    type="button"
                    onClick={fetchRoyalties}
                    className="cursor-pointer w-full sm:w-auto px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 transition-all text-xs disabled:cursor-not-allowed"
                    disabled={royaltiesLoading}
                  >
                    {royaltiesLoading
                      ? "loading…"
                      : language === "english"
                      ? "Refresh"
                      : language === "spanish"
                      ? "Actualizar"
                      : "Actualitzar"}
                  </button>
                </div>

                {royaltiesLoading ? (
                  <div className="bg-white/5 rounded-lg p-6 text-center border border-white/20">
                    <p className="text-white/60 text-sm">Loading…</p>
                  </div>
                ) : royaltiesTracks.length === 0 ? (
                  <div className="bg-white/5 rounded-lg p-6 text-center border border-white/20">
                    <p className="text-white/60 text-sm">
                      {language === "english"
                        ? "No revenue data yet"
                        : language === "spanish"
                        ? "Aún no hay datos de ingresos"
                        : "Encara no hi ha dades d'ingressos"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {royaltiesTracks.map((track) => (
                      <div
                        key={track.trackId}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Music size={20} className="text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-white drop-shadow truncate">
                              {track.name}
                            </p>
                            <p className="text-white/60 text-sm">
                              {track.streams}{" "}
                              {language === "english" ? "streams" : "streams"}
                            </p>
                          </div>
                        </div>

                        <span className="text-lg sm:text-xl text-white drop-shadow flex-shrink-0">
                          €{track.revenue}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Payout Tab */}
          {activeTab === "payout" && (
            <div className="space-y-6">
              {/* Info / Overview */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20">
                <h2 className="text-xl sm:text-2xl text-white drop-shadow-lg mb-3">
                  {text.payout}
                </h2>
                <p className="text-white/80 text-sm">
                  {language === "spanish" &&
                    "Configura aquí los métodos de pago donde recibirás tus ingresos de suscripciones y royalties."}
                  {language === "english" &&
                    "Configure here the payment methods where you will receive your subscription and royalties earnings."}
                  {language === "catalan" &&
                    "Configura aquí els mètodes de pagament on rebràs els teus ingressos de subscripcions i royalties."}
                </p>
              </div>

              {/* Payment Receiving Settings */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border border-white/20">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <h2 className="text-xl sm:text-2xl text-white drop-shadow-lg">
                    {text.paymentMethodsTitle}
                  </h2>

                  <button
                    type="button"
                    onClick={fetchMyPayoutSettings}
                    disabled={payoutLoading || payoutSaving}
                    className="cursor-pointer w-full sm:w-auto px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {payoutLoading
                      ? "loading…"
                      : language === "english"
                      ? "Refresh"
                      : language === "spanish"
                      ? "Actualizar"
                      : "Actualitzar"}
                  </button>
                </div>

                {payoutLoading && (
                  <div className="mb-6 p-4 bg-white/5 border border-white/20 rounded-lg">
                    <p className="text-white/60 text-sm">
                      {language === "english"
                        ? "Loading payout settings…"
                        : language === "spanish"
                        ? "Cargando configuración de pagos…"
                        : "Carregant configuració de pagaments…"}
                    </p>
                  </div>
                )}

                {/* ✅ FORM */}
                <form onSubmit={handleSavePayoutSettings} className="space-y-6">
                  {/* Bank Account Section */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10">
                    <h3 className="text-lg sm:text-xl text-white drop-shadow mb-4 flex items-center gap-2">
                      <DollarSign size={20} />
                      {text.bankAccount}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 drop-shadow mb-2 text-sm">
                          {text.accountHolderName}
                        </label>
                        <input
                          type="text"
                          value={bankAccountHolder}
                          onChange={(e) => setBankAccountHolder(e.target.value)}
                          placeholder="John Doe"
                          disabled={payoutLoading || payoutSaving}
                          className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all disabled:opacity-60"
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
                          disabled={payoutLoading || payoutSaving}
                          className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all disabled:opacity-60"
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
                          disabled={payoutLoading || payoutSaving}
                          className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all disabled:opacity-60"
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
                          disabled={payoutLoading || payoutSaving}
                          className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all disabled:opacity-60"
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
                          disabled={payoutLoading || payoutSaving}
                          className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all disabled:opacity-60"
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
                          disabled={payoutLoading || payoutSaving}
                          className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all disabled:opacity-60"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Digital Payment Methods */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10">
                    <h3 className="text-lg sm:text-xl text-white drop-shadow mb-4 flex items-center gap-2">
                      <Smartphone size={20} />
                      {language === "spanish"
                        ? "Métodos de Pago Digital"
                        : language === "english"
                        ? "Digital Payment Methods"
                        : "Mètodes de Pagament Digital"}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 drop-shadow mb-2 text-sm">
                          {text.paypalEmailLabel}
                        </label>
                        <input
                          type="email"
                          value={paypalEmail}
                          onChange={(e) => setPaypalEmail(e.target.value)}
                          placeholder="artist@example.com"
                          disabled={payoutLoading || payoutSaving}
                          className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all disabled:opacity-60"
                        />
                      </div>

                      <div>
                        <label className="block text-white/80 drop-shadow mb-2 text-sm">
                          {text.bizumPhoneLabel}
                        </label>
                        <input
                          type="tel"
                          value={bizumPhone}
                          onChange={(e) => setBizumPhone(e.target.value)}
                          placeholder="+34 600 000 000"
                          disabled={payoutLoading || payoutSaving}
                          className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all disabled:opacity-60"
                        />
                      </div>

                      <div>
                        <label className="block text-white/80 drop-shadow mb-2 text-sm">
                          {text.mobileMoneyProviderLabel}
                        </label>
                        <select
                          value={mobileMoneyProvider}
                          onChange={(e) =>
                            setMobileMoneyProvider(e.target.value)
                          }
                          disabled={payoutLoading || payoutSaving}
                          className="cursor-pointer w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black focus:outline-none focus:border-white/40 transition-all disabled:opacity-60"
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

                      <div>
                        <label className="block text-white/80 drop-shadow mb-2 text-sm">
                          {text.mobileMoneyPhoneLabel}
                        </label>
                        <input
                          type="tel"
                          value={mobileMoneyPhone}
                          onChange={(e) => setMobileMoneyPhone(e.target.value)}
                          placeholder="+233 000 000 000"
                          disabled={payoutLoading || payoutSaving}
                          className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all disabled:opacity-60"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-white/80 drop-shadow mb-2 text-sm">
                          {text.orangeMoneyPhoneLabel}
                        </label>
                        <input
                          type="tel"
                          value={orangeMoneyPhone}
                          onChange={(e) => setOrangeMoneyPhone(e.target.value)}
                          placeholder="+225 00 00 00 00"
                          disabled={payoutLoading || payoutSaving}
                          className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all disabled:opacity-60"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Alerts */}
                  {payoutError && (
                    <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/40 rounded-lg">
                      <p className="text-red-200 drop-shadow text-sm">
                        {payoutError}
                      </p>
                    </div>
                  )}

                  {paymentSaved && (
                    <div className="mb-6 p-4 bg-green-500/20 backdrop-blur-sm border border-green-400/40 rounded-lg">
                      <p className="text-green-200 drop-shadow">
                        {text.paymentDetailsSaved}
                      </p>
                    </div>
                  )}

                  {/* Save Button */}
                  <button
                    type="submit"
                    disabled={payoutSaving || payoutLoading}
                    className="cursor-pointer w-full px-6 py-4 bg-gradient-to-r from-green-500/40 to-emerald-500/40 backdrop-blur-md border-2 border-white/40 rounded-xl text-white hover:from-green-500/50 hover:to-emerald-500/50 hover:border-white/60 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <DollarSign size={20} />
                    {payoutSaving
                      ? language === "english"
                        ? "Saving…"
                        : language === "spanish"
                        ? "Guardando…"
                        : "Desant…"
                      : text.savePaymentDetails}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
        {/* ✅ Bouton d’accessibilité : monté au plus haut niveau */}
        <AccessibilityButton language={language} />
      </div>
    </div>
  );
}
