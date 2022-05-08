/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslations } from 'contexts/useTranslation'
import NextLink from 'next/link'
import { routes } from 'Constants'
import { BreadcrumbsProps } from './types'

const Separator = () => <span className="mx-1 font-light after:content-['>']" />

const Breadcrumbs = ({ postTitle, ...props }: BreadcrumbsProps) => {
  const {
    translations: { blog },
  } = useTranslations()
  return (
    <div
      className="text-tsm max-w-min overflow-hidden text-ellipsis whitespace-nowrap"
      {...props}
    >
      <NextLink href={routes.HOME}>
        <a className="text-primaryHighlight">{blog.Meta.breadcrumbRoot}</a>
      </NextLink>
      <Separator />
      <NextLink href={routes.BLOG}>
        <a className="text-primaryHighlight">{blog.Meta.title}</a>
      </NextLink>
      <Separator />
      <span>{postTitle}</span>
    </div>
  )
}

export default Breadcrumbs
