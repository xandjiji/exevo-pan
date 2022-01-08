import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import ComparisonChart from '..'
import { mockDataGuildA, mockDataGuildB } from './mock'

describe('<ComparisonChart />', () => {
  test('should render all data correctly', () => {
    renderWithProviders(
      <ComparisonChart
        title="chart description"
        tooltipSuffix="test suffix"
        dateLabelType="Time"
        guildA={{
          name: 'Libertabra Pune',
          summaryValue: 'summary string',
          dataArray: mockDataGuildA,
        }}
        guildB={{
          name: 'Bones Alliance',
          summaryValue: 'summary string',
          dataArray: mockDataGuildB,
        }}
      />,
    )

    expect(screen.getByTitle('chart description')).toBeInTheDocument()
    expect(screen.getByText('Libertabra Pune')).toBeInTheDocument()
    expect(screen.getByText('Bones Alliance')).toBeInTheDocument()
    expect(screen.getAllByText('summary string')).toHaveLength(2)
  })
})
