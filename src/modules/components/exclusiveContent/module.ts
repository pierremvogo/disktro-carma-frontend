import BaseMethods from "@/@disktro/api/baseMethods";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  CREATE_EXCLUSIVE_CONTENT: string;
  GET_EXCLUSIVE_CONTENT: string;
  GET_ALL_EXCLUSIVE_CONTENT: string;
  GET_EXCLUSIVE_CONTENT_BY_ARTIST: string;
  UPDATE_EXCLUSIVE_CONTENT: string;
  DELETE_EXCLUSIVE_CONTENT: string;
}

const API_URLS: API_URLS = {
  CREATE_EXCLUSIVE_CONTENT: `${BASE_API_URL}/exclusive-content/create`,
  GET_EXCLUSIVE_CONTENT: `${BASE_API_URL}/exclusive-content/getById/:id`,
  GET_ALL_EXCLUSIVE_CONTENT: `${BASE_API_URL}/exclusive-content/getAll`,
  GET_EXCLUSIVE_CONTENT_BY_ARTIST: `${BASE_API_URL}/exclusive-content/getByArtist/:artistId`,
  UPDATE_EXCLUSIVE_CONTENT: `${BASE_API_URL}/exclusive-content/:id`,
  DELETE_EXCLUSIVE_CONTENT: `${BASE_API_URL}/exclusive-content/:id`,
} as const;

class ServiceObject {
  /**
   * ✅ Create exclusive content (artist only)
   */
  static createExclusiveContent = (info: any, token: string): Promise<any> =>
    BaseMethods.postRequest(
      API_URLS.CREATE_EXCLUSIVE_CONTENT,
      info,
      true,
      {},
      token
    );

  /**
   * ✅ Get exclusive content by ID
   */
  static getExclusiveContent = (id: string, token: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_EXCLUSIVE_CONTENT, { id });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  /**
   * ✅ Get all exclusive contents (admin/debug)
   */
  static getAllExclusiveContent = (token: string): Promise<any> =>
    BaseMethods.getRequest(API_URLS.GET_ALL_EXCLUSIVE_CONTENT, true, {}, token);

  /**
   * ✅ Get exclusive contents by artist
   */
  static getExclusiveContentByArtist = (
    artistId: string,
    token: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.GET_EXCLUSIVE_CONTENT_BY_ARTIST, {
      artistId,
    });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  /**
   * ✅ Update exclusive content
   */
  static updateExclusiveContent = (
    id: string,
    info: any,
    token: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_EXCLUSIVE_CONTENT, { id });
    return BaseMethods.putRequest
      ? BaseMethods.putRequest(url, info, true)
      : BaseMethods.postRequest(url, info, true, {}, token); // fallback si pas de PUT
  };

  /**
   * ✅ Delete exclusive content
   */
  static deleteExclusiveContent = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_EXCLUSIVE_CONTENT, { id });
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

export const ExclusiveContentModuleObject = new Module();
