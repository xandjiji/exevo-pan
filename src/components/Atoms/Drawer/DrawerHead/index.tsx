import * as S from './styles'
import { DrawerHeadProps } from './types'

const DrawerHead = ({ onClose, children }: DrawerHeadProps): JSX.Element => (
  <S.DrawerHead>
    {onClose && <S.ArrowIcon onClick={onClose} />}
    <S.ContentWrapper>{children}</S.ContentWrapper>
  </S.DrawerHead>
)

export default DrawerHead
