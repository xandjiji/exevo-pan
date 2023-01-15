import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { routes } from 'Constants'
import SuggestedReading from '..'

describe('<SuggestedReading />', () => {
  test('add tests', () => {
    renderWithProviders(
      <SuggestedReading thumbnail="thumb-src" title="post title" slug="slug" />,
    )

    const thumbElement = screen.getByRole('img')
    expect(thumbElement).toHaveAccessibleName('post title')
    expect(thumbElement).toHaveAttribute('src', 'thumb-src')

    expect(screen.getByRole('heading')).toHaveTextContent('post title')
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      `${routes.BLOG}/slug`,
    )
  })
})
