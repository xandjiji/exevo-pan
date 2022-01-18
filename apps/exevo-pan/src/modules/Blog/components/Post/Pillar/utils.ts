import { debounce } from 'utils'

const DEBOUNCE_DELAY = 300

export const generateNavId = (title: string): string => `${title}-nav`

const isDesktop = () => window.matchMedia('(min-width: 768px)').matches

export const debouncedScrollIntoView = debounce((title: string) => {
  if (!isDesktop) {
    const navElement = document.getElementById(generateNavId(title))

    navElement?.scrollIntoView({ behavior: 'smooth' })
  }
}, DEBOUNCE_DELAY)
