import { memo } from 'react'
import clsx from 'clsx'
import Image, { ImageProps } from 'next/image'
import { useOnImageLoad } from 'hooks'

const FadeImage = ({ className, ...props }: ImageProps) => {
  const [loaded, onLoadingComplete] = useOnImageLoad()

  return (
    <Image
      className={clsx(
        'pixelated transition-opacity',
        !loaded && 'opacity-0',
        className,
      )}
      {...props}
      onLoadingComplete={onLoadingComplete}
    />
  )
}

export default memo(FadeImage)
