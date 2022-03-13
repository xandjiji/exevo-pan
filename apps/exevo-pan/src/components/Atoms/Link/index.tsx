/* eslint-disable jsx-a11y/anchor-is-valid */
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { LinkProps } from './types'

const Link = ({ href, exact = false, children }: LinkProps): JSX.Element => {
  const { pathname } = useRouter()

  const isCurrent = exact ? pathname === href : pathname.includes(href)

  return (
    <NextLink href={href}>
      <a aria-current={isCurrent ? 'page' : undefined}>{children}</a>
    </NextLink>
  )
}

export default Link
