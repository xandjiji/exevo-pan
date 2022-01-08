import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import ScoreboardXP from '..'

describe('<ScoreboardXP />', () => {
  test('should render all data correctly', () => {
    renderWithProviders(
      <ScoreboardXP
        guildA={{
          href: 'guildAhref',
          name: 'Libertabra Pune',
          todayDiff: 6000000,
        }}
        guildB={{
          href: 'guildBhref',
          name: 'Bones Alliance',
          todayDiff: -123,
        }}
      />,
    )

    expect(screen.getByText('+6,000,000')).toBeInTheDocument()
    expect(screen.getByText('-123')).toBeInTheDocument()
  })
})
