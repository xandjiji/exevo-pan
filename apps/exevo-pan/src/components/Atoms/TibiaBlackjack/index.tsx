/* eslint-disable react/jsx-no-target-blank */
import { memo } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import logoMdSrc from 'assets/tibiablackjack.png'
import { links } from 'Constants'

export const Banner = memo(
  ({ className, ...props }: JSX.IntrinsicElements['a']) => (
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
      <Image
        className="self-start"
        src={logoMdSrc}
        alt="Tibia Blackjack"
        layout="fixed"
        width={97}
        height={61}
      />
    </a>
  ),
)
