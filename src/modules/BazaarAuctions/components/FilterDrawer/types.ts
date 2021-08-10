export interface FilterDrawerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  setActiveFilterCount: React.Dispatch<React.SetStateAction<number>>
}

export interface StatusStyleProps {
  color: 'battleGreen' | 'battleYellow'
}
