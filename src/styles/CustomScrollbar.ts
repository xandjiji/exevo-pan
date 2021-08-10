import { css } from 'styled-components'

export default css`
  scrollbar-color: ${({ theme }) => theme.colors.primaryVariant} transparent;
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primaryVariant};
    border-radius: 2px;
  }
`
