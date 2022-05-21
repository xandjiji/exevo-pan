/* eslint-disable react/jsx-no-target-blank */
import { memo } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import logoMdSrc from 'assets/tibiablackjack.png'
import logoSmSrc from 'assets/tibiablackjack-24x24.png'
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

export const FloatingButton = memo(
  ({ className, ...props }: JSX.IntrinsicElements['a']) => (
    <a
      className={clsx(
        'clickable text-tsm bg-primary text-onPrimary hover:highlight-10 fixed bottom-[42px] right-4 z-10 flex items-center rounded-2xl py-2 pr-4 pl-10 tracking-wider shadow-lg transition-all',
        className,
      )}
      target="_blank"
      rel="noopener external nofollow"
      href={links.TIBIA_BLACKJACK}
      {...props}
    >
      <div
        className="absolute top-1/2 left-3 h-6 w-6"
        style={{ transform: 'translateY(-50%)' }}
      >
        <Image
          className="self-start"
          src={logoSmSrc}
          alt="Tibia Blackjack"
          layout="fixed"
          width={24}
          height={24}
        />
      </div>
      Play Tibia Blackjack
    </a>
  ),
)
