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
}

const API_URLS: API_URLS = {
  CREATE_SUBSCRIPTION: `${BASE_API_URL}/subscription/create`,
  GET_SUBSCRIPTION: `${BASE_API_URL}/subscription/:id`,
  GET_SUBSCRIPTION_BY_USER: `${BASE_API_URL}/subscription/user/:id`,
  GET_SUBSCRIPTION_BY_PLAN: `${BASE_API_URL}/subscription/plan/:id`,
  GET_SUBSCRIPTIONS: `${BASE_API_URL}/subscription`,
  UPDATE_SUBSCRIPTION: `${BASE_API_URL}/subscription/update/:id`,
  DELETE_SUBSCRIPTION: `${BASE_API_URL}/subscription/delete/:id`,
} as const;

class ServiceObject {
  static createSubscription = (info: any): Promise<any> =>
    BaseMethods.postRequest(API_URLS.CREATE_SUBSCRIPTION, info, true);

  static getSubscription = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_SUBSCRIPTION, { id });
    return BaseMethods.getRequest(url, true);
  };

  static getSubscriptionByUser = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_SUBSCRIPTION_BY_USER, { id });
    return BaseMethods.getRequest(url, true);
  };

  static getSubscriptionByPlan = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_SUBSCRIPTION_BY_PLAN, { id });
    return BaseMethods.getRequest(url, true);
  };

  static getSubscriptions = (): Promise<any> => {
    return BaseMethods.getRequest(API_URLS.GET_SUBSCRIPTIONS, true);
  };

  static updateSubscription = (id: string, info: any): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_SUBSCRIPTION, { id });
    return BaseMethods.postRequest(url, info, true);
  };

  static deleteSubscription = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_SUBSCRIPTION, { id });
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

export const SubscriptionModuleObject = new Module();
