/* eslint-disable jsx-a11y/alt-text */
import { memo, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { useOnImageLoad } from 'hooks'

const FadeImage = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'img'>) => {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, onLoadingComplete] = useOnImageLoad()

  useEffect(() => {
    if (ref.current?.complete) onLoadingComplete()
  }, [])

  return (
    <img
      ref={ref}
      className={clsx(
        'pixelated transition-opacity',
        !loaded && 'opacity-0',
        className,
      )}
      {...props}
      onLoad={onLoadingComplete}
    />
  )
}

export default memo(FadeImage)
