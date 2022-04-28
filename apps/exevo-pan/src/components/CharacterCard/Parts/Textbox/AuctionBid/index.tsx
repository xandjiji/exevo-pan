import { memo, useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { formatNumberWithCommas } from 'utils'
import { Icons } from '../../../atoms'
import { LabeledTextBox } from '../../atoms'
import { AuctionBidProps } from './types'

const AuctionBid = ({ hasBeenBidded, currentBid, past }: AuctionBidProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const bidLabelText = useMemo(() => {
    if (past) {
      return hasBeenBidded
        ? common.CharacterCard.bidLabelText.auctionSuccessful
        : common.CharacterCard.bidLabelText.auctionFailed
    }
    return hasBeenBidded
      ? common.CharacterCard.bidLabelText.currentBid
      : common.CharacterCard.bidLabelText.minimumBid
  }, [past, hasBeenBidded, common])

  return (
    <LabeledTextBox labelText={bidLabelText}>
      <Icons.TibiaCoin />
      {formatNumberWithCommas(currentBid)}
    </LabeledTextBox>
  )
}

export default memo(AuctionBid)
