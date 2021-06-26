import {
  useState,
  useEffect,
  Children,
  isValidElement,
  cloneElement,
} from 'react'
import * as S from './styles'
import { RadioGroupProps } from './types'

const RadioGroup = ({
  children,
  indexValue: indexProp,
  onChange,
  ...props
}: RadioGroupProps): JSX.Element => {
  const [innerIndex, setInnerIndex] = useState<number>(indexProp ?? 0)
  const derivedActiveIndex = indexProp ?? innerIndex

  useEffect(() => {
    onChange?.(innerIndex)
  }, [innerIndex, onChange])

  return (
    <S.Wrapper role="radiogroup" {...props}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child
        if (typeof child.type === 'string') return child

        return cloneElement(child, {
          active: derivedActiveIndex === index,
          onClick: () => setInnerIndex(index),
        })
      })}
    </S.Wrapper>
  )
}

export default RadioGroup
