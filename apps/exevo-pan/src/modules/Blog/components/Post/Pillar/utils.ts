import { debounce, scrollHorizontallyIntoView } from 'utils'

const DEBOUNCE_DELAY = 300

export const generateNavId = (title: string): string => `${title}-nav`

const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches

export const debouncedScrollIntoView = debounce((title: string) => {
  if (!isDesktop()) {
    const navElement = document.getElementById(generateNavId(title))

    if (navElement) scrollHorizontallyIntoView(navElement)
  }
}, DEBOUNCE_DELAY)
