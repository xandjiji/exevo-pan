import { useCallback } from 'react'
import { useTheme } from 'next-themes'
import Themes from 'styles/themes'
import { UseThemeValues } from './types'

export default (): UseThemeValues => {
  const { resolvedTheme, setTheme } = useTheme()

  const theme = resolvedTheme ?? 'light'
  const colors = Themes[theme] ?? Themes.default

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')

    document
      .querySelector('meta[name=theme-color]')
      ?.setAttribute('content', colors.primary)

    document
      .querySelector('meta[name=msapplication-navbutton-color]')
      ?.setAttribute('content', colors.primary)
  }, [theme, colors, setTheme])

  return { theme, toggleTheme, setTheme, colors }
}
