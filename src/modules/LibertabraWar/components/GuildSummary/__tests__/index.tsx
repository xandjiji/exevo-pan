import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import GuildSummary from '..'

describe('<GuildSummary />', () => {
  test('should render all data correctly', () => {
    renderWithProviders(
      <GuildSummary
        title="test title"
        guildName="Libertabra Pune"
        href="linkhref"
        displayValue="main display value"
        diffText="+38"
        label="label text"
        winning
      />,
    )

    const linkElement = screen.getByRole('link')

    expect(screen.getByTitle('test title')).toBeInTheDocument()
    expect(screen.getByRole('heading')).toHaveTextContent('Libertabra Pune')
    expect(linkElement).toHaveTextContent('Go to guild page')
    expect(linkElement).toHaveAttribute('href', 'linkhref')
    expect(screen.getByText('main display value')).toBeInTheDocument()
    expect(screen.getByText('+38')).toBeInTheDocument()
    expect(screen.getByTitle('+38 since last update')).toBeInTheDocument()
    expect(screen.getByText('label text'))
  })
})
