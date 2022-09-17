import { useCallback } from 'react'
import { useStoredState } from 'hooks'
import { PINNED_BOSS_KEY } from './types'

const usePinBoss = () => {
  const [pinnedBosses, setStoredValue] = useStoredState<string[]>(
    PINNED_BOSS_KEY,
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
