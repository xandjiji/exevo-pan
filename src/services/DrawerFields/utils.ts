export const buildServerOptions = (serverData: ServerObject[]): Option[] =>
  serverData
    .map((server) => ({
      name: server.serverName,
      value: server.serverName,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

export const filterItemData = (initialItemData: RareItemData): RareItemData => {
  const filteredItemData = {} as RareItemData

  Object.keys(initialItemData).forEach((item) => {
    if (initialItemData[item].length > 0) {
      filteredItemData[item] = initialItemData[item]
    }
  })

  return filteredItemData
}

export const buildRareItemsOptions = (itemData: RareItemData): Option[] =>
  Object.keys(itemData).map((item) => ({ name: item, value: item }))
