import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  CREATE_TRACK: string;
  GET_TRACK: string;
  GET_TRACK_BY_RELEASE: string;
  ADD_TRACK_TO_ALBUM: string;
  ADD_TAG_TO_TRACK: string;
  ADD_TRACK_TO_RELEASE: string;
  GET_TRACK_BY_ALBUM: string;
  GET_TRACKS: string;
  UPDATE_TRACK: string;
  DELETE_TRACK: string;
}

const API_URLS: API_URLS = {
  CREATE_TRACK: `${BASE_API_URL}/track/create`,
  GET_TRACK: `${BASE_API_URL}/track/getById/:id`,

  ADD_TRACK_TO_ALBUM: `${BASE_API_URL}/trackAlbum/create/:albumId/:trackId`,
  ADD_TRACK_TO_RELEASE: `${BASE_API_URL}/trackAlbum/create/:releaseId/:trackId`,
  ADD_TAG_TO_TRACK: `${BASE_API_URL}/trackTag/create/:tagId/:trackId`,

  GET_TRACK_BY_RELEASE: `${BASE_API_URL}/track/getByRelease/:releaseId`,
  GET_TRACK_BY_ALBUM: `${BASE_API_URL}/track/getByAlbum/:albumId`,
  GET_TRACKS: `${BASE_API_URL}/track/getAll`,
  UPDATE_TRACK: `${BASE_API_URL}/track/:id`,
  DELETE_TRACK: `${BASE_API_URL}/track/:id`,
} as const;

class ServiceObject {
  static createTrack = (info: any, token: string): Promise<any> =>
    BaseMethods.postRequest(API_URLS.CREATE_TRACK, info, true, {}, token);

  static getTrack = (id: string, token: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_TRACK, { id });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static addTrackToAlbum = (albumId: string, trackId: string): Promise<any> => {
    const url = formatURL(API_URLS.ADD_TRACK_TO_ALBUM, { albumId, trackId });
    return BaseMethods.postRequest(url, {}, true);
  };

  static addTrackToRelease = (
    releaseId: string,
    trackId: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.ADD_TRACK_TO_RELEASE, {
      releaseId,
      trackId,
    });
    return BaseMethods.postRequest(url, {}, true);
  };

  static addTagToTrack = (tagId: string, trackId: string): Promise<any> => {
    const url = formatURL(API_URLS.ADD_TAG_TO_TRACK, { tagId, trackId });
    return BaseMethods.postRequest(url, {}, true);
  };

  static getTrackByAlbum = (albumId: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_TRACK_BY_ALBUM, { albumId });
    return BaseMethods.getRequest(url, true);
  };
  static getTrackByRelease = (releaseId: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_TRACK_BY_RELEASE, { releaseId });
    return BaseMethods.getRequest(url, true);
  };

  static getTracks = (token: string): Promise<any> => {
    return BaseMethods.getRequest(API_URLS.GET_TRACKS, true, {}, token);
  };

  static updateTrack = (id: string, info: any): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_TRACK, { id });
    return BaseMethods.postRequest(url, info, true);
  };

  static deleteTrack = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_TRACK, { id });
    return BaseMethods.deleteRequest(url, {}, true);
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

export const TrackModuleObject = new Module();
