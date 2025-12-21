import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  CREATE_SUBSCRIPTION: string;
  GET_SUBSCRIPTION: string;
  GET_SUBSCRIPTION_BY_USER: string;
  GET_SUBSCRIPTION_BY_PLAN: string;
  GET_SUBSCRIPTIONS: string;
  UPDATE_SUBSCRIPTION: string;
  DELETE_SUBSCRIPTION: string;

  // ✅ NEW for artist dashboard
  GET_MY_RECENT_ACTIVE_SUBSCRIBERS: string;
  GET_MY_ACTIVE_BY_LOCATION: string;
  GET_MY_STATS: string;

  GET_STATUS: string;
  SUBSCRIBE: string;
  UNSUBSCRIBE: string;
}

const API_URLS: API_URLS = {
  CREATE_SUBSCRIPTION: `${BASE_API_URL}/subscription/create`,
  GET_SUBSCRIPTION: `${BASE_API_URL}/subscription/:id`,

  // ✅ corrected param names
  GET_SUBSCRIPTION_BY_USER: `${BASE_API_URL}/subscription/user/:userId`,
  GET_SUBSCRIPTION_BY_PLAN: `${BASE_API_URL}/subscription/plan/:planId`,

  GET_SUBSCRIPTIONS: `${BASE_API_URL}/subscription`,
  UPDATE_SUBSCRIPTION: `${BASE_API_URL}/subscription/update/:id`,
  DELETE_SUBSCRIPTION: `${BASE_API_URL}/subscription/delete/:id`,

  // ✅ NEW endpoints
  GET_MY_RECENT_ACTIVE_SUBSCRIBERS: `${BASE_API_URL}/subscription/artist/me/recent`,
  GET_MY_ACTIVE_BY_LOCATION: `${BASE_API_URL}/subscription/artist/me/by-location`,
  GET_MY_STATS: `${BASE_API_URL}/subscription/artist/me/stats`,

  GET_STATUS: `${BASE_API_URL}/subscription/artist/:artistId/status`,
  SUBSCRIBE: `${BASE_API_URL}/subscription/artist/:artistId/subscribe`,
  UNSUBSCRIBE: `${BASE_API_URL}/subscription/artist/:artistId/unsubscribe`,
} as const;

class ServiceObject {
  // Create subscription (fan subscribes)
  static createSubscription = (info: any, token: string): Promise<any> =>
    BaseMethods.postRequest(API_URLS.CREATE_SUBSCRIPTION, info, true);

  static getSubscription = (id: string, token: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_SUBSCRIPTION, { id });
    return BaseMethods.getRequest(url, true);
  };

  static getSubscriptionByUser = (
    userId: string,
    token: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.GET_SUBSCRIPTION_BY_USER, { userId });
    return BaseMethods.getRequest(url, true);
  };

  static getSubscriptionByPlan = (
    planId: string,
    token: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.GET_SUBSCRIPTION_BY_PLAN, { planId });
    return BaseMethods.getRequest(url, true);
  };

  static getStatus = (artistId: string, token: string) => {
    const url = formatURL(API_URLS.GET_STATUS, { artistId });
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static subscribe = (artistId: string, token: string, body: any = {}) => {
    const url = formatURL(API_URLS.SUBSCRIBE, { artistId });
    return BaseMethods.postRequest(url, body, true, {}, token);
  };

  static unsubscribe = (artistId: string, token: string) => {
    const url = formatURL(API_URLS.UNSUBSCRIBE, { artistId });
    return BaseMethods.postRequest(url, {}, true, {}, token);
  };

  static getSubscriptions = (token: string): Promise<any> =>
    BaseMethods.getRequest(API_URLS.GET_SUBSCRIPTIONS, true, {}, token);

  // ⚠️ ton backend est en PUT, mais si BaseMethods n'a pas putRequest,
  // tu peux garder postRequest SI le backend accepte POST.
  static updateSubscription = (id: string, info: any): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_SUBSCRIPTION, { id });
    return BaseMethods.postRequest(url, info, true);
    // ou BaseMethods.putRequest(url, info, true) si dispo
  };

  static deleteSubscription = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_SUBSCRIPTION, { id });
    return BaseMethods.deleteRequest(url, {}, true);
  };

  // ✅ NEW - Artist dashboard
  static getMyRecentActiveSubscribers = (
    limit = 5,
    token: string
  ): Promise<any> => {
    const url = `${
      API_URLS.GET_MY_RECENT_ACTIVE_SUBSCRIBERS
    }?limit=${encodeURIComponent(String(limit))}`;
    return BaseMethods.getRequest(url, true, {}, token);
  };

  static getMyActiveSubscriptionsByLocation = (token: string): Promise<any> =>
    BaseMethods.getRequest(API_URLS.GET_MY_ACTIVE_BY_LOCATION, true, {}, token);

  static getMySubscriptionStats = (token: string): Promise<any> =>
    BaseMethods.getRequest(API_URLS.GET_MY_STATS, true, {}, token);
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

export const SubscriptionModuleObject = new Module();
