import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextRouter } from 'next/router'
import { renderWithProviders, setup } from 'utils/test'
import CharmDamage from '..'

type LowBlowCase = {
  dps: string
  result: string
}

const lowBlowCases: LowBlowCase[] = [
  { dps: '600', result: '654' },
  { dps: '150.145', result: '164' },
  { dps: '3650', result: '3979' },
  { dps: '0', result: '0' },
]

describe('<CharmDamage />', () => {
  beforeEach(() => {
    setup.useRouter().mockReturnValue({ locale: 'en' } as NextRouter)
  })

  describe('should calculate the average damage correctly', () => {
    test.each(lowBlowCases)(
      'for Low Blow + 10% critical chance',
      ({ dps, result }) => {
        renderWithProviders(<CharmDamage />)

        userEvent.type(screen.getByLabelText('Your average damage'), dps)
        expect(
          screen.getByLabelText('Final average damage:'),
        ).toHaveTextContent(result)
      },
    )
  })
})
