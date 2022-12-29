import clsx from 'clsx'
import { usePopper } from 'react-popper'
import { Modifier } from '@popperjs/core'

const Item = ({ className, ...props }: JSX.IntrinsicElements['div']) => (
  <div
    className={clsx('text-tsm hover:bg-primaryVariant px-4 py-2.5', className)}
    {...props}
  />
)

const Menu = () => {
  console.log(9)

  return (
    <div className="card w-fit overflow-hidden rounded p-0">
      <Item>Notify me</Item>
      <Item>Favorite</Item>
      <Item>Find similar</Item>
    </div>
  )
}

export default Menu
