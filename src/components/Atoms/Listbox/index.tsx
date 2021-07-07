import { useMemo, Children, isValidElement, cloneElement } from 'react'
import * as S from './styles'
import { ListboxProps } from './types'
import { indexToId } from './utils'

const Listbox = ({
  children,
  highlightedIndex,
  selectedIndex = new Set<number>([]),
  onSelectOption,
  ...props
}: ListboxProps): JSX.Element => {
  const currentActiveDescendantId = useMemo(
    () => indexToId(Array.from(selectedIndex)[selectedIndex.size - 1]),
    [selectedIndex],
  )
  return (
    <S.Wrapper
      role="listbox"
      aria-activedescendant={currentActiveDescendantId}
      {...props}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child
        if (typeof child.type === 'string') return child

        return cloneElement(child, {
          id: indexToId(index),
          highlighted: highlightedIndex === index,
          'aria-selected': selectedIndex.has(index),
          onClick: onSelectOption,
        })
      })}
    </S.Wrapper>
  )
}

export default Listbox
