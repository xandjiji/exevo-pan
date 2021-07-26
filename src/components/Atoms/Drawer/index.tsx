import DrawerHead from './DrawerHead'
import * as S from './styles'
import { DrawerProps } from './types'

const Drawer = ({
  isOpen,
  onClose,
  children,
  ...props
}: DrawerProps): JSX.Element => (
  <S.Wrapper isOpen={isOpen} {...props}>
    {children}
  </S.Wrapper>
)

Drawer.Head = DrawerHead

export default Drawer
