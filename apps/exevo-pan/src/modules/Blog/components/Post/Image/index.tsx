import NextImage from 'next/image'
import { useOnImageLoad } from 'hooks'
import * as S from './styles'
import { ImageProps } from './types'

const Image = ({
  id,
  className,
  align = 'left',
  caption,
  ...props
}: ImageProps): JSX.Element => {
  const [loaded, onLoad] = useOnImageLoad()

  return (
    <S.Figure
      id={id}
      className={className}
      data-align={align}
      data-loaded={loaded}
    >
      <NextImage {...props} onLoad={onLoad} />
      {caption && <S.Caption>{caption}</S.Caption>}
    </S.Figure>
  )
}

export default Image
