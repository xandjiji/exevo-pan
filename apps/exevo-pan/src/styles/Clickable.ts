import { css } from 'styled-components'

const Clickable = css`
  cursor: pointer;
  transition: box-shadow 0.2s ease-out;

  &:hover {
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.14);
  }

  &:active,
  &.active {
    box-shadow: inset 2px 2px rgba(0, 0, 0, 0.14);
  }
`

export default Clickable
