import { useState, useCallback, useEffect } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { useSyncUrlState } from 'hooks'
import { LoadingAlert } from 'components/Atoms'
import CharacterModal from 'components/CharacterCard/CharacterModal'
import { AuctionsClient } from 'services'
import { UrlAuctionProps } from './types'

const UrlAuction = ({ endpoint }: UrlAuctionProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const [auctionId, setAuctionId] = useSyncUrlState<number | undefined>({
    defaultValue: undefined,
    key: 'auctionId',
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
      AuctionsClient.fetchAuctionById({ auctionId, endpoint })
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
