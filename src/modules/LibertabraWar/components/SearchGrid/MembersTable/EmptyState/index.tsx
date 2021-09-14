import { useTranslation } from 'next-i18next'
import * as S from './styles'

const EmptyState = (): JSX.Element => {
  const { t } = useTranslation('war')

  return (
    <S.Wrapper>
      <S.Text>{t('SearchGrid.MembersTable.EmptyState.p')}</S.Text>
      <S.NotFound alt={t('SearchGrid.MembersTable.EmptyState.alt')} />
    </S.Wrapper>
  )
}

export default EmptyState
