import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
import engTranslation from './../translations/eng/eng.json';
import ukTranslation from './../translations/uk/uk.json';

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    eng: { translation: engTranslation },
    uk: { translation: ukTranslation }
  },
  lng: 'eng',
  fallbackLng: 'eng'
});

export default i18n;
