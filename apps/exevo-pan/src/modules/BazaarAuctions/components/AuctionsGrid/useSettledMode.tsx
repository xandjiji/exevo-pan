import { useState, useEffect } from 'react'

type UseSettledModeProps = {
  loading: boolean
  mode: AuctionQueryMode
}

export const useSettledMode = ({
  loading,
  mode,
}: UseSettledModeProps): AuctionQueryMode => {
  const [settledMode, setSettledMode] = useState(mode)

  useEffect(() => {
    if (!loading) setSettledMode(mode)
  }, [loading, mode])

  return settledMode
}
