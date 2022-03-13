import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import LastFrags from '..'
import { mockedFragsList } from './mock'

describe('<LastFrags />', () => {
  test('should render the first two pages correctly', () => {
    const { container } = renderWithProviders(
      <LastFrags fragsList={mockedFragsList} />,
    )

    expect(container.querySelectorAll('tbody tr')).toHaveLength(
      mockedFragsList.length < 40 ? mockedFragsList.length : 40,
    )
    expect(screen.getByTitle('Sorted by level')).toBeInTheDocument()
  })
})
