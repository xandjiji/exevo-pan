/* eslint-disable jsx-a11y/anchor-has-content */
import { useRef, useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { LinkProps } from './types'

const Link = ({
  href,
  exact = false,
  scrollOnCurrent = false,
  ...props
}: LinkProps) => {
  const { pathname } = useRouter()

  const aRef = useRef<HTMLAnchorElement>(null)
  const isCurrent = exact ? pathname === href : pathname.includes(href)

  useEffect(() => {
    if (scrollOnCurrent && isCurrent) {
      aRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [scrollOnCurrent, isCurrent])

  return (
    <NextLink
      ref={aRef as any}
      href={href}
      aria-current={isCurrent ? 'page' : undefined}
      prefetch={false}
      {...props}
    />
  )
}

export default Link
