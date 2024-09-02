import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { assertSummary } from '../Summary/__tests__'
import ExerciseWeapons from '..'

describe('<sExerciseWeapons />', () => {
  test('should calculate everything correctly', () => {
    renderWithProviders(<ExerciseWeapons />)

    userEvent.click(screen.getByText('Paladin'))
    userEvent.click(screen.getByText('Distance'))

    assertSummary({
      cost: {
        tc: '104,335',
        gold: '1,449,097,222',
      },
      lasting: 144,
      durable: 7,
      regular: 1,
      days: 48,
      hours: 7,
      minutes: 17,
    })

    const currentSkillElement = screen.getByLabelText('Current skill')
    userEvent.clear(currentSkillElement)
    userEvent.type(currentSkillElement, '115')

    const targetSkillElement = screen.getByLabelText('Target skill')
    userEvent.clear(targetSkillElement)
    userEvent.type(targetSkillElement, '116')

    assertSummary({
      cost: {
        tc: '3,855',
        gold: '53,541,666',
      },
      lasting: 5,
      durable: 2,
      regular: 3,
      days: 1,
      hours: 18,
      minutes: 50,
    })

    userEvent.clear(targetSkillElement)
    userEvent.type(targetSkillElement, '118')

    const [, percentageLeftElement] = screen.getAllByLabelText('% left')
    userEvent.clear(percentageLeftElement)
    userEvent.type(percentageLeftElement, '83.17')

    assertSummary({
      cost: {
        tc: '24,130',
        gold: '335,138,888',
      },
      lasting: 33,
      durable: 3,
      regular: 4,
      days: 11,
      hours: 4,
      minutes: 7,
    })

    userEvent.click(screen.getByText('25%'))

    assertSummary({
      cost: {
        tc: '19,310',
        gold: '268,194,444',
      },
      lasting: 26,
      durable: 6,
      regular: 2,
      days: 8,
      hours: 22,
      minutes: 34,
    })

    userEvent.click(screen.getByLabelText('Exercise dummy'))

    assertSummary({
      cost: {
        tc: '17,560',
        gold: '243,888,888',
      },
      lasting: 24,
      durable: 2,
      regular: 4,
      days: 8,
      hours: 3,
      minutes: 7,
    })

    userEvent.click(screen.getByLabelText('Double event'))

    assertSummary({
      cost: {
        tc: '8,780',
        gold: '121,944,444',
      },
      lasting: 12,
      durable: 1,
      regular: 2,
      days: 4,
      hours: 1,
      minutes: 34,
    })

    userEvent.click(screen.getByLabelText('Exercise dummy'))

    assertSummary({
      cost: {
        tc: '9,655',
        gold: '134,097,222',
      },
      lasting: 13,
      durable: 3,
      regular: 1,
      days: 4,
      hours: 11,
      minutes: 17,
    })

    userEvent.click(screen.getByText('Auto'))
    userEvent.click(screen.getByText('Durable (1800 charges)'))

    assertSummary({
      cost: {
        tc: '9,720',
        gold: '135,000,000',
      },
      lasting: 0,
      durable: 108,
      regular: 0,
      days: 4,
      hours: 12,
      minutes: 0,
    })
  })
})
