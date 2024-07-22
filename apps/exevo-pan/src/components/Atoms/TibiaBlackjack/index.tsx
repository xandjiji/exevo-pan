/* eslint-disable react/jsx-no-target-blank */
import { memo } from 'react'
import clsx from 'clsx'
import { FadeImage } from 'components/Atoms'
import { loadRawSrc } from 'utils'
import { links } from 'Constants'

const logoMdSrc = loadRawSrc('/assets/tibiablackjack.png')

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
      <FadeImage
        className="self-start"
        src={logoMdSrc}
        alt="Tibia Blackjack"
        width={97}
        height={61}
        loading="lazy"
      />
    </a>
  ),
)
