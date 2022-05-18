/* eslint-disable jsx-a11y/anchor-has-content */
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { LinkProps } from './types'

const Link = ({ href, exact = false, ...props }: LinkProps) => {
  const { pathname } = useRouter()

  const isCurrent = exact ? pathname === href : pathname.includes(href)

  return (
    <NextLink href={href}>
      <a aria-current={isCurrent ? 'page' : undefined} {...props} />
    </NextLink>
  )
}

export default Link
