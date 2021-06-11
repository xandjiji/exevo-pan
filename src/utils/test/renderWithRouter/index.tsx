import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

export const renderWithRouter = (ui: JSX.Element, route = '/') => {
  window.history.pushState({}, 'Test page', route)

  return render(<BrowserRouter>{ui}</BrowserRouter>)
}
