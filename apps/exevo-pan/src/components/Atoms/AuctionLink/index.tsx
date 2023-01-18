/* eslint-disable jsx-a11y/anchor-has-content */
import { officialAuctionUrl } from 'utils'

type AuctionLinkProps = {
  auctionId: number
} & JSX.IntrinsicElements['a']

const AuctionLink = ({ auctionId, ...props }: AuctionLinkProps) => (
  <a
    target="_blank"
    rel="noreferrer noopener external"
    href={officialAuctionUrl(auctionId)}
    {...props}
  />
)

export default AuctionLink
