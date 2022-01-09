import * as S from './styles'

const ActiveCount = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <S.ActiveIcon {...props} />
)

export default ActiveCount
