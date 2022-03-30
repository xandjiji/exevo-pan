import CharacterMiniCard from 'components/CharacterMiniCard'
import { vocation } from 'shared-utils/dist/vocations'
import { formatNumberWithCommas } from 'utils'
import Table from '../../Style/Table'
import ranking from './ranking.json'

/* @ ToDo: i18n */

const Top25TCTable = (): JSX.Element => {
  console.log('ranking')

  return (
    <Table>
      <thead>
        <tr>
          <th>Character</th>
          <th>Invested</th>
        </tr>
      </thead>

      <tbody>
        {ranking.map(({ invested, auction }) => (
          <tr>
            <td>
              <CharacterMiniCard
                displayLink
                outfitSrc={`https://static.tibia.com/images/charactertrade/outfits/${auction.outfitId}.gif`}
                characterData={{
                  name: auction.nickname,
                  level: auction.level,
                  vocation: vocation.getFullName(
                    auction.vocationId,
                    auction.level,
                  ),
                  world: auction.serverData.serverName,
                }}
                linkUrl={`https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=${auction.id}`}
              />
            </td>
            <td>{formatNumberWithCommas(invested)} TC</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Top25TCTable
