import * as S from './styles'
import { SkeletonProps } from './types'

const Skeleton = ({
  animation = 'pulsate',
  ...props
}: SkeletonProps): JSX.Element => (
  <S.Skeleton animation={animation} {...props} />
)

export default Skeleton
