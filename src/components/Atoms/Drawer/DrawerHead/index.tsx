import * as S from './styles'
import { DrawerHeadProps } from './types'

const DrawerHead = ({ onClose, children }: DrawerHeadProps): JSX.Element => (
  <S.DrawerHead>
    {onClose && (
      <S.ArrowIcon role="button" onClick={onClose} aria-label="Close drawer" />
    )}
    <S.ContentWrapper>{children}</S.ContentWrapper>
  </S.DrawerHead>
)

export default DrawerHead
