export type Top10Data = Pick<
  StatisticsData,
  | 'top10Axe'
  | 'top10Bid'
  | 'top10Club'
  | 'top10Distance'
  | 'top10Fishing'
  | 'top10Fist'
  | 'top10Level'
  | 'top10Magic'
  | 'top10Shielding'
  | 'top10Sword'
>

export interface HighscoresGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  top10Data: Top10Data
}
