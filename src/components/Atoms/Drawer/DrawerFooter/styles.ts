import styled from 'styled-components'
import { InnerContainer, Shadow } from 'styles'

export const DrawerFooter = styled.div`
  padding-top: 22px;
  padding-bottom: 18px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};

  font-size: 16px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.onPrimary};

  * {
    font-size: 16px;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.colors.onPrimary};
  }

  ${InnerContainer}
  ${Shadow}
`
