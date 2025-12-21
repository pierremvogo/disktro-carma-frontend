import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  CREATE_TAG: string;
  GET_TAG: string;
  GET_TAG_BY_SLUG: string;
  GET_ARTIST_BY_TAG: string;
  GET_ALBUM_BY_TAG: string;
  GET_TAGS: string;
  UPDATE_TAG: string;
  DELETE_TAG: string;
}

const API_URLS: API_URLS = {
  CREATE_TAG: `${BASE_API_URL}/tag/create`,
  GET_TAG: `${BASE_API_URL}/tag/getById/:id`,
  GET_TAG_BY_SLUG: `${BASE_API_URL}/tag/getBySlug/:slug`,
  GET_ARTIST_BY_TAG: `${BASE_API_URL}/tag/getArtists/:tagId`,
  GET_ALBUM_BY_TAG: `${BASE_API_URL}/tag/getAlbums/:tagId`,
  GET_TAGS: `${BASE_API_URL}/tag/getAll`,
  UPDATE_TAG: `${BASE_API_URL}/tag/:id`,
  DELETE_TAG: `${BASE_API_URL}/tag/:id`,
} as const;

class ServiceObject {
  static createTag = (info: any): Promise<any> =>
    BaseMethods.postRequest(API_URLS.CREATE_TAG, info, true);

  static getTag = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_TAG, { id });
    return BaseMethods.getRequest(url, true);
  };

  static getTagBySlug = (slug: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_TAG_BY_SLUG, { slug });
    return BaseMethods.getRequest(url, true);
  };

  static getArtistsByTag = (tagId: string, token: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_ARTIST_BY_TAG, { tagId });
    return BaseMethods.getRequest(url, true, {}, token);
  };
  static getAlbumsByTag = (tagId: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_ALBUM_BY_TAG, { tagId });
    return BaseMethods.getRequest(url, true);
  };

  static getTags = (): Promise<any> => {
    return BaseMethods.getRequest(API_URLS.GET_TAGS, true, {});
  };

  static updateTag = (id: string, info: any): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_TAG, { id });
    return BaseMethods.postRequest(url, info, true);
  };

  static deleteTag = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_TAG, { id });
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

export const TagModuleObject = new Module();
