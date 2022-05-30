import { Mark, Range, SliderProps } from '../types'

export type CalculatedMarks = { leftOffset: string } & Mark

export type UseCalculateMarksProps = { range: Range } & Pick<
  SliderProps,
  'marks' | 'step' | 'transformDisplayedValues'
>
