import { useMemo, Children, isValidElement, cloneElement } from 'react'
import * as S from './styles'
import { ListboxProps } from './types'

const Listbox = ({
  children,
  highlightedIndex: highlightedIndexProp,
  onSelectOption,
  ...props
}: ListboxProps): JSX.Element => {
  const highlightedIndex = useMemo(
    () =>
      Array.isArray(highlightedIndexProp)
        ? highlightedIndexProp
        : [highlightedIndexProp],
    [highlightedIndexProp],
  )
  return (
    <S.Wrapper role="listbox" {...props}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child
        if (typeof child.type === 'string') return child

        return cloneElement(child, {
          highlighted: highlightedIndex.includes(index),
          onClick: onSelectOption,
        })
      })}
    </S.Wrapper>
  )
}

export default Listbox
