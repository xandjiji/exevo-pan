import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import CharacterConfig from '..'

const mockUpdatePointsRequired = jest.fn()

type Case = {
  vocation: 'Knight' | 'Paladin' | 'Sorcerer' | 'Druid'
  skill: 'Axe/Club/Sword' | 'Distance' | 'Magic level'
  currentSkill: number
  targetSkill: number
  percentageLeft: number
  loyalty: string
  result: number
}

const cases: Case[] = [
  {
    vocation: 'Paladin',
    skill: 'Distance',
    currentSkill: 116,
    targetSkill: 117,
    percentageLeft: 84.17,
    loyalty: '10%',
    result: 77523987.53087485,
  },
  {
    vocation: 'Sorcerer',
    skill: 'Magic level',
    currentSkill: 99,
    targetSkill: 105,
    percentageLeft: 1,
    loyalty: '45%',
    result: 92973566.55431505,
  },
  {
    vocation: 'Knight',
    skill: 'Axe/Club/Sword',
    currentSkill: 80,
    targetSkill: 99,
    percentageLeft: 99.99,
    loyalty: 'None',
    result: 167670539.22001427,
  },
  {
    vocation: 'Druid',
    skill: 'Distance',
    currentSkill: 15,
    targetSkill: 16,
    percentageLeft: 12.34,
    loyalty: '25%',
    result: 1065645.378653848,
  },
]

describe('<CharacterConfig />', () => {
  beforeEach(() => {
    mockUpdatePointsRequired.mockClear()
  })

  test.each(cases)(
    'should dispatch the correct required skill points',
    ({
      vocation,
      skill,
      currentSkill,
      targetSkill,
      percentageLeft,
      loyalty,
      result,
    }) => {
      renderWithProviders(
        <CharacterConfig updatePointsRequired={mockUpdatePointsRequired} />,
      )

      userEvent.click(screen.getByText(vocation))
      userEvent.click(screen.getByText(skill))

      const currentSkillElement = screen.getByLabelText('Current skill')
      userEvent.clear(currentSkillElement)
      userEvent.type(currentSkillElement, currentSkill.toString())

      const targetSkillElement = screen.getByLabelText('Target skill')
      userEvent.clear(targetSkillElement)
      userEvent.type(targetSkillElement, targetSkill.toString())

      const [, percentageLeftElement] = screen.getAllByLabelText('% left')
      userEvent.clear(percentageLeftElement)
      userEvent.type(percentageLeftElement, percentageLeft.toString())

      userEvent.click(screen.getByText(loyalty))

      expect(mockUpdatePointsRequired).toHaveBeenLastCalledWith(result)
    },
  )
})
