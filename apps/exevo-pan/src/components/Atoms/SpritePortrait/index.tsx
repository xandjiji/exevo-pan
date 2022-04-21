import { memo } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import { useOnImageLoad } from 'hooks'
import { BackgroundProps, SpritePortraitProps } from './types'

export const Background = ({
  className,
  offset = false,
  ...props
}: BackgroundProps) => (
  <div
    className={clsx(
      'bg-primaryVariant select-none rounded-md shadow-md transition-colors',
      offset ? 'h-14 w-14' : 'h-12 w-12',
      className,
    )}
    {...props}
  />
)

const SpritePortrait = ({
  offset = false,
  src,
  alt,
  width,
  height,
  onError,
  ...props
}: SpritePortraitProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const [loaded, onLoad] = useOnImageLoad()

  return (
    <Background className="relative p-2" offset={offset} {...props}>
      <Image
        alt={alt}
        src={src}
        layout="fixed"
        width={width}
        height={height}
        onLoad={onLoad}
        onError={onError}
        unoptimized
        className={clsx(
          'z-1 transition-opacity',
          !loaded && 'opacity-0',
          offset && '!-ml-6 !-mt-6',
        )}
      />
      {!loaded && (
        <div
          role="alert"
          aria-label={common.LoadingLabel}
          aria-busy="true"
          className={clsx('loading-spinner after:bg-primaryVariant absolute')}
          style={{ top: 'calc(50% - 12px)', left: 'calc(50% - 12px)' }}
        />
      )}
    </Background>
  )
}

export default memo(SpritePortrait)
