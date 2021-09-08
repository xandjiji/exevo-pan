import * as S from './styles'

const MagicButton = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>): JSX.Element => (
  <S.Pushable {...props}>
    <S.Shadow />
    <S.Edge />
    <S.Front>{children}</S.Front>
  </S.Pushable>
)

export default MagicButton
