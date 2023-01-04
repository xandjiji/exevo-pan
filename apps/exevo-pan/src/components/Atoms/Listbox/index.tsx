import {
  forwardRef,
  Ref,
  useMemo,
  useEffect,
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
    onSelectOption,
    selectedIndex = new Set<number>([]),
    ...props
  }: ListboxProps,
  refProp: Ref<HTMLDivElement>,
) => {
  const currentActiveDescendantId = useMemo(
    () => indexToId(highlightedIndex, props.id),
    [highlightedIndex, props.id],
  )

  useEffect(() => {
    if (currentActiveDescendantId) {
      document.getElementById(currentActiveDescendantId)?.scrollIntoView({
        block: 'nearest',
      })
    }
  }, [currentActiveDescendantId])

  return (
    <div
      ref={refProp}
      role="listbox"
      aria-activedescendant={currentActiveDescendantId}
      tabIndex={-1}
      className={clsx(
        'custom-scrollbar border-1 border-separator/50 bg-surface overflow-y-auto overflow-x-hidden rounded-md border-solid shadow-lg',
        className,
      )}
      {...props}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child
        if (typeof child.type === 'string') return child

        return cloneElement(child as any, {
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
