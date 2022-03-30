import { useState } from 'react'
import CharacterMiniCard from 'components/CharacterMiniCard'
import CharacterModal from 'components/CharacterCard/CharacterModal'
import { vocation } from 'shared-utils/dist/vocations'
import { formatNumberWithCommas } from 'utils'
import Table from '../../Style/Table'
import * as S from './styles'
import rankingData from './ranking.json'
import { RankingEntry } from './types'

const ranking = rankingData as RankingEntry[]

/* @ ToDo: i18n */

const Top25TCTable = (): JSX.Element => {
  const [expandedCharacter, setExpandedCharacter] = useState<
    CharacterObject | undefined
  >()

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Character</th>
            <th>Invested</th>
            <th>Sold for</th>
          </tr>
        </thead>

        <tbody>
          {ranking.map(({ invested, auction }) => (
            <S.ClickableTR onClick={() => setExpandedCharacter(auction)}>
              <td>
                <CharacterMiniCard
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
                />
              </td>
              <td>{formatNumberWithCommas(invested)} TC</td>
              <td>
                {auction.hasBeenBidded
                  ? `${formatNumberWithCommas(auction.currentBid)} TC`
                  : ''}
              </td>
            </S.ClickableTR>
          ))}
        </tbody>
        {expandedCharacter && (
          <CharacterModal
            characterData={expandedCharacter}
            onClose={() => setExpandedCharacter(undefined)}
            past
          />
        )}
      </Table>
    </>
  )
}

export default Top25TCTable
