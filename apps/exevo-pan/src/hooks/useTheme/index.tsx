import { useCallback } from 'react'
import { useTheme } from 'next-themes'
import Themes from 'styles/themes'
import { UseThemeValues } from './types'

export default (): UseThemeValues => {
  const { resolvedTheme, setTheme } = useTheme()

  const theme = resolvedTheme ?? 'light'

  const toggleTheme = useCallback(
    () => setTheme(theme === 'light' ? 'dark' : 'light'),
    [theme, setTheme],
  )

  const colors = Themes[theme] ?? Themes.default

  return { theme, toggleTheme, setTheme, colors }
}
