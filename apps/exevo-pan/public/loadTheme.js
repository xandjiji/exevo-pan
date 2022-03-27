function getInitialTheme() {
  if (typeof window !== 'undefined') {
    const persistedColorPreference = window.localStorage.getItem('data-theme')
    if (persistedColorPreference) return persistedColorPreference

    const browserDefault = window.matchMedia('(prefers-color-scheme: dark)')
    if (browserDefault.matches) return 'dark'
  }

  return 'light'
}

function injectCssVariables(themeName) {
  const primaryColor = themeName === 'light' ? '#3F51B5' : '#9857E7'

  document.documentElement.setAttribute('data-theme', themeName)

  document
    .getElementById('address-bar-1')
    ?.setAttribute('content', primaryColor)

  document
    .getElementById('address-bar-2')
    ?.setAttribute('content', primaryColor)
}

injectCssVariables(getInitialTheme())
