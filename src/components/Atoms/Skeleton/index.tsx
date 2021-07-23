import * as S from './styles'
import { SkeletonProps } from './types'

const Skeleton = ({ animation, ...props }: SkeletonProps): JSX.Element => (
  <S.Skeleton animation={animation} {...props} />
)

export default Skeleton
