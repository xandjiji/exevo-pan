import { Children, isValidElement, cloneElement } from 'react'
import * as S from './styles'
import { ListboxProps } from './types'

const Listbox = ({
  children,
  highlightedIndex = new Set<number>([]),
  selectedIndex = new Set<number>([]),
  onSelectOption,
  ...props
}: ListboxProps): JSX.Element => {
  return (
    <S.Wrapper role="listbox" {...props}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child
        if (typeof child.type === 'string') return child

        return cloneElement(child, {
          highlighted: highlightedIndex.has(index),
          'aria-selected': selectedIndex.has(index),
          onClick: onSelectOption,
        })
      })}
    </S.Wrapper>
  )
}

export default Listbox
