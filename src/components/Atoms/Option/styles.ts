import styled, { css } from 'styled-components'
import { OptionStyleProps } from './types'

const highlightStyle = css`
  background-color: var(--primaryVariant);
`

export const Option = styled.option<OptionStyleProps>`
  padding: 8px 12px;
  width: 100%;
  background-color: var(--surface);
  transition: background-color 0.2s ease-out;

  font-size: 12px;
  font-weight: 300;
  color: var(--onSurface);

  cursor: pointer;

  ${({ highlighted }) => highlighted && highlightStyle}

  &:hover {
    ${highlightStyle}
  }
`
