import { memo } from 'react'
import clsx from 'clsx'
import Image, { ImageProps } from 'next/image'
import { useOnImageLoad } from 'hooks'

const FadeImage = ({ className, id, ...props }: ImageProps) => {
  const [loaded, onLoad] = useOnImageLoad()

  return (
    <Image
      className={clsx('transition-opacity', !loaded && 'opacity-0', className)}
      id={id}
      {...props}
      onLoad={onLoad}
    />
  )
}

export default memo(FadeImage)
