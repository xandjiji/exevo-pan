export type UseThemeValues = {
  theme: string
  toggleTheme: () => void
  colors: Theme
}

export interface ThemeProviderProps {
  children: JSX.Element | JSX.Element[]
}
