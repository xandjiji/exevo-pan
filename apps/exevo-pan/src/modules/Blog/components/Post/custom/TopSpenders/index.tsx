import clsx from 'clsx'
import { useState } from 'react'
import CharacterMiniCard from 'components/CharacterMiniCard'
import CharacterModal from 'components/CharacterCard/CharacterModal'
import { vocation } from 'shared-utils/dist/vocations'
import { Text } from 'components/Atoms'
import { table as Table } from '../../Style/Table'
import rankingData from './ranking.json'
import styles from './styles.module.css'
import { RankingEntry, TopSpendersProps } from './types'

const ranking = rankingData as RankingEntry[]

const TopSpenders = ({
  characterLabel,
  spentLabel,
  soldForLabel,
}: TopSpendersProps) => {
  const [expandedCharacter, setExpandedCharacter] = useState<
    CharacterObject | undefined
  >()

  return (
    <>
      <Table style={{ maxHeight: '100%', overflow: 'hidden' }}>
        <thead>
          <tr>
            <th>{characterLabel}</th>
            <th>{spentLabel}</th>
            <th>{soldForLabel}</th>
          </tr>
        </thead>

        <tbody>
          {ranking.map(({ invested, auction }) => (
            <tr
              key={auction.id}
              onClick={() => setExpandedCharacter(auction)}
              className={clsx(styles.hoverable, 'hoverable cursor-pointer')}
            >
              <td>
                <CharacterMiniCard
                  className="transition-transform"
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
              <td>
                <Text.TibiaCoin value={invested} />
              </td>
              <td align="center">
                {auction.hasBeenBidded ? (
                  <Text.TibiaCoin value={auction.currentBid} />
                ) : (
                  '–'
                )}
              </td>
            </tr>
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

export default TopSpenders
