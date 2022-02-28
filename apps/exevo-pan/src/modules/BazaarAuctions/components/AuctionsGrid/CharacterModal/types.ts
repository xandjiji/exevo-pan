export interface CharacterModalProps {
  open: boolean
  characterData?: CharacterObject
  onClose: () => void
}

export type CheckboxRecord = {
  dummy: boolean
  goldPouch: boolean
  imbuementShrine: boolean
  rewardShrine: boolean
  mailbox: boolean
}

export type StoreRecord = Record<string, keyof CheckboxRecord>
