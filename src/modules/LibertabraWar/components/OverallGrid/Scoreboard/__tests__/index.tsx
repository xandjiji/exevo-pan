import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Scoreboard from '..'

describe('<Scoreboard />', () => {
  test('should render all data correctly', () => {
    renderWithProviders(
      <Scoreboard
        guildA={{
          name: 'Libertabra Pune',
          href: 'guildAhref',
          kills: 6000000,
          diff: 1234,
        }}
        guildB={{
          name: 'Bones Alliance',
          href: 'guildBhref',
          kills: -12345,
          diff: -21,
        }}
      />,
    )

    expect(screen.getByText('6,000,000')).toBeInTheDocument()
    expect(screen.getByText('-12,345')).toBeInTheDocument()
    expect(screen.getByText('+1,234')).toBeInTheDocument()
    expect(screen.getByText('-21')).toBeInTheDocument()
  })
})
