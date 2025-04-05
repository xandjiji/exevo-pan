import { useRouter } from 'next/router'
import { locales } from 'Constants'
import { useMemo } from 'react'

export function useLocalizedHref(href: string) {
  const { locale } = useRouter()

  return useMemo(() => {
    if (!locale) return href
    if (locale === locales.DEFAULT_LOCALE) return href

    return `/${locale}${href}`
  }, [locale, href])
}
