import { useCallback, useId } from 'react'

type UseIdsObject = {
  getTabId: (index: number) => string
  getPanelId: (index: number) => string
}

const useIds = (): UseIdsObject => {
  const tabId = `tab-${useId()}`
  const panelId = `panel-${useId()}`

  const getTabId = useCallback((index: number) => `${index}-${tabId}`, [tabId])

  const getPanelId = useCallback(
    (index: number) => `${index}-${panelId}`,
    [panelId],
  )

  return { getTabId, getPanelId }
}

export default useIds
