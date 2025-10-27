import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  CREATE_MOOD: string;
  GET_MOOD: string;
  GET_MOODS: string;
  UPDATE_MOOD: string;
  DELETE_MOOD: string;
}

const API_URLS: API_URLS = {
  CREATE_MOOD: `${BASE_API_URL}/mood/create`,
  GET_MOOD: `${BASE_API_URL}/mood/getById/:id`,
  GET_MOODS: `${BASE_API_URL}/mood/getAll`,
  UPDATE_MOOD: `${BASE_API_URL}/mood/:id`,
  DELETE_MOOD: `${BASE_API_URL}/mood/:id`,
} as const;

class ServiceObject {
  static createMood = (info: any, token: string): Promise<any> =>
    BaseMethods.postRequest(API_URLS.CREATE_MOOD, info, true, {}, token);

  static getMood = (id: string, token: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_MOOD, { id });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static getMoods = (token: string): Promise<any> => {
    return BaseMethods.getRequest(API_URLS.GET_MOODS, true, {}, token);
  };

  static updateMood = (id: string, info: any, token: string): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_MOOD, { id });
    return BaseMethods.postRequest(url, info, true, {}, token);
  };

  static deleteMood = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_MOOD, { id });
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

export const MoodModuleObject = new Module();
