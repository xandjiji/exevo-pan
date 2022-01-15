type Text = {
  content: string
  size: number
}

type Button = {
  content: string
  action: () => void
}

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number
  text: Text
  button?: Button
}
