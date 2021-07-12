import { verifyCharacterObjectShape } from '..'
import { mockedCharacterObject } from './mock'

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
