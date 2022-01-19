import NextLink from 'next/link'
import { routes } from 'Constants'
import * as S from './styles'
import { BreadcrumbsProps } from './types'

const Breadcrumbs = ({
  postTitle,
  ...props
}: BreadcrumbsProps): JSX.Element => (
  <S.Wrapper {...props}>
    <NextLink href={routes.HOME}>Home</NextLink>
    <S.Separator />
    <NextLink href={routes.BLOG}>Blog</NextLink>
    <S.Separator />
    <S.PostTitle>{postTitle}</S.PostTitle>
  </S.Wrapper>
)

export default Breadcrumbs
