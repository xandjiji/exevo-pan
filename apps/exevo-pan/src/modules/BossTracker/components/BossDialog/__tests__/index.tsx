import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { bossInfo } from '../../../bossInfo'
import BossDialog from '..'

const BOSS = {
  name: 'Zulazza the Corruptor',
  ...bossInfo.get('Zulazza the Corruptor'),
}

describe('<BossDialog />', () => {
  test('should render everything correctly', () => {
    renderWithProviders(<BossDialog onClose={jest.fn()} bossName={BOSS.name} />)

    expect(screen.getByRole('heading', { name: BOSS.name })).toBeInTheDocument()

    BOSS.loot?.forEach((loot) => {
      expect(screen.getByAltText(loot)).toBeInTheDocument()
    })

    BOSS.raidMessages?.forEach(({ time, message, style }) => {
      expect(screen.getByText(time, { exact: false })).toBeInTheDocument()

      if (style !== 'UNANNOUNCED') {
        const msgElement = screen.getByText(message)
        expect(msgElement).toBeInTheDocument()
        if (style === 'HIGHLIGHT') {
          expect(msgElement).toHaveClass('text-primaryHighlight')
        }
      }
    })

    const unannouncedMessages =
      BOSS.raidMessages?.filter(({ style }) => style === 'UNANNOUNCED') ?? []

    const unannouncedElements = screen.getAllByText('(unannounced raid)')
    expect(unannouncedElements).toHaveLength(unannouncedMessages.length)
    unannouncedElements.forEach((element) =>
      expect(element).toHaveClass('text-separator'),
    )
  })

  test.todo('should toggle open/close actions')
})
