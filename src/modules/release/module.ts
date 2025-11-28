import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  CREATE_RELEASE: string;
  GET_RELEASE: string;
  GET_RELEASES: string;
  UPDATE_RELEASE: string;
  DELETE_RELEASE: string;
}

const API_URLS: API_URLS = {
  CREATE_RELEASE: `${BASE_API_URL}/release/create`,
  GET_RELEASE: `${BASE_API_URL}/release/getById/:id`,
  GET_RELEASES: `${BASE_API_URL}/release/all`,
  UPDATE_RELEASE: `${BASE_API_URL}/release/update/:id`,
  DELETE_RELEASE: `${BASE_API_URL}/release/delete/:id`,
} as const;

class ServiceObject {
  static createRelease = (info: any, token: string): Promise<any> =>
    BaseMethods.postRequest(API_URLS.CREATE_RELEASE, info, true, {}, token);

  static getRelease = (id: string, token: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_RELEASE, { id });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static getReleases = (token: string): Promise<any> => {
    return BaseMethods.getRequest(API_URLS.GET_RELEASES, true, {}, token);
  };

  static updateRelease = (
    id: string,
    info: any,
    token: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_RELEASE, { id });
    return BaseMethods.postRequest(url, info, true, {}, token);
  };

  static deleteRelease = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_RELEASE, { id });
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

export const ReleaseModuleObject = new Module();
