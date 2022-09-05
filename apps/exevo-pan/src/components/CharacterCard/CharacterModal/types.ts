export interface CharacterModalProps {
  characterData: CharacterObject
  onClose: () => void
  past?: boolean
  permalink?: string
}

export type CheckboxRecord = {
  dummy: boolean
  goldPouch: boolean
  imbuementShrine: boolean
  rewardShrine: boolean
  mailbox: boolean
}

export type StoreRecord = Record<string, keyof CheckboxRecord>

export type SectionProps = {
  border?: boolean
} & JSX.IntrinsicElements['div']
