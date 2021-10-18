import { useTranslations } from 'contexts/useTranslation'
import { Button } from 'components/Atoms'
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
      <Button type="button" onClick={buttonAction}>
        {homepage.CharacterGrid.changeFilters}
      </Button>
    </S.Wrapper>
  )
}

export default EmptyState
