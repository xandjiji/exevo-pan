import clsx from 'clsx'
import { useMemo, useReducer, useCallback } from 'react'
import { Popover } from 'components/Atoms'
import { useEscToClose, useOnClickOutside, useLockBody } from 'hooks'
import Reducer from './reducer'
import { useKeyboardNavigation } from './useKeyboardNavigation'
import { MenuProps, ItemProps } from './types'

/* @ ToDo:

- a11y label (se content for um elemento, obrigatorio ter label)
- typing autoselect?
- title element?

- a11y
- a11y igual headless ui

*/

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
                : 'fill-primaryHighlight',
            )}
          />
        )}
      </div>
    )}
    <div>{content}</div>
  </button>
)

const Menu = ({ items, children, ...props }: MenuProps) => {
  const [{ open, highlightedIndex }, dispatch] = useReducer(Reducer, {
    highlightedIndex: -1,
    open: false,
  })

  const closeAction = useCallback(
    () => dispatch({ type: 'SET_OPEN', open: false }),
    [],
  )

  const noIconPaddings = useMemo(() => !items.some(({ icon }) => icon), [items])

  const { elementToFocusRef, onKeyDown } = useEscToClose({
    open,
    onClose: closeAction,
  })
  useOnClickOutside(elementToFocusRef, closeAction)
  useLockBody(open)

  const handleKeyboardNavigation = useKeyboardNavigation({
    open,
    highlightedIndex,
    items,
    dispatch,
  })

  return (
    <Popover
      offset={[0, 8]}
      placement="left-start"
      trigger="none"
      visible={open}
      content={
        <div
          role="menu"
          tabIndex={0}
          ref={elementToFocusRef}
          className="card animate-rushIn w-fit rounded p-0"
          onMouseLeave={() => dispatch({ type: 'RESET_HIGHLIGHT' })}
          onKeyDown={(e) => {
            handleKeyboardNavigation(e)
            onKeyDown(e)
          }}
          {...props}
        >
          {items.map(({ onSelect, ...itemProps }, index) => (
            <Item
              key={itemProps.content?.toString()}
              tabIndex={-1}
              highlighted={index === highlightedIndex}
              onMouseMove={() =>
                dispatch({ type: 'SET_HIGHLIGHTED_INDEX', index })
              }
              onClick={() => {
                onSelect?.()
                closeAction()
              }}
              noIconPaddings={noIconPaddings}
              {...itemProps}
            />
          ))}
        </div>
      }
    >
      <button
        type="button"
        onClick={() => dispatch({ type: 'SET_OPEN', open: !open })}
        className={clsx(
          'clickable grid cursor-pointer place-items-center rounded p-0.5',
          open && 'shadow-inner hover:shadow-inner',
        )}
      >
        {children}
      </button>
    </Popover>
  )
}

export default Menu
