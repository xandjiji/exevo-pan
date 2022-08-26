import { useState, useEffect, useCallback } from 'react'

const useToggleSet = (rawSession?: string) => {
  const [removedPlayers, setRemovedPlayers] = useState<Set<string>>(new Set([]))

  const togglePlayer = useCallback(
    (name: string) => {
      if (removedPlayers.has(name)) {
        setRemovedPlayers(
          new Set(
            [...removedPlayers].filter(
              (removedPlayer) => removedPlayer !== name,
            ),
          ),
        )
      } else {
        setRemovedPlayers(new Set([...removedPlayers, name]))
      }
    },
    [removedPlayers],
  )

  useEffect(() => setRemovedPlayers(new Set([])), [rawSession])

  return [removedPlayers, togglePlayer] as const
}

export default useToggleSet
