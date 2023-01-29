import clsx from 'clsx'
import { useState } from 'react'
import CharacterMiniCard from 'components/CharacterMiniCard'
import CharacterModal from 'components/CharacterModal'
import { vocation } from 'data-dictionary/dist/dictionaries/vocations'
import { Text } from 'components/Atoms'
import { loadOutfitSrc } from 'utils'
import { table as Table } from '../../Style/Table'
import ranking from './ranking.json'
import styles from './styles.module.css'
import { TopSpendersProps } from './types'

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
          {(ranking as CharacterObject[]).map((auction) => (
            <tr
              key={auction.id}
              onClick={() => setExpandedCharacter(auction)}
              className={clsx(styles.hoverable, 'hoverable cursor-pointer')}
            >
              <td>
                <CharacterMiniCard
                  className="transition-transform"
                  outfitSrc={loadOutfitSrc(auction.outfitId)}
                  characterData={{
                    name: auction.nickname,
                    level: auction.level,
                    vocation: vocation.getPromotedName({
                      vocationId: auction.vocationId,
                      level: auction.level,
                    }),
                    world: auction.serverData.serverName,
                  }}
                />
              </td>
              <td>
                <Text.TibiaCoin value={auction.tcInvested} />
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
          />
        )}
      </Table>
    </>
  )
}

export default TopSpenders
