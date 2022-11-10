import { links, locales, routes, urlParameters } from 'Constants'

const { DEFAULT_LOCALE } = locales

export const buildUrl = (
  route: string,
  locale = DEFAULT_LOCALE as string,
): string =>
  `${links.CANONICAL}${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${route}`

type PermalinkResolverArgs = {
  auctionId: number
  locale?: string
}

export const permalinkResolver = {
  history: ({ auctionId, locale }: PermalinkResolverArgs) =>
    `${buildUrl(routes.BAZAAR_HISTORY, locale)}?${
      urlParameters.AUCTION_ID
    }=${auctionId}`,
  current: ({ auctionId, locale }: PermalinkResolverArgs) =>
    `${buildUrl('', locale)}?${urlParameters.AUCTION_ID}=${auctionId}`,
}
