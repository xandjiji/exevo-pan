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
    <S.Wrapper role="radiogroup" {...props}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child
        if (typeof child.type === 'string') return child

        return cloneElement(child, {
          active: activeIndex === index,
          onClick: () => setActiveIndex(index),
        })
      })}
    </S.Wrapper>
  )
}

export default RadioGroup
