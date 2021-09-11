import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import InPagePush from '..'

describe('<InPagePush />', () => {
  test('should toggle visibility correctly', () => {
    renderWithProviders(<InPagePush />)

    userEvent.click(screen.getByLabelText('Close push modal'))
    expect(screen.queryByLabelText('Close push modal')).not.toBeInTheDocument()
  })
})
