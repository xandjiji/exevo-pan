export interface FilterDrawerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  setIsFilterReset: React.Dispatch<React.SetStateAction<boolean>>
}

export interface StatusStyleProps {
  color: 'battleGreen' | 'battleYellow'
}
