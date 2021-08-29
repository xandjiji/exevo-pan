export interface OnlineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  guildA: {
    name: string
    online: OnlineSnapshot[]
  }
  guildB: {
    name: string
    online: OnlineSnapshot[]
  }
}
