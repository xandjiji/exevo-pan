import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import LootSplit from '..'
import { mockedSession } from './mock'

describe('<LootSplit />', () => {
  test('should summarize the hunt session correctly', () => {
    renderWithProviders(<LootSplit />)

    const textAreaElement = screen.getByLabelText(
      'Paste your party hunt session',
    )
    userEvent.clear(textAreaElement)
    userEvent.type(textAreaElement, mockedSession)

    expect(screen.getByText('Feb 11, 2019 - 17:33 (Monday)'))

    const [firstTransfer, secondTransfer] = screen.getAllByTitle('You')
    const thirdTransfer = screen.getByTitle('Me')

    expect(firstTransfer.nextSibling).toHaveTextContent('37,151')
    expect(secondTransfer.nextSibling).toHaveTextContent('55,219')
    expect(thirdTransfer.nextSibling).toHaveTextContent('61,673')

    expect(firstTransfer.nextSibling?.nextSibling).toHaveTextContent('Guaca')
    expect(secondTransfer.nextSibling?.nextSibling).toHaveTextContent('Buzz')
    expect(thirdTransfer.nextSibling?.nextSibling).toHaveTextContent('Buzz')

    expect(screen.getByText('Total waste')).toBeInTheDocument()
    expect(screen.getByTitle('-10,628 gp')).toBeInTheDocument()
  })

  test('should apply advanced options', () => {
    renderWithProviders(<LootSplit />)

    const textAreaElement = screen.getByLabelText(
      'Paste your party hunt session',
    )
    userEvent.clear(textAreaElement)
    userEvent.type(textAreaElement, mockedSession)

    userEvent.click(screen.getByRole('button', { name: 'Advanced options' }))

    userEvent.type(screen.getByLabelText('Me'), '123456')
    userEvent.type(screen.getByLabelText('You'), '5000')
    userEvent.type(screen.getByLabelText('Buzz'), '999')

    userEvent.click(screen.getByRole('button', { name: 'Done' }))

    const [firstTransfer, secondTransfer, thirdTransfer] =
      screen.getAllByTitle('You')

    expect(firstTransfer.nextSibling).toHaveTextContent('4,787')
    expect(secondTransfer.nextSibling).toHaveTextContent('29,419')
    expect(thirdTransfer.nextSibling).toHaveTextContent('85,527')

    expect(firstTransfer.nextSibling?.nextSibling).toHaveTextContent('Guaca')
    expect(secondTransfer.nextSibling?.nextSibling).toHaveTextContent('Me')
    expect(thirdTransfer.nextSibling?.nextSibling).toHaveTextContent('Buzz')

    expect(screen.getByText('Total waste')).toBeInTheDocument()
    expect(screen.getByTitle('-42,992 gp')).toBeInTheDocument()
  })

  test.todo('should save, list, display and delete previous hunt sesions')

  test.todo(
    'if the textarea content is invalid, the save button should be disabled',
  )
})
