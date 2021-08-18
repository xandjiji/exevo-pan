import Themes from 'styles/themes'
import { localStorageKeys } from 'Constants'

export const getInitialTheme = (): string => {
  if (typeof window !== 'undefined') {
    const persistedColorPreference = window.localStorage.getItem(
      localStorageKeys.THEME_DATA,
    )
    if (persistedColorPreference && Themes[persistedColorPreference]?.title)
      return persistedColorPreference

    const browserDefault = window.matchMedia('(prefers-color-scheme: dark)')
    if (browserDefault?.matches) return 'dark-theme'
  }

  return Themes.default.title
}

export const injectCssVariables = (themeName: keyof typeof Themes): void => {
  const { colors } = Themes[themeName]
  const root = document.documentElement

  Object.keys(colors).forEach((key) => {
    root.style.setProperty(`--${key}`, colors[key as keyof typeof colors])
  })

  document
    .querySelector('meta[name=theme-color]')
    ?.setAttribute('content', colors.primary)

  document
    .querySelector('meta[name=msapplication-navbutton-color]')
    ?.setAttribute('content', colors.primary)
}
