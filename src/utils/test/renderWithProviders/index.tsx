import { ReactElement } from 'react'
import { render, RenderResult, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Themes from 'styles/themes'

export const renderWithThemeProvider = (ui: ReactElement): ReactElement => (
  <ThemeProvider theme={Themes.default}>{ui}</ThemeProvider>
)

export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions,
): RenderResult => {
  const renderResult = render(renderWithThemeProvider(ui), options)

  return {
    ...renderResult,
    rerender: (rerenderedUi): void =>
      renderResult.rerender(renderWithThemeProvider(rerenderedUi)),
  }
}
