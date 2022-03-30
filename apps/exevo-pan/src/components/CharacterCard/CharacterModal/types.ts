export interface CharacterModalProps {
  characterData: CharacterObject
  onClose: () => void
  past?: boolean
}

export type CheckboxRecord = {
  dummy: boolean
  goldPouch: boolean
  imbuementShrine: boolean
  rewardShrine: boolean
  mailbox: boolean
}

export type StoreRecord = Record<string, keyof CheckboxRecord>
