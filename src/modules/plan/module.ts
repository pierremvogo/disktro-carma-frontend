import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  CREATE_PLAN: string;
  GET_PLAN: string;
  GET_PLANS: string;
  UPDATE_PLAN: string;
  DELETE_PLAN: string;
}

const API_URLS: API_URLS = {
  CREATE_PLAN: `${BASE_API_URL}/plan/create`,
  GET_PLAN: `${BASE_API_URL}/plan/:id`,
  GET_PLANS: `${BASE_API_URL}/plan`,
  UPDATE_PLAN: `${BASE_API_URL}/plan/update/:id`,
  DELETE_PLAN: `${BASE_API_URL}/plan/delete/:id`,
} as const;

class ServiceObject {
  static createPlan = (info: any): Promise<any> =>
    BaseMethods.postRequest(API_URLS.CREATE_PLAN, info, true);

  static getPlan = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_PLAN, { id });
    return BaseMethods.getRequest(url, true);
  };

  static getPlans = (): Promise<any> => {
    return BaseMethods.getRequest(API_URLS.GET_PLANS, true);
  };

  static updatePlan = (id: string, info: any): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_PLAN, { id });
    return BaseMethods.postRequest(url, info, true);
  };

  static deletePlan = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_PLAN, { id });
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

export const PlanModuleObject = new Module();
