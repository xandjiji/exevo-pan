export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export interface HeadColumnStyleProps {
  highlighted?: boolean
  desc?: boolean
}
