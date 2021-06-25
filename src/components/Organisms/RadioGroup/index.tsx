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
  indexValue,
  onChange,
  ...props
}: RadioGroupProps): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState<number>(indexValue ?? 0)

  useEffect(() => {
    onChange?.(activeIndex)
  }, [activeIndex, onChange])

  return (
    <S.Wrapper {...props}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child

        return cloneElement(child, {
          active: activeIndex === index,
          onClick: () => setActiveIndex(index),
        })
      })}
    </S.Wrapper>
  )
}

export default RadioGroup
