import { Value } from './types'

export const findOptionIndexByValue = (options: Option[], value?: Value) =>
  options.findIndex((option) => option.value === value)
