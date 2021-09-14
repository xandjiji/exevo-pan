import { useTranslation } from 'next-i18next'
import * as S from './styles'
import { EmptyStateProps } from './types'

const EmptyState = ({
  buttonAction,
  ...props
}: EmptyStateProps): JSX.Element => {
  const { t } = useTranslation('homepage')

  return (
    <S.Wrapper {...props}>
      <S.Text>{t('CharacterGrid.noAuctionFound')}</S.Text>

      <S.NotFoundWrapper>
        <S.NotFound alt={t('CharacterGrid.notFoundAlt')} />
      </S.NotFoundWrapper>
      <S.Chip
        overrideStatus
        onClick={buttonAction}
        role="button"
        aria-checked={undefined}
      >
        {t('CharacterGrid.changeFilters')}
      </S.Chip>
    </S.Wrapper>
  )
}

export default EmptyState
