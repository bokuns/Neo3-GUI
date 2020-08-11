import i18n from "i18next";
import Configs from './configs';
import { initReactI18next } from "react-i18next";
import en from './configs/translation/en';
import zh from './configs/translation/zh';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: en,
  zh: zh
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: resources,
    lng: Configs.Language,
    fallBacking: 'en',
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
