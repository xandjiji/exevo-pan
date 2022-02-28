import { CheckboxRecord, StoreRecord } from './types'

const storeRecordMap: StoreRecord = {
  /* dummy */
  'ferumbras exercise dummy': 'dummy',
  'monk exercise dummy': 'dummy',
  'demon exercise dummy': 'dummy',
  /* goldPouch */
  'gold pouch': 'goldPouch',
  /* imbuementShrine */
  'imbuing shrine': 'imbuementShrine',
  'gilded imbuing shrine': 'imbuementShrine',
  /* rewardShrine */
  'reward shrine': 'rewardShrine',
  'shiny reward shrine': 'rewardShrine',
  /* mailbox */
  mailbox: 'mailbox',
  'ornate mailbox': 'mailbox',
}

export const checkStore = (storeItems: CharacterItem[]): CheckboxRecord => {
  const checkboxes: CheckboxRecord = {
    dummy: false,
    goldPouch: false,
    imbuementShrine: false,
    rewardShrine: false,
    mailbox: false,
  }

  storeItems.forEach(({ name }) => {
    const checkboxKey = storeRecordMap[name]
    if (checkboxKey) {
      checkboxes[checkboxKey] = true
    }
  })

  return checkboxes
}
