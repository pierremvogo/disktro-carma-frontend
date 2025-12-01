import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  GET_LYRICS: string;
  LOGIN_USER: string;
  REGISTER_USER: string;
  CONFIRM_EMAIL: string;
  RESEND_CONFIRMATION_EMAIL: string;
  FORGOT_PASSWORD: string;
  RESET_PASSWORD: string;
  GET_USER: string;
  UPDATE_USER: string;
}

const API_URLS: API_URLS = {
  GET_LYRICS: `https://api.lyrics.ovh/v1/:artist/:title`,
  REGISTER_USER: `${BASE_API_URL}/users/create`,
  LOGIN_USER: `${BASE_API_URL}/auth/login`,
  CONFIRM_EMAIL: `${BASE_API_URL}/auth/verify-email/:token`,
  RESEND_CONFIRMATION_EMAIL: `${BASE_API_URL}/resend-confirmation-email`,
  FORGOT_PASSWORD: `${BASE_API_URL}/auth/request-password-reset`,
  RESET_PASSWORD: `${BASE_API_URL}/auth/reset-password/:token`,
  GET_USER: `${BASE_API_URL}/users/:id`,
  UPDATE_USER: `${BASE_API_URL}/users/:id`,
} as const;

class ServiceObject {
  static getLyrics = (artist: string, title: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_LYRICS, { artist, title });
    return BaseMethods.getRequest(url, true);
  };

  static getUser = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_USER, { id });
    return BaseMethods.getRequest(url, true);
  };

  static createUser = (info: any): Promise<any> =>
    BaseMethods.postRequest(API_URLS.REGISTER_USER, info, true);

  static updateUser = (id: string, info: any): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_USER, { id });
    return BaseMethods.putRequest(url, info, true);
  };

  static loginUser = (info: any): Promise<any> =>
    BaseMethods.postRequest(API_URLS.LOGIN_USER, info, false);

  static forgotPassword = (info: any): Promise<any> =>
    BaseMethods.postRequest(API_URLS.FORGOT_PASSWORD, info, false);

  static resetPassword = (token: string, password: string): Promise<any> => {
    const url = formatURL(API_URLS.RESET_PASSWORD, { token });
    return BaseMethods.postRequest(url, { newPassword: password }, false);
  };

  static verifyEmail = (token: string): Promise<any> => {
    const url = formatURL(API_URLS.CONFIRM_EMAIL, { token });
    return BaseMethods.getRequest(url, false);
  };
}
interface LocalState {
  ACCESS_TOKEN: string;
  USER_ID: string;
  USER_DATA: string;
  USER_ROLE: string;
}

const LocalStateObjectKeys: LocalState = {
  ACCESS_TOKEN: "accessToken",
  USER_ID: "userId",
  USER_DATA: "userData",
  USER_ROLE: "userRole",
};

class Module {
  API_URLS = API_URLS;
  service = ServiceObject;
  localState = LocalStateObjectKeys;
}

export const AuthModuleObject = new Module();
