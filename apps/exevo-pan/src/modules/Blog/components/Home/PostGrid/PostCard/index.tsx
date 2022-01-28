import { memo, useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import NextLink from 'next/link'
import { routes } from 'Constants'
import { extractDate } from './utils'
import * as S from './styles'
import { PostCardProps } from './types'

const PostCard = ({ postData, ...props }: PostCardProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const { thumbnail, title, date, slug, description, tags } = postData
  const dateObject = useMemo(() => extractDate(date), [date])

  return (
    <S.Wrapper {...props}>
      <S.Thumbnail
        src={thumbnail}
        alt={title}
        layout="fixed"
        width={120}
        height={120}
        unoptimized
      />

      <S.Body>
        <S.Title>{title}</S.Title>
        <S.Date>
          {common.FullMonth[dateObject.month]} {dateObject.day},{' '}
          {dateObject.year}
        </S.Date>
        <S.Description>{description}</S.Description>
        <S.TagWrapper>
          {tags.map((tagId) => (
            <S.Tag key={tagId} tagId={tagId} />
          ))}
        </S.TagWrapper>
      </S.Body>
      <NextLink href={`${routes.BLOG}/${slug}`}>{title}</NextLink>
    </S.Wrapper>
  )
}

export default memo(PostCard)
