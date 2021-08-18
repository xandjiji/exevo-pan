import { ReactElement } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderResult, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Themes from 'styles/themes'

export const wrapWithProviders = (ui: ReactElement): ReactElement => (
  <ThemeProvider theme={Themes.default}>{ui}</ThemeProvider>
)

export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions,
): RenderResult => {
  const renderResult = render(wrapWithProviders(ui), options)

  return {
    ...renderResult,
    rerender: (rerenderedUi): void =>
      renderResult.rerender(wrapWithProviders(rerenderedUi)),
  }
}
