import { useTranslations } from 'contexts/useTranslation'
import NextLink from 'next/link'
import { routes } from 'Constants'
import { BreadcrumbsProps } from './types'

const Separator = () => <span className="mx-1 font-light after:content-['>']" />

const Breadcrumbs = ({ postTitle, ...props }: BreadcrumbsProps) => {
  const { blog } = useTranslations()
  return (
    <div
      className="text-tsm max-w-min overflow-hidden text-ellipsis whitespace-nowrap"
      {...props}
    >
      <NextLink
        href={routes.HOME}
        className="text-primaryHighlight"
        prefetch={false}
      >
        {blog.Meta.breadcrumbRoot}
      </NextLink>
      <Separator />
      <NextLink
        href={routes.BLOG}
        className="text-primaryHighlight"
        prefetch={false}
      >
        {blog.Meta.title}
      </NextLink>
      <Separator />
      <span>{postTitle}</span>
    </div>
  )
}

export default Breadcrumbs
