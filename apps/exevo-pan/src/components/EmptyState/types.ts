type Button = {
  content: string
  action: () => void
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'small' | 'medium' | 'large'
  text: string
  button?: Button
  nowrap?: boolean
}
