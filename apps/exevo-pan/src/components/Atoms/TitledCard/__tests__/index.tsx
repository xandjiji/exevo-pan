import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import TitledCard from '..'

describe('<TitledCard />', () => {
  test('should render all variants correctly', () => {
    const { rerender } = renderWithProviders(
      <TitledCard title="Title" variant="rounded" />,
    )

    expect(screen.getByText('Title')).toBeInTheDocument()

    rerender(<TitledCard title="Title" variant="squared" />)

    expect(screen.getByText('Title')).toBeInTheDocument()
  })
})
