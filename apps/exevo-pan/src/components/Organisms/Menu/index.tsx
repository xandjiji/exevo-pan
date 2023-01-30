import clsx from 'clsx'
import { useMemo, useReducer, useCallback, useId } from 'react'
import { Popover } from 'components/Atoms'
import { ChevronDownIcon } from 'assets/svgs'
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
      'disabled:bg-separator/25 text-onSurface flex w-full items-center gap-2.5 px-4 py-2.5 text-left',
      highlighted && 'bg-primaryVariant',
      props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
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
  placement = 'bottom-end',
  offset = [-8, 8],
  variant = 'icon',
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
      offset={offset}
      placement={placement}
      trigger="none"
      visible={open}
      content={
        <div
          ref={elementToFocusRef}
          tabIndex={0}
          role="menu"
          aria-labelledby={buttonId}
          aria-activedescendant={menuItemId(highlightedIndex)}
          className="card border-1 border-separator/50 animate-rushIn text-tsm text-onSurface w-fit rounded border-solid px-0 py-0.5 shadow-lg"
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
            {items.map(
              ({ onSelect, keepOpenAfterSelection, ...itemProps }, index) => (
                <Item
                  key={itemProps['aria-label'] ?? itemProps.label}
                  id={menuItemId(index)}
                  tabIndex={-1}
                  highlighted={index === highlightedIndex}
                  onPointerMove={() =>
                    dispatch({ type: 'SET_HIGHLIGHTED_INDEX', index })
                  }
                  onClick={() => {
                    onSelect?.()
                    if (!keepOpenAfterSelection) closeAction()
                  }}
                  noIconPaddings={noIconPaddings}
                  {...itemProps}
                />
              ),
            )}
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
          open && 'pointer-events-none',
          variant === 'icon' &&
            'clickable relative grid cursor-pointer place-items-center rounded p-0.5',
          variant === 'icon' && open && 'shadow-inner hover:shadow-inner',
          variant === 'button' &&
            'clickable bg-primary text-s text-onPrimary relative flex cursor-pointer items-center gap-1.5 rounded-md py-1.5 px-3 font-bold shadow-md',
        )}
      >
        {children}
        {variant === 'button' && (
          <ChevronDownIcon className="fill-onPrimary -mr-1.5" />
        )}
      </button>
    </Popover>
  )
}

export default Menu
