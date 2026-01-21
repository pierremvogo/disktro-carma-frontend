import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  CREATE_PLAYLIST: string;
  GET_PLAYLIST: string;
  GET_PLAYLISTS: string;
  UPDATE_PLAYLIST: string;
  DELETE_PLAYLIST: string;
  GET_PLAYLIST_BY_USER: string;
  ADD_TRACK_TO_PLAYLIST: string;
  DELETE_TRACK_PLAYLIST: string;
}

const API_URLS: API_URLS = {
  CREATE_PLAYLIST: `${BASE_API_URL}/playlist/create`,
  GET_PLAYLIST: `${BASE_API_URL}/playlist/getById/:id`,
  GET_PLAYLIST_BY_USER: `${BASE_API_URL}/playlist/getByUser/:userId`,
  ADD_TRACK_TO_PLAYLIST: `${BASE_API_URL}/trackPlaylist/create/:playlistId/:trackId`,
  GET_PLAYLISTS: `${BASE_API_URL}/playlist/getAll`,
  UPDATE_PLAYLIST: `${BASE_API_URL}/playlist/:id`,
  DELETE_PLAYLIST: `${BASE_API_URL}/playlist/:id`,
  DELETE_TRACK_PLAYLIST: `${BASE_API_URL}/trackPlaylist/:id`,
} as const;

class ServiceObject {
  static createPlaylist = (info: any, token: string): Promise<any> =>
    BaseMethods.postRequest(API_URLS.CREATE_PLAYLIST, info, true, {}, token);

  static getPlaylist = (id: string, token: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_PLAYLIST, { id });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static addTrackToPlaylist = (
    playlistId: string,
    trackId: string,
    token: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.ADD_TRACK_TO_PLAYLIST, {
      playlistId,
      trackId,
    });
    return BaseMethods.postRequest(url, {}, true, {}, token);
  };

  static getPlaylistByUser = (userId: string, token: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_PLAYLIST_BY_USER, { userId });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static getPlaylists = (token: string): Promise<any> => {
    return BaseMethods.getRequest(API_URLS.GET_PLAYLISTS, true, {}, token);
  };

  static updatePlaylist = (
    id: string,
    info: any,
    token: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_PLAYLIST, { id });
    return BaseMethods.postRequest(url, info, true, {}, token);
  };

  static deletePlaylist = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_PLAYLIST, { id });
    return BaseMethods.deleteRequest(url, {}, true);
  };

  static deleteTrackPlaylist = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_TRACK_PLAYLIST, { id });
    return BaseMethods.deleteRequest(url, {}, true);
  };
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

export const PlaylistModuleObject = new Module();
