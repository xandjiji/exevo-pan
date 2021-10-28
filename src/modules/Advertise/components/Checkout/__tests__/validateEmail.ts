import { validateEmail } from '../utils'

describe('utils/validateEmail', () => {
  test('should validate email correctly', () => {
    expect(validateEmail('a@a.com')).toBeTruthy()
    expect(validateEmail('21313@434.1')).toBeTruthy()
    expect(validateEmail('a_b@a.com.br')).toBeTruthy()
    expect(validateEmail('a_b.3293@123abc.com.br')).toBeTruthy()

    expect(validateEmail('123')).toBeFalsy()
    expect(validateEmail('a@acom')).toBeFalsy()
    expect(validateEmail('aa.com')).toBeFalsy()
    expect(validateEmail('a@a@b.com')).toBeFalsy()
    expect(validateEmail('a@@b.com')).toBeFalsy()
  })
})
