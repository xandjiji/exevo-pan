import { links, locales, urlParameters, routes } from 'Constants'

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

export const getGuildPermalink = (guildName: string, absolute = false) =>
  `${absolute ? links.CANONICAL : ''}${
    routes.BOSSES.HUNTING_GROUPS
  }/${guildName}`

export const officialAuctionUrl = (auctionId: number) =>
  `https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${auctionId}`

export const officialCharacterUrl = (nickname: string) =>
  `https://www.tibia.com/community/?name=${nickname}`
