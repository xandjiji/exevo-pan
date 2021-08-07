/* @ ToDo: change to Record<string, number> after backend refactor */
type PieDataSet = Record<string, string>

export interface PieChartProps {
  title: string
  pieDataSet: PieDataSet
}
