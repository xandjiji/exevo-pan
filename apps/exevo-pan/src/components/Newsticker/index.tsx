import NextLink from 'next/link'

import { routes } from 'Constants'
import * as S from './styles'
import { NewstickerProps } from './types'

const Newsticker = ({ blogPosts, ...props }: NewstickerProps): JSX.Element => (
  <S.Wrapper {...props}>
    {blogPosts.map(({ slug, title, thumbnail }) => (
      <S.Card key={slug}>
        <S.Thumbnail>
          <S.FadeImage
            src={thumbnail}
            layout="fill"
            sizes="(max-width: 767px) 24px, 32px"
          />
        </S.Thumbnail>

        <S.Title>{title}</S.Title>
        <NextLink href={`${routes.BLOG}/${slug}`}>{title}</NextLink>
      </S.Card>
    ))}
  </S.Wrapper>
)

export default Newsticker
