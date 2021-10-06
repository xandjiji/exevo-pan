import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'

const EmptyState = (): JSX.Element => {
  const {
    translations: { advertise },
  } = useTranslations()

  return (
    <S.Wrapper>
      <S.Text>{advertise.AuctionSearch.emptyStateText}</S.Text>
      <S.NotFound alt={advertise.AuctionSearch.emptyStateText} />
    </S.Wrapper>
  )
}

export default EmptyState
