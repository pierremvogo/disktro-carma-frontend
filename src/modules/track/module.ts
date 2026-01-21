import BaseMethods from "@/@disktro/api/baseMethods";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

// ✅ helper query string propre
function withQuery(
  url: string,
  query: Record<string, string | number | boolean | undefined | null>
) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).length > 0) {
      params.set(k, String(v));
    }
  });
  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}

interface API_URLS {
  CREATE_TRACK: string;
  GET_TRACK: string;
  GET_TRACK_BY_RELEASE: string;
  ADD_TRACK_TO_ALBUM: string;
  ADD_TAG_TO_TRACK: string;
  ADD_TRACK_TO_RELEASE: string;
  GET_TRACK_BY_ALBUM: string;
  ADD_TRACK_TO_SINGLE: string;
  ADD_TRACK_TO_EP: string;
  GET_TRACKS: string;
  UPDATE_TRACK: string;
  DELETE_TRACK: string;

  // ✅ NEW
  GET_TRACKS_BY_MOOD_NAME: string;
  GET_TRACKS_BY_GENRE_NAME: string;
  GET_TRACKS_BY_ARTIST: string;
  GET_TOP_STREAMS: string;
  GET_NEW_RELEASES: string;
}

const API_URLS: API_URLS = {
  CREATE_TRACK: `${BASE_API_URL}/track/create`,
  GET_TRACK: `${BASE_API_URL}/track/getById/:id`,

  ADD_TRACK_TO_ALBUM: `${BASE_API_URL}/trackAlbum/create/:albumId/:trackId`,
  ADD_TRACK_TO_RELEASE: `${BASE_API_URL}/trackAlbum/create/:releaseId/:trackId`,
  ADD_TAG_TO_TRACK: `${BASE_API_URL}/trackTag/create/:tagId/:trackId`,
  ADD_TRACK_TO_SINGLE: `${BASE_API_URL}/trackSingle/create/:singleId/:trackId`,
  ADD_TRACK_TO_EP: `${BASE_API_URL}/trackEp/create/:epId/:trackId`,

  GET_TRACK_BY_RELEASE: `${BASE_API_URL}/track/getByRelease/:releaseId`,
  GET_TRACK_BY_ALBUM: `${BASE_API_URL}/track/getByAlbum/:albumId`,
  GET_TRACKS: `${BASE_API_URL}/track/getAll`,
  UPDATE_TRACK: `${BASE_API_URL}/track/:id`,
  DELETE_TRACK: `${BASE_API_URL}/track/:id`,

  // ✅ NEW ROUTES
  GET_TRACKS_BY_MOOD_NAME: `${BASE_API_URL}/track/getByMoodName`, // ?name=
  GET_TRACKS_BY_GENRE_NAME: `${BASE_API_URL}/track/getByGenreName`, // ?name=
  GET_TRACKS_BY_ARTIST: `${BASE_API_URL}/track/getByArtist/:artistId`,
  GET_TOP_STREAMS: `${BASE_API_URL}/track/topStreams`,
  GET_NEW_RELEASES: `${BASE_API_URL}/track/newReleases`,
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

  static addTrackToSingle = (
    singleId: string,
    trackId: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.ADD_TRACK_TO_SINGLE, { singleId, trackId });
    return BaseMethods.postRequest(url, {}, true);
  };

  static addTrackToEp = (epId: string, trackId: string): Promise<any> => {
    const url = formatURL(API_URLS.ADD_TRACK_TO_EP, { epId, trackId });
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

  static getTrackByAlbum = (albumId: string, token?: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_TRACK_BY_ALBUM, { albumId });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static getTrackByRelease = (
    releaseId: string,
    token?: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.GET_TRACK_BY_RELEASE, { releaseId });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static getTracks = (token: string): Promise<any> => {
    return BaseMethods.getRequest(API_URLS.GET_TRACKS, true, {}, token);
  };

  // ✅ NEW: tracks par nom de mood -> /track/getByMoodName?name=happy
  static getTracksByMoodName = (name: string, token: string): Promise<any> => {
    const url = withQuery(API_URLS.GET_TRACKS_BY_MOOD_NAME, { name });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  // ✅ NEW: tracks par nom de genre -> /track/getByGenreName?name=pop
  static getTracksByGenreName = (name: string, token: string): Promise<any> => {
    const url = withQuery(API_URLS.GET_TRACKS_BY_GENRE_NAME, { name });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  // ✅ NEW: tracks par artiste -> /track/getByArtist/:artistId
  static getTracksByArtist = (
    artistId: string,
    token: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.GET_TRACKS_BY_ARTIST, { artistId });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static getTopStreams = (token: string, limit = 6): Promise<any> => {
    const url = withQuery(API_URLS.GET_TOP_STREAMS, { limit });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static getNewReleases = (token: string, limit = 12): Promise<any> => {
    const url = withQuery(API_URLS.GET_NEW_RELEASES, { limit });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static updateTrack = (
    id: string,
    info: any,
    token?: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_TRACK, { id });
    // ⚠️ chez toi c'était postRequest, mais route est PUT côté backend.
    // Je garde ta logique existante; si BaseMethods a putRequest, mieux de l'utiliser.
    return BaseMethods.postRequest(url, info, true, {}, token);
  };

  static deleteTrack = (id: string, token?: string): Promise<any> => {
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
