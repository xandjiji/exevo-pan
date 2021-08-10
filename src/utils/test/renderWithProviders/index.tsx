import { ReactElement } from 'react'
import { render, RenderResult, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Themes from 'styles/themes'
import { routes } from 'Constants'

export const wrapWithProviders = (ui: ReactElement): ReactElement => {
  window.history.pushState({}, 'Test page', routes.HOME)
  return (
    <BrowserRouter>
      <ThemeProvider theme={Themes.default}>{ui}</ThemeProvider>
    </BrowserRouter>
  )
}

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
