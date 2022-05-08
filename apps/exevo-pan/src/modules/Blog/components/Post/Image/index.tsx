import NextImage from 'next/image'
import clsx from 'clsx'
import { useOnImageLoad } from 'hooks'
import { ImageProps } from './types'

const Image = ({
  id,
  className,
  align = 'left',
  caption,
  ...props
}: ImageProps) => {
  const [loaded, onLoad] = useOnImageLoad()

  return (
    <figure
      id={id}
      className={clsx(
        'block',
        align === 'center' && 'mx-auto',
        align === 'right' && 'ml-auto',
        className,
      )}
    >
      <div className={clsx('transition-shadow', loaded && 'shadow-md')}>
        <NextImage
          {...props}
          className={clsx('transition-opacity', !loaded && 'opacity-0')}
          onLoad={onLoad}
          unoptimized
        />
      </div>
      {caption && (
        <figcaption className="text-tsm block text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default Image
