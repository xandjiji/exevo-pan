import { isRareNickname } from '../utils'

describe('filterCharacters/utils', () => {
  test('isRareNickname()', () => {
    expect(isRareNickname('Assd')).toBeFalsy()
    expect(isRareNickname('Asd')).toBeTruthy()
    expect(isRareNickname('As')).toBeTruthy()
    expect(isRareNickname('A')).toBeTruthy()
    expect(isRareNickname('Dark Magician')).toBeFalsy()
    expect(isRareNickname('Dark-Magician')).toBeTruthy()
    expect(isRareNickname("Dark'Magician")).toBeTruthy()
    expect(isRareNickname('Dark.Magician')).toBeTruthy()
    expect(isRareNickname('Dark,Magician')).toBeTruthy()
    expect(isRareNickname('Dark Magician IV')).toBeTruthy()
    expect(isRareNickname('Dark MAgician')).toBeTruthy()
    expect(isRareNickname('Därk Magician')).toBeTruthy()
  })
})
