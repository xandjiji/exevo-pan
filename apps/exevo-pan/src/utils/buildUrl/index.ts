import { links, locales, urlParameters } from 'Constants'

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

export const permalinkResolver = ({
  auctionId,
  locale,
}: PermalinkResolverArgs) =>
  `${buildUrl('', locale)}?${urlParameters.AUCTION_ID}=${auctionId}`

type AddLocalePrefixArgs = {
  route: string
  locale?: string
  absolute?: boolean
}

export const addLocalePrefix = ({
  route,
  locale = locales.DEFAULT_LOCALE,
  absolute = false,
}: AddLocalePrefixArgs) => {
  const routePrefix = locale === locales.DEFAULT_LOCALE ? '' : `/${locale}`
  const basePath = absolute ? links.CANONICAL : ''

  return `${basePath}${routePrefix}${route}`
}

export const officialAuctionUrl = (auctionId: number) =>
  `https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${auctionId}`
