import clsx from 'clsx'
import { Menu } from 'components/Organisms'
import { Chip } from 'components/Atoms'
import { NewIcon, PapyrusIcon, StarIcon } from 'assets/svgs'
import { useAuctions } from '../../../contexts/useAuctions'

const FilterControl = ({
  className,
  ...props
}: JSX.IntrinsicElements['section']) => {
  const { activeFilterCount } = useAuctions()

  return (
    <section
      className={clsx(className, 'flex flex-wrap items-center gap-2')}
      {...props}
    >
      <div className={clsx(activeFilterCount > 0 && 'mr-1 mb-1')}>
        <Menu
          offset={[0, 8]}
          placement="bottom-start"
          items={[
            {
              label: 'Current auctions',
              icon: NewIcon,
            },
            {
              label: 'Auction history',
              icon: PapyrusIcon,
            },
            {
              label: 'Favorites',
              icon: StarIcon,
            },
          ]}
          variant="button"
        >
          Current auctions
        </Menu>
      </div>

      {/* <Chip onClose={() => {}}>Ferobra</Chip>
      <Chip onClose={() => {}}>Knight</Chip>
      <Chip onClose={() => {}}>Min level 450</Chip>
      <Chip onClose={() => {}}>Ferobra</Chip>
      <Chip onClose={() => {}}>Knight</Chip>
      <Chip onClose={() => {}}>Min level 450</Chip>
      <Chip onClose={() => {}}>Ferobra</Chip>
      <Chip onClose={() => {}}>Knight</Chip>
      <Chip onClose={() => {}}>Min level 450</Chip>
      <Chip onClose={() => {}}>Ferobra</Chip>
      <Chip onClose={() => {}}>Knight</Chip>
      <Chip onClose={() => {}}>Min level 450</Chip>
      <Chip onClose={() => {}}>Ferobra</Chip>
      <Chip onClose={() => {}}>Knight</Chip>
      <Chip onClose={() => {}}>Min level 450</Chip>
      <Chip onClose={() => {}}>Ferobra</Chip>
      <Chip onClose={() => {}}>Knight</Chip>
      <Chip onClose={() => {}}>Min level 450</Chip> */}
    </section>
  )
}

export default FilterControl
