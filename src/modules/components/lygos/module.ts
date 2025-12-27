import BaseMethods from "@/@disktro/api/baseMethods";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

interface API_URLS {
  INITIALIZE_SUBSCRIPTION: string;
  VERIFY_PAYMENT: string;
  CANCEL_SUBSCRIPTION: string;
}

/**
 * Routes Lygos alignées avec ton backend
 */
const API_URLS: API_URLS = {
  INITIALIZE_SUBSCRIPTION: `${BASE_API_URL}/lygos/initialize`,
  VERIFY_PAYMENT: `${BASE_API_URL}/lygos/verify-payment`,
  CANCEL_SUBSCRIPTION: `${BASE_API_URL}/lygos/cancel-subscription`,
} as const;

class ServiceObject {
  /**
   * 💳 Initialiser un paiement Lygos
   * body: { artistId, planId, email, phone, amount }
   * returns: { data: { redirectUrl, orderId } }
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

  /**
   * 🔎 Vérifier manuellement un paiement Lygos
   * body: { orderId }
   * returns: { status, subscription }
   */
  static verifyLygosPayment = (info: { orderId: string }, token: string) => {
    return BaseMethods.postRequest(
      API_URLS.VERIFY_PAYMENT,
      info,
      true,
      {},
      token
    );
  };

  /**
   * ❌ Annulation d’abonnement côté DB (Lygos ne fournit pas cette action)
   * body: { subscriptionId }
   */
  static cancelSubscription = (
    subscriptionId: string,
    token: string
  ): Promise<any> => {
    return BaseMethods.postRequest(
      API_URLS.CANCEL_SUBSCRIPTION,
      { subscriptionId },
      true,
      {},
      token
    );
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

/**
 * 🚀 Module exportable complet
 */
class Module {
  API_URLS = API_URLS;
  service = ServiceObject;
  localState = LocalStateObjectKeys;
}

export const LygosModuleObject = new Module();
