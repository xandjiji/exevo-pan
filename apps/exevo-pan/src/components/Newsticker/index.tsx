import NextLink from 'next/link'
import { useTheme } from 'contexts/useTheme'
import { routes } from 'Constants'
import * as S from './styles'
import { NewstickerProps } from './types'

const Newsticker = ({ blogPosts, ...props }: NewstickerProps): JSX.Element => {
  const { currentTheme } = useTheme()

  return (
    <S.Wrapper {...props}>
      {blogPosts.map(({ slug, title, description, thumbnail }) => (
        <S.Card key={slug} data-theme={currentTheme}>
          <S.Thumbnail src={thumbnail} width={24} height={24} />

          <S.Body>
            <S.Title>{title}</S.Title>
            <S.Description>{description}</S.Description>
          </S.Body>
          <NextLink href={`${routes.BLOG}/${slug}`}>{title}</NextLink>
        </S.Card>
      ))}
    </S.Wrapper>
  )
}

export default Newsticker
