/* eslint-disable no-shadow */
export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  charactersList: CharacterInfo[]
  displayedDataKey: keyof CharacterInfoKey
  format?: (value: number) => string | ((value: string) => string)
}
