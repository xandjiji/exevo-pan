import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string
    next: string

    colors: {
      background: string
      surface: string
      onSurface: string
      separator: string
      primary: string
      onPrimary: string
      darkerPrimary: string
      primaryVariant: string
      green: string
      red: string
      alert: string
      battleGreen: string
      battleYellow: string
      primaryVariantHighlight: string
    }
  }
}
