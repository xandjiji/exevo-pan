import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import EmptyState from '..'

const mockButtonAction = jest.fn()

describe('<EmptyState />', () => {
  beforeEach(() => {
    mockButtonAction.mockClear()
  })

  test('should render every element correctly', () => {
    renderWithProviders(<EmptyState buttonAction={mockButtonAction} />)

    expect(screen.getByAltText('No character was found')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  test('should call buttonAction on button click', () => {
    renderWithProviders(<EmptyState buttonAction={mockButtonAction} />)

    expect(mockButtonAction).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByRole('button'))
    expect(mockButtonAction).toHaveBeenCalledTimes(1)
  })
})
