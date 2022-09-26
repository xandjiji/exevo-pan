import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'

/* @ ToDo:
    <Description /> -> locales
*/

export const bossInfo = new Map<TrackedBossName, BossInfo>()

bossInfo.set('Apprentice Sheng', {
  locations: ['https://tibiamaps.io/map/embed#32130,32059,12:1'],
  loot: ['Magic Light Wand', 'Knife'],
})

bossInfo.set('Arachir the Ancient One', {
  locations: ['https://tibiamaps.io/map/embed#32969,32399,12:1'],
  loot: ['Vampire Lord Token'],
})
