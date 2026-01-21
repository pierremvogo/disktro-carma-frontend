import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  CREATE_SETTING: string;
  CREATE_SETTING_TAG: string;
  GET_SETTING: string;
  GET_SETTINGS: string;
  GET_SETTING_BY_TAG: string;
  GET_SETTING_BY_SLUG: string;
  UPDATE_SETTING: string;
  DELETE_SETTING: string;
}

const API_URLS: API_URLS = {
  CREATE_SETTING: `${BASE_API_URL}/settings/create`,
  GET_SETTING: `${BASE_API_URL}/settings/getById/:id`,
  CREATE_SETTING_TAG: `${BASE_API_URL}/settingTag/create/:tagId/:settingId`,
  GET_SETTINGS: `${BASE_API_URL}/settings/get`,
  GET_SETTING_BY_TAG: `${BASE_API_URL}/settings/getWithTag/:id`,
  GET_SETTING_BY_SLUG: `${BASE_API_URL}/settings/getBySlug/:slug`,
  UPDATE_SETTING: `${BASE_API_URL}/settings/:id`,
  DELETE_SETTING: `${BASE_API_URL}/settings/:id`,
} as const;

class ServiceObject {
  static createSetting = (info: any, token: string): Promise<any> =>
    BaseMethods.postRequest(API_URLS.CREATE_SETTING, info, true, {}, token);

  static createSettingTag = (
    tagId: string,
    settingId: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.CREATE_SETTING_TAG, { tagId, settingId });
    return BaseMethods.postRequest(url, {}, true);
  };

  static getSetting = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_SETTING, { id });
    return BaseMethods.getRequest(url, true);
  };

  static getSettings = (token: string): Promise<any> => {
    return BaseMethods.getRequest(API_URLS.GET_SETTINGS, true, {}, token);
  };

  static getSettingByTag = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_SETTING_BY_TAG, { id });
    return BaseMethods.getRequest(url, true);
  };

  static getSettingBySlug = (slug: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_SETTING_BY_SLUG, { slug });
    return BaseMethods.getRequest(url, true);
  };

  static updateSetting = (id: string, info: any): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_SETTING, { id });
    return BaseMethods.postRequest(url, info, true);
  };

  static deleteSetting = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_SETTING, { id });
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

export const SettingModuleObject = new Module();
