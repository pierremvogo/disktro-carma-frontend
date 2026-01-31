import { MediaModuleObject as ModuleObject } from "@/modules/file/module";

export const wait = async (delay = 1000) => {
  console.log("Wait ", delay);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, delay);
  });
};

export const ISO_COUNTRIES: Record<string, string> = {
  AF: "Afghanistan",
  AL: "Albanie",
  DZ: "Algérie",
  AS: "Samoa américaines",
  AD: "Andorre",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctique",
  AG: "Antigua-et-Barbuda",
  AR: "Argentine",
  AM: "Arménie",
  AW: "Aruba",
  AU: "Australie",
  AT: "Autriche",
  AZ: "Azerbaïdjan",
  BS: "Bahamas",
  BH: "Bahreïn",
  BD: "Bangladesh",
  BB: "Barbade",
  BY: "Biélorussie",
  BE: "Belgique",
  BZ: "Belize",
  BJ: "Bénin",
  BM: "Bermudes",
  BT: "Bhoutan",
  BO: "Bolivie",
  BA: "Bosnie-Herzégovine",
  BW: "Botswana",
  BR: "Brésil",
  BN: "Brunei",
  BG: "Bulgarie",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodge",
  CM: "Cameroun",
  CA: "Canada",
  CV: "Cap-Vert",
  CF: "République centrafricaine",
  TD: "Tchad",
  CL: "Chili",
  CN: "Chine",
  CO: "Colombie",
  KM: "Comores",
  CG: "Congo",
  CD: "Congo (RDC)",
  CR: "Costa Rica",
  CI: "Côte d’Ivoire",
  HR: "Croatie",
  CU: "Cuba",
  CY: "Chypre",
  CZ: "Tchéquie",
  DK: "Danemark",
  DJ: "Djibouti",
  DM: "Dominique",
  DO: "République dominicaine",
  EC: "Équateur",
  EG: "Égypte",
  SV: "Salvador",
  GQ: "Guinée équatoriale",
  ER: "Érythrée",
  EE: "Estonie",
  SZ: "Eswatini",
  ET: "Éthiopie",
  FJ: "Fidji",
  FI: "Finlande",
  FR: "France",
  GA: "Gabon",
  GM: "Gambie",
  GE: "Géorgie",
  DE: "Allemagne",
  GH: "Ghana",
  GR: "Grèce",
  GD: "Grenade",
  GT: "Guatemala",
  GN: "Guinée",
  GW: "Guinée-Bissau",
  HT: "Haïti",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hongrie",
  IS: "Islande",
  IN: "Inde",
  ID: "Indonésie",
  IR: "Iran",
  IQ: "Irak",
  IE: "Irlande",
  IL: "Israël",
  IT: "Italie",
  JM: "Jamaïque",
  JP: "Japon",
  JO: "Jordanie",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KR: "Corée du Sud",
  KP: "Corée du Nord",
  KW: "Koweït",
  KG: "Kirghizistan",
  LA: "Laos",
  LV: "Lettonie",
  LB: "Liban",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libye",
  LT: "Lituanie",
  LU: "Luxembourg",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaisie",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malte",
  MH: "Îles Marshall",
  MR: "Mauritanie",
  MU: "Maurice",
  MX: "Mexique",
  FM: "Micronésie",
  MD: "Moldavie",
  MC: "Monaco",
  MN: "Mongolie",
  ME: "Monténégro",
  MA: "Maroc",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibie",
  NR: "Nauru",
  NP: "Népal",
  NL: "Pays-Bas",
  NZ: "Nouvelle-Zélande",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  MK: "Macédoine du Nord",
  NO: "Norvège",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palaos",
  PA: "Panama",
  PG: "Papouasie-Nouvelle-Guinée",
  PY: "Paraguay",
  PE: "Pérou",
  PH: "Philippines",
  PL: "Pologne",
  PT: "Portugal",
  QA: "Qatar",
  RO: "Roumanie",
  RU: "Russie",
  RW: "Rwanda",
  KN: "Saint-Christophe-et-Niévès",
  LC: "Sainte-Lucie",
  VC: "Saint-Vincent-et-les-Grenadines",
  WS: "Samoa",
  SM: "Saint-Marin",
  ST: "Sao Tomé-et-Principe",
  SA: "Arabie saoudite",
  SN: "Sénégal",
  RS: "Serbie",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SG: "Singapour",
  SK: "Slovaquie",
  SI: "Slovénie",
  SB: "Îles Salomon",
  SO: "Somalie",
  ZA: "Afrique du Sud",
  ES: "Espagne",
  LK: "Sri Lanka",
  SD: "Soudan",
  SR: "Suriname",
  SE: "Suède",
  CH: "Suisse",
  SY: "Syrie",
  TW: "Taïwan",
  TJ: "Tadjikistan",
  TZ: "Tanzanie",
  TH: "Thaïlande",
  TG: "Togo",
  TO: "Tonga",
  TT: "Trinité-et-Tobago",
  TN: "Tunisie",
  TR: "Turquie",
  TM: "Turkménistan",
  TV: "Tuvalu",
  UG: "Ouganda",
  UA: "Ukraine",
  AE: "Émirats arabes unis",
  GB: "Royaume-Uni",
  US: "États-Unis",
  UY: "Uruguay",
  UZ: "Ouzbékistan",
  VU: "Vanuatu",
  VA: "Vatican",
  VE: "Venezuela",
  VN: "Vietnam",
  EH: "Sahara occidental",
  YE: "Yémen",
  ZM: "Zambie",
  ZW: "Zimbabwe",
};

const EUR_TO_FCFA = 656;

export const convertEuroToFcfa = (euro: number): number => {
  return Math.round(euro * EUR_TO_FCFA);
};

export function getCountryName(code: string | null | undefined): string {
  if (!code) return "Unknown";
  const upper = code.toUpperCase();
  return ISO_COUNTRIES[upper] ?? "Unknown";
}

export const isTokenExpired = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return true; // pas de token = expiré ou inexistant

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // décoder la partie payload
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000); // en secondes

    return exp < now; // true si expiré
  } catch (e) {
    console.error("Erreur lors du décodage du token :", e);
    return true; // en cas d'erreur, on considère le token comme invalide/expiré
  }
};

export const getImageFile = async (
  imageUrl: string,
  token: string
): Promise<string> => {
  if (imageUrl) {
    const blob = await ModuleObject.service.downloadImageFile(imageUrl, token);
    const imageObjectUrl = URL.createObjectURL(blob);
    return imageObjectUrl;
  }
  return "";
};

export const getAudioFile = async (
  audioUrl: string,
  token: string
): Promise<string> => {
  if (audioUrl) {
    const blob = await ModuleObject.service.downloadAudioFile(audioUrl, token);
    const audioObjectUrl = URL.createObjectURL(blob);
    return audioObjectUrl;
  }
  return "";
};

export const getVideoFile = async (
  videoUrl: string,
  token: string
): Promise<string> => {
  if (videoUrl) {
    const blob = await ModuleObject.service.downloadVideoFile(videoUrl, token);
    const videoObjectUrl = URL.createObjectURL(blob);
    return videoObjectUrl;
  }
  return "";
};

export const getBrailleFile = async (
  brailleUrl: string,
  token: string
): Promise<string> => {
  if (brailleUrl) {
    const blob = await ModuleObject.service.downloadBrailleFile(
      brailleUrl,
      token
    );
    const brailleObjectUrl = URL.createObjectURL(blob);
    return brailleObjectUrl;
  }
  return "";
};

export const getDocumentFile = async (
  documentUrl: string,
  token: string
): Promise<string> => {
  if (documentUrl) {
    const blob = await ModuleObject.service.downloadBrailleFile(
      documentUrl,
      token
    );
    const documentObjectUrl = URL.createObjectURL(blob);
    return documentObjectUrl;
  }
  return "";
};

export const getUserRole = () => {
  const rawRole = localStorage.getItem(ModuleObject.localState.USER_ROLE);
  return rawRole ? rawRole.trim().toLowerCase().replace(/['"]+/g, "") : null;
};
