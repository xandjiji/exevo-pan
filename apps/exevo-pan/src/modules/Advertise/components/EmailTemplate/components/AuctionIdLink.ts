import { officialAuctionUrl } from 'utils'

const AuctionIdLink = (id: string): string =>
  `<a style="font-size: 12px;letter-spacing: 1px;" href="${officialAuctionUrl(
    +id,
  )}" target="_blank" rel="noreferrer noopener">(#${id})</a>`

export default AuctionIdLink
