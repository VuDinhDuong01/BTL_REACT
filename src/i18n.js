import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import translationEN from './lang/en/en.json';
import translationVI from './lang/vi/vi.json';

const resources = {
    en: {
        translation: translationEN
    },
    vi: {
        translation: translationVI
    }
};

i18n
    .use(detector)
    .use(reactI18nextModule)
    .init({
        resources,
        fallbackLng: "vi",
        keySeparator: false,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;