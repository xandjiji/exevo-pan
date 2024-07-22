import { memo, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { useTranslations } from 'contexts/useTranslation'
import { useOnImageLoad } from 'hooks'
import ActiveCount from '../ActiveCount'
import { BackgroundProps, SpritePortraitProps } from './types'

export const Background = ({
  className,
  offset = false,
  highlight = false,
  ...props
}: BackgroundProps) => (
  <div
    className={clsx(
      'relative select-none rounded-md p-2 shadow transition-colors',
      offset ? `h-14 w-14` : 'h-12 w-12',
      highlight ? 'bg-primaryHighlight' : 'bg-primaryVariant',
      className,
    )}
    {...props}
  />
)

const SpritePortrait = ({
  offset = false,
  highlight = false,
  counter,
  src,
  alt,
  width,
  height,
  onError,
  imgStyle,
  ...props
}: SpritePortraitProps) => {
  const ref = useRef<HTMLImageElement>(null)
  const { common } = useTranslations()

  const [loaded, onLoadingComplete] = useOnImageLoad()

  useEffect(() => {
    if (ref.current?.complete) onLoadingComplete()
  }, [])

  return (
    <Background offset={offset} highlight={highlight} {...props}>
      <img
        ref={ref}
        alt={alt}
        src={src}
        width={width}
        height={height}
        onLoad={onLoadingComplete}
        loading="lazy"
        onError={onError}
        className={clsx(
          'z-1 pixelated transition-opacity',
          offset && '!-ml-6 !-mt-6',
          !loaded && 'opacity-0',
        )}
        style={imgStyle}
      />
      {!loaded && (
        <div
          role="alert"
          aria-label={common.genericLoading}
          aria-busy="true"
          className="loading-spinner border-primary absolute"
          style={{ top: 'calc(50% - 12px)', left: 'calc(50% - 12px)' }}
        />
      )}
      {counter !== undefined && (
        <ActiveCount className="z-1 absolute -top-1.5 -right-1.5">
          {counter}
        </ActiveCount>
      )}
    </Background>
  )
}

export default memo(SpritePortrait)
