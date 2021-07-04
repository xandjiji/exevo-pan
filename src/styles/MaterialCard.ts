import { css } from 'styled-components'

export default css`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 5px;

  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.onSurface};

  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.14);
`
