import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { SECONDS_IN } from 'utils'
import TimeBubbles from '..'

type Case = { seconds: number; bubbles: string[] }

const cases: Case[] = [
  { seconds: SECONDS_IN.MINUTE - 1, bubbles: ['1minute'] },
  { seconds: SECONDS_IN.MINUTE, bubbles: ['1minute'] },
  { seconds: SECONDS_IN.MINUTE + 1, bubbles: ['2minutes'] },
  { seconds: SECONDS_IN.HOUR, bubbles: ['1hour'] },
  { seconds: SECONDS_IN.HOUR + 1, bubbles: ['1hour', '1minute'] },
  { seconds: SECONDS_IN.DAY, bubbles: ['1day'] },
  { seconds: SECONDS_IN.DAY + SECONDS_IN.HOUR, bubbles: ['1day', '1hour'] },
  {
    seconds: SECONDS_IN.DAY + SECONDS_IN.HOUR + SECONDS_IN.MINUTE,
    bubbles: ['1day', '1hour', '1minute'],
  },
  { seconds: 42398432, bubbles: ['490days', '17hours', '21minutes'] },
]

describe('<TimeBubbles />', () => {
  test.each(cases)(
    'should break the time into days, hours and minutes',
    ({ seconds, bubbles }) => {
      const { container } = renderWithProviders(
        <TimeBubbles seconds={seconds} />,
      )

      container
        .querySelectorAll('[aria-hidden="false"]')
        .forEach((element, index) => {
          expect(element.textContent).toBe(bubbles[index])
        })
    },
  )

  test('should be empty', () => {
    renderWithProviders(<TimeBubbles seconds={0} />)

    expect(screen.getByText('None')).toBeInTheDocument()
  })
})
