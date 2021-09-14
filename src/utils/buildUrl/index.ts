import { links } from 'Constants'

export const buildUrl = (route: string, locale?: string): string =>
  `${links.CANONICAL}${locale ? `/${locale}` : ''}${route}`
