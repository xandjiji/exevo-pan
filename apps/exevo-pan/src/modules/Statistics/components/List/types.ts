/* eslint-disable no-shadow */
export type ListProps = {
  title: string
  charactersList: CharacterObject[]
  pickFromCharacter: (character: CharacterObject) => number
  formatCharacterValue?: (value: number) => string
} & React.HTMLAttributes<HTMLDivElement>
