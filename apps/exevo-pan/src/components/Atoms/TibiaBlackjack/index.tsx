/* eslint-disable react/jsx-no-target-blank */
import { memo } from 'react'
import clsx from 'clsx'
import { FadeImage } from 'components/Atoms'
import { links } from 'Constants'

export const Banner = memo(
  ({ className, ...props }: JSX.IntrinsicElements['a']) => (
    <a
      className={clsx(
        'card clickable bg-black/40 px-1.5 py-1 transition-all hover:bg-black/30',
        className,
      )}
      target="_blank"
      rel="noopener external nofollow"
      href={links.TIBIA_BLACKJACK}
      {...props}
    >
      <div className="text-onPrimary text-tsm flex items-center gap-1 whitespace-nowrap font-bold uppercase">
        <FadeImage
          src="https://i.imgur.com/PVGQaYL.png"
          alt="Tibia Blackjack"
          width={18}
          height={18}
          loading="lazy"
        />{' '}
        Play TibiaBlackjack
      </div>
    </a>
  ),
)
