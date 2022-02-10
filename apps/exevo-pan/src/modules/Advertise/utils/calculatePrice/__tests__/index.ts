import { getDiscountTier, calculatePrice } from '..'

describe('getDiscountTier()', () => {
  test.each([
    { input: -1, output: 1 },
    { input: 0, output: 1 },
    { input: 1, output: 1 },
    { input: 2, output: 2 },
    { input: 3, output: 2 },
    { input: -2, output: 1 },
    { input: 4, output: 2 },
    { input: 5, output: 3 },
    { input: 6, output: 3 },
    { input: 100, output: 3 },
    { input: -5, output: 1 },
  ])('should calculate the current tier correctly', ({ input, output }) => {
    expect(getDiscountTier(input)).toEqual(output)
  })
})

describe('calculatePrice()', () => {
  describe('should caculate the percentages correctly', () => {
    const percentageCases: { days: number; offPercentage: string }[] = [
      { days: 0, offPercentage: '0%' },
      { days: 1, offPercentage: '0%' },
      { days: 2, offPercentage: '17%' },
      { days: 3, offPercentage: '22%' },
      { days: 4, offPercentage: '25%' },
      { days: 5, offPercentage: '33%' },
      { days: 6, offPercentage: '33%' },
      { days: 7, offPercentage: '33%' },
      { days: 1000, offPercentage: '33%' },
    ]

    test.each(percentageCases)('for TC', ({ days, offPercentage }) => {
      expect(calculatePrice(days, 'TIBIA_COINS').offPercentage).toEqual(
        offPercentage,
      )
    })

    test.each(percentageCases)('for PIX', ({ days, offPercentage }) => {
      expect(calculatePrice(days, 'PIX').offPercentage).toEqual(offPercentage)
    })
  })

  describe('should calculate the saved and final price correctly', () => {
    test.each([
      { days: 0, totalPrice: 0, saved: 0 },
      { days: 1, totalPrice: 75, saved: 0 },
      { days: 2, totalPrice: 125, saved: 25 },
      { days: 3, totalPrice: 175, saved: 50 },
      { days: 4, totalPrice: 225, saved: 75 },
      { days: 5, totalPrice: 250, saved: 125 },
      { days: 6, totalPrice: 300, saved: 150 },
      { days: 7, totalPrice: 350, saved: 175 },
    ])('for TC', ({ days, totalPrice, saved }) => {
      const result = calculatePrice(days, 'TIBIA_COINS')

      expect(result.totalPrice).toEqual(totalPrice)
      expect(result.saved).toEqual(saved)
    })

    test.each([
      { days: 0, totalPrice: 0, saved: 0 },
      { days: 1, totalPrice: 15, saved: 0 },
      { days: 2, totalPrice: 25, saved: 5 },
      { days: 3, totalPrice: 35, saved: 10 },
      { days: 4, totalPrice: 45, saved: 15 },
      { days: 5, totalPrice: 50, saved: 25 },
      { days: 6, totalPrice: 60, saved: 30 },
      { days: 7, totalPrice: 70, saved: 35 },
    ])('for PIX', ({ days, totalPrice, saved }) => {
      const result = calculatePrice(days, 'PIX')

      expect(result.totalPrice).toEqual(totalPrice)
      expect(result.saved).toEqual(saved)
    })
  })
})
