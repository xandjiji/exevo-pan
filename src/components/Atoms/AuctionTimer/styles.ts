import styled from 'styled-components'
import { CountdownProps } from './types'

export const Countdown = styled.span<CountdownProps>`
  ${({ endingSoon }) => endingSoon && `color: var(--red);`}
  transition: color 0.2s ease-out;
`
export const EndTime = styled.span`
  color: var(--onSurface);
`
