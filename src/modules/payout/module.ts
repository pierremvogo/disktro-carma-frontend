import BaseMethods from "@/@disktro/api/baseMethods";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

interface API_URLS {
  GET_MY_PAYOUT_SETTINGS: string;
  UPSERT_MY_PAYOUT_SETTINGS: string;
}

const API_URLS: API_URLS = {
  GET_MY_PAYOUT_SETTINGS: `${BASE_API_URL}/payout/get/me`,
  UPSERT_MY_PAYOUT_SETTINGS: `${BASE_API_URL}/payout/create/me`,
} as const;

class ServiceObject {
  static getMyPayoutSettings = (token: string): Promise<any> =>
    BaseMethods.getRequest(API_URLS.GET_MY_PAYOUT_SETTINGS, true, {}, token);

  // ✅ POST only (backend handles upsert)
  static saveMyPayoutSettings = (payload: any, token: string): Promise<any> =>
    BaseMethods.postRequest(
      API_URLS.UPSERT_MY_PAYOUT_SETTINGS,
      payload,
      true,
      {},
      token
    );
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

export const PayoutModuleObject = new Module();
