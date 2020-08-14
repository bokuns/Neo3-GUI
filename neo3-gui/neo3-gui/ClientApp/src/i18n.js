import i18n from "i18next";
import Configs from './configs';
import { initReactI18next } from "react-i18next";
import en from './configs/translation/en';
import zh from './configs/translation/zh';

// the translations
// (tip move them in a JSON file and import them)
const fallBackLng = 'en';
const resources = {
  en: {
    translation: en
  },
  zh: {
    translation: zh
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ns: ['translation'],
    defaultNS: 'translation',
    resources: resources,
    lng: Configs.Language,
    fallBacking: fallBackLng,
    interpolation: {
      escapeValue: false,  // react already safes from xss
    },
    react: {
      wait: true
    }
  });

export default i18n;
