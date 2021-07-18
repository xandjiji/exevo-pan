import { render, RenderResult } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Themes from 'styles/themes'

export const renderWithRouter = (
  ui: JSX.Element,
  route = '/',
): RenderResult => {
  window.history.pushState({}, 'Test page', route)

  return render(
    <BrowserRouter>
      <ThemeProvider theme={Themes.default}>{ui}</ThemeProvider>
    </BrowserRouter>,
  )
}
