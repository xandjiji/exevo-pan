import * as S from './styles'

const Skeleton = ({
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <S.Skeleton {...props} />
)

export default Skeleton
