import { Drawer } from 'components/Atoms'
import * as S from './styles'
import { FilterDrawerProps } from './types'

const FilterDrawer = ({
  open,
  onClose,
  ...props
}: FilterDrawerProps): JSX.Element => {
  return (
    <Drawer isOpen={open} onClose={onClose} {...props}>
      <Drawer.Head onClose={onClose}>Filters</Drawer.Head>
      <Drawer.Body>body</Drawer.Body>
      <S.DrawerFooter />
    </Drawer>
  )
}

export default FilterDrawer
