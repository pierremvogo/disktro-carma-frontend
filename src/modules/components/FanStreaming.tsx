import React, { useEffect, useRef, useState } from "react";
import { FanProfile } from "./FanProfile";
import { UserModuleObject as ModuleObject } from "../module";
import { useSearchParams, useRouter } from "next/navigation";

import { TagModuleObject } from "../tag/module";
import { TrackModuleObject } from "../track/module";
import { TrackStreamModuleObject } from "../trackSTreams/module";
import { AlbumModuleObject } from "../album/module";
import { EpModuleObject } from "../ep/module";
import { PlaylistModuleObject } from "../myplaylist/module";
import { ArtistModuleObject } from "../artist/module";
import { SubscriptionModuleObject } from "../subscription/module";
import { EditorPlaylistModuleObject } from "./editorPlaylist/module";
import { SubscriptionModal } from "./subscriptionModal";
import { PlanModuleObject } from "../plan/module";
import { StripeModuleObject } from "./stripe/module";
import { LygosModuleObject } from "./lygos/module";

// Icon components
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

const Pause = ({ size = 24, className = "" }) => (
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
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const Heart = ({ size = 24, className = "" }) => (
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
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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

const Star = ({ size = 24, className = "" }) => (
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
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const SkipBack = ({ size = 24, className = "" }) => (
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
    <polygon points="19 20 9 12 19 4 19 20" />
    <line x1="5" y1="19" x2="5" y2="5" />
  </svg>
);

const SkipForward = ({ size = 24, className = "" }) => (
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
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" y1="5" x2="19" y2="19" />
  </svg>
);

const Volume2 = ({ size = 24, className = "" }) => (
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
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
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

interface FanStreamingProps {
  language: string;
}
type SavedTrack = {
  id: string;
  title: string;
  audioUrl: string;
  createdAt?: string;
  signLanguageVideoUrl?: string | null;
  brailleFileUrl?: string | null;
  artistId?: string | null;
  isrcCode: string | null;
  duration: string | null;
  lyrics: string;
  userId: string;
  slug: string;
  type: string;
};
type DrawerType = "genre" | "mood";
type SubscriptionStatusResponse = {
  data?: {
    isSubscribed: boolean;
  };
};

export function FanStreaming({ language }: FanStreamingProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("discover");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [showLyrics, setShowLyrics] = useState(false);
  const [lyricsViewMode, setLyricsViewMode] = useState<"text" | "sign">("text");
  const [userPlaylists, setUserPlaylists] = useState<any[]>([]);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const [selectedSongForPlaylist, setSelectedSongForPlaylist] =
    useState<any>(null);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [sortPlaylists, setSortPlaylists] = useState(false);
  const [sortArtists, setSortArtists] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState<number[]>([]);
  const [showProfile, setShowProfile] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<DrawerType>("genre");
  const [drawerTitle, setDrawerTitle] = useState("");
  const [showSignVideo, setShowSignVideo] = useState(false);
  const [signVideoUrl, setSignVideoUrl] = useState<string | null>(null);

  const [subscribedArtists, setSubscribedArtists] = useState<string[]>([]);
  const [subscribingArtistId, setSubscribingArtistId] = useState<string | null>(
    null
  );

  const [selectedGenreName, setSelectedGenreName] = useState<string | null>(
    null
  );
  const [selectedMoodName, setSelectedMoodName] = useState<string | null>(null);

  const [savedTracks, setSavedTracks] = useState<SavedTrack[]>([]);
  const [loadingTracks, setLoadingTracks] = useState(false);
  const [tracksError, setTracksError] = useState<string | null>(null);

  // Accessibility states
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large" | "xl">(
    "medium"
  );
  const [highContrast, setHighContrast] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState<
    "none" | "protanopia" | "deuteranopia" | "tritanopia"
  >("none");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);
  const [visualNotifications, setVisualNotifications] = useState(false);
  const [largerTargets, setLargerTargets] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentPlayingTrackId, setCurrentPlayingTrackId] = useState<
    string | null
  >(null);

  const [featuredSongs, setFeaturedSongs] = useState<any[]>([]);
  const [featuredLoading, setFeaturedLoading] = useState(false);
  const [featuredError, setFeaturedError] = useState<string | null>(null);

  const [playlistsLoading, setPlaylistsLoading] = useState(false);
  const [playlistsError, setPlaylistsError] = useState<string | null>(null);

  const [addingToPlaylist, setAddingToPlaylist] = useState(false);
  const [addToPlaylistError, setAddToPlaylistError] = useState<string | null>(
    null
  );

  // Favorites (tracks complets pour l’affichage)
  const [favoriteTrackIds, setFavoriteTrackIds] = useState<string[]>([]);
  const [favoriteTracks, setFavoriteTracks] = useState<any[]>([]);
  const [favLoading, setFavLoading] = useState(false);
  const [favError, setFavError] = useState<string | null>(null);

  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [createPlaylistError, setCreatePlaylistError] = useState<string | null>(
    null
  );

  const [artists, setArtists] = useState<any[]>([]);
  const [artistsLoading, setArtistsLoading] = useState(false);
  const [artistsError, setArtistsError] = useState<string | null>(null);

  const [editorPlaylists, setEditorPlaylists] = useState<any[]>([]);
  const [editorPlaylistsLoading, setEditorPlaylistsLoading] = useState(false);
  const [editorPlaylistsError, setEditorPlaylistsError] = useState<
    string | null
  >(null);

  const [artistPlans, setArtistPlans] = useState<any[]>([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [plansError, setPlansError] = useState<string>("");

  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Dashboard (subscriptions backend)
  const [mySubscriptions, setMySubscriptions] = useState<any[]>([]);
  const [subscriptionsLoading, setSubscriptionsLoading] = useState(false);
  const [subscriptionsError, setSubscriptionsError] = useState<string | null>(
    null
  );

  const [currentTime, setCurrentTime] = useState(0);

  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    const sub = searchParams.get("sub");

    if (tab) {
      setSelectedTab(tab); // ex: "dashboard"
    }

    if (sub === "success") {
      setNotification("✅ Abonnement activé avec succès !");
    }
  }, [searchParams]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    const sub = searchParams.get("sub");

    // ✅ normalisation des valeurs possibles
    const normalizeTab = (t: string) => {
      const v = t.toLowerCase().trim();
      if (v === "artist" || v === "artists") return "artists";
      if (v === "my-music" || v === "mymusic" || v === "music")
        return "mymusic";
      if (v === "editor" || v === "editorplaylists") return "editorplaylists";
      if (v === "dash" || v === "dashboard") return "dashboard";
      if (v === "discover" || v === "home") return "discover";
      return v;
    };

    if (tab) {
      setSelectedTab(normalizeTab(tab));
    }

    // ✅ Notifications subscription
    if (sub === "success") {
      setNotification("✅ Abonnement activé avec succès !");
    }

    if (sub === "retry") {
      setNotification("ℹ️ Choisis un artiste pour relancer ton abonnement.");
      // optionnel: forcer l’onglet artistes au cas où
      setSelectedTab("artists");
    }
  }, [searchParams]);

  useEffect(() => {
    const sub = searchParams.get("sub");
    if (sub === "success") {
      const url = new URL(window.location.href);
      url.searchParams.delete("sub");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  const FAVORITES_KEY = "fan_favorite_track_ids";

  const loadFavoriteIds = () => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      const ids = raw ? (JSON.parse(raw) as string[]) : [];
      setFavoriteTrackIds(Array.isArray(ids) ? ids : []);
    } catch {
      setFavoriteTrackIds([]);
    }
  };

  const saveFavoriteIds = (ids: string[]) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    setFavoriteTrackIds(ids);
  };

  const toggleFavorite = async (trackId: string) => {
    const id = String(trackId);

    const next = favoriteTrackIds.includes(id)
      ? favoriteTrackIds.filter((x) => x !== id)
      : [...favoriteTrackIds, id];

    saveFavoriteIds(next);

    // recharge la liste affichée
    await fetchFavoriteTracks(next);
  };

  async function fetchArtists() {
    try {
      setArtistsLoading(true);
      setArtistsError(null);

      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) {
        setArtistsError("Utilisateur non authentifié.");
        setArtists([]);
        return;
      }

      // ✅ exemple: ArtistModuleObject.service.getAllArtists(token)
      const res = await ArtistModuleObject.service.getArtistsForFan(token);
      const raw = res.data ?? [];

      const mapped = raw.map((a: any) => ({
        id: String(a.id),
        name:
          a.artistName ||
          a.username ||
          `${a.name ?? ""} ${a.surname ?? ""}`.trim() ||
          "Artist",
        avatar:
          a.profileImageUrl && String(a.profileImageUrl).trim() !== ""
            ? a.profileImageUrl
            : "/avatar-placeholder.png",
        genres: a.tags || "—",
        subscribers: a.subscribersCount ?? 0,
        activeSubscribers: a.activeSubscribers ?? 0,

        // ✅ FIX CRITIQUE ICI
        hasActivePlan: Boolean(a.hasActivePlan), // 0 -> false, 1 -> true
      }));

      setSubscribedArtists(
        mapped.filter((a: any) => a.isSubscribed).map((a: any) => String(a.id))
      );

      setArtists(mapped);
    } catch (e) {
      console.error("fetchArtists error:", e);
      setArtistsError(text.errors.generic);
      setArtists([]);
    } finally {
      setArtistsLoading(false);
    }
  }

  useEffect(() => {
    if (selectedTab === "artists") {
      fetchArtists();
    }
  }, [selectedTab]);

  async function fetchFavoriteTracks(ids?: string[]) {
    try {
      setFavLoading(true);
      setFavError(null);

      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) return;

      const targetIds = ids ?? favoriteTrackIds;
      if (!targetIds.length) {
        setFavoriteTracks([]);
        return;
      }

      const res = await Promise.all(
        targetIds.map((id) => TrackModuleObject.service.getTrack(id, token))
      );

      // selon ton backend getById renvoie parfois direct track, parfois {data}
      const tracks = res
        .map((r: any) => r.data ?? r.track ?? r)
        .filter(Boolean);

      setFavoriteTracks(tracks);
    } catch (e) {
      console.error(e);
      setFavError(text.errors.generic);
    } finally {
      setFavLoading(false);
    }
  }
  useEffect(() => {
    if (typeof window === "undefined") return;
    loadFavoriteIds();
  }, []);

  // Mettre à jour la progress bar en temps réel
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [currentSong]);

  // Seek when user interacts
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    fetchFavoriteTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteTrackIds.length]); // ou [favoriteTrackIds] si tu préfères

  const formatDuration = (seconds?: number | null) => {
    if (!seconds || Number.isNaN(Number(seconds))) return "";
    const s = Math.max(0, Math.floor(Number(seconds)));
    const mm = String(Math.floor(s / 60)).padStart(1, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const formatStreams = (n?: number | null) => {
    const v = Number(n ?? 0);
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `${Math.round(v / 1_000)}K`;
    return String(v);
  };

  async function handleCreatePlaylist() {
    try {
      setCreatingPlaylist(true);
      setCreatePlaylistError(null);

      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      const userId = localStorage.getItem(ModuleObject.localState.USER_ID);

      if (!token || !userId) {
        setCreatePlaylistError("Utilisateur non authentifié.");
        return;
      }

      const name = newPlaylistName.trim();
      if (!name) {
        setCreatePlaylistError("Le nom de la playlist est requis.");
        return;
      }

      await PlaylistModuleObject.service.createPlaylist(
        { nom: name, userId },
        token
      );

      // ✅ succès
      setShowCreatePlaylist(false);
      setNewPlaylistName("");
      setCreatePlaylistError(null);

      await fetchUserPlaylists();
    } catch (e: any) {
      console.error(e);

      // ✅ message plus robuste
      const message =
        e?.response?.data?.message || e?.message || (e as Error).message;

      setCreatePlaylistError(text.errors.generic);
    } finally {
      setCreatingPlaylist(false);
    }
  }

  useEffect(() => {
    if (selectedTab === "mymusic") {
      fetchUserPlaylists();
    }
  }, [selectedTab]);

  async function fetchUserPlaylists() {
    try {
      setPlaylistsLoading(true);
      setPlaylistsError(null);

      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      const userId = localStorage.getItem(ModuleObject.localState.USER_ID);

      if (!token || !userId) {
        setPlaylistsError("Utilisateur non authentifié.");
        setUserPlaylists([]);
        return;
      }

      const res = await PlaylistModuleObject.service.getPlaylistByUser(
        userId,
        token
      );
      const playlists = res.data ?? res.playlists ?? res ?? [];

      setUserPlaylists(playlists);
    } catch (error) {
      console.error("fetchUserPlaylists error:", error);
      setPlaylistsError(text.errors.generic);
      setUserPlaylists([]);
    } finally {
      setPlaylistsLoading(false);
    }
  }

  async function openAddToPlaylist(song: any) {
    setSelectedSongForPlaylist(song);
    setShowAddToPlaylist(true);
    setAddToPlaylistError(null);

    // charge les playlists dès l'ouverture
    await fetchUserPlaylists();
  }
  async function fetchMySubscriptionsDashboard() {
    try {
      setSubscriptionsLoading(true);
      setSubscriptionsError(null);

      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      const userId = localStorage.getItem(ModuleObject.localState.USER_ID);

      if (!token || !userId) {
        setSubscriptionsError("Utilisateur non authentifié.");
        setMySubscriptions([]);
        return;
      }

      const res = await SubscriptionModuleObject.service.getSubscriptionByUser(
        userId,
        token
      );

      const subs = res.data ?? [];
      setMySubscriptions(subs);

      // ✅ dériver subscribedArtists depuis backend (actifs seulement)
      const now = new Date();
      const activeArtistIds = subs
        .filter((s: any) => {
          if (s.status !== "active") return false;
          const end = s.endDate ? new Date(s.endDate) : null;
          return !end || end > now;
        })
        .map((s: any) => String(s.artistId));

      setSubscribedArtists(Array.from(new Set(activeArtistIds)));
    } catch (e: any) {
      console.error(e);
      setSubscriptionsError(text.errors.generic);
      setMySubscriptions([]);
    } finally {
      setSubscriptionsLoading(false);
    }
  }

  useEffect(() => {
    if (selectedTab === "dashboard") {
      fetchMySubscriptionsDashboard();
    }
  }, [selectedTab]);

  const getSubscribedArtistsListFromSubs = () => {
    if (!Array.isArray(mySubscriptions) || mySubscriptions.length === 0)
      return [];
    if (!Array.isArray(artists) || artists.length === 0) return [];

    const activeArtistIds = new Set(
      mySubscriptions
        .filter((s: any) => s.status === "active")
        .map((s: any) => String(s.artistId))
    );

    return artists.filter((a: any) => activeArtistIds.has(String(a.id)));
  };

  const getGiftsForSubscribedArtistsFromSubs = () => {
    const activeIds = new Set(
      mySubscriptions
        .filter((s: any) => s.status === "active")
        .map((s: any) => String(s.artistId))
    );

    return exclusiveGifts.filter((gift: any) =>
      activeIds.has(String(gift.artistId))
    );
  };

  async function handleAddTrackToPlaylist(playlistId: string) {
    try {
      setAddingToPlaylist(true);
      setAddToPlaylistError(null);

      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) {
        setAddToPlaylistError("Utilisateur non authentifié.");
        return;
      }

      const trackId = selectedSongForPlaylist?.id;
      if (!trackId) {
        setAddToPlaylistError("Aucun track sélectionné.");
        return;
      }

      // ✅ ajoute au backend
      await PlaylistModuleObject.service.addTrackToPlaylist(
        playlistId,
        trackId,
        token
      );

      // ✅ refresh playlists (optionnel mais utile si tu affiches tracks dedans)
      await fetchUserPlaylists();

      // ✅ feedback (si tu as visual notifications)
      showNotification?.(text.addedToPlaylist ?? "Added to playlist");

      // ✅ ferme modale
      setShowAddToPlaylist(false);
      setSelectedSongForPlaylist(null);
    } catch (error: any) {
      console.error("handleAddTrackToPlaylist error:", error);
      setAddToPlaylistError(text.errors.generic);
    } finally {
      setAddingToPlaylist(false);
    }
  }

  async function fetchEditorPlaylists() {
    try {
      setEditorPlaylistsLoading(true);
      setEditorPlaylistsError(null);

      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) {
        setEditorPlaylistsError("Utilisateur non authentifié.");
        setEditorPlaylists([]);
        return;
      }

      const locale =
        language === "spanish" ? "es" : language === "catalan" ? "ca" : "en";

      const res: any =
        await EditorPlaylistModuleObject.service.getEditorPlaylists(
          token,
          locale,
          20
        );
      const raw = res.data ?? [];

      const mapped = raw.map((p: any) => ({
        id: String(p.id),
        name: p.name,
        description: p.description ?? "",
        cover: p.coverUrl ?? "/placeholder.png",
        songCount: p.songCount ?? p.tracks?.length ?? 0,
        songs: (p.tracks ?? []).map((t: any) => ({
          ...t,
          id: String(t.id),
          title: t.title,
          artist: t.artistName ?? t.userId ?? "",
          cover: t.coverUrl ?? p.coverUrl ?? "/placeholder.png",
        })),
      }));

      setEditorPlaylists(mapped);
    } catch (e: any) {
      console.error(e);
      setEditorPlaylistsError(text.errors.generic);
      setEditorPlaylists([]);
    } finally {
      setEditorPlaylistsLoading(false);
    }
  }
  const handlePlayEditorPlaylist = async (playlist: any) => {
    const tracks = (playlist.songs ?? []).filter((t: any) => t.audioUrl);
    if (!tracks.length) return;

    setQueue(tracks);
    setQueueIndex(0);
    await handlePlaySong(tracks[0], tracks);
  };

  // Subscription + payment UI
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedArtistForSubscription, setSelectedArtistForSubscription] =
    useState<any | null>(null);

  const [paymentOption, setPaymentOption] = useState<"card" | "paypal">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");

  const startSubscription = async (artist: any) => {
    setSelectedArtistForSubscription(artist);
    setShowSubscriptionModal(true);

    setArtistPlans([]);
    setSelectedPlanId("");
    setPlansError("");

    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) {
      setPlansError("Utilisateur non authentifié.");
      return;
    }

    try {
      setPlansLoading(true);

      const res: any = await PlanModuleObject.service.getPlansByArtist(
        String(artist.id),
        token
      );

      const plans = res.data ?? [];
      // filtre actifs + tri (monthly -> quarterly -> annual)
      const order = { monthly: 1, quarterly: 2, annual: 3 } as any;

      const normalized = plans
        .filter((p: any) => p.active)
        .sort(
          (a: any, b: any) =>
            (order[a.billingCycle] ?? 99) - (order[b.billingCycle] ?? 99)
        );

      setArtistPlans(normalized);

      // sélection par défaut: monthly si existe, sinon 1er
      const defaultPlan =
        normalized.find((p: any) => p.billingCycle === "monthly") ??
        normalized[0];

      if (defaultPlan?.id) setSelectedPlanId(String(defaultPlan.id));
    } catch (e: any) {
      console.error(e);
      setPlansError(text.errors.generic);
    } finally {
      setPlansLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTab === "editorplaylists") {
      fetchEditorPlaylists();
    }
  }, [selectedTab]);

  const handlePlayPlaylist = async (playlist: any, startIndex = 0) => {
    const tracks = (playlist?.tracks ?? []).filter((t: any) => t?.audioUrl);

    if (!tracks.length) return;

    // charge la queue + démarre
    setQueue(tracks);
    setQueueIndex(startIndex);

    // joue le premier track (ou celui sélectionné)
    await handlePlaySong(tracks[startIndex], tracks);
  };

  const handleConfirmSubscriptionLygos = async () => {
    if (!selectedArtistForSubscription) throw new Error("No artist selected");

    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) throw new Error("Not authenticated");

    if (!selectedPlanId) throw new Error("Please select a plan.");

    // ✅ Récupérer les infos fan
    const userData = localStorage.getItem(ModuleObject.localState.USER_DATA);
    if (!userData) throw new Error("User data missing");
    const user = JSON.parse(userData);
    const email = user.email;
    const phone = "+237698114902";
    if (!email || !phone) throw new Error("User email or phone missing");

    // ✅ Récupérer le plan pour connaître le montant
    const selectedPlan = artistPlans.find((p) => p.id === selectedPlanId);
    if (!selectedPlan) throw new Error("Plan not found");
    const amount = Number(selectedPlan.price);

    try {
      setCheckoutLoading(true);

      const res = await LygosModuleObject.service.initializeSubscription(
        {
          artistId: String(selectedArtistForSubscription.id),
          planId: String(selectedPlanId),
          email,
          phone,
          amount,
        },
        token
      );

      const paymentUrl = res?.data?.redirectUrl ?? res?.data?.link ?? res?.url;
      if (!paymentUrl) throw new Error("Lygos payment url not returned");

      window.location.href = paymentUrl;
    } catch (e: any) {
      throw new Error(text.errors.generic);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleConfirmSubscriptionStripe = async () => {
    if (!selectedArtistForSubscription) throw new Error("No artist selected");

    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) throw new Error("Not authenticated");

    if (!selectedPlanId) throw new Error("Please select a plan.");

    try {
      setCheckoutLoading(true);

      const res =
        await StripeModuleObject.service.createSubscriptionCheckoutSession(
          {
            artistId: String(selectedArtistForSubscription.id),
            planId: String(selectedPlanId),
          },
          token
        );

      const url = res?.data?.url ?? res?.url;
      if (!url) throw new Error("Stripe checkout url not returned");

      window.location.href = url; // ✅ redirect
    } catch (e: any) {
      // IMPORTANT: rethrow pour que la modale puisse remettre isSubmitting=false
      throw new Error(text.errors.generic);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const normalizeTracksWithCover = (
    tracks: any[],
    coverUrl?: string,
    artistName?: string
  ) =>
    (tracks || []).map((t: any) => ({
      ...t,
      coverUrl: t.coverUrl ?? coverUrl, // cover de l'album/ep
      artistName: t.artistName ?? artistName ?? "", // optionnel
    }));

  async function handlePlayFeatured(song: any) {
    try {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) return;

      // ✅ SINGLE => joue directement
      if (song.collectionType === "single") {
        // queue = [song]
        setQueue([song]);
        setQueueIndex(0);
        await handlePlaySong(song, [song]);
        return;
      }

      // ✅ EP => fetch EP + tracks
      if (song.collectionType === "ep") {
        const epId = song.collectionId;
        if (!epId) return;

        const res = await EpModuleObject.service.getEp(epId, token);
        const ep = res.ep ?? res.data?.ep ?? res.data ?? {};

        const epTracks = normalizeTracksWithCover(
          ep.tracks,
          ep.coverUrl,
          ep.artistName
        );
        if (epTracks.length === 0) return;

        const startIndex = epTracks.findIndex((t: any) => t.id === song.id);
        const idx = startIndex >= 0 ? startIndex : 0;

        setQueue(epTracks);
        setQueueIndex(idx);
        await handlePlaySong(epTracks[idx], epTracks);
        return;
      }

      // ✅ ALBUM => fetch album + tracks
      if (song.collectionType === "album") {
        const albumId = song.collectionId;
        if (!albumId) return;

        const res = await AlbumModuleObject.service.getAlbum(albumId, token);
        const album = res.album ?? res.data?.album ?? res.data ?? {};

        const albumTracks = normalizeTracksWithCover(
          album.tracks,
          album.coverUrl,
          album.artistName
        );
        if (albumTracks.length === 0) return;

        const startIndex = albumTracks.findIndex((t: any) => t.id === song.id);
        const idx = startIndex >= 0 ? startIndex : 0;

        setQueue(albumTracks);
        setQueueIndex(idx);
        await handlePlaySong(albumTracks[idx], albumTracks);
        return;
      }

      // fallback si jamais collectionType absent
      setQueue([song]);
      setQueueIndex(0);
      await handlePlaySong(song, [song]);
    } catch (e) {
      console.error("handlePlayFeatured error:", e);
    }
  }

  async function fetchFeaturedTracks() {
    try {
      setFeaturedLoading(true);
      setFeaturedError(null);

      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) return;

      // ✅ nouveau endpoint backend
      const res = await TrackModuleObject.service.getTopStreams(token, 6);
      const tracks = res.tracks ?? res.data?.tracks ?? res.data ?? [];

      // ✅ mapping vers le format "mockSongs"
      const mapped = tracks.map((t: any) => ({
        id: t.id,
        title: t.title,
        artist: t.artistName ?? "",
        album: t.collectionTitle ?? "",
        duration: formatDuration(t.duration),
        streams: formatStreams(t.streamsCount),
        cover: t.coverUrl ?? "/placeholder.png",
        audioUrl: t.audioUrl,
        lyrics: t.lyrics ?? null,
        signLanguageVideoUrl: t.signLanguageVideoUrl ?? null,
        brailleFileUrl: t.brailleFileUrl ?? null,

        // ✅ CRITIQUE pour ouvrir la bonne queue
        collectionType: t.collectionType, // 'single' | 'ep' | 'album'
        collectionId: t.collectionId, // id de l'album/ep/single
      }));

      setFeaturedSongs(mapped);
    } catch (e) {
      console.error(e);
      setFeaturedError(text.errors.generic);
    } finally {
      setFeaturedLoading(false);
    }
  }
  useEffect(() => {
    fetchFeaturedTracks();
  }, []);

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

  // Keyboard navigation
  React.useEffect(() => {
    if (!keyboardNav) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showAccessibility) setShowAccessibility(false);
        else if (showLyrics) setShowLyrics(false);
      }
      if (e.key === " " && currentSong) {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
      if (e.key === "a" && e.ctrlKey) {
        e.preventDefault();
        setShowAccessibility(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [keyboardNav, showAccessibility, showLyrics, currentSong, isPlaying]);

  const router = useRouter();
  const [isArtist, setIsArtist] = useState(false);

  const stopPreviousAudio = (prevTrackId: string | null) => {
    if (!prevTrackId) return;

    const prevAudio = document.getElementById(
      `fan-audio-${prevTrackId}`
    ) as HTMLAudioElement | null;

    if (prevAudio) {
      prevAudio.pause();
      prevAudio.currentTime = 0;
    }
  };

  // Show notification helper
  const showNotification = (message: string) => {
    if (visualNotifications) {
      setNotification(message);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ModuleObject.localState.ACCESS_TOKEN);
    localStorage.removeItem(ModuleObject.localState.USER_ID);
    localStorage.removeItem(ModuleObject.localState.USER_DATA);
    localStorage.removeItem(ModuleObject.localState.USER_ROLE);
    localStorage.removeItem(ModuleObject.localState.FAVORITES_KEY);
    router.push("/home");
  };

  const [newReleases, setNewReleases] = useState<any[]>([]);
  const [newReleasesLoading, setNewReleasesLoading] = useState(false);
  const [newReleasesError, setNewReleasesError] = useState<string | null>(null);

  // const formatDuration = (seconds?: number | null) => {
  //   if (seconds === null || seconds === undefined) return "";
  //   const s = Math.max(0, Math.floor(Number(seconds)));
  //   const mm = String(Math.floor(s / 60));
  //   const ss = String(s % 60).padStart(2, "0");
  //   return `${mm}:${ss}`;
  // };

  async function fetchNewReleases() {
    try {
      setNewReleasesLoading(true);
      setNewReleasesError(null);

      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) return;

      const res = await TrackModuleObject.service.getNewReleases(token, 12);
      const tracks = res.tracks ?? res.data?.tracks ?? res.data ?? [];

      // mapping pour correspondre à ton UI (mockSongs-like)
      const mapped = tracks.map((t: any) => ({
        id: t.id,
        title: t.title,
        artist: t.artistName ?? t.userId ?? "",
        album: t.collectionTitle ?? "",

        duration: formatDuration(t.duration),
        cover: t.coverUrl ?? "/placeholder.png",

        audioUrl: t.audioUrl,
        lyrics: t.lyrics ?? null,
        signLanguageVideoUrl: t.signLanguageVideoUrl ?? null,
        brailleFileUrl: t.brailleFileUrl ?? null,

        // pour le player auto (single/ep/album)
        collectionType: t.collectionType,
        collectionId: t.collectionId,
        createdAt: t.createdAt,
      }));

      setNewReleases(mapped);
    } catch (e) {
      console.error(e);
      setNewReleasesError(text.errors.generic);
    } finally {
      setNewReleasesLoading(false);
    }
  }

  useEffect(() => {
    fetchNewReleases();
  }, []);

  const handleNextFromQueue = async () => {
    if (queue.length === 0) return;

    const nextIndex = queueIndex + 1;
    if (nextIndex >= queue.length) {
      setIsPlaying(false);
      setCurrentPlayingTrackId(null);
      return;
    }

    setQueueIndex(nextIndex);
    await handlePlaySong(queue[nextIndex], queue);
  };

  const handlePrevFromQueue = async () => {
    if (queue.length === 0) return;

    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    const prevIndex = queueIndex - 1;
    if (prevIndex < 0) return;

    setQueueIndex(prevIndex);
    await handlePlaySong(queue[prevIndex], queue);
  };

  const handleNextFromQueue1 = () => {
    const index = queue.findIndex((t) => t.id === currentSong.id);
    const next = queue[index - 1];
    if (next) setCurrentSong(next);
  };

  const handlePrevFromQueue1 = () => {
    const index = queue.findIndex((t) => t.id === currentSong.id);
    const prev = queue[index + 1];
    if (prev) setCurrentSong(prev);
  };
  const handlePlaySong = (song: any, list?: any[]) => {
    const userId = localStorage.getItem(ModuleObject.localState.USER_ID);
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);

    const audio = audioRef.current;
    if (!audio) return;

    const trackId = song.id;

    // ✅ Mettre à jour la queue
    if (list && Array.isArray(list) && list.length > 0) {
      const idx = list.findIndex((t) => t.id === trackId);
      setQueue(list);
      setQueueIndex(idx >= 0 ? idx : 0);
    } else {
      setQueue([song]);
      setQueueIndex(0);
    }

    // ✅ Toggle pause si on reclique sur le même track
    if (currentPlayingTrackId === trackId && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
      setCurrentPlayingTrackId(null);
      return;
    }

    // ✅ Mise à jour immédiate de l'UI
    setCurrentSong(song);
    setIsPlaying(true);
    setCurrentPlayingTrackId(trackId);

    try {
      // ✅ Charger la source si nécessaire
      if (audio.src !== song.audioUrl) {
        audio.src = song.audioUrl;
        audio.load(); // pré-chargement pour accélérer le play
      }

      // ✅ Jouer l'audio (async mais sans bloquer l'UI)
      audio.play().catch((err) => {
        console.error("Error playing audio:", err);
        setIsPlaying(false);
        setCurrentPlayingTrackId(null);
      });

      // ✅ autoplay next track
      const handleEnded = () => {
        handleNextFromQueue1();
      };
      audio.addEventListener("ended", handleEnded);

      // Nettoyage automatique pour éviter les leaks
      // (utile si handlePlaySong est appelé plusieurs fois)
      const cleanupEndedListener = () => {
        audio.removeEventListener("ended", handleEnded);
      };
      // On peut stocker cleanupEndedListener dans un ref si besoin

      // ✅ Log stream en arrière-plan
      if (token && userId && trackId) {
        TrackStreamModuleObject.service
          .createTrackStream(userId, trackId, token)
          .catch((e) => console.warn("Stream logging failed:", e));
      }
    } catch (err) {
      console.error("Error in handlePlaySong:", err);
      setIsPlaying(false);
      setCurrentPlayingTrackId(null);
    }
  };

  const content = {
    spanish: {
      subscription: {
        title: "Suscribirse a un plan",
        subtitle: "Elige una suscripción para apoyar a {{artistName}}",

        button: {
          continue: "Continuar",
          redirecting: "Redirigiendo...",
        },

        message: {
          redirecting: "Redirigiendo a la página de pago...",
          paymentFailed: "El pago ha fallado. Inténtalo de nuevo.",
          success: "¡Pago realizado con éxito!",
        },

        payment: {
          stripe: "Tarjeta bancaria (Stripe)",
          lygos: "Mobile Money (Lygos)",
        },

        plans: {
          monthly: {
            label: "Suscripción mensual",
            features: [
              "Acceso a lanzamientos exclusivos",
              "Escucha anticipada",
              "Contenido exclusivo para fans",
              "Soporte estándar",
            ],
          },
          quarterly: {
            label: "Suscripción trimestral",
            features: [
              "Todos los beneficios mensuales",
              "Contenido premium exclusivo",
              "Acceso a conciertos en vivo privados",
              "Descargas limitadas",
              "Soporte prioritario",
            ],
          },
          annual: {
            label: "Suscripción anual",
            features: [
              "Todos los beneficios trimestrales",
              "Acceso ilimitado a contenido premium",
              "Descargas ilimitadas",
              "Encuentros virtuales con el artista",
              "Insignia de Fan VIP",
              "Soporte VIP",
            ],
          },
        },
      },
      title: "Música para Todos",
      discover: "Descubrir",
      myMusic: "Mi Música",
      artists: "Artistas",
      search: "Buscar música, artistas...",
      featured: "Destacados",
      newReleases: "Nuevos Lanzamientos",

      subscribe: "Suscribirse",
      play: "Reproducir",
      pause: "Pausar",
      addToFavorites: "Añadir a favoritos",
      streams: "reproducciones",
      subscribers: "suscriptores",
      back: "Volver",
      nowPlaying: "Reproduciendo ahora",
      duration: "Duración",
      lyrics: "Letra",
      textLyrics: "Letra en Texto",
      signLanguage: "Lenguaje de Signos",
      editorPlaylists: "Playlists de los Editores",
      addToPlaylist: "Añadir a Playlist",
      createPlaylist: "Crear Playlist",
      playlistName: "Nombre de la Playlist",
      create: "Crear",
      cancel: "Cancelar",
      yourPlaylists: "Tus Playlists",
      sortAlphabetically: "Ordenar Alfabéticamente",
      songs: "canciones",
      noSongs: "No hay canciones en esta playlist",
      addedToPlaylist: "Añadido a la playlist",
      favorites: "Favoritos",
      addedToFavorites: "Añadido a favoritos",
      removedFromFavorites: "Eliminado de favoritos",
      accessibility: "Accesibilidad",
      dashboard: "Panel",
      mySubscriptions: "Mis Suscripciones",
      exclusiveGifts: "Regalos Exclusivos",
      subscriptionStats: "Estadísticas",
      totalSubscriptions: "Suscripciones Totales",
      totalGifts: "Regalos Totales",
      unsubscribe: "Cancelar Suscripción",
      subscribed: "Suscrito",
      claimGift: "Reclamar Regalo",
      claimed: "Reclamado",
      noSubscriptions: "Aún no estás suscrito a ningún artista",
      noGifts: "No hay regalos exclusivos disponibles",
      exploreArtists: "Explorar Artistas",
      giftFrom: "Regalo de",
      subscribedOn: "Suscrito desde",
      visualAccessibility: "Accesibilidad Visual",
      hearingAccessibility: "Accesibilidad Auditiva",
      motorAccessibility: "Accesibilidad Motora",
      cognitiveAccessibility: "Accesibilidad Cognitiva",
      fontSize: "Tamaño de Fuente",
      small: "Pequeño",
      medium: "Mediano",
      large: "Grande",
      extraLarge: "Extra Grande",
      highContrast: "Alto Contraste",
      colorBlindMode: "Modo Daltónico",
      none: "Ninguno",
      protanopia: "Protanopia (Rojo-Verde)",
      deuteranopia: "Deuteranopia (Rojo-Verde)",
      tritanopia: "Tritanopia (Azul-Amarillo)",
      reduceMotion: "Reducir Animaciones",
      textToSpeech: "Texto a Voz",
      captions: "Subtítulos",
      visualNotifications: "Notificaciones Visuales",
      largerTargets: "Botones Más Grandes",
      keyboardNav: "Navegación por Teclado",
      voiceControl: "Control por Voz",
      dyslexiaFont: "Fuente para Dislexia",
      focusMode: "Modo Enfoque",
      readingGuide: "Guía de Lectura",
      simplifiedInterface: "Interfaz Simplificada",
      errors: {
        generic: "Algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      },
      loading: "Cargando...",
      track: "Pista",
      refresh: "Actualizar",
      loadingTracks: "Cargando pistas...",
      loadingError: "Error al cargar",
      retry: "Reintentar",
      noTracksFound: "No se encontró ninguna pista",
      tryAnother: "Prueba otra",
      close: "Cerrar",
      clear: "Borrar",
      paymentSoon: "Suscripción disponible próximamente",
    },
    english: {
      paymentSoon: "Subscription coming soon",
      subscription: {
        title: "Subscribe to a plan",
        subtitle: "Choose a subscription to support {{artistName}}",

        button: {
          continue: "Continue",
          redirecting: "Redirecting...",
        },

        message: {
          redirecting: "Redirecting to the payment page...",
          paymentFailed: "Payment failed. Please try again.",
          success: "Payment completed successfully!",
        },

        payment: {
          stripe: "Credit card (Stripe)",
          lygos: "Mobile Money (Lygos)",
        },

        plans: {
          monthly: {
            label: "Monthly subscription",
            features: [
              "Access to exclusive releases",
              "Early listening",
              "Fan-only content",
              "Standard support",
            ],
          },
          quarterly: {
            label: "Quarterly subscription",
            features: [
              "All monthly benefits",
              "Exclusive premium content",
              "Access to private live sessions",
              "Limited downloads",
              "Priority support",
            ],
          },
          annual: {
            label: "Annual subscription",
            features: [
              "All quarterly benefits",
              "Unlimited access to premium content",
              "Unlimited downloads",
              "Virtual meet & greet with the artist",
              "VIP Fan badge",
              "VIP support",
            ],
          },
        },
      },
      loading: "Loading...",
      track: "Track",
      refresh: "Refresh",
      loadingTracks: "Loading tracks...",
      loadingError: "Error loading",
      retry: "Retry",
      noTracksFound: "No track found",
      tryAnother: "Try another",
      close: "Close",
      clear: "Clear",
      errors: {
        generic: "Something went wrong. Please try again later.",
      },
      noAlbumUploadedYet: "No album uploaded yet.",

      title: "Music for Everybody",
      discover: "Discover",
      myMusic: "My Music",
      artists: "Artists",
      search: "Search music, artists...",
      featured: "Featured",
      newReleases: "New Releases",

      subscribe: "Subscribe",
      play: "Play",
      pause: "Pause",
      addToFavorites: "Add to favorites",
      streams: "streams",
      subscribers: "subscribers",
      back: "Back",
      nowPlaying: "Now playing",
      duration: "Duration",
      lyrics: "Lyrics",
      textLyrics: "Text Lyrics",
      signLanguage: "Sign Language",
      editorPlaylists: "Editor's Playlists",
      addToPlaylist: "Add to Playlist",
      createPlaylist: "Create Playlist",
      playlistName: "Playlist Name",
      create: "Create",
      cancel: "Cancel",
      yourPlaylists: "Your Playlists",
      sortAlphabetically: "Sort Alphabetically",
      songs: "songs",
      noSongs: "No songs in this playlist",
      addedToPlaylist: "Added to playlist",
      favorites: "Favorites",
      addedToFavorites: "Added to favorites",
      removedFromFavorites: "Removed from favorites",
      accessibility: "Accessibility",
      dashboard: "Dashboard",
      mySubscriptions: "My Subscriptions",
      exclusiveGifts: "Exclusive Gifts",
      subscriptionStats: "Statistics",
      totalSubscriptions: "Total Subscriptions",
      totalGifts: "Total Gifts",
      unsubscribe: "Unsubscribe",
      subscribed: "Subscribed",
      claimGift: "Claim Gift",
      claimed: "Claimed",
      noSubscriptions: "You're not subscribed to any artists yet",
      noGifts: "No exclusive gifts available",
      exploreArtists: "Explore Artists",
      giftFrom: "Gift from",
      subscribedOn: "Subscribed since",
      visualAccessibility: "Visual Accessibility",
      hearingAccessibility: "Hearing Accessibility",
      motorAccessibility: "Motor Accessibility",
      cognitiveAccessibility: "Cognitive Accessibility",
      fontSize: "Font Size",
      small: "Small",
      medium: "Medium",
      large: "Large",
      extraLarge: "Extra Large",
      highContrast: "High Contrast",
      colorBlindMode: "Color Blind Mode",
      none: "None",
      protanopia: "Protanopia (Red-Green)",
      deuteranopia: "Deuteranopia (Red-Green)",
      tritanopia: "Tritanopia (Blue-Yellow)",
      reduceMotion: "Reduce Motion",
      textToSpeech: "Text to Speech",
      captions: "Captions",
      visualNotifications: "Visual Notifications",
      largerTargets: "Larger Buttons",
      keyboardNav: "Keyboard Navigation",
      voiceControl: "Voice Control",
      dyslexiaFont: "Dyslexia Font",
      focusMode: "Focus Mode",
      readingGuide: "Reading Guide",
      simplifiedInterface: "Simplified Interface",
    },
    catalan: {
      paymentSoon: "Subscripció disponible aviat",
      subscription: {
        title: "Subscriure's a un pla",
        subtitle: "Tria una subscripció per donar suport a {{artistName}}",

        button: {
          continue: "Continuar",
          redirecting: "Redirigint...",
        },

        message: {
          redirecting: "Redirigint a la pàgina de pagament...",
          paymentFailed: "El pagament ha fallat. Torna-ho a provar.",
          success: "Pagament realitzat amb èxit!",
        },

        payment: {
          stripe: "Targeta bancària (Stripe)",
          lygos: "Mobile Money (Lygos)",
        },

        plans: {
          monthly: {
            label: "Subscripció mensual",
            features: [
              "Accés a llançaments exclusius",
              "Escolta anticipada",
              "Contingut exclusiu per a fans",
              "Suport estàndard",
            ],
          },
          quarterly: {
            label: "Subscripció trimestral",
            features: [
              "Tots els avantatges mensuals",
              "Contingut premium exclusiu",
              "Accés a directes privats",
              "Descàrregues limitades",
              "Suport prioritari",
            ],
          },
          annual: {
            label: "Subscripció anual",
            features: [
              "Tots els avantatges trimestrals",
              "Accés il·limitat a contingut premium",
              "Descàrregues il·limitades",
              "Trobades virtuals amb l’artista",
              "Insígnia de Fan VIP",
              "Suport VIP",
            ],
          },
        },
      },
      loading: "Carregant...",
      track: "Pista",
      refresh: "Actualitzar",
      loadingTracks: "Carregant pistes...",
      loadingError: "Error en carregar",
      retry: "Torna-ho a provar",
      noTracksFound: "Cap pista trobada",
      tryAnother: "Prova una altra",
      close: "Tancar",
      clear: "Netejar",
      errors: {
        generic:
          "Alguna cosa ha anat malament. Si us plau, torna-ho a provar més tard.",
      },
      title: "Música per a Tothom",
      discover: "Descobrir",
      myMusic: "La Meva Música",
      artists: "Artistes",
      search: "Cercar música, artistes...",
      featured: "Destacats",
      newReleases: "Nous Llançaments",

      subscribe: "Subscriure's",
      play: "Reproduir",
      pause: "Pausar",
      addToFavorites: "Afegir a favorits",
      streams: "reproduccions",
      subscribers: "subscriptors",
      back: "Tornar",
      nowPlaying: "Reproduint ara",
      duration: "Durada",
      lyrics: "Lletra",
      textLyrics: "Lletra en Text",
      signLanguage: "Llengua de Signes",
      editorPlaylists: "Playlists dels Editors",
      addToPlaylist: "Afegir a Playlist",
      createPlaylist: "Crear Playlist",
      playlistName: "Nom de la Playlist",
      create: "Crear",
      cancel: "Cancel·lar",
      yourPlaylists: "Les Teves Playlists",
      sortAlphabetically: "Ordenar Alfabèticament",
      songs: "cançons",
      noSongs: "No hi ha cançons en aquesta playlist",
      addedToPlaylist: "Afegit a la playlist",
      favorites: "Favorits",
      addedToFavorites: "Afegit a favorits",
      removedFromFavorites: "Eliminat de favorits",
      accessibility: "Accessibilitat",
      dashboard: "Tauler",
      mySubscriptions: "Les Meves Subscripcions",
      exclusiveGifts: "Regals Exclusius",
      subscriptionStats: "Estadístiques",
      totalSubscriptions: "Subscripcions Totals",
      totalGifts: "Regals Totals",
      unsubscribe: "Cancel·lar Subscripció",
      subscribed: "Subscrit",
      claimGift: "Reclamar Regal",
      claimed: "Reclamat",
      noSubscriptions: "Encara no estàs subscrit a cap artista",
      noGifts: "No hi ha regals exclusius disponibles",
      exploreArtists: "Explorar Artistes",
      giftFrom: "Regal de",
      subscribedOn: "Subscrit des de",
      visualAccessibility: "Accessibilitat Visual",
      hearingAccessibility: "Accessibilitat Auditiva",
      motorAccessibility: "Accessibilitat Motora",
      cognitiveAccessibility: "Accessibilitat Cognitiva",
      fontSize: "Mida de Font",
      small: "Petit",
      medium: "Mitjà",
      large: "Gran",
      extraLarge: "Extra Gran",
      highContrast: "Alt Contrast",
      colorBlindMode: "Mode Daltònic",
      none: "Cap",
      protanopia: "Protanòpia (Vermell-Verd)",
      deuteranopia: "Deuteranòpia (Vermell-Verd)",
      tritanopia: "Tritanòpia (Blau-Groc)",
      reduceMotion: "Reduir Animacions",
      textToSpeech: "Text a Veu",
      captions: "Subtítols",
      visualNotifications: "Notificacions Visuals",
      largerTargets: "Botons Més Grans",
      keyboardNav: "Navegació per Teclat",
      voiceControl: "Control per Veu",
      dyslexiaFont: "Font per Dislèxia",
      focusMode: "Mode Focus",
      readingGuide: "Guia de Lectura",
      simplifiedInterface: "Interfície Simplificada",
    },
  };

  const text = content[language as keyof typeof content];

  function closeDrawer() {
    setDrawerOpen(false);
    setDrawerTitle("");
    setTracksError(null);
    setLoadingTracks(false);
  }

  const [queue, setQueue] = useState<any[]>([]); // liste des tracks en cours
  const [queueIndex, setQueueIndex] = useState<number>(-1);

  const [volume, setVolume] = useState(0.8); // 0..1
  const [isMuted, setIsMuted] = useState(false);

  // const loadQueueAndPlay = (tracks: any[], startIndex = 0) => {
  //   setQueue(tracks);
  //   setQueueIndex(startIndex);
  //   setCurrentSong(tracks[startIndex] ?? null);
  //   setIsPlaying(true);
  // };

  const formatTime = (sec = 0) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.audioUrl) return;

    audio.src = currentSong.audioUrl;

    if (isPlaying) {
      audio.play().catch((e) => console.error("Audio play error:", e));
    }
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((e) => console.error("Audio play error:", e));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      handleNextFromQueue1();
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [queue, queueIndex]);

  const toggleMute = () => setIsMuted((m) => !m);

  async function handleSelectGenre(selectedName: string) {
    try {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) return;

      setDrawerOpen(true);
      setDrawerType("genre");
      setDrawerTitle(`Genre: ${selectedName}`);
      setSelectedGenreName(selectedName);
      setSelectedMoodName(null);

      setLoadingTracks(true);
      setTracksError(null);
      setSavedTracks([]);

      const res = await TrackModuleObject.service.getTracksByGenreName(
        selectedName,
        token
      );

      const tracksRaw = res.tracks ?? res.data?.tracks ?? res.data ?? [];

      const tracksFromApi: SavedTrack[] = tracksRaw.map((t: any) => ({
        id: t.id,
        title: t.title,
        audioUrl: t.audioUrl,
        createdAt: t.createdAt,
        signLanguageVideoUrl: t.signLanguageVideoUrl,
        brailleFileUrl: t.brailleFileUrl,
        artistId: t.userId ?? t.artistId ?? null,
        isrcCode: t.isrcCode,
        duration: t.duration,
        lyrics: t.lyrics,
        userId: t.userId,
        slug: t.slug,
        type: t.type,
      }));

      const uniqueTracks = Array.from(
        new Map(tracksFromApi.map((t) => [t.id, t])).values()
      );

      setSavedTracks(uniqueTracks);
    } catch (error: any) {
      console.error("Erreur chargement tracks par genre:", error);
      setTracksError(text.errors.generic);
      setSavedTracks([]);
    } finally {
      setLoadingTracks(false);
    }
  }

  async function handleSelectMood(selectedName: string) {
    try {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) return;

      setDrawerOpen(true);
      setDrawerType("mood");
      setDrawerTitle(`Mood: ${selectedName}`);
      setSelectedMoodName(selectedName);
      setSelectedGenreName(null);

      setLoadingTracks(true);
      setTracksError(null);
      setSavedTracks([]);

      const res = await TrackModuleObject.service.getTracksByMoodName(
        selectedName,
        token
      );

      const tracksRaw = res.tracks ?? res.data?.tracks ?? res.data ?? [];

      const tracksFromApi: SavedTrack[] = tracksRaw.map((t: any) => ({
        id: t.id,
        title: t.title,
        audioUrl: t.audioUrl,
        createdAt: t.createdAt,
        signLanguageVideoUrl: t.signLanguageVideoUrl,
        brailleFileUrl: t.brailleFileUrl,
        artistId: t.userId ?? t.artistId ?? null,
        isrcCode: t.isrcCode,
        duration: t.duration,
        lyrics: t.lyrics,
        userId: t.userId,
        slug: t.slug,
        type: t.type,
      }));

      const uniqueTracks = Array.from(
        new Map(tracksFromApi.map((t) => [t.id, t])).values()
      );

      setSavedTracks(uniqueTracks);
    } catch (error: any) {
      console.error("Erreur chargement tracks par mood:", error);
      setTracksError(text.errors.generic);
      setSavedTracks([]);
    } finally {
      setLoadingTracks(false);
    }
  }

  async function openGenreDrawer(genreName: string) {
    setDrawerOpen(true);
    setDrawerTitle(`Genre: ${genreName}`);
    await handleSelectGenre(genreName);
  }

  async function openMoodDrawer(moodName: string) {
    setDrawerOpen(true);
    setDrawerTitle(`Mood: ${moodName}`);
    await handleSelectMood(moodName);
  }

  // Mock data for songs
  const mockSongs = [
    {
      id: 1,
      title: "Cosmic Journey",
      artist: "Luna Ethereal",
      album: "Starlight Dreams",
      duration: "4:32",
      streams: "1.2M",
      cover:
        "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80",
      signLanguageVideo: "https://www.w3schools.com/html/mov_bbb.mp4", // Demo video
      lyrics: `In the silence of the night
Stars are shining bright
Dreams are taking flight
Everything feels right

Waves are crashing down
Lost but now I'm found
Music is the sound
That turns my world around

Feel the rhythm in your soul
Let the melody take control
We are finally whole
Together we will roll`,
    },
    {
      id: 2,
      title: "Urban Awakening",
      artist: "Echo Mind",
      album: "City Consciousness",
      duration: "3:45",
      streams: "890K",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80",
      lyrics: `Walking through the city streets
Feeling all the urban beats
People rushing, never stopping
Hearts are racing, never dropping`,
    },
    {
      id: 3,
      title: "Nature's Call",
      artist: "Terra Sounds",
      album: "Earth Rhythms",
      duration: "5:18",
      streams: "2.1M",
      cover:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80",
      signLanguageVideo: "https://www.w3schools.com/html/movie.mp4", // Demo video
      lyrics: `Listen to the whispers of the trees
Dancing with the gentle breeze
Mountains calling from afar
Underneath the shining star`,
    },
    {
      id: 4,
      title: "Digital Dreams",
      artist: "Cyber Soul",
      album: "Future Waves",
      duration: "4:05",
      streams: "1.5M",
      cover:
        "https://images.unsplash.com/photo-1619983081563-430f63602796?w=300&q=80",
    },
    {
      id: 5,
      title: "Ocean Meditation",
      artist: "Aqua Harmony",
      album: "Deep Blue",
      duration: "6:22",
      streams: "3.2M",
      cover:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80",
    },
    {
      id: 6,
      title: "Mountain Echo",
      artist: "Peak Vibes",
      album: "Summit Sessions",
      duration: "4:50",
      streams: "1.8M",
      cover:
        "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=300&q=80",
    },
  ];

  // Mock data for editor's playlists
  // const editorPlaylists = [
  //   {
  //     id: "ed1",
  //     name:
  //       language === "spanish"
  //         ? "Viaje Sonoro"
  //         : language === "english"
  //         ? "Sonic Journey"
  //         : "Viatge Sonor",
  //     description:
  //       language === "spanish"
  //         ? "Las mejores pistas para explorar nuevos sonidos"
  //         : language === "english"
  //         ? "The best tracks to explore new sounds"
  //         : "Les millors pistes per explorar nous sons",
  //     cover:
  //       "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=80",
  //     songCount: 24,
  //     songs: [mockSongs[0], mockSongs[2], mockSongs[4]],
  //   },
  //   {
  //     id: "ed2",
  //     name:
  //       language === "spanish"
  //         ? "Energía Urbana"
  //         : language === "english"
  //         ? "Urban Energy"
  //         : "Energia Urbana",
  //     description:
  //       language === "spanish"
  //         ? "Ritmos de la ciudad que inspiran"
  //         : language === "english"
  //         ? "City rhythms that inspire"
  //         : "Ritmes de la ciutat que inspiren",
  //     cover:
  //       "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
  //     songCount: 18,
  //     songs: [mockSongs[1], mockSongs[3], mockSongs[5]],
  //   },
  //   {
  //     id: "ed3",
  //     name:
  //       language === "spanish"
  //         ? "Naturaleza Serena"
  //         : language === "english"
  //         ? "Serene Nature"
  //         : "Naturalesa Serena",
  //     description:
  //       language === "spanish"
  //         ? "Melodías inspiradas en la naturaleza"
  //         : language === "english"
  //         ? "Melodies inspired by nature"
  //         : "Melodies inspirades en la naturalesa",
  //     cover:
  //       "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80",
  //     songCount: 30,
  //     songs: [mockSongs[2], mockSongs[4]],
  //   },
  //   {
  //     id: "ed4",
  //     name:
  //       language === "spanish"
  //         ? "Estrellas Nocturnas"
  //         : language === "english"
  //         ? "Night Stars"
  //         : "Estrelles Nocturnes",
  //     description:
  //       language === "spanish"
  //         ? "Música para las noches mágicas"
  //         : language === "english"
  //         ? "Music for magical nights"
  //         : "Música per les nits màgiques",
  //     cover:
  //       "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&q=80",
  //     songCount: 22,
  //     songs: [mockSongs[0], mockSongs[3]],
  //   },
  // ];

  // Mock data for artists
  const mockArtists = [
    {
      id: 1,
      name: "Luna Ethereal",
      subscribers: "245K",
      genres: "Ambient, Electronic",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    },
    {
      id: 2,
      name: "Echo Mind",
      subscribers: "189K",
      genres: "Hip Hop, Urban",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
      id: 3,
      name: "Terra Sounds",
      subscribers: "312K",
      genres: "World, Folk",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    },
    {
      id: 4,
      name: "Cyber Soul",
      subscribers: "198K",
      genres: "Electronic, Synth",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    },
  ];

  const getFavoriteSongsList = () => {
    return mockSongs.filter((song) => favoriteSongs.includes(song.id));
  };

  // Mock data for exclusive gifts
  const exclusiveGifts = [
    {
      id: "gift1",
      artistId: 1,
      artistName: "Luna Ethereal",
      title:
        language === "spanish"
          ? "Álbum Firmado Digitalmente"
          : language === "english"
          ? "Digitally Signed Album"
          : "Àlbum Signat Digitalment",
      description:
        language === "spanish"
          ? "Edición exclusiva con firma digital"
          : language === "english"
          ? "Exclusive edition with digital signature"
          : "Edició exclusiva amb signatura digital",
      type: "album",
      claimed: false,
      cover:
        "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=300&q=80",
    },
    {
      id: "gift2",
      artistId: 2,
      artistName: "Echo Mind",
      title:
        language === "spanish"
          ? "Pista Exclusiva"
          : language === "english"
          ? "Exclusive Track"
          : "Pista Exclusiva",
      description:
        language === "spanish"
          ? "Acceso anticipado a nuevo single"
          : language === "english"
          ? "Early access to new single"
          : "Accés anticipat al nou single",
      type: "track",
      claimed: false,
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80",
    },
    {
      id: "gift3",
      artistId: 3,
      artistName: "Vortex Dreams",
      title:
        language === "spanish"
          ? "Video Behind the Scenes"
          : language === "english"
          ? "Behind the Scenes Video"
          : "Vídeo Darrere les Escenes",
      description:
        language === "spanish"
          ? "Video exclusivo del proceso de grabación"
          : language === "english"
          ? "Exclusive recording process video"
          : "Vídeo exclusiu del procés de gravació",
      type: "video",
      claimed: false,
      cover:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&q=80",
    },
  ];

  async function toggleSubscription(artistId: string) {
    try {
      const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
      if (!token) return;

      setSubscribingArtistId(artistId);

      const isSubscribed = subscribedArtists.includes(String(artistId));

      if (isSubscribed) {
        await SubscriptionModuleObject.service.unsubscribe(
          String(artistId),
          token
        );
        setSubscribedArtists((prev) =>
          prev.filter((id) => id !== String(artistId))
        );
      } else {
        // option: price/months selon ton business
        await SubscriptionModuleObject.service.subscribe(
          String(artistId),
          token,
          { months: 1, price: 0 }
        );
        setSubscribedArtists((prev) => [...prev, String(artistId)]);
      }
    } catch (e) {
      console.error("toggleSubscription error:", e);
    } finally {
      setSubscribingArtistId(null);
    }
  }

  async function requireSubscription(artistId: string): Promise<boolean> {
    const token = localStorage.getItem(ModuleObject.localState.ACCESS_TOKEN);
    if (!token) return false;

    // ✅ déjà abonné côté state
    if (subscribedArtists.includes(String(artistId))) return true;

    const res = (await SubscriptionModuleObject.service.getStatus(
      String(artistId),
      token
    )) as SubscriptionStatusResponse;

    const ok = Boolean(res?.data?.isSubscribed);

    if (ok) {
      setSubscribedArtists((prev) =>
        prev.includes(String(artistId)) ? prev : [...prev, String(artistId)]
      );
    }

    return ok;
  }

  const openSubscribeModal = (artist: any) => {
    startSubscription(artist);
  };

  const getSubscribedArtistsList = () => {
    if (!Array.isArray(artists) || artists.length === 0) return [];
    return artists.filter((artist: any) =>
      subscribedArtists.includes(String(artist.id))
    );
  };

  const getGiftsForSubscribedArtists = () => {
    if (!Array.isArray(exclusiveGifts) || exclusiveGifts.length === 0)
      return [];

    return exclusiveGifts.filter((gift: any) =>
      subscribedArtists.includes(String(gift.artistId))
    );
  };

  // Apply accessibility styles
  const containerClasses = `fixed inset-0 w-screen h-screen bg-gradient-to-br from-purple-900/90 via-pink-900/90 to-blue-900/90 overflow-hidden ${
    fontSize === "large"
      ? "text-lg"
      : fontSize === "xl"
      ? "text-xl"
      : fontSize === "small"
      ? "text-sm"
      : ""
  } ${highContrast ? "contrast-150" : ""} ${dyslexiaFont ? "font-mono" : ""}`;

  const buttonSizeClasses = largerTargets
    ? "min-h-[48px] min-w-[48px] px-6 py-3"
    : "";
  const animationClasses = reduceMotion ? "" : "transition-all";

  // Show profile page if requested
  if (showProfile) {
    return (
      <FanProfile onBack={() => setShowProfile(false)} language={language} />
    );
  }

  return (
    <div
      className={containerClasses}
      style={{
        filter:
          colorBlindMode === "protanopia"
            ? "url(#protanopia)"
            : colorBlindMode === "deuteranopia"
            ? "url(#deuteranopia)"
            : colorBlindMode === "tritanopia"
            ? "url(#tritanopia)"
            : "none",
      }}
    >
      {/* SVG Filters for Color Blind Modes */}
      <svg className="hidden">
        <defs>
          <filter id="protanopia">
            <feColorMatrix
              type="matrix"
              values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix
              type="matrix"
              values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix
              type="matrix"
              values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Accessibility Floating Button */}
      <button
        onClick={() => setShowAccessibility(true)}
        className={`
    fixed sm:bottom-12 bottom-9
    right-6 sm:right-auto
    sm:left-6
    z-40
    
    bg-white/20 backdrop-blur-md
    rounded-full p-4
    border border-white/30
    hover:bg-white/30
    shadow-xl
    ${animationClasses}
    ${buttonSizeClasses}
  `}
        aria-label={text.accessibility}
        title={text.accessibility}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </button>

      {/* Reading Guide */}
      {readingGuide && (
        <div
          className="fixed left-0 right-0 h-12 bg-white/10 backdrop-blur-sm border-y-2 border-white/30 pointer-events-none z-50"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        />
      )}

      {/* Visual Notifications */}
      {notification && visualNotifications && (
        <div className="fixed top-20 right-6 z-50 bg-white/20 backdrop-blur-xl border-2 border-white/40 rounded-xl p-4 shadow-2xl animate-bounce">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white drop-shadow">{notification}</span>
          </div>
        </div>
      )}

      {/* Keyboard Navigation Hints */}
      {keyboardNav && !showAccessibility && (
        <div className="fixed bottom-6 right-6 z-40 bg-black/80 backdrop-blur-md border border-white/30 rounded-xl p-4 text-xs text-white/80">
          <div className="space-y-1">
            <div>
              <kbd className="bg-white/20 px-2 py-1 rounded">ESC</kbd>{" "}
              {language === "spanish"
                ? "Volver"
                : language === "english"
                ? "Back"
                : "Tornar"}
            </div>
            <div>
              <kbd className="bg-white/20 px-2 py-1 rounded">SPACE</kbd>{" "}
              {language === "spanish"
                ? "Play/Pausa"
                : language === "english"
                ? "Play/Pause"
                : "Play/Pausa"}
            </div>
            <div>
              <kbd className="bg-white/20 px-2 py-1 rounded">Ctrl+A</kbd>{" "}
              {text.accessibility}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div
        className={`absolute top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-md border-b border-white/10 ${
          focusMode ? "opacity-80" : ""
        }`}
      >
        {isArtist && (
          <button
            onClick={() => router.push("/dashboard/artist/select")}
            className={`flex cursor-pointer items-center m-1 text-white drop-shadow hover:opacity-70 ${animationClasses} ${buttonSizeClasses}`}
            aria-label={text.back}
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
        <div className="flex items-center justify-between p-2">
          <h1 className="text-2xl text-white drop-shadow-lg">{text.title}</h1>
          <div className="flex items-center gap-2 ml-auto">
            {/* PROFILE BUTTON */}
            <button
              onClick={() => setShowProfile(true)}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 text-white bg-white/10
    backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 transition-all"
            >
              <User size={20} />
              {language === "spanish"
                ? "Perfil"
                : language === "english"
                ? "Profile"
                : "Perfil"}
            </button>

            {/* LOGOUT BUTTON */}
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
        </div>
        {/* Tab Navigation */}
        <div className="w-full overflow-x-auto">
          <div className="flex flex-nowrap items-center justify-start sm:justify-center gap-4 sm:gap-8 px-4 sm:px-6 pb-3 sm:pb-4">
            <button
              onClick={() => setSelectedTab("discover")}
              className={`
        flex-shrink-0 text-sm sm:text-base text-white drop-shadow cursor-pointer 
        pb-2 border-b-2 transition-colors
        ${
          selectedTab === "discover"
            ? "border-white opacity-100"
            : "border-transparent opacity-60 hover:opacity-80"
        }
      `}
            >
              {text.discover}
            </button>

            <button
              onClick={() => setSelectedTab("artists")}
              className={`
        flex-shrink-0 text-sm sm:text-base text-white drop-shadow cursor-pointer 
        pb-2 border-b-2 transition-colors
        ${
          selectedTab === "artists"
            ? "border-white opacity-100"
            : "border-transparent opacity-60 hover:opacity-80"
        }
      `}
            >
              {text.artists}
            </button>

            <button
              onClick={() => setSelectedTab("mymusic")}
              className={`
        flex-shrink-0 text-sm sm:text-base text-white drop-shadow cursor-pointer 
        pb-2 border-b-2 transition-colors
        ${
          selectedTab === "mymusic"
            ? "border-white opacity-100"
            : "border-transparent opacity-60 hover:opacity-80"
        }
      `}
            >
              {text.myMusic}
            </button>

            <button
              onClick={() => setSelectedTab("editorplaylists")}
              className={`
        flex-shrink-0 text-sm sm:text-base text-white drop-shadow cursor-pointer 
        pb-2 border-b-2 transition-colors
        ${
          selectedTab === "editorplaylists"
            ? "border-white opacity-100"
            : "border-transparent opacity-60 hover:opacity-80"
        }
      `}
            >
              {text.editorPlaylists}
            </button>

            <button
              onClick={() => setSelectedTab("dashboard")}
              className={`
        flex-shrink-0 text-sm sm:text-base text-white drop-shadow cursor-pointer 
        pb-2 border-b-2 transition-colors
        ${
          selectedTab === "dashboard"
            ? "border-white opacity-100"
            : "border-transparent opacity-60 hover:opacity-80"
        }
      `}
            >
              {text.dashboard}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute pb-25 sm:top-[90px] top-[100px] mt-5 left-0 right-0 bottom-32 overflow-y-auto px-6">
        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto mt-2">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={text.search}
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-black placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-all"
            />
          </div>
        </div>

        {/* Discover Tab */}
        {selectedTab === "discover" && (
          <div className="space-y-8 max-w-6xl mx-auto">
            {/* Browse by Genre Section */}
            {/* <div>
              <h2 className="text-2xl text-white drop-shadow-lg mb-4">
                {language === "spanish" && "Explorar por Género"}
                {language === "english" && "Browse by Genre"}
                {language === "catalan" && "Explorar per Gènere"}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  {
                    name:
                      language === "spanish"
                        ? "Rock"
                        : language === "catalan"
                        ? "Rock"
                        : "Rock",
                    color: "from-red-500/40 to-orange-500/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Pop"
                        : language === "catalan"
                        ? "Pop"
                        : "Pop",
                    color: "from-pink-500/40 to-purple-500/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Jazz"
                        : language === "catalan"
                        ? "Jazz"
                        : "Jazz",
                    color: "from-blue-500/40 to-cyan-500/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Clásica"
                        : language === "catalan"
                        ? "Clàssica"
                        : "Classical",
                    color: "from-amber-500/40 to-yellow-500/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Electrónica"
                        : language === "catalan"
                        ? "Electrònica"
                        : "Electronic",
                    color: "from-purple-500/40 to-fuchsia-500/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Hip Hop"
                        : language === "catalan"
                        ? "Hip Hop"
                        : "Hip Hop",
                    color: "from-gray-500/40 to-slate-500/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Reggae"
                        : language === "catalan"
                        ? "Reggae"
                        : "Reggae",
                    color: "from-green-500/40 to-emerald-500/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "R&B"
                        : language === "catalan"
                        ? "R&B"
                        : "R&B",
                    color: "from-rose-500/40 to-red-500/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Country"
                        : language === "catalan"
                        ? "Country"
                        : "Country",
                    color: "from-orange-500/40 to-amber-500/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Latina"
                        : language === "catalan"
                        ? "Llatina"
                        : "Latin",
                    color: "from-red-500/40 to-pink-500/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Indie"
                        : language === "catalan"
                        ? "Indie"
                        : "Indie",
                    color: "from-teal-500/40 to-cyan-500/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Metal"
                        : language === "catalan"
                        ? "Metal"
                        : "Metal",
                    color: "from-zinc-500/40 to-gray-500/40",
                  },
                ].map((genre) => (
                  <button
                    key={genre.name}
                    onClick={() => openGenreDrawer(genre.name)}
                    className={`
        bg-gradient-to-br ${genre.color}
        backdrop-blur-md rounded-2xl p-6
        border border-white/20
        hover:scale-105 transition-all
        cursor-pointer
        flex items-center justify-center
        min-h-[120px]
        focus:outline-none focus:ring-2 focus:ring-white/40
      `}
                    aria-label={`Browse genre ${genre.name}`}
                  >
                    <h3 className="text-white drop-shadow text-center">
                      {genre.name}
                    </h3>
                  </button>
                ))}
              </div>
            </div> */}

            {/* Browse by Mood Section */}
            <div>
              <h2 className="text-2xl text-white drop-shadow-lg mb-4">
                {language === "spanish" && "Explorar por Estado de Ánimo"}
                {language === "english" && "Browse by Mood"}
                {language === "catalan" && "Explorar per Estat d'Ànim"}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  {
                    name:
                      language === "spanish"
                        ? "Feliz"
                        : language === "catalan"
                        ? "Feliç"
                        : "Happy",
                    emoji: "😊",
                    color: "from-yellow-400/40 to-orange-400/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Relajado"
                        : language === "catalan"
                        ? "Relaxat"
                        : "Relaxed",
                    emoji: "😌",
                    color: "from-blue-400/40 to-cyan-400/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Energético"
                        : language === "catalan"
                        ? "Energètic"
                        : "Energetic",
                    emoji: "⚡",
                    color: "from-red-400/40 to-pink-400/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Triste"
                        : language === "catalan"
                        ? "Trist"
                        : "Sad",
                    emoji: "😢",
                    color: "from-indigo-400/40 to-blue-400/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Romántico"
                        : language === "catalan"
                        ? "Romàntic"
                        : "Romantic",
                    emoji: "💕",
                    color: "from-pink-400/40 to-rose-400/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Enfocado"
                        : language === "catalan"
                        ? "Concentrat"
                        : "Focused",
                    emoji: "🎯",
                    color: "from-purple-400/40 to-violet-400/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Motivado"
                        : language === "catalan"
                        ? "Motivat"
                        : "Motivated",
                    emoji: "💪",
                    color: "from-green-400/40 to-emerald-400/40",
                  },
                  {
                    name:
                      language === "spanish"
                        ? "Nostálgico"
                        : language === "catalan"
                        ? "Nostàlgic"
                        : "Nostalgic",
                    emoji: "🌅",
                    color: "from-amber-400/40 to-yellow-400/40",
                  },
                ].map((mood) => (
                  <button
                    key={mood.name}
                    onClick={() => openMoodDrawer(mood.name)}
                    className={`
        bg-gradient-to-br ${mood.color}
        backdrop-blur-md rounded-2xl p-6
        border border-white/20
        hover:scale-105 transition-all
        cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-white/40
      `}
                    aria-label={`Browse mood ${mood.name}`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{mood.emoji}</div>
                      <h3 className="text-white drop-shadow">{mood.name}</h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Section */}
            <div>
              <h2 className="text-2xl text-white drop-shadow-lg mb-4">
                {text.featured}
              </h2>

              {featuredLoading ? (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-white/70 text-center">
                  Loading...
                </div>
              ) : featuredError ? (
                <div className="bg-red-500/10 backdrop-blur-md rounded-2xl p-6 border border-red-500/20 text-white/80 text-center">
                  {featuredError}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredSongs.slice(0, 3).map((song: any) => (
                    <div
                      key={song.id}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                    >
                      <div className="aspect-square bg-white/5 rounded-xl mb-4 overflow-hidden">
                        <img
                          src={song.cover ?? "/placeholder.png"}
                          alt={song.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <h3 className="text-white drop-shadow mb-1">
                        {song.title}
                      </h3>

                      <p className="text-white/60 text-sm mb-2">
                        {song.artist}
                        {song.album ? ` • ${song.album}` : ""}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-white/50 text-xs">
                          {song.streams} {text.streams}
                        </span>

                        <button
                          onClick={() => handlePlayFeatured(song)}
                          className="cursor-pointer p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                          aria-label={
                            isPlaying && currentSong?.id === song.id
                              ? text.pause
                              : text.play
                          }
                          title={
                            isPlaying && currentSong?.id === song.id
                              ? text.pause
                              : text.play
                          }
                        >
                          {isPlaying && currentSong?.id === song.id ? (
                            <Pause size={20} className="text-white" />
                          ) : (
                            <Play size={20} className="text-white" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* New Releases */}
            <div>
              <h2 className="text-2xl text-white drop-shadow-lg mb-4">
                {text.newReleases}
              </h2>

              <div className="space-y-3">
                {newReleasesLoading ? (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-white/70 text-sm">
                    Loading...
                  </div>
                ) : newReleasesError ? (
                  <div className="bg-red-500/10 backdrop-blur-md rounded-xl p-4 border border-red-500/20 text-white/80 text-sm">
                    {newReleasesError}
                  </div>
                ) : (
                  (newReleases ?? []).map((song: any) => (
                    <div
                      key={song.id}
                      className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all"
                    >
                      <div className="flex items-center gap-4 sm:flex-row flex-col">
                        <div className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={song.cover ?? "/placeholder.png"}
                            alt={song.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-white drop-shadow truncate">
                            {song.title}
                          </h4>
                          <p className="text-white/60 text-sm truncate">
                            {song.artist} • {song.album}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-white/60 text-sm">
                            {song.duration}
                          </span>

                          {/* ✅ Nouveau handler : le Player choisit single/ep/album et charge la bonne queue */}
                          <button
                            onClick={() => handlePlayFeatured(song)}
                            className="cursor-pointer p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                            aria-label={
                              isPlaying && currentSong?.id === song.id
                                ? text.pause
                                : text.play
                            }
                            title={
                              isPlaying && currentSong?.id === song.id
                                ? text.pause
                                : text.play
                            }
                          >
                            {isPlaying && currentSong?.id === song.id ? (
                              <Pause size={18} className="text-white" />
                            ) : (
                              <Play size={18} className="text-white" />
                            )}
                          </button>

                          <button
                            onClick={() => toggleFavorite(song.id)}
                            className="cursor-pointer p-3 hover:bg-white/10 rounded-full transition-all"
                            title={text.addToFavorites}
                          >
                            <Heart
                              size={18}
                              className={`${
                                favoriteTrackIds.includes(String(song.id))
                                  ? "text-red-400 fill-red-400"
                                  : "text-white"
                              }`}
                            />
                          </button>

                          {/* ✅ Nouveau handler : ouvre modal + fetch playlists user + ajout track backend */}
                          <button
                            onClick={() => openAddToPlaylist(song)}
                            className="cursor-pointer p-3 hover:bg-white/10 rounded-full transition-all"
                            title={text.addToPlaylist}
                            aria-label={text.addToPlaylist}
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
                              <line x1="12" y1="5" x2="12" y2="19" />
                              <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Artists Tab */}
        {selectedTab === "artists" && (
          <div className="space-y-6 max-w-6xl mx-auto">
            {/* Header with sort option */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-white drop-shadow-lg">
                {text.artists}
              </h2>

              <button
                onClick={() => setSortArtists(!sortArtists)}
                className={`px-4 py-2 rounded-lg text-white text-sm transition-all ${
                  sortArtists ? "bg-white/20" : "bg-white/10 hover:bg-white/15"
                }`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="inline mr-2"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="15" y2="18" />
                </svg>
                {text.sortAlphabetically}
              </button>
            </div>

            {/* Loading / Error / Grid */}
            {artistsLoading ? (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-white/70 text-center">
                Loading artists...
              </div>
            ) : artistsError ? (
              <div className="bg-red-500/10 backdrop-blur-md rounded-xl p-6 border border-red-500/20 text-white/80 text-center">
                {artistsError}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(sortArtists
                  ? [...artists].sort((a: any, b: any) =>
                      String(a.name ?? "").localeCompare(String(b.name ?? ""))
                    )
                  : artists
                ).map((artist: any) => (
                  <div
                    key={artist.id}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all text-center"
                  >
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-white/5">
                      <img
                        src={artist.avatar ?? "/avatar-placeholder.png"}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-white drop-shadow mb-2">
                      {artist.name}
                    </h3>

                    <p className="text-white/60 text-sm mb-1">
                      {artist.genres && String(artist.genres).trim() !== ""
                        ? artist.genres
                        : "—"}
                    </p>

                    <p className="text-white/50 text-xs mb-4">
                      {artist.subscribers ?? 0} {text.subscribers}
                    </p>

                    <button
                      disabled={!artist.hasActivePlan}
                      onClick={() => {
                        if (!artist.hasActivePlan) return;

                        subscribedArtists.includes(String(artist.id))
                          ? toggleSubscription(String(artist.id)) // unsubscribe
                          : startSubscription(artist); // open payment options
                      }}
                      className={`cursor-pointer disabled:cursor-not-allowed w-full px-4 py-2 backdrop-blur-sm rounded-lg text-white transition-all flex items-center justify-center gap-2
                                  ${
                                    artist.hasActivePlan
                                      ? subscribedArtists.includes(
                                          String(artist.id)
                                        )
                                        ? "bg-white/30 border border-white/40"
                                        : "bg-white/20 hover:bg-white/30"
                                      : "bg-white/10 text-white/60 cursor-not-allowed"
                                  }
                                `}
                    >
                      <Star
                        size={16}
                        className={
                          artist.hasActivePlan &&
                          subscribedArtists.includes(String(artist.id))
                            ? "fill-white"
                            : ""
                        }
                      />

                      {artist.hasActivePlan
                        ? subscribedArtists.includes(artist.id)
                          ? text.subscribed
                          : text.subscribe
                        : text.paymentSoon}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* My Music Tab */}
        {selectedTab === "mymusic" && (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Favorites Playlist - Always visible */}
            <div>
              <h2 className="text-2xl text-white drop-shadow-lg mb-4">
                {text.favorites}
              </h2>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-32 h-32 bg-gradient-to-br from-red-500/40 to-pink-500/40 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart size={64} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl text-white drop-shadow mb-2">
                      {text.favorites}
                    </h3>
                    <p className="text-white/60">
                      {favoriteTrackIds.length} {text.songs}
                    </p>
                  </div>
                </div>

                {favoriteTrackIds.length > 0 ? (
                  <div className="space-y-2">
                    {getFavoriteSongsList().map((song) => (
                      <div
                        key={song.id}
                        className="bg-white/5 rounded-lg p-3 flex items-center gap-4 hover:bg-white/10 transition-all"
                      >
                        <div className="w-12 h-12 bg-white/5 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={song.cover}
                            alt={song.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white drop-shadow text-sm truncate">
                            {song.title}
                          </h4>
                          <p className="text-white/60 text-xs truncate">
                            {song.artist}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-white/60 text-sm">
                            {song.duration}
                          </span>
                          <button
                            onClick={() => handlePlaySong(song)}
                            className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
                          >
                            {isPlaying && currentSong?.id === song.id ? (
                              <Pause size={16} className="text-white" />
                            ) : (
                              <Play size={16} className="text-white" />
                            )}
                          </button>
                          <button
                            onClick={() => toggleFavorite(String(song.id))}
                            className="p-2 hover:bg-white/10 rounded-full transition-all"
                          >
                            <Heart
                              size={16}
                              className="text-red-400 fill-red-400"
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart size={48} className="text-white/30 mx-auto mb-3" />
                    <p className="text-white/50">
                      {language === "spanish" &&
                        "Aún no tienes canciones favoritas"}
                      {language === "english" && "No favorite songs yet"}
                      {language === "catalan" &&
                        "Encara no tens cançons favorites"}
                    </p>
                    <p className="text-white/40 text-sm mt-2">
                      {language === "spanish" &&
                        "Presiona el corazón en cualquier canción para añadirla a favoritos"}
                      {language === "english" &&
                        "Press the heart on any song to add it to favorites"}
                      {language === "catalan" &&
                        "Prem el cor a qualsevol cançó per afegir-la a favorits"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Header with sort and create options */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-white drop-shadow-lg">
                {text.yourPlaylists}
              </h2>
              <div className="flex items-center gap-4">
                {userPlaylists.length > 0 && (
                  <button
                    onClick={() => setSortPlaylists(!sortPlaylists)}
                    className={`cursor-pointer px-4 py-2 rounded-lg text-white text-sm transition-all ${
                      sortPlaylists
                        ? "bg-white/20"
                        : "bg-white/10 hover:bg-white/15"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="inline mr-2"
                    >
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="15" y2="18" />
                    </svg>
                    {text.sortAlphabetically}
                  </button>
                )}
                <button
                  onClick={() => setShowCreatePlaylist(true)}
                  className="cursor-pointer px-4 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-all text-sm flex items-center gap-2"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  {text.createPlaylist}
                </button>
              </div>
            </div>

            {/* Playlists Grid */}
            {userPlaylists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(sortPlaylists
                  ? [...userPlaylists].sort((a, b) =>
                      a.nom.localeCompare(b.nom)
                    )
                  : userPlaylists
                ).map((playlist) => (
                  <div
                    key={playlist.id}
                    onClick={() => handlePlayPlaylist(playlist, 0)}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                  >
                    <div className="aspect-square bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl mb-4 flex items-center justify-center">
                      <Music size={64} className="text-white/60" />
                    </div>
                    <h3 className="text-white drop-shadow mb-2">
                      {playlist.nom}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {playlist.tracks?.length ?? 0} {text.songs}
                    </p>

                    {/* Show songs in playlist */}
                    {(playlist.tracks?.length ?? 0) > 0 && (
                      <div className="mt-4 space-y-2">
                        {playlist.tracks.slice(0, 3).map((track: any) => (
                          <div
                            key={track.id}
                            className="flex items-center gap-2"
                          >
                            <div className="w-8 h-8 bg-white/5 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={track.coverUrl ?? "/placeholder.png"}
                                alt={track.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="text-white/80 text-xs truncate">
                                {track.title}
                              </p>
                            </div>
                          </div>
                        ))}

                        {(playlist.tracks?.length ?? 0) > 3 && (
                          <p className="text-white/50 text-xs">
                            +{(playlist.tracks?.length ?? 0) - 3} más
                          </p>
                        )}
                      </div>
                    )}

                    {playlist.tracks?.length === 0 && (
                      <p className="text-white/50 text-sm mt-4 italic">
                        {text.noSongs}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 text-center">
                <Music size={64} className="text-white/40 mx-auto mb-4" />
                <h3 className="text-xl text-white drop-shadow mb-2">
                  {language === "spanish" && "No tienes playlists aún"}
                  {language === "english" && "You don't have any playlists yet"}
                  {language === "catalan" && "Encara no tens playlists"}
                </h3>
                <p className="text-white/60 mb-6">
                  {language === "spanish" &&
                    "Crea tu primera playlist y empieza a organizar tu música"}
                  {language === "english" &&
                    "Create your first playlist and start organizing your music"}
                  {language === "catalan" &&
                    "Crea la teva primera playlist i comença a organitzar la teva música"}
                </p>
                <button
                  onClick={() => setShowCreatePlaylist(true)}
                  className="cursor-pointer px-6 py-3 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-all inline-flex items-center gap-2"
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
                  {text.createPlaylist}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Editor's Playlists Tab */}
        {selectedTab === "editorplaylists" && (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl text-white drop-shadow-lg">
                {text.editorPlaylists}
              </h2>

              <button
                type="button"
                onClick={fetchEditorPlaylists}
                disabled={editorPlaylistsLoading}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editorPlaylistsLoading
                  ? "loading…"
                  : language === "english"
                  ? "Refresh"
                  : language === "spanish"
                  ? "Actualizar"
                  : "Actualitzar"}
              </button>
            </div>

            {/* LOADING */}
            {editorPlaylistsLoading && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-white/70 text-center">
                {language === "english"
                  ? "Loading editor playlists…"
                  : language === "spanish"
                  ? "Cargando playlists editoriales…"
                  : "Carregant playlists editorials…"}
              </div>
            )}

            {/* ERROR */}
            {!editorPlaylistsLoading && editorPlaylistsError && (
              <div className="bg-red-500/10 backdrop-blur-md rounded-xl p-6 border border-red-500/20 text-white/80 text-center">
                {editorPlaylistsError}
              </div>
            )}

            {/* EMPTY STATE */}
            {!editorPlaylistsLoading &&
              !editorPlaylistsError &&
              (editorPlaylists?.length ?? 0) === 0 && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-10 border border-white/20 text-center">
                  <p className="text-white/80 text-lg font-semibold mb-2">
                    {language === "english"
                      ? "No editor playlists yet"
                      : language === "spanish"
                      ? "Aún no hay playlists editoriales"
                      : "Encara no hi ha playlists editorials"}
                  </p>

                  <p className="text-white/60 text-sm max-w-md mx-auto">
                    {language === "english"
                      ? "Our editorial team is working on curated playlists. Check back soon!"
                      : language === "spanish"
                      ? "Nuestro equipo editorial está preparando playlists seleccionadas. ¡Vuelve pronto!"
                      : "El nostre equip editorial està preparant playlists seleccionades. Torna aviat!"}
                  </p>
                </div>
              )}

            {/* LIST */}
            {!editorPlaylistsLoading &&
              !editorPlaylistsError &&
              (editorPlaylists?.length ?? 0) > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {editorPlaylists.map((playlist: any) => (
                    <div
                      key={playlist.id}
                      className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all"
                    >
                      <div className="aspect-video bg-white/5 overflow-hidden">
                        <img
                          src={playlist.cover ?? "/placeholder.png"}
                          alt={playlist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-6">
                        <h3 className="text-white drop-shadow mb-2">
                          {playlist.name}
                        </h3>

                        <p className="text-white/60 text-sm mb-4">
                          {playlist.description}
                        </p>

                        <p className="text-white/50 text-xs mb-4">
                          {playlist.songCount} {text.songs}
                        </p>

                        {/* Preview songs */}
                        <div className="space-y-2 mb-4">
                          {(playlist.songs ?? [])
                            .slice(0, 5)
                            .map((song: any) => (
                              <div
                                key={song.id}
                                className="flex items-center gap-3"
                              >
                                <div className="w-10 h-10 bg-white/5 rounded overflow-hidden flex-shrink-0">
                                  <img
                                    src={song.cover ?? "/placeholder.png"}
                                    alt={song.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <p className="text-white/90 text-sm truncate">
                                    {song.title}
                                  </p>
                                  <p className="text-white/50 text-xs truncate">
                                    {song.artist}
                                  </p>
                                </div>

                                <button
                                  onClick={() =>
                                    handlePlaySong(song, playlist.songs)
                                  }
                                  className="p-2 hover:bg-white/10 rounded-full transition-all"
                                  aria-label={
                                    isPlaying && currentSong?.id === song.id
                                      ? text.pause
                                      : text.play
                                  }
                                >
                                  {isPlaying && currentSong?.id === song.id ? (
                                    <Pause size={16} className="text-white" />
                                  ) : (
                                    <Play size={16} className="text-white" />
                                  )}
                                </button>
                              </div>
                            ))}
                        </div>

                        <button
                          onClick={() => handlePlayEditorPlaylist(playlist)}
                          className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all flex items-center justify-center gap-2"
                        >
                          <Play size={16} />
                          {text.play}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        )}

        {/* Dashboard Tab */}
        {selectedTab === "dashboard" && (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header actions */}
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl text-white drop-shadow-lg">
                {text.dashboard}
              </h2>

              <button
                onClick={fetchMySubscriptionsDashboard}
                disabled={subscriptionsLoading}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {subscriptionsLoading
                  ? "loading…"
                  : language === "english"
                  ? "Refresh"
                  : language === "spanish"
                  ? "Actualizar"
                  : "Actualitzar"}
              </button>
            </div>

            {/* Loading/Error */}
            {subscriptionsLoading && (
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-white/70">
                {language === "english"
                  ? "Loading subscriptions…"
                  : language === "spanish"
                  ? "Cargando suscripciones…"
                  : "Carregant subscripcions…"}
              </div>
            )}

            {!subscriptionsLoading && subscriptionsError && (
              <div className="bg-red-500/10 backdrop-blur-md rounded-xl p-6 border border-red-500/20 text-white/80">
                {subscriptionsError}
              </div>
            )}

            {/* Stats Cards */}
            {!subscriptionsLoading && !subscriptionsError && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-500/40 to-pink-500/40 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Star size={32} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">
                        {text.totalSubscriptions}
                      </p>
                      <p className="text-3xl text-white drop-shadow">
                        {
                          mySubscriptions.filter(
                            (s: any) => s.status === "active"
                          ).length
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/40 to-cyan-500/40 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-white"
                      >
                        <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
                        <polyline points="7 3 12 8 17 3" />
                        <polyline points="12 8 12 21" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{text.totalGifts}</p>
                      <p className="text-3xl text-white drop-shadow">
                        {getGiftsForSubscribedArtistsFromSubs().length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* My Subscriptions */}
            <div>
              <h2 className="text-2xl text-white drop-shadow-lg mb-4">
                {text.mySubscriptions}
              </h2>

              {!subscriptionsLoading &&
              !subscriptionsError &&
              mySubscriptions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mySubscriptions
                    .filter((s: any) => s.status === "active")
                    .map((sub: any) => {
                      const artist = artists.find(
                        (a: any) => String(a.id) === String(sub.artistId)
                      );

                      return (
                        <div
                          key={sub.id}
                          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                        >
                          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-white/5">
                            <img
                              src={artist?.avatar ?? "/avatar-placeholder.png"}
                              alt={artist?.name ?? "Artist"}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <h3 className="text-white drop-shadow mb-2 text-center">
                            {artist?.name ?? "Artist"}
                          </h3>

                          <p className="text-white/60 text-sm mb-1 text-center">
                            {artist?.genres ?? "—"}
                          </p>

                          <p className="text-white/50 text-xs mb-4 text-center">
                            {text.subscribedOn}:{" "}
                            {sub.startDate
                              ? new Date(sub.startDate).toLocaleDateString()
                              : new Date(
                                  sub.createdAt ?? Date.now()
                                ).toLocaleDateString()}
                          </p>

                          <button
                            onClick={() =>
                              toggleSubscription(String(sub.artistId))
                            }
                            className="w-full px-4 py-2 bg-red-500/30 backdrop-blur-sm rounded-lg text-white hover:bg-red-500/40 transition-all flex items-center justify-center gap-2 border border-red-500/40"
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
                            {text.unsubscribe}
                          </button>
                        </div>
                      );
                    })}
                </div>
              ) : (
                !subscriptionsLoading &&
                !subscriptionsError && (
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 text-center">
                    <Star size={64} className="text-white/30 mx-auto mb-4" />
                    <p className="text-white/60 mb-4">{text.noSubscriptions}</p>
                    <button
                      onClick={() => setSelectedTab("artists")}
                      className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all"
                    >
                      {text.exploreArtists}
                    </button>
                  </div>
                )
              )}
            </div>

            {/* Exclusive Gifts */}
            <div>
              <h2 className="text-2xl text-white drop-shadow-lg mb-4">
                {text.exclusiveGifts}
              </h2>

              {!subscriptionsLoading &&
              !subscriptionsError &&
              getGiftsForSubscribedArtistsFromSubs().length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getGiftsForSubscribedArtistsFromSubs().map((gift: any) => (
                    <div
                      key={gift.id}
                      className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all"
                    >
                      <div className="aspect-square bg-white/5 overflow-hidden">
                        <img
                          src={gift.cover}
                          alt={gift.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-white/50 text-xs mb-1">
                              {text.giftFrom} {gift.artistName}
                            </p>
                            <h3 className="text-white drop-shadow mb-2">
                              {gift.title}
                            </h3>
                          </div>
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-500/40 to-orange-500/40 rounded-lg flex items-center justify-center flex-shrink-0">
                            {gift.type === "album" && (
                              <Music size={16} className="text-white" />
                            )}
                            {gift.type === "track" && (
                              <Play size={16} className="text-white" />
                            )}
                            {gift.type === "video" && (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
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
                            )}
                          </div>
                        </div>

                        <p className="text-white/60 text-sm mb-4">
                          {gift.description}
                        </p>

                        <button
                          className={`w-full px-4 py-2 backdrop-blur-sm rounded-lg text-white transition-all ${
                            gift.claimed
                              ? "bg-white/10 cursor-not-allowed"
                              : "bg-gradient-to-r from-purple-500/40 to-pink-500/40 hover:from-purple-500/50 hover:to-pink-500/50 border border-white/20"
                          }`}
                          disabled={gift.claimed}
                        >
                          {gift.claimed ? text.claimed : text.claimGift}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                !subscriptionsLoading &&
                !subscriptionsError && (
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 text-center">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-white/30 mx-auto mb-4"
                    >
                      <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
                      <polyline points="7 3 12 8 17 3" />
                      <polyline points="12 8 12 21" />
                    </svg>
                    <p className="text-white/60 mb-4">{text.noGifts}</p>
                    <p className="text-white/50 text-sm">
                      {language === "spanish" &&
                        "Suscríbete a tus artistas favoritos para recibir regalos exclusivos"}
                      {language === "english" &&
                        "Subscribe to your favorite artists to receive exclusive gifts"}
                      {language === "catalan" &&
                        "Subscriu-te als teus artistes favorits per rebre regals exclusius"}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* Create Playlist Modal */}
      {showCreatePlaylist && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[90] p-4">
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-white/20 p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-white drop-shadow">
                {text.createPlaylist}
              </h3>

              <button
                onClick={() => {
                  setShowCreatePlaylist(false);
                  setNewPlaylistName("");
                  setCreatePlaylistError(null);
                }}
                className="cursor-pointer p-2 rounded-lg hover:bg-white/10 text-white/80"
                aria-label="Close"
              >
                <svg
                  width="18"
                  height="18"
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

            {/* Error */}
            {createPlaylistError && (
              <div className="mb-4 text-sm text-red-200 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {createPlaylistError}
              </div>
            )}

            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              placeholder={text.playlistName}
              className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-black placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-all mb-6"
              disabled={creatingPlaylist}
            />

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowCreatePlaylist(false);
                  setNewPlaylistName("");
                  setCreatePlaylistError(null);
                }}
                disabled={creatingPlaylist}
                className={`cursor-pointer flex-1 px-4 py-3 rounded-lg text-white transition-all ${
                  creatingPlaylist
                    ? "bg-white/10 opacity-60 cursor-not-allowed"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                {text.cancel}
              </button>

              <button
                onClick={handleCreatePlaylist}
                disabled={creatingPlaylist || !newPlaylistName.trim()}
                className={`cursor-pointer flex-1 px-4 py-3 rounded-lg text-white transition-all ${
                  creatingPlaylist || !newPlaylistName.trim()
                    ? "bg-white/10 opacity-60 cursor-not-allowed"
                    : "bg-white/20 hover:bg-white/30"
                }`}
              >
                {creatingPlaylist
                  ? language === "english"
                    ? "Creating..."
                    : language === "spanish"
                    ? "Creando..."
                    : "Creant..."
                  : text.create}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add to Playlist Modal */}
      {showAddToPlaylist && selectedSongForPlaylist && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[90] p-4">
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-white/20 p-8 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-white drop-shadow">
                {text.addToPlaylist}
              </h3>
              <button
                onClick={() => {
                  setShowAddToPlaylist(false);
                  setSelectedSongForPlaylist(null);
                  setAddToPlaylistError(null);
                }}
                className="cursor-pointer p-2 rounded-lg hover:bg-white/10 text-white/80"
                aria-label="Close"
              >
                <svg
                  width="18"
                  height="18"
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

            {/* Song preview */}
            <div className="flex items-center gap-3 mb-6 p-3 bg-white/10 rounded-lg">
              <div className="w-12 h-12 bg-white/5 rounded overflow-hidden flex-shrink-0">
                <img
                  src={selectedSongForPlaylist.cover ?? "/placeholder.png"}
                  alt={selectedSongForPlaylist.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">
                  {selectedSongForPlaylist.title}
                </p>
                <p className="text-white/60 text-xs truncate">
                  {selectedSongForPlaylist.artist ??
                    selectedSongForPlaylist.artistName ??
                    selectedSongForPlaylist.userId ??
                    ""}
                </p>
              </div>
            </div>

            {/* Error */}
            {addToPlaylistError && (
              <div className="mb-4 text-sm text-red-200 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {addToPlaylistError}
              </div>
            )}

            {/* Playlists list (backend) */}
            <div className="space-y-2 mb-6">
              {playlistsLoading ? (
                <div className="text-white/70 text-sm bg-white/10 border border-white/15 rounded-lg p-3">
                  Loading playlists...
                </div>
              ) : playlistsError ? (
                <div className="text-white/70 text-sm bg-white/10 border border-white/15 rounded-lg p-3">
                  {playlistsError}
                </div>
              ) : userPlaylists.length === 0 ? (
                <div className="text-white/60 text-sm bg-white/10 border border-white/15 rounded-lg p-3 text-center">
                  {language === "spanish" && "No tienes playlists aún"}
                  {language === "english" && "You don't have any playlists yet"}
                  {language === "catalan" && "Encara no tens playlists"}
                </div>
              ) : (
                userPlaylists.map((playlist: any) => (
                  <button
                    key={playlist.id}
                    onClick={() => handleAddTrackToPlaylist(playlist.id)}
                    disabled={addingToPlaylist}
                    className={`cursor-pointer w-full p-3 rounded-lg text-left transition-all ${
                      addingToPlaylist
                        ? "bg-white/10 text-white/60 cursor-not-allowed"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">
                        {playlist.nom ?? playlist.name}
                      </span>
                      {addingToPlaylist && (
                        <span className="text-xs text-white/50">...</span>
                      )}
                    </div>

                    <span className="text-xs text-white/50">
                      {playlist.tracks?.length ?? playlist.songs?.length ?? 0}{" "}
                      {text.songs}
                    </span>
                  </button>
                ))
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={async () => {
                  await fetchUserPlaylists();
                }}
                disabled={playlistsLoading}
                className={`cursor-pointer flex-1 px-4 py-3 rounded-lg text-white transition-all ${
                  playlistsLoading
                    ? "bg-white/10 cursor-not-allowed"
                    : "bg-white/20 hover:bg-white/30"
                }`}
              >
                Refresh
              </button>

              <button
                onClick={() => {
                  setShowAddToPlaylist(false);
                  setSelectedSongForPlaylist(null);
                  setAddToPlaylistError(null);
                }}
                className="cursor-pointer flex-1 px-4 py-3 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-all"
              >
                {text.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
      <SubscriptionModal
        text={text}
        showSubscriptionModal={showSubscriptionModal}
        selectedArtistForSubscription={selectedArtistForSubscription}
        handleConfirmSubscriptionStripe={handleConfirmSubscriptionStripe}
        handleConfirmSubscriptionLygos={handleConfirmSubscriptionLygos}
        artistPlans={artistPlans}
        plansLoading={plansLoading}
        plansError={plansError}
        selectedPlanId={selectedPlanId}
        setSelectedPlanId={setSelectedPlanId}
        onClose={() => {
          setShowSubscriptionModal(false);
          setSelectedArtistForSubscription(null);
          setCardNumber("");
          setCardHolder("");
          setCardExpiry("");
          setCardCvc("");
          setPaypalEmail("");
        }}
      />
      {/* Accessibility Panel */}
      {showAccessibility && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-white/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-black/90 backdrop-blur-xl p-6 border-b border-white/20 flex items-center justify-between z-10">
              <h2 className="text-2xl text-white drop-shadow-lg flex items-center gap-3">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                {text.accessibility}
              </h2>
              <button
                onClick={() => setShowAccessibility(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg
                  width="24"
                  height="24"
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

            <div className="p-6 space-y-8">
              {/* Visual Accessibility */}
              <div className="space-y-4">
                <h3 className="text-xl text-white drop-shadow flex items-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {text.visualAccessibility}
                </h3>

                {/* Font Size */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <label className="text-white/90 mb-3 block">
                    {text.fontSize}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(["small", "medium", "large", "xl"] as const).map(
                      (size) => (
                        <button
                          key={size}
                          onClick={() => setFontSize(size)}
                          className={`px-4 py-2 rounded-lg transition-all ${
                            fontSize === size
                              ? "bg-white/30 text-white"
                              : "bg-white/10 text-white/70 hover:bg-white/20"
                          }`}
                        >
                          {text[size === "xl" ? "extraLarge" : size]}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* High Contrast */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2v20" />
                    </svg>
                    <span className="text-white/90">{text.highContrast}</span>
                  </div>
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    className={`w-14 h-8 rounded-full transition-all ${
                      highContrast ? "bg-white/40" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-transform ${
                        highContrast ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Color Blind Mode */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <label className="text-white/90 mb-3 block">
                    {text.colorBlindMode}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        "none",
                        "protanopia",
                        "deuteranopia",
                        "tritanopia",
                      ] as const
                    ).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setColorBlindMode(mode)}
                        className={`px-4 py-2 rounded-lg transition-all text-sm ${
                          colorBlindMode === mode
                            ? "bg-white/30 text-white"
                            : "bg-white/10 text-white/70 hover:bg-white/20"
                        }`}
                      >
                        {text[mode]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reduce Motion */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    <span className="text-white/90">{text.reduceMotion}</span>
                  </div>
                  <button
                    onClick={() => setReduceMotion(!reduceMotion)}
                    className={`w-14 h-8 rounded-full transition-all ${
                      reduceMotion ? "bg-white/40" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-transform ${
                        reduceMotion ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Dyslexia Font */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 7V4h16v3" />
                      <path d="M9 20h6" />
                      <path d="M12 4v16" />
                    </svg>
                    <span className="text-white/90">{text.dyslexiaFont}</span>
                  </div>
                  <button
                    onClick={() => setDyslexiaFont(!dyslexiaFont)}
                    className={`w-14 h-8 rounded-full transition-all ${
                      dyslexiaFont ? "bg-white/40" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-transform ${
                        dyslexiaFont ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Hearing Accessibility */}
              <div className="space-y-4">
                <h3 className="text-xl text-white drop-shadow flex items-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                  {text.hearingAccessibility}
                </h3>

                {/* Captions */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M8 10h.01" />
                      <path d="M12 10h.01" />
                      <path d="M16 10h.01" />
                      <path d="M8 14h8" />
                    </svg>
                    <div>
                      <span className="text-white/90 block">
                        {text.captions}
                      </span>
                      <span className="text-white/50 text-xs">
                        {text.signLanguage}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCaptions(!showCaptions)}
                    className={`w-14 h-8 rounded-full transition-all ${
                      showCaptions ? "bg-white/40" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-transform ${
                        showCaptions ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Visual Notifications */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span className="text-white/90">
                      {text.visualNotifications}
                    </span>
                  </div>
                  <button
                    onClick={() => setVisualNotifications(!visualNotifications)}
                    className={`w-14 h-8 rounded-full transition-all ${
                      visualNotifications ? "bg-white/40" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-transform ${
                        visualNotifications ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Text to Speech */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                    <span className="text-white/90">{text.textToSpeech}</span>
                  </div>
                  <button
                    onClick={() => setTextToSpeech(!textToSpeech)}
                    className={`w-14 h-8 rounded-full transition-all ${
                      textToSpeech ? "bg-white/40" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-transform ${
                        textToSpeech ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Motor Accessibility */}
              <div className="space-y-4">
                <h3 className="text-xl text-white drop-shadow flex items-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M12 18v-6" />
                    <path d="M9 15l3-3 3 3" />
                  </svg>
                  {text.motorAccessibility}
                </h3>

                {/* Keyboard Navigation */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M6 8h.01" />
                      <path d="M10 8h.01" />
                      <path d="M14 8h.01" />
                      <path d="M18 8h.01" />
                      <path d="M8 12h8" />
                      <path d="M8 16h8" />
                    </svg>
                    <span className="text-white/90">{text.keyboardNav}</span>
                  </div>
                  <button
                    onClick={() => setKeyboardNav(!keyboardNav)}
                    className={`w-14 h-8 rounded-full transition-all ${
                      keyboardNav ? "bg-white/40" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-transform ${
                        keyboardNav ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Larger Touch Targets */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                      <path d="M6 1v4" />
                      <path d="M10 1v4" />
                      <path d="M14 1v4" />
                    </svg>
                    <span className="text-white/90">{text.largerTargets}</span>
                  </div>
                  <button
                    onClick={() => setLargerTargets(!largerTargets)}
                    className={`w-14 h-8 rounded-full transition-all ${
                      largerTargets ? "bg-white/40" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-transform ${
                        largerTargets ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Voice Control */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" y1="19" x2="12" y2="22" />
                      </svg>
                      <span className="text-white/90">{text.voiceControl}</span>
                    </div>
                    <span className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded">
                      {language === "spanish" && "Experimental"}
                      {language === "english" && "Experimental"}
                      {language === "catalan" && "Experimental"}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">
                    {language === "spanish" &&
                      "Controla la aplicación con comandos de voz"}
                    {language === "english" &&
                      "Control the app with voice commands"}
                    {language === "catalan" &&
                      "Controla l'aplicació amb comandes de veu"}
                  </p>
                </div>
              </div>

              {/* Cognitive Accessibility */}
              <div className="space-y-4">
                <h3 className="text-xl text-white drop-shadow flex items-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20Z" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                  {text.cognitiveAccessibility}
                </h3>

                {/* Focus Mode */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v6m0 6v6" />
                      <path d="m4.2 4.2 4.2 4.2m5.2 5.2 4.2 4.2" />
                      <path d="M1 12h6m6 0h6" />
                      <path d="m4.2 19.8 4.2-4.2m5.2-5.2 4.2-4.2" />
                    </svg>
                    <div>
                      <span className="text-white/90 block">
                        {text.focusMode}
                      </span>
                      <span className="text-white/50 text-xs">
                        {language === "spanish" &&
                          "Reduce distracciones visuales"}
                        {language === "english" && "Reduce visual distractions"}
                        {language === "catalan" &&
                          "Redueix distraccions visuals"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setFocusMode(!focusMode)}
                    className={`w-14 h-8 rounded-full transition-all ${
                      focusMode ? "bg-white/40" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-transform ${
                        focusMode ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Reading Guide */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M2 12h20" />
                      <path d="M2 8h20" />
                      <path d="M2 16h20" />
                    </svg>
                    <div>
                      <span className="text-white/90 block">
                        {text.readingGuide}
                      </span>
                      <span className="text-white/50 text-xs">
                        {language === "spanish" && "Línea guía para lectura"}
                        {language === "english" && "Guide line for reading"}
                        {language === "catalan" && "Línia guia per llegir"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setReadingGuide(!readingGuide)}
                    className={`w-14 h-8 rounded-full transition-all ${
                      readingGuide ? "bg-white/40" : "bg-white/20"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-transform ${
                        readingGuide ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lyrics Panel */}
      {showLyrics && currentSong && (
        <div
          className={`fixed inset-x-0 z-[85] px-3 sm:px-4 md:px-6 ${
            // sur mobile on monte plus haut pour ne pas masquer le player
            currentSong
              ? "bottom-[160px] sm:bottom-28"
              : "bottom-24 sm:bottom-28"
          }`}
        >
          <div className="mx-auto w-full max-w-md sm:max-w-lg bg-black/70 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-3 sm:p-4 border-b border-white/10 flex items-center justify-between gap-2">
              <h3 className="text-white drop-shadow text-xs sm:text-sm line-clamp-2">
                {text.lyrics} - {currentSong.title}
              </h3>
              <button
                onClick={() => setShowLyrics(false)}
                className="text-white/60 hover:text-white transition-colors flex-shrink-0 cursor-pointer"
                aria-label="Close lyrics"
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Toggle between Text and Sign Language */}
            {currentSong.signLanguageVideoUrl && (
              <div className="flex p-2 border-b border-white/10 gap-2">
                <button
                  onClick={() => setLyricsViewMode("text")}
                  className={`cursor-pointer flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm transition-all ${
                    lyricsViewMode === "text"
                      ? "bg-white/20 text-white"
                      : "text-white/60 hover:bg-white/10"
                  }`}
                >
                  <FileText size={14} className="inline mr-1 sm:mr-2" />
                  {text.textLyrics}
                </button>

                <button
                  onClick={() => setLyricsViewMode("sign")}
                  className={`cursor-pointer flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm transition-all ${
                    lyricsViewMode === "sign"
                      ? "bg-white/20 text-white"
                      : "text-white/60 hover:bg-white/10"
                  }`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="inline mr-1 sm:mr-2"
                  >
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                  </svg>
                  {text.signLanguage}
                </button>
              </div>
            )}

            {/* Content Area */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[45vh] sm:max-h-[60vh]">
              {lyricsViewMode === "text" ? (
                // Text Lyrics
                <div className="text-white/80 text-xs sm:text-sm leading-relaxed space-y-3 sm:space-y-4">
                  {currentSong.lyrics ? (
                    currentSong.lyrics
                      .split("\n\n")
                      .map((paragraph: string, idx: number) => (
                        <p key={idx}>
                          {paragraph
                            .split("\n")
                            .map((line: string, lineIdx: number, arr) => (
                              <React.Fragment key={lineIdx}>
                                {line}
                                {lineIdx < arr.length - 1 && <br />}
                              </React.Fragment>
                            ))}
                        </p>
                      ))
                  ) : (
                    <p className="text-white/50 italic text-center">
                      {language === "spanish" &&
                        "No hay letras disponibles para esta canción"}
                      {language === "english" &&
                        "No lyrics available for this song"}
                      {language === "catalan" &&
                        "No hi ha lletres disponibles per aquesta cançó"}
                    </p>
                  )}

                  {/* Braille file link (optionnel) */}
                  {currentSong.brailleFileUrl && (
                    <a
                      href={currentSong.brailleFileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 mt-2 text-white/80 text-xs px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-all"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      {language === "spanish" && "Abrir archivo Braille"}
                      {language === "english" && "Open Braille file"}
                      {language === "catalan" && "Obrir fitxer Braille"}
                    </a>
                  )}

                  <p className="text-white/40 text-[10px] sm:text-xs italic mt-4 sm:mt-6">
                    {language === "spanish" &&
                      "Las letras se proporcionan solo con fines educativos"}
                    {language === "english" &&
                      "Lyrics provided for educational purposes only"}
                    {language === "catalan" &&
                      "Les lletres es proporcionen només amb finalitats educatives"}
                  </p>
                </div>
              ) : (
                // Sign Language Video
                <div>
                  {currentSong.signLanguageVideoUrl ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-black border border-white/20">
                      <video
                        src={currentSong.signLanguageVideoUrl}
                        controls
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <p className="text-white/50 italic text-xs sm:text-sm text-center py-6 sm:py-8">
                      {language === "spanish" &&
                        "No hay video en lenguaje de signos disponible"}
                      {language === "english" &&
                        "No sign language video available"}
                      {language === "catalan" &&
                        "No hi ha vídeo en llengua de signes disponible"}
                    </p>
                  )}

                  <p className="text-white/40 text-[10px] sm:text-xs italic mt-3 sm:mt-4">
                    {language === "spanish" &&
                      "Video en lenguaje de signos proporcionado por el artista"}
                    {language === "english" &&
                      "Sign language video provided by the artist"}
                    {language === "catalan" &&
                      "Vídeo en llengua de signes proporcionat per l'artista"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/*Player */}
      {currentSong && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/40 backdrop-blur-xl border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6 p-3 sm:p-4 md:p-6">
            {/* Song Info */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 order-1 md:order-none">
              {/* Décalage pour l’icône d’accessibilité */}
              <div className="ml-1  sm:ml-35 w-10 h-10 sm:w-12 sm:h-12 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={
                    currentSong.coverUrl ??
                    currentSong.cover ??
                    "/placeholder.png"
                  }
                  alt={currentSong.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Player Controls */}
            <div className="w-full flex flex-col gap-1 order-0 md:order-none ml-1 sm:ml-50">
              <div className="min-w-2.5">
                <h4 className="text-white drop-shadow text-sm sm:text-base truncate">
                  {currentSong.title}
                </h4>
                <p className="text-white/60 text-xs sm:text-sm truncate">
                  {currentSong.artistName ??
                    currentSong.artist ??
                    currentSong.userId ??
                    ""}
                </p>
              </div>
              {/* Controls (centrés) */}
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <button
                  onClick={handlePrevFromQueue1}
                  className={`text-white/80 hover:text-white cursor-pointer ${animationClasses} ${buttonSizeClasses}`}
                  aria-label="Previous"
                >
                  <SkipBack size={largerTargets ? 32 : 22} />
                </button>

                <button
                  onClick={() =>
                    currentSong && handlePlaySong(currentSong, queue)
                  }
                  className={`${buttonSizeClasses} ${animationClasses} cursor-pointer flex items-center justify-center p-3 sm:p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30`}
                  aria-label={isPlaying ? text.pause : text.play}
                >
                  {isPlaying ? (
                    <Pause
                      size={largerTargets ? 36 : 26}
                      className="text-white"
                    />
                  ) : (
                    <Play
                      size={largerTargets ? 36 : 26}
                      className="text-white"
                    />
                  )}
                </button>

                <button
                  onClick={handleNextFromQueue1}
                  className={`text-white/80 hover:text-white cursor-pointer ${animationClasses} ${buttonSizeClasses}`}
                  aria-label="Next"
                >
                  <SkipForward size={largerTargets ? 32 : 22} />
                </button>
              </div>

              {/* Progress bar (pleine largeur du player) */}
              {/* Progress bar */}
              <div className="w-full px-4 flex items-center gap-3">
                <span className="text-white/60 text-xs sm:text-sm w-12 text-right">
                  {formatTime(currentTime)}
                </span>

                <input
                  type="range"
                  min={0}
                  max={duration ?? 0}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full accent-white"
                />

                <span className="text-white/60 text-xs sm:text-sm w-12">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Volume & Actions */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 flex-1 justify-between md:justify-end order-2">
              <span className="text-white/60 text-xs sm:text-sm">
                {currentSong.duration ?? ""}
              </span>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Lyrics */}
                <button
                  onClick={() => {
                    setLyricsViewMode("text");
                    setShowLyrics(true);
                  }}
                  className={`text-white/80 hover:text-white cursor-pointer ${animationClasses} ${buttonSizeClasses}`}
                  title={text.lyrics}
                  aria-label={text.lyrics}
                >
                  <FileText size={largerTargets ? 28 : 22} />
                </button>

                {/* Volume */}
                <button
                  onClick={toggleMute}
                  className={`text-white/80 hover:text-white cursor-pointer ${animationClasses} ${buttonSizeClasses}`}
                  aria-label="Volume"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  <Volume2 size={largerTargets ? 28 : 22} />
                </button>

                {/* Slider */}
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setIsMuted(false);
                    setVolume(Number(e.target.value));
                  }}
                  className="w-24 accent-white"
                  aria-label="Volume slider"
                />

                {/* Like */}
                <button
                  onClick={() => toggleFavorite(currentSong.id)}
                  className={`text-white/80 hover:text-white cursor-pointer ${animationClasses} ${buttonSizeClasses}`}
                  aria-label={text.addToFavorites}
                  title={text.addToFavorites}
                >
                  <Heart
                    size={18}
                    className={`${
                      favoriteTrackIds.includes(String(currentSong.id))
                        ? "text-red-400 fill-red-400"
                        : "text-white"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== DRAWER (Genre/Mood Results) ===================== */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[40]">
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeDrawer}
            aria-label="Close drawer"
          />

          {/* Drawer */}
          <aside
            className="
        absolute right-0 top-0 h-full w-full sm:w-[560px]
        bg-black/85 backdrop-blur-xl
        border-l border-white/20
        shadow-2xl
        flex flex-col
      "
            role="dialog"
            aria-modal="true"
            aria-label="Tracks drawer"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black/70 backdrop-blur-xl border-b border-white/15">
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-white/60 text-xs">
                    {drawerType === "genre" ? "Genre" : "Mood"}
                  </p>
                  <h3 className="text-white text-lg font-semibold truncate">
                    {drawerTitle}
                  </h3>
                </div>

                <button
                  onClick={closeDrawer}
                  className="p-2 rounded-lg hover:bg-white/10 text-white/80 cursor-pointer"
                  aria-label="Close"
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

              {/* Mini toolbar */}
              <div className="px-4 pb-4 flex items-center justify-between gap-3">
                <div className="text-white/50 text-xs">
                  {loadingTracks
                    ? `${text.loading}`
                    : `${savedTracks.length} ${text.track}(s)`}
                </div>

                <button
                  onClick={() => {
                    // refresh selon le type du drawer
                    if (drawerType === "genre" && selectedGenreName) {
                      handleSelectGenre(selectedGenreName);
                    }
                    if (drawerType === "mood" && selectedMoodName) {
                      handleSelectMood(selectedMoodName);
                    }
                  }}
                  disabled={loadingTracks}
                  className={`px-3 py-2 rounded-lg cursor-pointer text-xs text-white transition-all border border-white/15
              ${
                loadingTracks
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-white/10 hover:bg-white/15"
              }
            `}
                >
                  {text.refresh}
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Loading state */}
              {loadingTracks && (
                <div className="bg-white/10 border border-white/15 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-white/60 animate-pulse" />
                    <p className="text-white/70 text-sm">
                      {text.loadingTracks}
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[...Array(5)].map((_, idx) => (
                      <div
                        key={idx}
                        className="h-16 rounded-lg bg-white/5 animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Error state */}
              {!loadingTracks && tracksError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <p className="text-white/90 text-sm font-semibold">
                    {text.loadingError}
                  </p>
                  <p className="text-white/70 text-sm mt-1">{tracksError}</p>

                  <button
                    onClick={() => {
                      if (drawerType === "genre" && selectedGenreName) {
                        handleSelectGenre(selectedGenreName);
                      }
                      if (drawerType === "mood" && selectedMoodName) {
                        handleSelectMood(selectedMoodName);
                      }
                    }}
                    className="cursor-pointer mt-4 px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-sm transition-all"
                  >
                    {text.retry}
                  </button>
                </div>
              )}

              {/* Empty state */}
              {!loadingTracks && !tracksError && savedTracks.length === 0 && (
                <div className="bg-white/10 border border-white/15 rounded-xl p-8 text-center">
                  <p className="text-white/80 font-semibold">
                    {text.noTracksFound}
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    {text.tryAnother}{" "}
                    {drawerType === "genre" ? "genre" : "mood"}.
                  </p>
                </div>
              )}

              {/* Tracks list */}
              {!loadingTracks &&
                !tracksError &&
                savedTracks.map((song: any) => {
                  const isCurrent = currentSong?.id === song.id;
                  const playing = isPlaying && isCurrent;

                  return (
                    <div
                      key={song.id}
                      className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl p-3 flex items-start gap-3 transition-all"
                    >
                      {/* Cover placeholder */}
                      <div className="w-12 h-12 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center text-white/40 mt-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9 18V5l12-2v13" />
                          <circle cx="6" cy="18" r="3" />
                          <circle cx="18" cy="16" r="3" />
                        </svg>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-white truncate">{song.title}</p>

                        <p className="text-white/60 text-xs truncate">
                          {song.artistName ??
                            song.artist ??
                            song.userId ??
                            song.artistId ??
                            ""}
                        </p>

                        {/* Accessibility + links */}
                        <div className="mt-2 flex flex-wrap gap-2">
                          <button
                            onClick={() => setShowLyrics(!showLyrics)}
                            className={`
                                        text-white/80 hover:text-white cursor-pointer 
                                        ${animationClasses} ${buttonSizeClasses}
                                        ${showLyrics ? "text-white" : ""}
                                      `}
                            title={text.lyrics}
                            aria-label={text.lyrics}
                          >
                            <FileText size={largerTargets ? 28 : 22} />
                          </button>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => handlePlaySong(song)}
                          className="cursor-pointer p-3 bg-white/15 hover:bg-white/25 rounded-full transition-all"
                          aria-label={playing ? "Pause" : "Play"}
                          title={playing ? "Pause" : "Play"}
                        >
                          {playing ? (
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-white"
                            >
                              <rect x="6" y="4" width="4" height="16" />
                              <rect x="14" y="4" width="4" height="16" />
                            </svg>
                          ) : (
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-white"
                            >
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <audio
                        id={`fan-audio-${song.id}`}
                        src={song.audioUrl}
                        preload="none"
                      />
                    </div>
                  );
                })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/15 bg-black/70 backdrop-blur-xl flex items-center justify-between gap-3">
              <button
                onClick={closeDrawer}
                className="px-4 py-2 cursor-pointer rounded-lg bg-white/10 hover:bg-white/15 text-white transition-all"
              >
                {text.close}
              </button>

              <button
                onClick={() => {
                  setSavedTracks([]);
                  setTracksError(null);
                  setSelectedGenreName(null);
                  setSelectedMoodName(null);
                  closeDrawer();
                }}
                className="cursor-pointer px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all"
              >
                {text.clear}
              </button>
            </div>
          </aside>
        </div>
      )}
      <audio ref={audioRef} preload="none" />
    </div>
  );
}
