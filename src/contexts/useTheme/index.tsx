import { createContext, useContext, useState, useEffect } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import Themes from 'styles/themes'
import { ThemeContextState, ThemeProviderProps } from './types'

const defaultThemeState: ThemeContextState = {
  currentTheme: 'light-theme',
  toggleTheme: () => null,
}

const ThemeContext = createContext<ThemeContextState>(defaultThemeState)

export const ThemeProvider = ({
  children,
}: ThemeProviderProps): JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState<string>(
    () => localStorage.getItem('theme') ?? 'light-theme',
  )

  const toggleTheme = () => {
    setCurrentTheme(previousTheme => {
      const newTheme =
        previousTheme === 'light-theme' ? 'dark-theme' : 'light-theme'

      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }

  useEffect(() => {
    const { primary } = Themes[currentTheme].colors

    document
      .querySelector('meta[name=theme-color]')
      ?.setAttribute('content', primary)

    document
      .querySelector('meta[name=msapplication-navbutton-color]')
      ?.setAttribute('content', primary)
  }, [currentTheme])

  return (
    <StyledThemeProvider theme={Themes[currentTheme]}>
      <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </StyledThemeProvider>
  )
}

export const useTheme = (): ThemeContextState => useContext(ThemeContext)
