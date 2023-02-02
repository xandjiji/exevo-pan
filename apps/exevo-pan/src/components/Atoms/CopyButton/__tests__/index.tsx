import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import userEvent from '@testing-library/user-event'
import { copyToClipboard } from 'utils'
import CopyButton from '..'

jest.mock('utils', () => ({
  copyToClipboard: jest.fn(),
}))

const mockedCopyToClipboard = copyToClipboard as jest.MockedFunction<
  typeof copyToClipboard
>

describe.skip('<CopyButton />', () => {
  beforeEach(() => {
    mockedCopyToClipboard.mockClear()
  })

  test('it correctly changes state after clicked', () => {
    renderWithProviders(<CopyButton copyString="test string" />)

    const button = screen.getByRole('button', { name: 'Copy to clipboard' })

    userEvent.click(button)
    expect(button).toHaveAccessibleName('Copied to clipboard')
    userEvent.click(button)
    expect(button).toHaveAccessibleName('Copied to clipboard')
  })

  test('it correctly changes state after keyboard interaction', () => {
    renderWithProviders(<CopyButton copyString="test string" />)

    const button = screen.getByRole('button', { name: 'Copy to clipboard' })

    userEvent.tab()
    expect(button).toHaveFocus()
    userEvent.keyboard('{enter}')
    expect(button).toHaveAccessibleName('Copied to clipboard')
    userEvent.keyboard('{enter}')
    expect(button).toHaveAccessibleName('Copied to clipboard')
  })

  test('it correctly calls copyToClipboard with the value', () => {
    renderWithProviders(<CopyButton copyString="test string" />)

    const button = screen.getByRole('button', { name: 'Copy to clipboard' })

    userEvent.click(button)
    expect(mockedCopyToClipboard).toHaveBeenCalledTimes(1)
    expect(mockedCopyToClipboard).toHaveBeenLastCalledWith('test string')

    userEvent.click(button)
    expect(mockedCopyToClipboard).toHaveBeenCalledTimes(2)
  })
})
