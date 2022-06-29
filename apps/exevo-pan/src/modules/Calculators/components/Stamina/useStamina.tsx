import { useState, useCallback } from 'react'

const useStamina = (initialValue: string) => {
  const [stamina, setStamina] = useState(initialValue)

  const setValue = useCallback((value: string) => {
    const [hours] = value.split(':')

    if (hours === '42') {
      setStamina('42:00')
    } else {
      setStamina(value)
    }
  }, [])

  return [stamina, setValue] as const
}

export default useStamina
