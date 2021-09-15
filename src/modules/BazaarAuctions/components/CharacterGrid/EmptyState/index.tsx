import { useTranslations } from 'contexts/useTranslation'
import * as S from './styles'
import { EmptyStateProps } from './types'

const EmptyState = ({
  buttonAction,
  ...props
}: EmptyStateProps): JSX.Element => {
  const {
    translations: { homepage },
  } = useTranslations()

  return (
    <S.Wrapper {...props}>
      <S.Text>{homepage.CharacterGrid.noAuctionFound}</S.Text>

      <S.NotFoundWrapper>
        <S.NotFound alt={homepage.CharacterGrid.notFoundAlt} />
      </S.NotFoundWrapper>
      <S.Chip
        overrideStatus
        onClick={buttonAction}
        role="button"
        aria-checked={undefined}
      >
        {homepage.CharacterGrid.changeFilters}
      </S.Chip>
    </S.Wrapper>
  )
}

export default EmptyState
