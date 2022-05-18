import clsx from 'clsx'
import { memo } from 'react'
import Image from 'next/image'
import { HeroProps } from './types'

const Hero = ({ title, subtitle, src, className, ...props }: HeroProps) => (
  <div
    className={clsx(
      'inner-container relative flex items-center justify-center py-6 md:py-24',
      className,
    )}
    {...props}
  >
    <div
      className="hero-image absolute top-1/2 left-1/2 mix-blend-overlay"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <Image
        src={src}
        alt={title}
        layout="fixed"
        width={240}
        height={240}
        priority
        unoptimized
      />
    </div>

    <div className="z-1 relative grid gap-4">
      <h1 className="hero-title text-[32px] font-normal tracking-wide md:text-[48px]">
        {title}
      </h1>
      {!!subtitle && (
        <span className="hero-subtitle text-s block whitespace-nowrap font-light italic tracking-wide opacity-90 md:text-base">
          {subtitle}
        </span>
      )}
    </div>
  </div>
)

export default memo(Hero)
