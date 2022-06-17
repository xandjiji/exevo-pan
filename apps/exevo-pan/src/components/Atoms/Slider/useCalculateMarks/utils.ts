import { getLeftOffset } from '../utils'
import { CalculatedMarks } from './types'
import { Range, TransformFunction } from '../types'

export const generateAllMarks = (
  step: number,
  [min, max]: Range,
  transformDisplayedValues: TransformFunction = (value): number => value,
): CalculatedMarks[] => {
  const marks: CalculatedMarks[] = []

  const pushMark = (value: number): void => {
    marks.push({
      value,
      label: transformDisplayedValues(value),
      leftOffset: getLeftOffset(value, [min, max], false),
    })
  }

  for (let currentStep = min; currentStep < max; currentStep += step) {
    pushMark(currentStep)
  }
  pushMark(max)

  return marks
}
