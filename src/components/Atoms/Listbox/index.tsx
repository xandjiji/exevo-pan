import {
  forwardRef,
  Ref,
  useMemo,
  Children,
  isValidElement,
  cloneElement,
  memo,
} from 'react'
import * as S from './styles'
import { ListboxProps } from './types'
import { indexToId } from './utils'

const Listbox = (
  {
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
    <S.Wrapper
      ref={refProp}
      role="listbox"
      aria-activedescendant={currentActiveDescendantId}
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
    </S.Wrapper>
  )
}

export default memo(forwardRef(Listbox))
