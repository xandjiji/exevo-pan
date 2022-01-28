import { useMemo } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { routes, locales } from 'Constants'

const { BLOG } = routes
const { DEFAULT_LOCALE } = locales

type LinkProps = {
  children: string
  href: string
}

export const SlugLink = ({ children, href }: LinkProps): JSX.Element => {
  const { locale } = useRouter()

  const routedHref = useMemo(
    () => `${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${BLOG}/${href}`,
    [locale],
  )

  return (
    <a href={routedHref} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  )
}

export const RouteLink = (props: LinkProps): JSX.Element => (
  <NextLink {...props} />
)

export const ExternalLink = ({ children, href }: LinkProps): JSX.Element => (
  <a href={href} target="_blank" rel="noopener noreferrer external">
    {children}
  </a>
)
