import { useCallback } from 'react'
import { useUuid } from 'hooks'

type UseIdsObject = {
  getTabId: (index: number) => string
  getPanelId: (index: number) => string
}

const useIds = (): UseIdsObject => {
  const tabId = useUuid('tab')
  const panelId = useUuid('panel')

  const getTabId = useCallback((index: number) => `${index}-${tabId}`, [tabId])

  const getPanelId = useCallback(
    (index: number) => `${index}-${panelId}`,
    [panelId],
  )

  return { getTabId, getPanelId }
}

export default useIds
