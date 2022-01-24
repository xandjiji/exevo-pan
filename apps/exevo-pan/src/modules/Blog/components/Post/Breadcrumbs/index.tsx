import { useTranslations } from 'contexts/useTranslation'
import NextLink from 'next/link'
import { routes } from 'Constants'
import * as S from './styles'
import { BreadcrumbsProps } from './types'

const Breadcrumbs = ({
  postTitle,
  ...props
}: BreadcrumbsProps): JSX.Element => {
  const {
    translations: { blog },
  } = useTranslations()
  return (
    <S.Wrapper {...props}>
      <NextLink href={routes.HOME}>{blog.Meta.breadcrumbRoot}</NextLink>
      <S.Separator />
      <NextLink href={routes.BLOG}>{blog.Meta.title}</NextLink>
      <S.Separator />
      <S.PostTitle>{postTitle}</S.PostTitle>
    </S.Wrapper>
  )
}

export default Breadcrumbs
