/* eslint-disable react/jsx-no-target-blank */
import { memo } from 'react'
import clsx from 'clsx'
import { links } from 'Constants'

const TibiaBlackjack = ({
  className,
  ...props
}: JSX.IntrinsicElements['a']) => (
  <a
    className={clsx(
      'card clickable bg-black/40 p-1 transition-all hover:bg-black/30',
      className,
    )}
    target="_blank"
    rel="noopener external nofollow"
    href={links.TIBIA_BLACKJACK}
    {...props}
  >
    <img
      className="self-start"
      src="https://i.imgur.com/6pr5S4T.png"
      alt="Tibia Blackjack"
    />
  </a>
)

export default memo(TibiaBlackjack)
