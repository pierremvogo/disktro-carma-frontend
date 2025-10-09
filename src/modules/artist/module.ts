import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  CREATE_ARTIST: string;
  CREATE_ARTIST_TAG: string;
  GET_ARTIST: string;
  GET_ARTISTS: string;
  GET_ARTIST_BY_TAG: string;
  GET_ARTIST_BY_SLUG: string;
  UPDATE_ARTIST: string;
  DELETE_ARTIST: string;
}

const API_URLS: API_URLS = {
  CREATE_ARTIST: `${BASE_API_URL}/artists/create`,
  GET_ARTIST: `${BASE_API_URL}/artists/getById/:id`,
  CREATE_ARTIST_TAG: `${BASE_API_URL}/artistTag/create/:tagId/:artistId`,
  GET_ARTISTS: `${BASE_API_URL}/artists/get`,
  GET_ARTIST_BY_TAG: `${BASE_API_URL}/artists/getWithTag/:id`,
  GET_ARTIST_BY_SLUG: `${BASE_API_URL}/artists/getBySlug/:slug`,
  UPDATE_ARTIST: `${BASE_API_URL}/artists/:id`,
  DELETE_ARTIST: `${BASE_API_URL}/artists/:id`,
} as const;

class ServiceObject {
  static createArtist = (info: any, token: string): Promise<any> =>
    BaseMethods.postRequest(API_URLS.CREATE_ARTIST, info, true, {}, token);

  static createArtistTag = (tagId: string, artistId: string): Promise<any> => {
    const url = formatURL(API_URLS.CREATE_ARTIST_TAG, { tagId, artistId });
    return BaseMethods.postRequest(url, {}, true);
  };

  static getArtist = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_ARTIST, { id });
    return BaseMethods.getRequest(url, true);
  };

  static getArtists = (token: string): Promise<any> => {
    return BaseMethods.getRequest(API_URLS.GET_ARTISTS, true, {}, token);
  };

  static getArtistByTag = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_ARTIST_BY_TAG, { id });
    return BaseMethods.getRequest(url, true);
  };

  static getArtistBySlug = (slug: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_ARTIST_BY_SLUG, { slug });
    return BaseMethods.getRequest(url, true);
  };

  static updateArtist = (id: string, info: any): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_ARTIST, { id });
    return BaseMethods.postRequest(url, info, true);
  };

  static deleteArtist = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_ARTIST, { id });
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

export const ArtistModuleObject = new Module();
