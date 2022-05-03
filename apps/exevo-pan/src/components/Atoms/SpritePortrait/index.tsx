import { memo } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import { useOnImageLoad } from 'hooks'
import styles from './styles.module.css'
import { BackgroundProps, SpritePortraitProps } from './types'

export const Background = ({
  className,
  offset = false,
  highlight = false,
  ...props
}: BackgroundProps) => (
  <div
    className={clsx(
      'relative select-none rounded-md p-2 shadow-md transition-colors',
      offset ? `${styles.offsetImage} h-14 w-14` : 'h-12 w-12',
      highlight ? 'bg-primaryHighlight' : 'bg-primaryVariant',
      className,
    )}
    {...props}
  />
)

const SpritePortrait = ({
  offset = false,
  highlight = false,
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
    <Background offset={offset} highlight={highlight} {...props}>
      <Image
        alt={alt}
        src={src}
        layout="fixed"
        width={width}
        height={height}
        onLoad={onLoad}
        onError={onError}
        unoptimized
        className={clsx('z-1 transition-opacity', !loaded && 'opacity-0')}
      />
      {!loaded && (
        <div
          role="alert"
          aria-label={common.LoadingLabel}
          aria-busy="true"
          className={clsx(
            'loading-spinner absolute',
            highlight ? 'after:bg-primaryHighlight' : 'after:bg-primaryVariant',
          )}
          style={{ top: 'calc(50% - 12px)', left: 'calc(50% - 12px)' }}
        />
      )}
    </Background>
  )
}

export default memo(SpritePortrait)
