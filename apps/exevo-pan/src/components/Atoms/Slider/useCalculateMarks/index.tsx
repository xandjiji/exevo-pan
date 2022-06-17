import { useMemo } from 'react'
import { defaultTransform, getLeftOffset } from '../utils'
import { generateAllMarks } from './utils'
import { UseCalculateMarksProps, CalculatedMarks } from './types'

const useCalculateMarks = ({
  step = 1,
  range,
  marks: markProps,
  transformDisplayedValues = defaultTransform,
}: UseCalculateMarksProps): CalculatedMarks[] => {
  const marks: CalculatedMarks[] = useMemo(() => {
    if (!markProps) return []
    if (markProps === true) {
      return generateAllMarks(step, range, transformDisplayedValues)
    }

    const calculatedMarks: CalculatedMarks[] = markProps.map((mark) => ({
      ...mark,
      leftOffset: getLeftOffset(mark.value, range, false),
    }))
    return calculatedMarks
  }, [markProps, step, range, transformDisplayedValues])

  return marks
}

export default useCalculateMarks
