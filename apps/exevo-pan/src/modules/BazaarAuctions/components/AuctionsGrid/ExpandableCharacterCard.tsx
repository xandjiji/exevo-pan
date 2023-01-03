import { useMemo, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import CharacterCard from 'components/CharacterCard'
import CharacterModal from 'components/CharacterModal'
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
      <CharacterCard {...props} onClick={expandCard} />
      {isExpanded && (
        <CharacterModal
          characterData={characterData}
          onClose={() => {
            if (permalink) setAuctionIdUrl(undefined)
            setExpanded(false)
          }}
          permalink={permalink}
        />
      )}
    </>
  )
}

export default ExpandableCharacterCard
