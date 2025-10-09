import BaseMethods from "@/@disktro/api/baseMethods";
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  CREATE_TRANSACTION: string;
  GET_TRANSACTION: string;
  GET_TRANSACTIONS: string;
  UPDATE_TRANSACTION: string;
  DELETE_TRANSACTION: string;
}

const API_URLS: API_URLS = {
  CREATE_TRANSACTION: `${BASE_API_URL}/transaction/create`,
  GET_TRANSACTION: `${BASE_API_URL}/transaction/:id`,
  GET_TRANSACTIONS: `${BASE_API_URL}/transaction`,
  UPDATE_TRANSACTION: `${BASE_API_URL}/transaction/update/:id`,
  DELETE_TRANSACTION: `${BASE_API_URL}/transaction/delete/:id`,
} as const;

class ServiceObject {
  static createTransaction = (info: any): Promise<any> =>
    BaseMethods.postRequest(API_URLS.CREATE_TRANSACTION, info, true);

  static getTransaction = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.GET_TRANSACTION, { id });
    return BaseMethods.getRequest(url, true);
  };

  static getTransactions = (): Promise<any> => {
    return BaseMethods.getRequest(API_URLS.GET_TRANSACTIONS, true);
  };

  static updateTransaction = (id: string, info: any): Promise<any> => {
    const url = formatURL(API_URLS.UPDATE_TRANSACTION, { id });
    return BaseMethods.postRequest(url, info, true);
  };

  static deleteTransaction = (id: string): Promise<any> => {
    const url = formatURL(API_URLS.DELETE_TRANSACTION, { id });
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

export const TransactionModuleObject = new Module();
