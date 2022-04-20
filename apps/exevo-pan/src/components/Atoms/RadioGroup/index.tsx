/* eslint-disable jsx-a11y/aria-activedescendant-has-tabindex */
import { useState, Children, isValidElement, cloneElement } from 'react'
import clsx from 'clsx'
import { RadioGroupProps } from './types'
import { indexToId } from './utils'

const RadioGroup = ({
  className,
  children,
  indexValue: indexProp,
  onChange,
  ...props
}: RadioGroupProps) => {
  const [innerIndex, setInnerIndex] = useState<number | undefined>(indexProp)
  const derivedActiveIndex = indexProp ?? innerIndex

  return (
    <div
      role="radiogroup"
      aria-activedescendant={indexToId(derivedActiveIndex)}
      className={clsx('grid gap-3', className)}
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
    </div>
  )
}

export default RadioGroup
