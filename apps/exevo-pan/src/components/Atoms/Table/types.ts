export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
}

export interface HeadColumnProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  highlighted?: boolean
  desc?: boolean
}
