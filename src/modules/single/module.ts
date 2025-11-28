import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  CREATE_SINGLE: string;
  ADD_SINGLE_TO_ARTIST: string;
  CREATE_SINGLE_TAG: string;
  GET_SINGLE: string;
  GET_SINGLES: string;
  GET_TAG_BY_SINGLE: string;
  GET_SINGLE_BY_USER: string;
  UPDATE_SINGLE: string;
  DELETE_SINGLE: string;
}

const API_URLS: API_URLS = {
  CREATE_SINGLE: `${BASE_API_URL}/single/create`,
  GET_SINGLE: `${BASE_API_URL}/single/getById/:id`,
  ADD_SINGLE_TO_ARTIST: `${BASE_API_URL}/singleArtist/create/:artistId/:singleId`,
  CREATE_SINGLE_TAG: `${BASE_API_URL}/singleTag/create/:tagId/:singleId`,
  GET_TAG_BY_SINGLE: `${BASE_API_URL}/singleTag/get/singleId/:singleId`,
  GET_SINGLES: `${BASE_API_URL}/single/getAll`,
  GET_SINGLE_BY_USER: `${BASE_API_URL}/single/getByUser/:id`,
  UPDATE_SINGLE: `${BASE_API_URL}/single/:id`,
  DELETE_SINGLE: `${BASE_API_URL}/single/:id`,
} as const;

class ServiceObject {
  static createSingle = (info: any, token: string): Promise<any> =>
    BaseMethods.postRequest(API_URLS.CREATE_SINGLE, info, true, {}, token);

  static createSingleTag = (tagId: string, singleId: string): Promise<any> => {
    const url = formatURL(API_URLS.CREATE_SINGLE_TAG, { tagId, singleId });
    return BaseMethods.postRequest(url, {}, true);
  };

  static addSingleToArtist = (
    artistId: string,
    singleId: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.ADD_SINGLE_TO_ARTIST, {
      artistId,
      singleId,
    });
    return BaseMethods.postRequest(url, {}, true);
  };

  static getSingle = (id: string, token: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_SINGLE, { id });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static getSingles = (token: string): Promise<any> => {
    return BaseMethods.getRequest(API_URLS.GET_SINGLES, true, {}, token);
  };

  static getSingleByUser = (id: string, token: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_SINGLE_BY_USER, { id });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static getTagBySingle = (id: string, token: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_SINGLE_BY_USER, { id });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static updateSingle = (id: string, info: any): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_SINGLE, { id });
    return BaseMethods.postRequest(url, info, true, {});
  };

  static deleteSingle = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_SINGLE, { id });
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

export const SingleModuleObject = new Module();
