/* @ ToDo find better variable names */
declare interface FilterState {
  nicknameFilter: string
  vocation: Set<0 | 1 | 2 | 3 | 4>
  pvp: Set<0 | 1 | 2 | 3 | 4>
  battleye: Set<boolean>
  location: Set<0 | 1 | 2>
  serverSet: Set<string>
  minLevel: number
  maxLevel: number
  minSkill: number
  skillKey: Set<'axe' | 'club' | 'distance' | 'magic' | 'sword'>
  imbuementsSet: Set<string>
  itemSet: Set<string>
  fav: boolean
  rareNick: boolean
  soulwarFilter: boolean
}
