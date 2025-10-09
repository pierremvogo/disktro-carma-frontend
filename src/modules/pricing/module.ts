import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  CREATE_ALBUM: string;
  ADD_ALBUM_TO_ARTIST: string;
  CREATE_ALBUM_TAG: string;
  GET_ALBUM: string;
  GET_ALBUMS: string;
  GET_ALBUM_BY_ARTIST: string;
  UPDATE_ALBUM: string;
  DELETE_ALBUM: string;
}

const API_URLS: API_URLS = {
  CREATE_ALBUM: `${BASE_API_URL}/album/create`,
  GET_ALBUM: `${BASE_API_URL}/album/getById/:id`,
  ADD_ALBUM_TO_ARTIST: `${BASE_API_URL}/albumArtist/create/:artistId/:albumId`,
  CREATE_ALBUM_TAG: `${BASE_API_URL}/albumTag/create/:tagId/:albumId`,
  GET_ALBUMS: `${BASE_API_URL}/album/getAll`,
  GET_ALBUM_BY_ARTIST: `${BASE_API_URL}/album/getByArtist/:id`,
  UPDATE_ALBUM: `${BASE_API_URL}/album/:id`,
  DELETE_ALBUM: `${BASE_API_URL}/album/:id`,
} as const;

class ServiceObject {
  static createAlbum = (info: any): Promise<any> =>
    BaseMethods.postRequest(API_URLS.CREATE_ALBUM, info, true);

  static createAlbumTag = (tagId: string, albumId: string): Promise<any> => {
    const url = formatURL(API_URLS.CREATE_ALBUM_TAG, { tagId, albumId });
    return BaseMethods.postRequest(url, {}, true);
  };

  static addAlbumToArtist = (
    artistId: string,
    albumId: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.ADD_ALBUM_TO_ARTIST, { artistId, albumId });
    return BaseMethods.postRequest(url, {}, true);
  };

  static getAlbum = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_ALBUM, { id });
    return BaseMethods.getRequest(url, true);
  };

  static getAlbums = (): Promise<any> => {
    return BaseMethods.getRequest(API_URLS.GET_ALBUMS, true);
  };

  static getAlbumByArtist = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_ALBUM_BY_ARTIST, { id });
    return BaseMethods.getRequest(url, true);
  };

  static updateAlbum = (id: string, info: any): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_ALBUM, { id });
    return BaseMethods.postRequest(url, info, true);
  };

  static deleteAlbum = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_ALBUM, { id });
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

export const AlbumModuleObject = new Module();
