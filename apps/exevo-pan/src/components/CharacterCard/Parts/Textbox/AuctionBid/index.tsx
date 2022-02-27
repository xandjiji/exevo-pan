import { memo, useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { useRouter } from 'next/router'
import { formatNumberWithCommas } from 'utils'
import { routes } from 'Constants'
import { LabeledTextBox, Icons } from '../../styles'

const AuctionBid = ({
  hasBeenBidded,
  currentBid,
}: Pick<CharacterObject, 'hasBeenBidded' | 'currentBid'>): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const { pathname } = useRouter()

  const bidLabelText = useMemo(() => {
    if (pathname === routes.BAZAAR_HISTORY) {
      return hasBeenBidded
        ? common.CharacterCard.bidLabelText.auctionSuccessful
        : common.CharacterCard.bidLabelText.auctionFailed
    }
    return hasBeenBidded
      ? common.CharacterCard.bidLabelText.currentBid
      : common.CharacterCard.bidLabelText.minimumBid
  }, [pathname, hasBeenBidded, common])

  return (
    <LabeledTextBox labelText={bidLabelText}>
      <Icons.TibiaCoin />
      {formatNumberWithCommas(currentBid)}
    </LabeledTextBox>
  )
}

export default memo(AuctionBid)
