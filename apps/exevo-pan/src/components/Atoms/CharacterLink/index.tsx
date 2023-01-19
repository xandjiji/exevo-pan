/* eslint-disable jsx-a11y/anchor-has-content */
import { officialCharacterUrl } from 'utils'

type CharacterLinkProps = {
  nickname: string
} & JSX.IntrinsicElements['a']

const AuctionLink = ({ nickname, ...props }: CharacterLinkProps) => (
  <a
    target="_blank"
    rel="noreferrer noopener external"
    href={officialCharacterUrl(nickname)}
    {...props}
  />
)

export default AuctionLink
