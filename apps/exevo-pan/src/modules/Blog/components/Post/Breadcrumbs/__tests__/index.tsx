import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { routes } from 'Constants'
import Breadcrumbs from '..'

describe('<Breadcrumbs />', () => {
  test('should render all breadcrumbs correctly', () => {
    renderWithProviders(<Breadcrumbs postTitle="This is the post title" />)

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      routes.HOME,
    )

    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute(
      'href',
      routes.BLOG,
    )

    expect(screen.getByText('This is the post title')).toBeInTheDocument()
  })
})
