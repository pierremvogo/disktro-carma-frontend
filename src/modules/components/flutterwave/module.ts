import BaseMethods from "@/@disktro/api/baseMethods";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  INITIALIZE_SUBSCRIPTION: string;
  CANCEL_SUBSCRIPTION_FOR_ARTIST: string;
}

const API_URLS: API_URLS = {
  INITIALIZE_SUBSCRIPTION: `${BASE_API_URL}/flutterwave/initialize`,
  CANCEL_SUBSCRIPTION_FOR_ARTIST: `${BASE_API_URL}/flutterwave/subscription/:artistId/cancel`,
} as const;

class ServiceObject {
  /**
   * Initialize Flutterwave subscription payment
   * body: { artistId: string, planId: string }
   * returns: { data: { link: string } } (payment link)
   */
  static initializeSubscription = (
    info: {
      artistId: string;
      planId: string;
      email: string;
      phone: string;
      amount: number;
    },
    token: string
  ): Promise<any> => {
    return BaseMethods.postRequest(
      API_URLS.INITIALIZE_SUBSCRIPTION,
      info,
      true,
      {},
      token
    );
  };

  static verifyFlutterwavePayment = (
    info: { txRef: string; flwRef: string },
    token: string
  ): Promise<any> => {
    return BaseMethods.postRequest(
      `${BASE_API_URL}/flutterwave/verify-payment`,
      info,
      true,
      {},
      token
    );
  };

  /**
   * Cancel Flutterwave subscription for a given artist
   * POST /flutterwave/subscription/:artistId/cancel
   */
  static cancelSubscriptionForArtist = (
    artistId: string,
    token: string
  ): Promise<any> => {
    const url = formatURL(API_URLS.CANCEL_SUBSCRIPTION_FOR_ARTIST, {
      artistId,
    });
    return BaseMethods.postRequest(url, {}, true, {}, token);
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

export const FlutterwaveModuleObject = new Module();
