import { useMemo } from 'react'
import { CustomProps } from './types'

const useInputWidth = ({ max, step = 1 }: Pick<CustomProps, 'max' | 'step'>) =>
  useMemo(() => {
    const maxLength = max.toString().length
    const [, decimals] = step.toString().split('.')

    const totalLength = decimals ? maxLength + decimals.length + 1 : maxLength

    return `${totalLength}ch`
  }, [max, step])

export default useInputWidth
