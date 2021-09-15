import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'

const EmptyState = (): JSX.Element => {
  const {
    translations: { war },
  } = useTranslations()

  return (
    <S.Wrapper>
      <S.Text>{war.SearchGrid.MembersTable.EmptyState.p}</S.Text>
      <S.NotFound alt={war.SearchGrid.MembersTable.EmptyState.alt} />
    </S.Wrapper>
  )
}

export default EmptyState
