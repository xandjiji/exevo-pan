import NextLink from 'next/link'
import { routes } from 'Constants'
import * as S from './styles'
import { NewstickerProps } from './types'

const Newsticker = ({ blogPosts, ...props }: NewstickerProps): JSX.Element => (
  <S.Wrapper {...props}>
    {blogPosts.map(({ slug, title, tags, thumbnail }) => (
      <S.Card key={slug}>
        <S.Thumbnail>
          <S.FadeImage src={thumbnail} layout="fixed" width={48} height={48} />
        </S.Thumbnail>

        <S.Body>
          <S.Title>{title}</S.Title>

          <S.TagWrapper>
            {tags.map((tag) => (
              <S.Tag key={tag} tagId={tag} />
            ))}
          </S.TagWrapper>
        </S.Body>

        <NextLink href={`${routes.BLOG}/${slug}`}>{title}</NextLink>
      </S.Card>
    ))}
  </S.Wrapper>
)

export default Newsticker
