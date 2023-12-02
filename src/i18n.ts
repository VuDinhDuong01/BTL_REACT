import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from './lang/en/en.json';
import translationVI from './lang/vi/vi.json';
import { keyLocalStorage } from "./helps";
import { LANGUAGE } from "./helps/language";

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
        lng: localStorage.getItem(keyLocalStorage.lng) === LANGUAGE.EN ? LANGUAGE.EN  :LANGUAGE.VI,
        fallbackLng: localStorage.getItem(keyLocalStorage.lng) === LANGUAGE.EN ? LANGUAGE.EN  :LANGUAGE.VI,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;