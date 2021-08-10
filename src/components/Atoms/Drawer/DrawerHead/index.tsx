import * as S from './styles'
import { DrawerHeadProps } from './types'

const DrawerHead = ({
  onClose,
  children,
  ...props
}: DrawerHeadProps): JSX.Element => (
  <S.DrawerHead {...props}>
    {onClose && (
      <S.BackButton tabIndex={0} aria-label="Close drawer" onClick={onClose}>
        <S.ArrowIcon />
      </S.BackButton>
    )}
    <S.ContentWrapper>{children}</S.ContentWrapper>
  </S.DrawerHead>
)

export default DrawerHead
