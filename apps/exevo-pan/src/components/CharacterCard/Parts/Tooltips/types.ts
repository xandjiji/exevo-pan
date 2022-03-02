export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  items: string[]
}

export interface CharacterCharmsProps extends TooltipProps {
  charmInfo?: CharmInfo
}

export interface ListedItemsProps {
  fullList: string[]
  characterSet: Set<string>
}
