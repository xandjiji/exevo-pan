import { TrackedBossName } from 'data-dictionary/dist/dictionaries/bosses'

const names: TrackedBossName[] = [
  'The Pale Count',
  'Shlorg',
  'Man in the Cave',
  'Ocyakao',
  'The Welter',
  'Yeti',
]

export const premiumBosses = {
  names,
  set: new Set<string>(names),
  fallbackData: names.map((name) => ({ name })) as BossStats[],
}
