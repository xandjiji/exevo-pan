import { links, locales } from 'Constants'

const { DEFAULT_LOCALE } = locales

export const buildUrl = (
  route: string,
  locale = DEFAULT_LOCALE as string,
): string =>
  `${links.CANONICAL}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${route}`
