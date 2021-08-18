import * as S from './styles'
import { EmptyStateProps } from './types'

const EmptyState = ({
  buttonAction,
  ...props
}: EmptyStateProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.Text>Sorry, no auction was found</S.Text>

    <S.NotFoundWrapper>
      <S.NotFound />
    </S.NotFoundWrapper>
    <S.Chip
      overrideStatus
      onClick={buttonAction}
      role="button"
      aria-checked={undefined}
    >
      Change filters
    </S.Chip>
  </S.Wrapper>
)

export default EmptyState
