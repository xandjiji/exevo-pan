import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, assertNoA11yViolations } from 'utils/test'
import Dialog from '..'

const onCloseMock = jest.fn()

describe('<Dialog />', () => {
  beforeEach(() => {
    onCloseMock.mockClear()
  })

  test('should render its contents correctly', () => {
    renderWithProviders(
      <Dialog isOpen onClose={onCloseMock}>
        <div role="none" />
      </Dialog>,
    )

    expect(screen.getByRole('none')).toBeInTheDocument()
  })

  test.todo('should handle `onClose` calls')

  test.todo('should be controlled with `isOpen` prop')

  test.todo('a11y')
})
