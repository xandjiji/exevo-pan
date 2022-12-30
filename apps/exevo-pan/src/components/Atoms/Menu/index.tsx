import clsx from 'clsx'
import { useMemo } from 'react'
import { usePopper } from 'react-popper'
import { Modifier } from '@popperjs/core'
import { AccountIcon, AddPostIcon, CheckIcon } from 'assets/svgs'
import { MenuProps, ItemProps, Item } from './types'

const Item = ({
  className,
  content,
  highlighted = false,
  icon: Icon,
  noIconPaddings = false,
  ...props
}: ItemProps) => (
  <button
    type="button"
    className={clsx(
      'text-tsm text-onSurface disabled:bg-separator/50 flex w-full items-center gap-2.5 px-4 py-2.5 text-left first:rounded-t last:rounded-b',
      highlighted && 'bg-primaryVariant',
      className,
    )}
    {...props}
  >
    {!noIconPaddings && (
      <div className="h-4 w-4">
        {!!Icon && (
          <Icon
            className={clsx(
              'h-full w-full',
              props.disabled
                ? 'fill-onSurface opacity-50'
                : highlighted
                ? 'fill-onSurface'
                : 'fill-primaryHighlight',
            )}
          />
        )}
      </div>
    )}
    <div>{content}</div>
  </button>
)

const items: Item[] = [
  {
    icon: CheckIcon,
    content: 'Accept',
  },
  {
    content: 'Find similar',
  },
  {
    icon: AccountIcon,
    content: 'Account',
  },
  {
    icon: AddPostIcon,
    content: 'Add',
    disabled: true,
  },
  {
    content: 'Close',
  },
  {
    content: <div>Element</div>,
  },
]

/* @ ToDo:

- highlight styling
- highlight reducer
- item click action
- a11y label (se content for um elemento, obrigatorio ter label)
- typing autoselect?
- title element?

- renderizar popover (outro componente)
- isOpen/onClose
- focus trap
- esc/tab close
- a11y
- a11y igual headless ui

*/

const Menu = () => {
  const noIconPaddings = useMemo(() => !items.some(({ icon }) => icon), [items])

  return (
    <div className="card w-fit rounded p-0">
      {items.map((props, index) => (
        <Item
          key={props.content?.toString()}
          highlighted={index === 0}
          onClick={() => console.log(props.content?.toString())}
          noIconPaddings={noIconPaddings}
          {...props}
        />
      ))}
    </div>
  )
}

export default Menu
