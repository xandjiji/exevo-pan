import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import userEvent from '@testing-library/user-event'
import { bossesMock } from './mock'
import BossCard from '..'

const [, valorcrest, apprentice, rotworm, zomba, masher] = bossesMock

const pinProps = {
  pinned: false,
  onPin: jest.fn(),
}

describe('<BossCard />', () => {
  beforeEach(() => {
    pinProps.onPin.mockClear()
  })

  test('should display a rare frame', () => {
    renderWithProviders(
      <BossCard premium bossStats={valorcrest} {...pinProps} />,
    )

    expect(screen.getByRole('none')).toBeInTheDocument()
  })

  test('should be clickable', () => {
    const onClickMock = jest.fn()
    renderWithProviders(
      <BossCard bossStats={valorcrest} onClick={onClickMock} {...pinProps} />,
    )

    expect(onClickMock).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByRole('heading'))
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  describe('should render all variants correctly', () => {
    test('high chance of spawning', () => {
      renderWithProviders(<BossCard bossStats={valorcrest} {...pinProps} />)

      expect(
        screen.getByRole('heading', { name: valorcrest.name }),
      ).toBeInTheDocument()

      const chanceElement = screen.getByTitle('Chance to spawn today')
      expect(chanceElement).toHaveTextContent('73.16%')
      expect(chanceElement).toHaveClass('text-greenHighlight')
    })

    test('normal chance of spawning', () => {
      renderWithProviders(<BossCard bossStats={apprentice} {...pinProps} />)

      expect(
        screen.getByRole('heading', { name: apprentice.name }),
      ).toBeInTheDocument()

      const chanceElement = screen.getByTitle('Chance to spawn today')
      expect(chanceElement).toHaveTextContent('24.70%')
      expect(chanceElement).toHaveClass('text-onSurface')
    })

    test('multiple spawn locations', () => {
      renderWithProviders(<BossCard bossStats={rotworm} {...pinProps} />)

      expect(
        screen.getByRole('heading', { name: rotworm.name }),
      ).toBeInTheDocument()

      expect(
        screen.queryByTitle('Chance to spawn today'),
      ).not.toBeInTheDocument()

      expect(screen.getAllByText('🟩')).toHaveLength(2)
      expect(screen.getAllByText('🟥')).toHaveLength(2)
    })

    test('normal chance of spawning', () => {
      renderWithProviders(<BossCard bossStats={zomba} {...pinProps} />)

      expect(
        screen.getByRole('heading', { name: zomba.name }),
      ).toBeInTheDocument()

      expect(screen.getByTitle('Chance to spawn today')).toHaveTextContent(
        'No chance',
      )

      expect(screen.getByText('1 day')).toBeInTheDocument()
    })

    test('unknown information', () => {
      renderWithProviders(<BossCard bossStats={masher} {...pinProps} />)

      expect(
        screen.getByRole('heading', { name: masher.name }),
      ).toBeInTheDocument()

      const chanceElement = screen.getByTitle('Chance to spawn today')
      expect(chanceElement).toHaveTextContent('Unknown')
      expect(chanceElement).toHaveClass('text-separator')
    })
  })
})
