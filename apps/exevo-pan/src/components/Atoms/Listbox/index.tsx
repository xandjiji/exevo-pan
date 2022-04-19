import {
  forwardRef,
  Ref,
  useMemo,
  Children,
  isValidElement,
  cloneElement,
  memo,
} from 'react'
import clsx from 'clsx'
import { ListboxProps } from './types'
import { indexToId } from './utils'

const Listbox = (
  {
    className,
    children,
    highlightedIndex,
    selectedIndex = new Set<number>([]),
    onSelectOption,
    ...props
  }: ListboxProps,
  refProp: Ref<HTMLDivElement>,
): JSX.Element => {
  const currentActiveDescendantId = useMemo(
    () => indexToId(highlightedIndex, props.id),
    [highlightedIndex, props.id],
  )
  return (
    <div
      ref={refProp}
      role="listbox"
      aria-activedescendant={currentActiveDescendantId}
      tabIndex={-1}
      className={clsx(
        'custom-scrollbar bg-surface overflow-y-auto overflow-x-hidden rounded-md shadow-lg',
        className,
      )}
      {...props}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child
        if (typeof child.type === 'string') return child

        return cloneElement(child, {
          id: indexToId(index, props.id),
          highlighted: highlightedIndex === index,
          'aria-selected': selectedIndex.has(index),
          onClick: onSelectOption,
        })
      })}
    </div>
  )
}

export default memo(forwardRef(Listbox))
