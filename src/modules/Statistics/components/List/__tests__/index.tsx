import { screen } from '@testing-library/react'
import { formatNumberWithCommas } from 'utils'
import { renderWithProviders } from 'utils/test'
import List from '..'

import { mockData } from './mock'

describe('<List />', () => {
  test('should render all head content', () => {
    const { container } = renderWithProviders(
      <List title="Level" charactersList={mockData} displayedDataKey="level" />,
    )

    expect(screen.getByRole('heading', { name: 'Level' })).toBeInTheDocument()
    const [rankingPosition, nickname, value] =
      container.querySelectorAll('table thead tr th')

    expect(rankingPosition).toHaveAttribute('aria-label', 'Ranking position')
    expect(rankingPosition).toHaveTextContent('#')

    expect(nickname).toHaveTextContent('Nickname')

    expect(value).toHaveTextContent('Level')
  })

  test('should render every list item', () => {
    const { container } = renderWithProviders(
      <List title="Level" charactersList={mockData} displayedDataKey="level" />,
    )

    container.querySelectorAll('table tbody tr').forEach((row, index) => {
      const [rankingPosition, nicknameLink, value] = row.querySelectorAll('td')
      const currentCharacter = mockData[index]

      expect(rankingPosition).toHaveTextContent((index + 1).toString())
      expect(nicknameLink).toHaveTextContent(currentCharacter.nickname)
      expect(value).toHaveTextContent(
        currentCharacter.level as unknown as string,
      )
    })
  })

  test('should render every list item with formatted values', () => {
    const { container } = renderWithProviders(
      <List
        title="Level"
        charactersList={mockData}
        displayedDataKey="level"
        format={formatNumberWithCommas}
      />,
    )

    container.querySelectorAll('table tbody tr').forEach((row, index) => {
      const [rankingPosition, nicknameLink, value] = row.querySelectorAll('td')
      const currentCharacter = mockData[index]

      expect(rankingPosition).toHaveTextContent((index + 1).toString())
      expect(nicknameLink).toHaveTextContent(currentCharacter.nickname)
      expect(value).toHaveTextContent(
        formatNumberWithCommas(currentCharacter.level as unknown as number),
      )
    })
  })
})
