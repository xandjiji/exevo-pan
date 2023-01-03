import { useState, useCallback, useEffect } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { useSyncUrlState } from 'hooks'
import { LoadingAlert } from 'components/Atoms'
import CharacterModal from 'components/CharacterModal'
import { AuctionsClient } from 'services/client'
import { urlParameters } from 'Constants'

const UrlAuction = () => {
  const {
    translations: { common },
  } = useTranslations()

  const [auctionId, setAuctionId] = useSyncUrlState<number | undefined>({
    defaultValue: undefined,
    key: urlParameters.AUCTION_ID,
    decode: Number,
  })

  const [auction, setAuction] = useState<CharacterObject | undefined>()
  const [loading, setLoading] = useState(false)

  const onClose = useCallback(() => {
    setAuction(undefined)
    setAuctionId(undefined)
  }, [setAuctionId])

  useEffect(() => {
    if (auctionId) {
      setLoading(true)
      AuctionsClient.fetchAuctionById({ id: auctionId })
        .then((urlAuction) => setAuction(urlAuction))
        .finally(() => setLoading(false))
    }
  }, [])

  return (
    <>
      {loading && <LoadingAlert>{common.LoadingState}</LoadingAlert>}
      {auction && <CharacterModal characterData={auction} onClose={onClose} />}
    </>
  )
}

export default UrlAuction
