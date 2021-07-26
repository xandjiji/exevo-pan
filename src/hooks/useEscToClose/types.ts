export interface UseEscapeToCloseProps {
  open: boolean
  onClose?: () => void
}

export interface UseEscapeToCloseObject {
  elementToFocusRef: React.RefObject<HTMLDivElement>
  onKeyDown: (event: React.KeyboardEvent) => void
}
