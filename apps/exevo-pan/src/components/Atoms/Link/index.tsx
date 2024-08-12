/* eslint-disable jsx-a11y/anchor-has-content */
import { useEffect, useRef } from 'react'
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
    <a
      ref={aRef as any}
      href={href}
      aria-current={isCurrent ? 'page' : undefined}
      {...props}
    />
  )
}

export default Link
