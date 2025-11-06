import { MediaModuleObject as ModuleObject } from "@/modules/file/module";

export const wait = async (delay = 1000) => {
  console.log("Wait ", delay);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, delay);
  });
};

export const isTokenExpired = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return true; // pas de token = expiré ou inexistant

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // décoder la partie payload
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000); // en secondes

    return exp < now; // true si expiré
  } catch (e) {
    console.error("Erreur lors du décodage du token :", e);
    return true; // en cas d'erreur, on considère le token comme invalide/expiré
  }
};

export const getImageFile = async (
  imageUrl: string,
  token: string
): Promise<string> => {
  if (imageUrl) {
    const blob = await ModuleObject.service.downloadImageFile(imageUrl, token);
    const imageObjectUrl = URL.createObjectURL(blob);
    return imageObjectUrl;
  }
  return "";
};

export const getAudioFile = async (
  audioUrl: string,
  token: string
): Promise<string> => {
  if (audioUrl) {
    const blob = await ModuleObject.service.downloadAudioFile(audioUrl, token);
    const audioObjectUrl = URL.createObjectURL(blob);
    return audioObjectUrl;
  }
  return "";
};

export const getVideoFile = async (
  videoUrl: string,
  token: string
): Promise<string> => {
  if (videoUrl) {
    const blob = await ModuleObject.service.downloadVideoFile(videoUrl, token);
    const videoObjectUrl = URL.createObjectURL(blob);
    return videoObjectUrl;
  }
  return "";
};

export const getUserRole = () => {
  const rawRole = localStorage.getItem(ModuleObject.localState.USER_ROLE);
  return rawRole ? rawRole.trim().toLowerCase().replace(/['"]+/g, "") : null;
};
