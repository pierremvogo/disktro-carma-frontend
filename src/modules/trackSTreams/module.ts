import BaseMethods from "@/@disktro/api/baseMethods";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

// Model aligné sur ton schema backend trackStreams
export interface TrackStream {
  id: string;
  trackId: string;
  userId?: string | null;
  ipAddress?: string | null;
  country?: string | null;
  city?: string | null;
  device?: string | null;
  createdAt: string; // ou Date si tu le transformes côté front
}

interface TRACK_STREAM_API_URLS {
  CREATE_TRACK_STREAM: string;
  GET_TRACK_STREAMS_BY_TRACK: string;
  GET_TRACK_STREAMS_BY_USER: string;
  GET_TRACK_STREAM: string;
}

const API_URLS: TRACK_STREAM_API_URLS = {
  // ton routeur backend actuel: /trackStream/create/:streamId/:trackId
  CREATE_TRACK_STREAM: `${BASE_API_URL}/streams/create/:userId/:trackId`,
  GET_TRACK_STREAMS_BY_TRACK: `${BASE_API_URL}/streams/get/byTrack/:trackId`,
  GET_TRACK_STREAMS_BY_USER: `${BASE_API_URL}/streams/get/byUser/:userId`,
  GET_TRACK_STREAM: `${BASE_API_URL}/streams/get/:id`,
} as const;

class ServiceObject {
  /**
   * Crée un stream pour un track donné.
   * NOTE: le schema backend génère l'id avec nanoid(),
   * le paramètre :streamId dans ta route est donc juste "décoratif".
   * On peut en générer un côté front, il sera ignoré si le backend ne l'utilise pas.
   */
  static createTrackStream = (
    userId: string,
    trackId: string,
    token?: string
  ): Promise<TrackStream> => {
    // on génère un streamId arbitraire pour satisfaire la route

    const url = formatURL(API_URLS.CREATE_TRACK_STREAM, { userId, trackId });
    return BaseMethods.postRequest(url, {}, true, {}, token);
  };

  /**
   * Récupère tous les streams d'un track
   */
  static getTrackStreamsByTrack = (
    trackId: string,
    token?: string
  ): Promise<TrackStream[]> => {
    const url = formatURL(API_URLS.GET_TRACK_STREAMS_BY_TRACK, { trackId });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  /**
   * Récupère tous les streams d'un utilisateur (si userId renseigné côté backend)
   */
  static getTrackStreamsByUser = (
    userId: string,
    token?: string
  ): Promise<TrackStream[]> => {
    const url = formatURL(API_URLS.GET_TRACK_STREAMS_BY_USER, { userId });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  /**
   * Récupère un stream par son ID
   */
  static getTrackStream = (
    id: string,
    token?: string
  ): Promise<TrackStream> => {
    const url = formatURL(API_URLS.GET_TRACK_STREAM, { id });
    return BaseMethods.getRequest(url, true, {}, token);
  };
}

interface LocalState {
  ACCESS_TOKEN: string;
  USER_ID: string;
  USER_DATA: string;
}

const LocalStateObjectKeys: LocalState = {
  ACCESS_TOKEN: "accessToken",
  USER_ID: "userId",
  USER_DATA: "userData",
};

class Module {
  API_URLS = API_URLS;
  service = ServiceObject;
  localState = LocalStateObjectKeys;
}

export const TrackStreamModuleObject = new Module();
