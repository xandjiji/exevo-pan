import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import { AuctionTimer } from 'components/Atoms'
import * as S from './styles'

const AuctionEnd = ({
  auctionEnd,
}: Pick<CharacterObject, 'auctionEnd'>): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  return (
    <S.LabeledTextBox labelText={common.CharacterCard.auctionEnd}>
      <AuctionTimer endDate={new Date(auctionEnd * 1000)} />
    </S.LabeledTextBox>
  )
}

export default memo(AuctionEnd)
