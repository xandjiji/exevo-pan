/* eslint-disable import/no-extraneous-dependencies */
import { axe } from 'jest-axe'

export const assertNoA11yViolations = async (
  container: Element,
): Promise<void> => {
  const results = await axe(container)
  expect(results).toHaveNoViolations()
}
