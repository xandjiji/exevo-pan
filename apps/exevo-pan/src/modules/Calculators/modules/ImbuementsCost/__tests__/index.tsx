import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders, setup } from 'utils/test'
import ImbuementsCost from '..'

setup.scrollIntoView()

describe('<ImbuementsCost />', () => {
  const type = (element: Element, text: string) => {
    userEvent.clear(element)
    userEvent.type(element, text)
  }

  test('should calculate the results correctly', () => {
    renderWithProviders(<ImbuementsCost />)

    type(screen.getByLabelText('Gold Token price'), '24800')
    type(screen.getByRole('textbox', { name: 'Vampire Teeth' }), '1194')
    type(screen.getByRole('textbox', { name: 'Bloody Pincers' }), '6468')
    type(screen.getByRole('textbox', { name: 'Piece of Dead Brain' }), '9885')

    expect(screen.getByTitle('298,625 gp')).toBeInTheDocument()
    expect(screen.getByText('vampirism intricate yes')).toBeInTheDocument()

    expect(
      screen.getAllByTitle('Should be bought using Gold Tokens'),
    ).toHaveLength(2)
    expect(screen.getAllByTitle('Should be bought using Market')).toHaveLength(
      1,
    )

    userEvent.tab()
    userEvent.tab()
    expect(screen.getByText('+175 gp')).toBeInTheDocument()
    expect(screen.getByText('+27,670 gp')).toBeInTheDocument()

    userEvent.type(
      screen.getByRole('textbox', { name: 'Piece of Dead Brain' }),
      '{arrowup}',
    )

    expect(screen.getByTitle('298,800 gp')).toBeInTheDocument()
    expect(screen.getByText('vampirism powerful yes')).toBeInTheDocument()

    expect(
      screen.getAllByTitle('Should be bought using Gold Tokens'),
    ).toHaveLength(3)

    userEvent.tab()
    userEvent.tab()
    expect(screen.getByText('0 gp')).toBeInTheDocument()
    expect(screen.getByText('+27,995 gp')).toBeInTheDocument()
  })

  test('should disable inputs according to the current tier', () => {
    renderWithProviders(<ImbuementsCost />)

    const inputs = [
      'Vampire Teeth',
      'Bloody Pincers',
      'Piece of Dead Brain',
    ].map((name) => screen.getByRole('textbox', { name }))

    inputs.forEach((input) => {
      expect(input).toBeEnabled()
    })

    userEvent.click(screen.getByText('Powerful (III)'))
    userEvent.keyboard('{arrowdown}')

    inputs.forEach((input, index) => {
      if (index > 1) {
        expect(input).toBeDisabled()
      } else {
        expect(input).toBeEnabled()
      }
    })

    userEvent.keyboard('{arrowdown}')

    inputs.forEach((input, index) => {
      if (index > 0) {
        expect(input).toBeDisabled()
      } else {
        expect(input).toBeEnabled()
      }
    })
  })

  test.todo(
    'navigating between different imbuements should preserve each state',
  )
})
