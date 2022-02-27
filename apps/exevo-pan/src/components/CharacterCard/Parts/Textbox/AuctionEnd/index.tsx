import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { LabeledTextBox } from '../../styles'
import * as S from './styles'

const AuctionEnd = ({
  auctionEnd,
}: Pick<CharacterObject, 'auctionEnd'>): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <LabeledTextBox labelText={common.CharacterCard.auctionEnd}>
      <S.AuctionTimer endDate={new Date(auctionEnd * 1000)} />
    </LabeledTextBox>
  )
}

export default memo(AuctionEnd)
