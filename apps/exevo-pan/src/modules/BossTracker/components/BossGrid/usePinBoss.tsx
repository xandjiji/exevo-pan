import { useCallback } from 'react'
import { useStoredState } from 'hooks'

const usePinBoss = () => {
  const [pinnedBosses, setStoredValue] = useStoredState<string[]>(
    'boss-tracker-favs',
    [],
  )

  const toggleBoss = useCallback(
    (bossName: string) =>
      setStoredValue((prevStored) => {
        const bossIsPinned = prevStored.includes(bossName)

        return bossIsPinned
          ? prevStored.filter((storedName) => storedName !== bossName)
          : [...prevStored, bossName]
      }),
    [setStoredValue],
  )

  return [pinnedBosses, toggleBoss] as const
}

export default usePinBoss
