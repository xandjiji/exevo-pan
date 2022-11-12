import { useMemo } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { routes, locales } from 'Constants'
import { a as A } from '../../Style/Link'

const { BLOG } = routes
const { DEFAULT_LOCALE } = locales

type LinkProps = {
  children: string
  href: string
}

export const SlugLink = ({ children, href }: LinkProps) => {
  const { locale } = useRouter()

  const routedHref = useMemo(
    () => `${locale === DEFAULT_LOCALE ? '' : `/${locale}`}${BLOG}/${href}`,
    [locale],
  )

  return (
    <NextLink href={href} legacyBehavior>
      <A href={routedHref} target="_blank" rel="noreferrer noopener">
        {children}
      </A>
    </NextLink>
  )
}

export const RouteLink = ({ children, href, ...props }: LinkProps) => (
  <NextLink href={href} legacyBehavior {...props}>
    <A href={href}>{children}</A>
  </NextLink>
)

export const ExternalLink = ({ children, href }: LinkProps) => (
  <A href={href} target="_blank" rel="noopener noreferrer external">
    {children}
  </A>
)
