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
    userEvent.click(screen.getAllByLabelText('Remove player')[3])

    expect(screen.getByLabelText('Guaca')).toBeDisabled()

    userEvent.click(screen.getByRole('button', { name: 'Done' }))

    const [firstTransfer, secondTransfer] = screen.getAllByTitle('You')

    expect(firstTransfer.nextSibling).toHaveTextContent('31,015')
    expect(secondTransfer.nextSibling).toHaveTextContent('87,123')

    expect(firstTransfer.nextSibling?.nextSibling).toHaveTextContent('Me')
    expect(secondTransfer.nextSibling?.nextSibling).toHaveTextContent('Buzz')

    expect(screen.getByText('Total waste')).toBeInTheDocument()
    expect(screen.getByTitle('-41,396 gp')).toBeInTheDocument()
  })

  test('should save, list, display and delete previous hunt sesions', () => {
    renderWithProviders(<LootSplit />)

    expect(screen.getByRole('tab', { name: 'History (0)' })).toBeInTheDocument()

    const saveButtonElement = screen.getByRole('button', { name: 'Save' })
    userEvent.click(saveButtonElement)

    expect(screen.getByRole('tab', { name: 'History (1)' })).toBeInTheDocument()

    const textAreaElement = screen.getByLabelText(
      'Paste your party hunt session',
    )
    userEvent.clear(textAreaElement)
    userEvent.type(textAreaElement, mockedSession)

    userEvent.click(screen.getByRole('button', { name: 'Advanced options' }))
    userEvent.type(screen.getByLabelText('You'), '123456')
    userEvent.click(screen.getByRole('button', { name: 'Done' }))

    userEvent.click(saveButtonElement)

    userEvent.click(screen.getByRole('tab', { name: 'History (2)' }))

    const historyEntries = {
      first: screen.getByRole('button', {
        name: /11:21/,
      }),
      second: screen.getByRole('button', {
        name: 'Feb 11, 2019 - 17:33 (Monday)',
      }),
    }

    expect(historyEntries.first.nextSibling).toBe(historyEntries.second)

    userEvent.click(historyEntries.first)

    expect(screen.getAllByText(/11:21/)).toHaveLength(2)
    expect(screen.getAllByTitle("Lord'Paulistinha")).toHaveLength(2)
    expect(screen.getByTitle('Mateusz Dragon Wielki')).toBeInTheDocument()
    expect(screen.getByTitle('Cachero')).toBeInTheDocument()
    expect(screen.getAllByTitle('Lightbringer')).toHaveLength(2)
    expect(screen.getByText('141,892')).toBeInTheDocument()
    expect(screen.getByText('94,781')).toBeInTheDocument()
    expect(screen.getByText('67,370')).toBeInTheDocument()
    expect(screen.getByTitle('14,372 gp'))

    userEvent.click(historyEntries.second)

    expect(screen.getAllByText('Feb 11, 2019 - 17:33 (Monday)')).toHaveLength(2)
    expect(screen.getAllByTitle('Me')).toHaveLength(3)
    expect(screen.getByTitle('You')).toBeInTheDocument()
    expect(screen.getByTitle('Buzz')).toBeInTheDocument()
    expect(screen.getByTitle('Guaca')).toBeInTheDocument()
    expect(screen.getByText('222')).toBeInTheDocument()
    expect(screen.getByText('6,287')).toBeInTheDocument()
    expect(screen.getByText('86,028')).toBeInTheDocument()
    expect(screen.getByTitle('-41,492 gp'))

    userEvent.click(screen.getByRole('button', { name: 'Data' }))

    const originalDataTextArea = screen.getByRole('textbox', {
      name: 'Original hunt session',
    })
    expect(originalDataTextArea).toHaveDisplayValue(mockedSession)
    expect(originalDataTextArea).toBeDisabled()
    expect(screen.getByText('Extra expenses')).toBeInTheDocument()
    expect(screen.getByText('You:')).toBeInTheDocument()
    expect(screen.getByTitle('123,456 gp')).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: 'Done' }))

    userEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(screen.getAllByText(/11:21/)).toHaveLength(2)
    expect(screen.getAllByTitle("Lord'Paulistinha")).toHaveLength(2)
    expect(screen.getByTitle('Mateusz Dragon Wielki')).toBeInTheDocument()
    expect(screen.getByTitle('Cachero')).toBeInTheDocument()
    expect(screen.getAllByTitle('Lightbringer')).toHaveLength(2)
    expect(screen.getByText('141,892')).toBeInTheDocument()
    expect(screen.getByText('94,781')).toBeInTheDocument()
    expect(screen.getByText('67,370')).toBeInTheDocument()
    expect(screen.getByTitle('14,372 gp'))

    expect(screen.getByRole('tab', { name: 'History (1)' })).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: 'Delete' }))

    expect(screen.getByRole('tab', { name: 'History (0)' })).toBeInTheDocument()
    expect(screen.getByText('No session')).toBeInTheDocument()
  })

  test('if the textarea content is invalid, the save button should be disabled', () => {
    renderWithProviders(<LootSplit />)

    const textAreaElement = screen.getByLabelText(
      'Paste your party hunt session',
    )
    userEvent.clear(textAreaElement)
    userEvent.type(textAreaElement, 'asd')

    expect(textAreaElement).toBeInvalid()
    expect(
      screen.getByRole('button', { name: 'Advanced options' }),
    ).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
  })
})
