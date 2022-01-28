import NextLink from 'next/link'
import { routes } from 'Constants'
import * as S from './styles'
import { CardProps } from './types'

const Card = ({ post: { slug, thumbnail, title } }: CardProps): JSX.Element => (
  <S.Card key={slug}>
    <S.Thumbnail>
      <S.FadeImage
        src={thumbnail}
        alt={title}
        layout="fixed"
        width={32}
        height={32}
      />
    </S.Thumbnail>

    <S.TextWrapper>
      <S.Title>{title}</S.Title>
    </S.TextWrapper>
    <NextLink href={`${routes.BLOG}/${slug}`}>{title}</NextLink>
  </S.Card>
)

export default Card
