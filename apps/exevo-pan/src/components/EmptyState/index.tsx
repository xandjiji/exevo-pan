import { Button } from 'components/Atoms'
import * as S from './styles'
import { EmptyStateProps } from './types'

const EmptyState = ({
  children,
  buttonText,
  buttonAction,
  ...props
}: EmptyStateProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.Text>{children}</S.Text>

    <S.NotFoundWrapper>
      <S.NotFound alt={children} />
    </S.NotFoundWrapper>
    {buttonAction && (
      <Button type="button" onClick={buttonAction}>
        {buttonText}
      </Button>
    )}
  </S.Wrapper>
)

export default EmptyState
