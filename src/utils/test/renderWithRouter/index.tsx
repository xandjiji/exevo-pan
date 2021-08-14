import { render, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Themes from 'styles/themes'
import { routes } from 'Constants'

/* @ ToDo: remove this utils since it is not necessary anymore */
export const renderWithRouter = (
  ui: JSX.Element,
  route = routes.HOME,
): RenderResult => {
  window.history.pushState({}, 'Test page', route)

  return render(<ThemeProvider theme={Themes.default}>{ui}</ThemeProvider>)
}
