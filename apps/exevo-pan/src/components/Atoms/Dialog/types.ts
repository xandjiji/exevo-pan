export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string
  isOpen: boolean
  onClose: () => void
  noCloseButton?: boolean
}
