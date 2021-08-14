import { useState, Children, isValidElement, cloneElement } from 'react'
import * as S from './styles'
import { RadioGroupProps } from './types'
import { indexToId } from './utils'

const RadioGroup = ({
  children,
  indexValue: indexProp,
  onChange,
  ...props
}: RadioGroupProps): JSX.Element => {
  const [innerIndex, setInnerIndex] = useState<number | undefined>(indexProp)
  const derivedActiveIndex = indexProp ?? innerIndex

  return (
    <S.Wrapper
      role="radiogroup"
      aria-activedescendant={indexToId(derivedActiveIndex)}
      {...props}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child
        if (typeof child.type === 'string') return child

        return cloneElement(child, {
          id: indexToId(index),
          active: derivedActiveIndex === index,
          onClick: () => {
            setInnerIndex((prevInnerIndex) => {
              if (prevInnerIndex !== index) onChange?.(index)
              return index
            })
          },
        })
      })}
    </S.Wrapper>
  )
}

export default RadioGroup
