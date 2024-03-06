import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)

  // YOU CAN CHANGE URER TRANSLATION FILE LOCATION FOLLOEING THIS CODE
  // .use(
  //   new Backend(null, {
  //     loadPath: "/translations/{{lng}}/{{ns}}.json",
  //   })
  // )
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next) // PASSES i18n DOWN TO REACT react-i18next
  .init({
    fallbackLng: "en",
    // debug: true, // IT WILL SHOW THE NECCESSARY INFORMATION ON THE CONSOLE
    debug: false, // IT WILL HIDE THE NECCESSARY INFORMATION ON THE CONSOLE

    interpolation: {
      escapeValue: false, // REACT ALREADY SAFES FROM XSS
    },
  });

export default i18n;
