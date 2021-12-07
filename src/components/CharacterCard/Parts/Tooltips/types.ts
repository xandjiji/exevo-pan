export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  items: string[]
}

export interface ListedItemsProps {
  fullList: string[]
  characterSet: Set<string>
}
