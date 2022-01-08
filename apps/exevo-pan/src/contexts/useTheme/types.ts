export interface ThemeContextState {
  currentTheme: string
  toggleTheme: () => void
}

export interface ThemeProviderProps {
  children?: React.ReactNode
}
