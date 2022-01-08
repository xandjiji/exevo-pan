declare type RareItemObject = number[]

declare type RareItemData = Record<string, RareItemObject>

declare type RareItemBlock = {
  name: string
  lastPageIndex: number
  ids: number[]
}

declare type RareItemBlockCollection = Record<string, RareItemBlock>
