import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  DOWNLOAD_AUDIO_FILE: string;
  DOWNLOAD_VIDEO_FILE: string;
  DOWNLOAD_IMAGE_FILE: string;
  UPLOAD_AUDIO_FILE: string;
  UPLOAD_VIDEO_FILE: string;
  UPLOAD_IMAGE_FILE: string;
}

const API_URLS: API_URLS = {
  DOWNLOAD_AUDIO_FILE: `${BASE_API_URL}/download/audio`,
  DOWNLOAD_VIDEO_FILE: `${BASE_API_URL}/download/video`,
  DOWNLOAD_IMAGE_FILE: `${BASE_API_URL}/download/image`,

  UPLOAD_AUDIO_FILE: `${BASE_API_URL}/upload/audio`,
  UPLOAD_VIDEO_FILE: `${BASE_API_URL}/upload/video`,
  UPLOAD_IMAGE_FILE: `${BASE_API_URL}/upload/image`,
} as const;

class ServiceObject {
  static downloadAudioFile = async (
    cloudinaryUrl: string,
    token: string
  ): Promise<Blob> => {
    const url = `${API_URLS.DOWNLOAD_AUDIO_FILE}?url=${encodeURIComponent(
      cloudinaryUrl
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors du téléchargement du fichier audio.");
    }

    return await response.blob();
  };

  static downloadVideoFile = async (
    cloudinaryUrl: string,
    token: string
  ): Promise<Blob> => {
    const url = `${API_URLS.DOWNLOAD_VIDEO_FILE}?url=${encodeURIComponent(
      cloudinaryUrl
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors du téléchargement du fichier vidéo.");
    }

    return await response.blob();
  };

  static downloadImageFile = async (
    cloudinaryUrl: string,
    token: string
  ): Promise<Blob> => {
    const url = `${API_URLS.DOWNLOAD_IMAGE_FILE}?url=${encodeURIComponent(
      cloudinaryUrl
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors du téléchargement de l'image.");
    }

    return await response.blob();
  };

  static uploadAudioFile = (file: FormData, token: string): Promise<any> =>
    BaseMethods.postRequest(API_URLS.UPLOAD_AUDIO_FILE, file, true, {}, token);

  static uploadVideoFile = (file: FormData, token: string): Promise<any> =>
    BaseMethods.postRequest(API_URLS.UPLOAD_VIDEO_FILE, file, true, {}, token);

  static uploadImageFile = (file: FormData, token: string): Promise<any> =>
    BaseMethods.postRequest(API_URLS.UPLOAD_IMAGE_FILE, file, true, {}, token);
}
interface LocalState {
  ACCESS_TOKEN: string;
  USER_ID: string;
  USER_DATA: string;
  USER_ROLE: string;
}

const LocalStateObjectKeys: LocalState = {
  ACCESS_TOKEN: "accessToken",
  USER_ID: "userId",
  USER_DATA: "userData",
  USER_ROLE: "userRole",
};

class Module {
  API_URLS = API_URLS;
  service = ServiceObject;
  localState = LocalStateObjectKeys;
}

export const MediaModuleObject = new Module();
