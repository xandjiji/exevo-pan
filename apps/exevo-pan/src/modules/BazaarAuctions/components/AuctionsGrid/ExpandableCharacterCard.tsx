import { useMemo, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Menu } from 'components/Organisms'
import CharacterCard from 'components/CharacterCard'
import CharacterModal from 'components/CharacterModal'
import { MoreIcon, ExpandIcon, SearchIcon } from 'assets/svgs'
import { CharacterCardProps } from 'components/CharacterCard/types'
import { permalinkResolver } from 'utils'
import { useSyncUrlState } from 'hooks'
import { urlParameters } from 'Constants'

const ExpandableCharacterCard = (props: Omit<CharacterCardProps, 'ref'>) => {
  const { characterData } = props
  const auctionId = characterData.id

  const { locale } = useRouter()

  const permalink = useMemo(
    () => permalinkResolver({ auctionId, locale }),
    [auctionId, locale],
  )

  const [isExpanded, setExpanded] = useState(false)
  const [, setAuctionIdUrl] = useSyncUrlState<number | undefined>({
    key: urlParameters.AUCTION_ID,
    defaultValue: undefined,
  })

  const expandCard = useCallback(() => {
    if (permalink) setAuctionIdUrl(auctionId)
    setExpanded(true)
  }, [auctionId, permalink])

  return (
    <>
      <CharacterCard
        cornerElement={
          <Menu
            /* @ ToDo: i18n */
            items={[
              {
                label: 'Details',
                icon: ExpandIcon,
                onSelect: expandCard,
              },
              {
                /* @ ToDo: onSelect action */
                label: 'Find similar',
                icon: SearchIcon,
              },
            ]}
          >
            <MoreIcon className="fill-onSurface" />
          </Menu>
        }
        {...props}
      />
      {isExpanded && (
        <CharacterModal
          permalink={permalink}
          characterData={characterData}
          onClose={() => {
            if (permalink) setAuctionIdUrl(undefined)
            setExpanded(false)
          }}
        />
      )}
    </>
  )
}

export default ExpandableCharacterCard
