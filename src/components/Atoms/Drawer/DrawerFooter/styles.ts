import styled from 'styled-components'
import { InnerPadding, Shadow } from 'styles'

export const DrawerFooter = styled.div`
  display: flex;
  align-items: center;
  flex: none;
  height: 60px;
  background-color: var(--primary);

  font-size: 16px;
  letter-spacing: 0.5px;
  color: var(--onPrimary);

  * {
    font-size: 16px;
    letter-spacing: 0.5px;
    color: var(--onPrimary);
  }

  ${InnerPadding}
  ${Shadow}
`
