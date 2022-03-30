import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { AuctionTimer } from 'components/Atoms'
import * as S from './styles'
import { AuctionEndProps } from './types'

const AuctionEnd = ({ auctionEnd, past }: AuctionEndProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <S.LabeledTextBox labelText={common.CharacterCard.auctionEnd}>
      <AuctionTimer endDate={new Date(auctionEnd * 1000)} past={past} />
    </S.LabeledTextBox>
  )
}

export default memo(AuctionEnd)
