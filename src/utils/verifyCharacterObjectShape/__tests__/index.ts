import { verifyCharacterObjectShape } from '../'

const mockedCharacterObject = {
  id: 123456,
  nickname: 'Ksu',
  auctionEnd: 1624812300,
  currentBid: 9500,
  hasBeenBidded: false,
  outfitId: '130_0',
  serverId: 32,
  vocationId: 4,
  level: 607,
  skills: {
    magic: 104.41,
    club: 14.27,
    fist: 16.65,
    sword: 14.2,
    fishing: 10,
    axe: 12.49,
    distance: 13.13,
    shielding: 33.61,
  },
  items: [29423, 29426, 30400, 30403],
  charms: ['Freeze', 'Poison', 'Wound', 'Zap'],
  transfer: false,
  imbuements: [
    'Critical Hit',
    'Death Damage',
    'Death Protection',
    'Energy Damage',
    'Energy Protection',
    'Fire Damage',
    'Fire Protection',
    'Life Leech',
    'Magic Level',
    'Mana Leech',
    'Speed',
  ],
  hasSoulwar: true,
} as CharacterObject

describe('utils/verifyCharacterObjectShape', () => {
  test('should return True', () => {
    expect(verifyCharacterObjectShape(mockedCharacterObject)).toBeTruthy()
  })

  test('should return False', () => {
    console.log = jest.fn()
    // eslint-disable-next-line guard-for-in
    for (const key in mockedCharacterObject) {
      const defectiveObject: CharacterObject = { ...mockedCharacterObject }
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete defectiveObject[key]
      expect(verifyCharacterObjectShape(defectiveObject)).toBeFalsy()
      expect(console.log).toBeCalledWith(
        `Deprecated local data [missing: '${key}']`,
      )
    }
  })
})
