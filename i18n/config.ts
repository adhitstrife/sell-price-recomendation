import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import id from "./id.json";
import en from "./en.json";

const getInitialLanguage = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("language") || "id";
  }
  return "id";
};

i18n.use(initReactI18next).init({
  resources: {
    id: { translation: id },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: "id",
  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = (lang: "id" | "en"): void => {
  i18n.changeLanguage(lang);
  if (typeof window !== "undefined") {
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  }
};

export default i18n;