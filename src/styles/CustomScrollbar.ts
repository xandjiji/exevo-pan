import { css } from 'styled-components'

const CustomScrollbar = css`
  scrollbar-color: var(--primaryVariant) transparent;
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--primaryVariant);
    border-radius: 2px;
  }
`

export default CustomScrollbar
