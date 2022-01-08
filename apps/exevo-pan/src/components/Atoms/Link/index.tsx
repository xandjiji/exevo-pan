import { cloneElement } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { LinkProps } from './types'

const Link = ({ href, exact = false, children }: LinkProps): JSX.Element => {
  const { pathname } = useRouter()

  const isCurrent = exact ? pathname === href : pathname.includes(href)

  return (
    <NextLink href={href}>
      {cloneElement(children, {
        'aria-current': isCurrent ? 'page' : undefined,
      })}
    </NextLink>
  )
}

export default Link
