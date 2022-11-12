import NextImage from 'next/image'
import clsx from 'clsx'
import { useOnImageLoad } from 'hooks'
import { ImageProps } from './types'

const Image = ({
  id,
  className,
  align = 'left',
  caption,
  width,
  height,
  ...props
}: ImageProps) => {
  const [loaded, onLoadingComplete] = useOnImageLoad()

  return (
    <figure id={id}>
      <div
        className={clsx(
          'relative block',
          align === 'center' && 'mx-auto',
          align === 'right' && 'ml-auto',
          className,
        )}
        style={{
          maxWidth: width,
          width: '100%',
          aspectRatio: `${width} / ${height}`,
        }}
      >
        <NextImage
          {...props}
          className={clsx('transition-all', loaded ? 'shadow' : 'opacity-0')}
          onLoadingComplete={onLoadingComplete}
          unoptimized
          fill
        />
      </div>
      {caption && (
        <figcaption className="text-tsm mt-2 block text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default Image
