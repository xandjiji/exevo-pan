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
    const button = {
      content: 'Change filters',
      action: mockButtonAction,
    }
    renderWithProviders(
      <EmptyState
        variant="medium"
        text="No character was found"
        button={button}
      />,
    )

    expect(screen.getByAltText('No character was found')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: button.content }),
    ).toBeInTheDocument()
  })

  test('should call buttonAction on button click', () => {
    const button = {
      content: 'Change filters',
      action: mockButtonAction,
    }
    renderWithProviders(
      <EmptyState
        variant="small"
        text="No character was found"
        button={button}
      />,
    )

    expect(mockButtonAction).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByRole('button'))
    expect(mockButtonAction).toHaveBeenCalledTimes(1)
  })
})
