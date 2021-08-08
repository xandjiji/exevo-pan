export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  charactersList: CharacterInfo[]
  displayedDataKey: keyof CharacterInfoKey
  format?: (value: number) => string | ((value: string) => string)
}

export interface PseudoElementProps {
  beforeContent?: string
  afterContent?: string
}
