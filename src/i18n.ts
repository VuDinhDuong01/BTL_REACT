import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from './lang/en/en.json';
import translationVI from './lang/vi/vi.json';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            vi: {
                translation: translationVI
            },
            en: {
                translation: translationEN
            }
        },
        lng: localStorage.getItem("lng") === "en" ? "en" : "vi",
        fallbackLng: localStorage.getItem("lng") === "en" ? "en" : "vi",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;