import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import MembersTable from '..'
import { mockGuildMembers } from './mock'

describe('<MembersTable />', () => {
  test('should display empty state', () => {
    renderWithProviders(<MembersTable memberList={mockGuildMembers} />)

    userEvent.type(
      screen.getByLabelText('SearchGrid.MembersTable.searchLabel'),
      'asdasdsa',
    )
    expect(
      screen.getByAltText('SearchGrid.MembersTable.EmptyState.alt'),
    ).toBeInTheDocument()
  })

  test('should sort by level, kills and deaths (both ascending and descending)', () => {
    renderWithProviders(<MembersTable memberList={mockGuildMembers} />)

    const levelElement = screen.getByLabelText(
      'SearchGrid.MembersTable.levelSortLabel',
    )
    const killsElement = screen.getByLabelText(
      'SearchGrid.MembersTable.killsSortLabel',
    )
    const deathsElement = screen.getByLabelText(
      'SearchGrid.MembersTable.deathSortLabel',
    )

    expect(levelElement).toHaveAttribute('aria-selected', 'true')
    expect(killsElement).toHaveAttribute('aria-selected', 'false')
    expect(deathsElement).toHaveAttribute('aria-selected', 'false')

    userEvent.click(killsElement)

    screen
      .getAllByTitle('SearchGrid.MembersTable.killsTitle')
      .forEach((killCountElement, index, array) => {
        const nextKillCountElement = array[index + 1]
        if (nextKillCountElement) {
          expect(
            Number(killCountElement.textContent) >=
              Number(nextKillCountElement.textContent),
          ).toBeTruthy()
        }
      })

    userEvent.click(killsElement)

    expect(levelElement).toHaveAttribute('aria-selected', 'false')
    expect(killsElement).toHaveAttribute('aria-selected', 'true')
    expect(deathsElement).toHaveAttribute('aria-selected', 'false')

    screen
      .getAllByTitle('SearchGrid.MembersTable.killsTitle')
      .forEach((killCountElement, index, array) => {
        const nextKillCountElement = array[index + 1]
        if (nextKillCountElement) {
          expect(
            Number(killCountElement.textContent) <=
              Number(nextKillCountElement.textContent),
          ).toBeTruthy()
        }
      })

    expect(levelElement).toHaveAttribute('aria-selected', 'false')
    expect(killsElement).toHaveAttribute('aria-selected', 'true')
    expect(deathsElement).toHaveAttribute('aria-selected', 'false')

    userEvent.click(deathsElement)

    expect(levelElement).toHaveAttribute('aria-selected', 'false')
    expect(killsElement).toHaveAttribute('aria-selected', 'false')
    expect(deathsElement).toHaveAttribute('aria-selected', 'true')

    screen
      .getAllByTitle('SearchGrid.MembersTable.deathsTitle')
      .forEach((deathCountElement, index, array) => {
        const nextDeathCountElement = array[index + 1]
        if (nextDeathCountElement) {
          expect(
            Number(deathCountElement.textContent) >=
              Number(nextDeathCountElement.textContent),
          ).toBeTruthy()
        }
      })
  })

  test('should filter by vocation, nickname and guild', () => {
    const { container } = renderWithProviders(
      <MembersTable memberList={mockGuildMembers} />,
    )

    const nicknameInput = screen.getByLabelText(
      'SearchGrid.MembersTable.searchLabel',
    )
    userEvent.type(nicknameInput, 'j')

    screen.getAllByRole('link').forEach((linkElement) => {
      expect(linkElement.textContent?.toLowerCase().includes('j')).toBeTruthy()
    })

    userEvent.clear(nicknameInput)

    const [libertabraElement, bonesElement, knightElement, paladinElement] =
      screen.getAllByRole('switch')
    userEvent.click(libertabraElement)

    container.querySelectorAll('tr td:nth-child(2)').forEach((guildElement) => {
      expect(guildElement).toHaveTextContent('Libertabra Pune')
    })

    userEvent.click(bonesElement)
    expect(libertabraElement).not.toBeChecked()

    userEvent.click(knightElement)
    expect(screen.getAllByText(/Elite Knight/)).toHaveLength(10)

    userEvent.click(paladinElement)
    container.querySelectorAll('tr td a+span').forEach((charInfoElement) => {
      expect(charInfoElement).not.toHaveTextContent(/Elder Druid/)
      expect(charInfoElement).not.toHaveTextContent(/Master Sorcerer/)
    })
  })
})
