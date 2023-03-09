import clsx from 'clsx'
import { memo } from 'react'
import Image from 'next/image'
import { HeroProps } from './types'

const Hero = ({
  title,
  subtitle,
  src,
  offset = false,
  hueRotation,
  dimension = 240,
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
      width={dimension}
      height={dimension}
      priority
      unoptimized
      className={clsx(
        'absolute-centered pointer-events-none mix-blend-overlay',
        offset && 'md:ml-[-112px]',
      )}
      style={{
        filter:
          hueRotation === undefined
            ? undefined
            : `hue-rotate(${hueRotation}deg)`,
        imageRendering: 'pixelated',
      }}
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
