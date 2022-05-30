import { useState, useEffect } from 'react'

type HookOptions = {
  initialValue: number
  controlledValue?: number
}

const useControlledValue = ({
  initialValue,
  controlledValue,
}: HookOptions): [number, React.Dispatch<React.SetStateAction<number>>] => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue)
    }
  }, [controlledValue])

  return [value, setValue]
}

export default useControlledValue
