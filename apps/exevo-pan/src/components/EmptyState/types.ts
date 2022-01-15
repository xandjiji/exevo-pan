export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  children: string
  buttonText?: string
  buttonAction?: () => void
}
