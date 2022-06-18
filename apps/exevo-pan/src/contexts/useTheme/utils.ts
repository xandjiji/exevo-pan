import Themes, { DEFAULT_THEME } from 'styles/themes'
import { isServer } from 'utils'
import { localStorageKeys } from 'Constants'

export const getInitialTheme = (): string => {
  if (!isServer()) {
    const persistedColorPreference = window.localStorage.getItem(
      localStorageKeys.THEME_DATA,
    )
    if (persistedColorPreference && Themes[persistedColorPreference])
      return persistedColorPreference

    const browserDefault = window.matchMedia('(prefers-color-scheme: dark)')
    if (browserDefault?.matches) return 'dark'
  }

  return DEFAULT_THEME
}

export const injectCssVariables = (themeName: string): void => {
  const primaryColor = themeName === 'light' ? '#3F51B5' : '#9857E7'

  document.documentElement.setAttribute('data-theme', themeName)

  document
    .getElementById('address-bar-1')
    ?.setAttribute('content', primaryColor)

  document
    .getElementById('address-bar-2')
    ?.setAttribute('content', primaryColor)
}
