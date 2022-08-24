import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import ImbuementsCost from '..'

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

  test.todo('should disable inputs according to the current tier')

  test.todo(
    'navigating between different imbuements should preserve each state',
  )
})
