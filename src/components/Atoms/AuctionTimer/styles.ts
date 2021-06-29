import styled from 'styled-components'
import { CountdownProps } from './types'

export const Countdown = styled.span<CountdownProps>`
  ${({ endingSoon, theme }) => endingSoon && `color: ${theme.colors.red};`}
  transition: color 0.2s ease-out;
`
