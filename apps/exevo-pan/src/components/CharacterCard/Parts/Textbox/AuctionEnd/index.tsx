import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { AuctionTimer } from 'components/Atoms'
import { LabeledTextBox } from '../../styles'
import { AuctionEndProps } from './types'

const AuctionEnd = ({ auctionEnd, past }: AuctionEndProps) => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <LabeledTextBox
      style={{ gap: 'unset' }}
      labelText={common.CharacterCard.auctionEnd}
    >
      <AuctionTimer endDate={new Date(auctionEnd * 1000)} past={past} />
    </LabeledTextBox>
  )
}

export default memo(AuctionEnd)
