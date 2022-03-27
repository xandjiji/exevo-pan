export type UseThemeValues = {
  theme: string
  toggleTheme: () => void
  colors: Theme
}

export interface ThemeProviderProps {
  children: React.ReactNode
}
