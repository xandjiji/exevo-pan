import { useState, useCallback } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { useSyncUrlState } from 'hooks'
import { LoadingAlert } from 'components/Atoms'
import CharacterModal from 'components/CharacterModal'
import { trpc } from 'lib/trpc'
import { urlParameters } from 'Constants'

type UrlAuctionProps = {
  highlightedAuctions?: CharacterObject[]
}

const UrlAuction = ({ highlightedAuctions = [] }: UrlAuctionProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const [auctionId, setAuctionId] = useSyncUrlState<number | undefined>({
    defaultValue: undefined,
    key: urlParameters.AUCTION_ID,
    decode: Number,
  })

  const [auction, setAuction] = useState<CharacterObject | undefined>()

  const onClose = useCallback(() => {
    setAuction(undefined)
    setAuctionId(undefined)
  }, [setAuctionId])

  const { isFetching } = trpc.getAuctionById.useQuery(
    { id: auctionId ?? 0 },
    {
      refetchOnWindowFocus: false,
      enabled: !!auctionId,
      onSuccess: (characterData) => {
        if (characterData) {
          const foundHighlightedData = highlightedAuctions.find(
            ({ id }) => id === characterData.id,
          )
          setAuction(
            foundHighlightedData
              ? {
                  ...characterData,
                  tcInvested: foundHighlightedData.tcInvested,
                }
              : characterData,
          )
        } else {
          setAuction(undefined)
        }
      },
    },
  )

  return (
    <>
      {isFetching && <LoadingAlert>{common.LoadingState}</LoadingAlert>}
      {auction && <CharacterModal characterData={auction} onClose={onClose} />}
    </>
  )
}

export default UrlAuction
