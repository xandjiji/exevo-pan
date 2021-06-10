import styled from 'styled-components'
import { CountdownProps } from './types'

export const Countdown = styled.span<CountdownProps>`
  ${({ endingSoon }) => endingSoon && 'color: var(--red)'}
`
