import { createContext, useContext, useState, useCallback } from 'react'
import Themes, { DEFAULT_THEME } from 'styles/themes'
import { localStorageKeys } from 'Constants'
import { getInitialTheme, injectCssVariables } from './utils'
import { UseThemeValues, ThemeProviderProps } from './types'

const defaultThemeState: UseThemeValues = {
  theme: DEFAULT_THEME,
  toggleTheme: () => null,
  colors: Themes.default,
}

const ThemeContext = createContext<UseThemeValues>(defaultThemeState)

export const ThemeProvider = ({
  children,
}: ThemeProviderProps): JSX.Element => {
  const [theme, setTheme] = useState<string>(getInitialTheme)

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light'

      injectCssVariables(newTheme)
      localStorage.setItem(localStorageKeys.THEME_DATA, newTheme)

      return newTheme
    })
  }, [])

  const colors = Themes[theme] ?? Themes.default

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): UseThemeValues => useContext(ThemeContext)
