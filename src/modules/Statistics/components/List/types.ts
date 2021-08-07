export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  charactersList: CharacterInfo[]
  columnLabel: string
  displayedDataKey: keyof CharacterInfoKey
  format?: (value: string) => string
}
