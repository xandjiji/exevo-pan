import { describe, expect, test } from 'vitest'
import { getDateRelativeToSS } from '../time'

describe('getDateRelativeToSS()', () => {
  const cases: {
    input: string
    output: string
  }[] = [
    {
      input: '2023-05-01T01:00:00.000Z',
      output: '2023-04-30T03:00:00.000Z',
    },
    {
      input: '2023-05-01T03:00:00.000Z',
      output: '2023-04-30T03:00:00.000Z',
    },
    {
      input: '2023-05-01T05:00:00.000Z',
      output: '2023-04-30T03:00:00.000Z',
    },
    {
      input: '2023-05-01T08:00:00.000Z',
      output: '2023-05-01T03:00:00.000Z',
    },
    {
      input: '2024-01-01T07:00:00.000Z',
      output: '2023-12-31T03:00:00.000Z',
    },
    {
      input: '2024-01-01T08:00:00.000Z',
      output: '2024-01-01T03:00:00.000Z',
    },
  ]
  test.each(cases)('$input -> $output', () => {
    cases.forEach(({ input, output }) =>
      expect(getDateRelativeToSS(new Date(input)).toISOString()).toEqual(
        output,
      ),
    )
  })
})
