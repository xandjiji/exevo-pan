import Themes from 'styles/themes'
import { localStorageKeys } from 'Constants'

export const getThemeFromStorage = (): string => {
  if (typeof window !== 'undefined') {
    return (
      Themes[
        localStorage.getItem(localStorageKeys.THEME_DATA) ??
          Themes.default.title
      ]?.title ?? Themes.default.title
    )
  } else {
    return Themes.default.title
  }
}
