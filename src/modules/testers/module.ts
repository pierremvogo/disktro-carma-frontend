import BaseMethods from "@/@disktro/api/baseMethods";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface TesterAPI_URLS {
  CREATE_TESTER: string;
  GET_ALL_TESTERS: string;
  GET_TESTER_BY_ID: string;
  DELETE_TESTER: string;
}

const TESTER_API_URLS: TesterAPI_URLS = {
  CREATE_TESTER: `${BASE_API_URL}/fan/create`,
  GET_ALL_TESTERS: `${BASE_API_URL}/fan/getAll`,
  GET_TESTER_BY_ID: `${BASE_API_URL}/fan/:id`,
  DELETE_TESTER: `${BASE_API_URL}/fan/:id`,
} as const;

// Types optionnels pour plus de confort
export interface TesterPayload {
  name: string;
  email: string;
  ageRange: "-18" | "-22" | "-30" | "-50" | "+50";
  language: "english" | "spanish" | "catalan";
}

export interface TesterDTO extends TesterPayload {
  id: string;
}

class TesterServiceObject {
  static createTester = (info: TesterPayload): Promise<any> =>
    BaseMethods.postRequest(TESTER_API_URLS.CREATE_TESTER, info, false);

  static getAllTesters = (): Promise<any> =>
    BaseMethods.getRequest(TESTER_API_URLS.GET_ALL_TESTERS, false);

  static getTesterById = (id: string): Promise<any> => {
    const url = formatURL(TESTER_API_URLS.GET_TESTER_BY_ID, { id });
    return BaseMethods.getRequest(url, false);
  };

  static deleteTester = (id: string): Promise<any> => {
    const url = formatURL(TESTER_API_URLS.DELETE_TESTER, { id });
    return BaseMethods.deleteRequest(url, {}, false);
  };
}

class TesterModule {
  API_URLS = TESTER_API_URLS;
  service = TesterServiceObject;
}

export const TesterModuleObject = new TesterModule();
