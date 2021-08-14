import { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import Themes from 'styles/themes'
import { localStorageKeys } from 'Constants'
import { getThemeFromStorage } from './utils'
import { ThemeContextState, ThemeProviderProps } from './types'

const defaultThemeState: ThemeContextState = {
  currentTheme: Themes.default.title,
  toggleTheme: () => null,
}

const ThemeContext = createContext<ThemeContextState>(defaultThemeState)

export const ThemeProvider = ({
  children,
}: ThemeProviderProps): JSX.Element => {
  const [currentThemeTitle, setCurrentThemeTitle] =
    useState<string>(getThemeFromStorage)
  const currentTheme = Themes[currentThemeTitle]

  const toggleTheme = () => {
    const newThemeTitle = currentTheme.next
    setCurrentThemeTitle(newThemeTitle)
    localStorage.setItem(localStorageKeys.THEME_DATA, newThemeTitle)
  }

  useEffect(() => {
    const { primary } = currentTheme.colors

    document
      .querySelector('meta[name=theme-color]')
      ?.setAttribute('content', primary)

    document
      .querySelector('meta[name=msapplication-navbutton-color]')
      ?.setAttribute('content', primary)
  }, [currentTheme])

  return (
    <StyledThemeProvider theme={currentTheme}>
      <ThemeContext.Provider
        value={{ currentTheme: currentThemeTitle, toggleTheme }}
      >
        {children}
      </ThemeContext.Provider>
    </StyledThemeProvider>
  )
}

export const useTheme = (): ThemeContextState => useContext(ThemeContext)
