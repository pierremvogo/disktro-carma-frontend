import BaseMethods from "@/@disktro/api/baseMethods";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

function formatURL(template: string, params: Record<string, string>): string {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(value)),
    template
  );
}

interface API_URLS {
  CREATE_SUBSCRIPTION_CHECKOUT: string;
  CREATE_PORTAL_SESSION: string;
  CANCEL_SUBSCRIPTION_FOR_ARTIST: string;
}

const API_URLS: API_URLS = {
  CREATE_SUBSCRIPTION_CHECKOUT: `${BASE_API_URL}/stripe/checkout/subscription`,
  CREATE_PORTAL_SESSION: `${BASE_API_URL}/stripe/portal`,
  CANCEL_SUBSCRIPTION_FOR_ARTIST: `${BASE_API_URL}/stripe/subscription/:artistId/cancel`,
} as const;

class ServiceObject {
  /**
   * Create Stripe Checkout session for subscription (mode=subscription)
   * body: { artistId: string, planId: string }
   * returns: { data: { url: string } } or { url: string } depending on backend wrapper
   */
  static createSubscriptionCheckoutSession = (
    info: { artistId: string; planId: string },
    token: string
  ): Promise<any> => {
    return BaseMethods.postRequest(
      API_URLS.CREATE_SUBSCRIPTION_CHECKOUT,
      info,
      true,
      {},
      token
    );
  };

  /**
   * Create Stripe Customer Portal session
   * body: { returnUrl?: string }
   */
  static createCustomerPortalSession = (
    info: { returnUrl?: string } = {},
    token: string
  ): Promise<any> => {
    return BaseMethods.postRequest(
      API_URLS.CREATE_PORTAL_SESSION,
      info,
      true,
      {},
      token
    );
  };

  /**
   * Cancel subscription for a given artist (fan authenticated)
   * POST /stripe/subscription/:artistId/cancel
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

export const StripeModuleObject = new Module();
