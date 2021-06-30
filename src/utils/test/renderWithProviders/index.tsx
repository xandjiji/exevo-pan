import { render, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Themes from 'styles/themes'

export const renderWithProviders = (ui: JSX.Element): RenderResult =>
  render(<ThemeProvider theme={Themes.default}>{ui}</ThemeProvider>)
