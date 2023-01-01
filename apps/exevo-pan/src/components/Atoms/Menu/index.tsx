import clsx from 'clsx'
import { useMemo, useReducer, useCallback, useId } from 'react'
import { Popover } from 'components/Atoms'
import { useEscToClose, useOnClickOutside, useLockBody } from 'hooks'
import Reducer from './reducer'
import {
  useKeyboardNavigation,
  useKeyboardSearch,
} from './useKeyboardNavigation'
import { MenuProps, ItemProps } from './types'

const Item = ({
  className,
  label,
  highlighted = false,
  icon: Icon,
  noIconPaddings = false,
  ...props
}: ItemProps) => (
  <button
    role="menuitem"
    type="button"
    className={clsx(
      'disabled:bg-separator/50 text-onSurface flex w-full items-center gap-2.5 px-4 py-2.5 text-left',
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
    <div>{label}</div>
  </button>
)

const Menu = ({
  titleElement,
  titleElementIconSpacing = true,
  items,
  children,
  ...props
}: MenuProps) => {
  const buttonId = useId()
  const dialogId = useId()
  const menuItemIdPrefix = useId()

  const [{ open, highlightedIndex }, dispatch] = useReducer(Reducer, {
    highlightedIndex: -1,
    open: false,
  })

  const closeAction = useCallback(
    () => dispatch({ type: 'SET_OPEN', open: false }),
    [],
  )

  const { elementToFocusRef, onKeyDown } = useEscToClose({
    open,
    onClose: closeAction,
  })
  useOnClickOutside(elementToFocusRef, closeAction)
  useLockBody(open)

  const handlerParams = { open, highlightedIndex, items, dispatch }
  const handleKeyboardNavigation = useKeyboardNavigation(handlerParams)
  const handleKeyboardSearch = useKeyboardSearch(handlerParams)

  const noIconPaddings = useMemo(() => !items.some(({ icon }) => icon), [items])
  const hasTitle = !!titleElement

  const menuItemId = (index: number) =>
    index === -1 ? undefined : `${menuItemIdPrefix}-${index}`

  return (
    <Popover
      offset={[0, 8]}
      placement="left-start"
      trigger="none"
      visible={open}
      content={
        <div
          ref={elementToFocusRef}
          tabIndex={0}
          role="menu"
          aria-labelledby={buttonId}
          aria-activedescendant={menuItemId(highlightedIndex)}
          className="card animate-rushIn text-tsm text-onSurface w-fit overflow-hidden rounded p-0"
          onMouseLeave={() => dispatch({ type: 'RESET_HIGHLIGHT' })}
          onKeyPress={handleKeyboardSearch}
          onKeyDown={(e) => {
            handleKeyboardNavigation(e)
            onKeyDown(e)
          }}
          {...props}
        >
          {hasTitle && (
            <div
              className={clsx(
                'border-b-separator/50 border-b-1 flex w-full items-center gap-2.5 px-4 py-2.5',
              )}
              style={{ borderBottomStyle: 'solid' }}
            >
              {titleElementIconSpacing && <div role="none" className="w-4" />}
              {titleElement}
            </div>
          )}

          <div>
            {items.map(({ onSelect, ...itemProps }, index) => (
              <Item
                key={itemProps['aria-label'] ?? itemProps.label}
                id={menuItemId(index)}
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
        </div>
      }
    >
      <button
        id={buttonId}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={open ? dialogId : undefined}
        type="button"
        onClick={() => dispatch({ type: 'SET_OPEN', open: !open })}
        onKeyDown={handleKeyboardNavigation}
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
