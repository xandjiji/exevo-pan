import { css } from 'styled-components'
import { Shadow } from './'

export default css`
  cursor: pointer;
  transition: box-shadow 0.2s ease-out;

  &:hover {
    ${Shadow}
  }

  &:active,
  &.active {
    box-shadow: inset 2px 2px rgba(0, 0, 0, 0.14);
  }
`
