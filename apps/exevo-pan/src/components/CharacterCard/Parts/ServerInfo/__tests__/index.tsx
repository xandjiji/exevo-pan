import { screen } from '@testing-library/react'
import { renderWithProviders, randomDataset } from 'utils/test'
import ServerInfo from '..'

const { characterData } = randomDataset()
const characterList = characterData.slice(0, 10)

describe('<ServerInfo />', () => {
  test.each(characterList)(
    'should render all data correctly',
    ({ serverData, transfer, nickname }) => {
      renderWithProviders(
        <ServerInfo
          nickname={nickname}
          serverData={serverData}
          transfer={transfer}
        />,
      )

      const { serverName, serverLocation } = serverData

      expect(screen.getByLabelText('Server')).toBeInTheDocument()
      expect(screen.getByText(serverName)).toBeInTheDocument()
      expect(screen.getByAltText(serverLocation.string)).toBeInTheDocument()

      const transferLabel = transfer
        ? 'Regular World Transfer available'
        : 'Regular World Transfer NOT available'
      expect(screen.getByLabelText(transferLabel)).toBeInTheDocument()
    },
  )
})
