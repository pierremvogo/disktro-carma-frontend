import BaseMethods from "@/@disktro/api/baseMethods";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

interface API_URLS {
  GET_MY_ROYALTIES_SUMMARY: string;
  GET_MY_ROYALTIES_BY_TRACK: string;
}

const API_URLS: API_URLS = {
  GET_MY_ROYALTIES_SUMMARY: `${BASE_API_URL}/royalties/artist/me/summary`,
  GET_MY_ROYALTIES_BY_TRACK: `${BASE_API_URL}/royalties/artist/me/by-track`,
} as const;

class ServiceObject {
  /**
   * ✅ Royalties summary (artist connected)
   * GET /royalties/artist/me/summary
   */
  static getMyRoyaltiesSummary = (token: string): Promise<any> =>
    BaseMethods.getRequest(API_URLS.GET_MY_ROYALTIES_SUMMARY, true, {}, token);

  /**
   * ✅ Royalties by track (artist connected)
   * GET /royalties/artist/me/by-track?limit=10
   */
  static getMyRoyaltiesByTrack = (limit = 10, token: string): Promise<any> => {
    const url = `${
      API_URLS.GET_MY_ROYALTIES_BY_TRACK
    }?limit=${encodeURIComponent(String(limit))}`;
    return BaseMethods.getRequest(url, true, {}, token);
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

export const RoyaltiesModuleObject = new Module();
