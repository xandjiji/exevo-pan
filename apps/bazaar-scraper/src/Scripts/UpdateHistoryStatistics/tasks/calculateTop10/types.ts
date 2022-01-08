export type SorteableCharacterAttribute = keyof Pick<
  PartialCharacterObject,
  'auctionEnd' | 'currentBid' | 'id' | 'level'
>

export type SkillName = keyof CharacterSkillsObject
