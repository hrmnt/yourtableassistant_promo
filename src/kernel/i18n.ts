import Languages from 'react-native-languages';
import Polyglot from 'node-polyglot';

import {is} from 'shared/utils/data-types';

const MESSAGES_MAP = {
  ru: require('../../messages/ru.json'), // eslint-disable-line global-require
};

export type Locale = keyof typeof MESSAGES_MAP;

export const SUPPORTED_LOCALES = Object.keys(MESSAGES_MAP) as readonly Locale[];
export const DEFAULT_LOCALE: Locale = 'ru';

export const systemLocale = Languages.language as Locale;

export const resolvedLocale =
  !is.nonEmptyString(systemLocale) || !SUPPORTED_LOCALES.includes(systemLocale)
    ? DEFAULT_LOCALE
    : systemLocale;

export const i18n = new Polyglot({
  phrases: MESSAGES_MAP[resolvedLocale],
  locale: resolvedLocale,
});
