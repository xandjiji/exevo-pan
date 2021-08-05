/* @ ToDo: change to Record<string, number> after useDatabase refactor */
type PieDataSet = Record<string, string>

export interface PieChartProps {
  title: string
  pieDataSet: PieDataSet
}
