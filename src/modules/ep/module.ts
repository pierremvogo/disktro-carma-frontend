import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  CREATE_EP: string;
  ADD_EP_TO_ARTIST: string;
  CREATE_EP_TAG: string;
  GET_EP: string;
  GET_EPS: string;
  GET_TAG_BY_EP: string;
  GET_EP_BY_USER: string;
  UPDATE_EP: string;
  DELETE_EP: string;
}

const API_URLS: API_URLS = {
  CREATE_EP: `${BASE_API_URL}/ep/create`,
  GET_EP: `${BASE_API_URL}/ep/getById/:id`,
  ADD_EP_TO_ARTIST: `${BASE_API_URL}/epArtist/create/:artistId/:epId`,
  CREATE_EP_TAG: `${BASE_API_URL}/epTag/create/:tagId/:epId`,
  GET_TAG_BY_EP: `${BASE_API_URL}/epTag/get/epId/:epId`,
  GET_EPS: `${BASE_API_URL}/ep/getAll`,
  GET_EP_BY_USER: `${BASE_API_URL}/ep/getByUser/:id`,
  UPDATE_EP: `${BASE_API_URL}/ep/:id`,
  DELETE_EP: `${BASE_API_URL}/ep/:id`,
} as const;

class ServiceObject {
  static createEp = (info: any, token: string): Promise<any> =>
    BaseMethods.postRequest(API_URLS.CREATE_EP, info, true, {}, token);

  static createEpTag = (tagId: string, epId: string): Promise<any> => {
    const url = formatURL(API_URLS.CREATE_EP_TAG, { tagId, epId });
    return BaseMethods.postRequest(url, {}, true);
  };

  static addEpToArtist = (artistId: string, epId: string): Promise<any> => {
    const url = formatURL(API_URLS.ADD_EP_TO_ARTIST, { artistId, epId });
    return BaseMethods.postRequest(url, {}, true);
  };

  static getEp = (id: string, token: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_EP, { id });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static getEps = (token: string): Promise<any> => {
    return BaseMethods.getRequest(API_URLS.GET_EPS, true, {}, token);
  };

  static getEpByUser = (id: string, token: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_EP_BY_USER, { id });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static getTagByEp = (id: string, token: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_EP_BY_USER, { id });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static updateEp = (id: string, info: any): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_EP, { id });
    return BaseMethods.postRequest(url, info, true, {});
  };

  static deleteEp = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_EP, { id });
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

export const EpModuleObject = new Module();
