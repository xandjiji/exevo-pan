export const buildServerOptions = (serverData: ServerObject[]): Option[] =>
  serverData
    .map((server) => ({
      name: server.serverName,
      value: server.serverName,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

export const buildRareItemsOptions = (itemData: RareItemData): Option[] =>
  Object.keys(itemData).map((item) => ({ name: item, value: item }))

const imbuementNames = [
  'Critical Hit',
  'Life Leech',
  'Mana Leech',
  'Club Skill',
  'Shield Skill',
  'Axe Skill',
  'Magic Level',
  'Distance Skill',
  'Sword Skill',
  'Capacity',
  'Speed',
  'Paralize Removal',
  'Energy Damage',
  'Ice Damage',
  'Death Damage',
  'Fire Damage',
  'Earth Damage',
  'Energy Protection',
  'Holy Protection',
  'Fire Protection',
  'Death Protection',
  'Ice Protection',
  'Earth Protection',
]

export const imbuementOptions = imbuementNames.map((imbuement) => ({
  name: imbuement,
  value: imbuement,
}))
