"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import cosmicEn from "../../modules/i18n/en.json";
import cosmicFr from "../../modules/i18n/fr.json";
import cosmicEs from "../../modules/i18n/es.json";
import cosmicDe from "../../modules//i18n/de.json";

const resources = {
  en: {
    cosmic: cosmicEn,
  },
  fr: {
    cosmic: cosmicFr,
  },
  de: {
    cosmic: cosmicDe,
  },
  es: {
    cosmic: cosmicEs,
  },
};

i18n.use(initReactI18next).init({
  resources,
  ns: ["cosmic"],
  defaultNS: "cosmic",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
