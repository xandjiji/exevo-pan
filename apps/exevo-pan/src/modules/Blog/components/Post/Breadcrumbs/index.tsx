import { useTranslations } from 'contexts/useTranslation'
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
      <a href={routes.HOME} className="text-primaryHighlight">
        {blog.Meta.breadcrumbRoot}
      </a>
      <Separator />
      <a href={routes.BLOG} className="text-primaryHighlight">
        {blog.Meta.title}
      </a>
      <Separator />
      <span>{postTitle}</span>
    </div>
  )
}

export default Breadcrumbs
