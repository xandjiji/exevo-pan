import { useState, useEffect, useCallback } from 'react'
import { ExtraExpenses } from './types'

const useExtraExpenses = (rawSession?: string) => {
  const [extraExpenses, setExtraExpenses] = useState<ExtraExpenses>({})

  const setExpenses = useCallback(
    (newExpenses: ExtraExpenses) =>
      setExtraExpenses((prev) => ({
        ...prev,
        ...newExpenses,
      })),
    [],
  )

  useEffect(() => setExtraExpenses({}), [rawSession])

  return [extraExpenses, setExpenses] as const
}

export default useExtraExpenses
