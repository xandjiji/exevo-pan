import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextRouter } from 'next/router'
import { renderWithProviders, setup } from 'utils/test'
import { doTimes } from 'utils'
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

type ElementalCase = {
  critChance: boolean
  hp: string
  elementalBonus: number
  result: string
}

const elementalCases: ElementalCase[] = [
  {
    critChance: true,
    hp: '2600',
    elementalBonus: 7,
    result: '539',
  },
  {
    critChance: false,
    hp: '12340.9',
    elementalBonus: 60,
    result: '599',
  },
  {
    critChance: true,
    hp: '0',
    elementalBonus: 100,
    result: '525',
  },
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

        const [resultElement] = screen.getAllByLabelText(
          'Final average damage:',
        )
        expect(resultElement).toHaveTextContent(result)
      },
    )

    test.each(elementalCases)(
      'for elemental charms',
      ({ critChance, hp, elementalBonus, result }) => {
        renderWithProviders(<CharmDamage />)

        if (critChance) {
          userEvent.click(screen.getByLabelText('10% critical chance'))
        }

        const hpElement = screen.getByLabelText('Creature HP')
        userEvent.clear(hpElement)
        userEvent.type(hpElement, hp)

        userEvent.tab()
        doTimes(() => userEvent.keyboard('{arrowright}'), elementalBonus)

        const [, resultElement] = screen.getAllByLabelText(
          'Final average damage:',
        )
        expect(resultElement).toHaveTextContent(result)
      },
    )
  })
})
