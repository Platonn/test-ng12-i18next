import { i18n } from 'i18next';
import i18nextHttpBackend from 'i18next-http-backend';

export function i18nextInit(i18next: i18n) {
  return () => {
    i18next.use(i18nextHttpBackend);
    return i18next.init({
      // backend: {
      //   reloadInterval: false,
      // },
      // lng: 'en',
      // fallbackLng: 'en',
      // // debug: true,
      // ns: ['common'],
      // backend: {
      //   loadPath: 'http://localhost:4200/assets/locales/{{lng}}/{{ns}}.json',
      // },
      // resources: {
      //   en: {
      //     common: {
      //       hello: 'Hello',
      //       source: 'STATIC',
      //     },
      //   },
      // },
    });
  };
}
