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
    const text = 'No character was found'
    const buttonText = 'Change filters'
    renderWithProviders(
      <EmptyState buttonText={buttonText} buttonAction={mockButtonAction}>
        {text}
      </EmptyState>,
    )

    expect(screen.getByAltText('No character was found')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument()
  })

  test('should call buttonAction on button click', () => {
    renderWithProviders(
      <EmptyState buttonAction={mockButtonAction}>
        No character was found
      </EmptyState>,
    )

    expect(mockButtonAction).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByRole('button'))
    expect(mockButtonAction).toHaveBeenCalledTimes(1)
  })
})
