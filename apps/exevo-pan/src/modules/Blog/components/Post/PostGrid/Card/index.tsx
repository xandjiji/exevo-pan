import { useOnImageLoad } from 'hooks'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { routes } from 'Constants'
import * as S from './styles'
import { CardProps } from './types'

const Card = ({ post }: CardProps): JSX.Element => {
  const { thumbnail, title } = post
  const [loaded, onLoad] = useOnImageLoad()

  return (
    <S.Card key={post.slug}>
      <S.ThumbnailWrapper data-loaded={loaded}>
        <NextImage
          src={thumbnail}
          alt={title}
          layout="fixed"
          width={48}
          height={48}
          onLoad={onLoad}
        />
      </S.ThumbnailWrapper>

      <S.TextWrapper>
        <S.Title>{title}</S.Title>
      </S.TextWrapper>
      <NextLink href={`${routes.BLOG}/${post.slug}`}>{title}</NextLink>
    </S.Card>
  )
}

export default Card
