import { memo, useMemo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { formatNumberWithCommas } from 'utils'
import { Icons } from '../../../atoms'
import { LabeledTextBox } from '../../atoms'
import { AuctionBidProps } from './types'

const AuctionBid = ({
  label,
  hasBeenBidded,
  currentBid,
  past,
}: AuctionBidProps) => {
  const {
    translations: { common },
  } = useTranslations()

  const bidLabelText = useMemo(() => {
    if (label !== undefined) return label

    if (past) {
      return hasBeenBidded
        ? common.CharacterCard.bidLabelText.auctionSuccessful
        : common.CharacterCard.bidLabelText.auctionFailed
    }
    return hasBeenBidded
      ? common.CharacterCard.bidLabelText.currentBid
      : common.CharacterCard.bidLabelText.minimumBid
  }, [label, past, hasBeenBidded, common])

  return (
    <LabeledTextBox labelText={bidLabelText}>
      <Icons.TibiaCoin />
      {typeof currentBid === 'string'
        ? currentBid
        : formatNumberWithCommas(currentBid)}
    </LabeledTextBox>
  )
}

export default memo(AuctionBid)
