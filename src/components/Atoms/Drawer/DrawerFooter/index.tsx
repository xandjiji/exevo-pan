import * as S from './styles'
import { DrawerFooterProps } from './types'

const DrawerFooter = ({
  children,
  ...props
}: DrawerFooterProps): JSX.Element => (
  <S.DrawerFooter {...props}>{children}</S.DrawerFooter>
)

export default DrawerFooter
