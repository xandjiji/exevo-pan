import { links } from 'Constants'

const DEFAULT_LOCALE = 'en'

export const buildUrl = (route: string, locale = DEFAULT_LOCALE): string =>
  `${links.CANONICAL}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${route}`
