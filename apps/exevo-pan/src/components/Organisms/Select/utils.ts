import { ReactNode, Children, isValidElement } from 'react'
import { Value } from './types'

export const getChildrenOptions = (children: ReactNode): Option[] => {
  const options: Option[] = []

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return
    if (typeof child === 'string') return

    const { value, children: name } = child.props
    if (typeof value === 'string' && typeof name === 'string') {
      options.push({ name, value })
    }
  })

  return options
}

export const findOptionIndexByValue = (options: Option[], value?: Value) =>
  options.findIndex((option) => option.value === value)
