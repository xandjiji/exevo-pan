import { Button } from 'components/Atoms'
import * as S from './styles'
import { EmptyStateProps } from './types'

const EmptyState = ({
  height,
  text,
  button,
  children,
  ...props
}: EmptyStateProps): JSX.Element => (
  <S.Wrapper {...props}>
    <S.NotFoundWrapper>
      <S.NotFound alt={text.content} height={height} />
    </S.NotFoundWrapper>

    <S.ContentWrapper>
      <S.Text size={text.size}>{text.content}</S.Text>
      {children}
      {button && (
        <Button type="button" onClick={button.action}>
          {button.content}
        </Button>
      )}
    </S.ContentWrapper>
  </S.Wrapper>
)

export default EmptyState
