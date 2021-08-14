import { cloneElement } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { LinkProps } from './types'

const Link = ({ href, children }: LinkProps): JSX.Element => {
  const { pathname } = useRouter()

  return (
    <NextLink href={href}>
      {cloneElement(children, {
        'aria-current': pathname === href ? 'page' : undefined,
      })}
    </NextLink>
  )
}

export default Link
