import clsx from 'clsx'
import { memo } from 'react'
import Image from 'next/image'
import { HeroProps } from './types'

const Hero = ({
  title,
  subtitle,
  src,
  offset = false,
  className,
  ...props
}: HeroProps) => (
  <div
    className={clsx(
      'inner-container relative flex items-center justify-center py-6 md:py-24',
      className,
      offset ? 'md:py-20' : 'md:py-24',
    )}
    {...props}
  >
    <Image
      src={src}
      alt={title}
      layout="fixed"
      width={240}
      height={240}
      priority
      unoptimized
      className={clsx(
        'pointer-events-none absolute top-1/2 left-1/2 mix-blend-overlay',
        offset && 'md:ml-[-112px]',
      )}
      style={{ transform: 'translate(-50%, -50%)' }}
    />

    <div className="z-1 relative grid gap-4">
      <h1
        className={clsx(
          'hero-title font-normal tracking-wide',
          offset
            ? 'text-center text-[48px] md:text-[64px]'
            : 'text-[32px] md:text-[48px]',
        )}
      >
        {title}
      </h1>
      {!!subtitle && (
        <span className="text-s block whitespace-nowrap font-light italic tracking-wide opacity-90 md:text-base">
          {subtitle}
        </span>
      )}
    </div>
  </div>
)

export default memo(Hero)
