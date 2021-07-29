import styled, { DefaultTheme } from 'styled-components'
import { InnerContainer, Shadow, Clickable } from 'styles'
import { ReactComponent as ArrowIconSvg } from 'assets/svgs/arrowBack.svg'

export const DrawerHead = styled.div`
  display: flex;
  align-items: center;
  flex: none;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};

  ${InnerContainer}
  ${Shadow}
`

export const BackButton = styled.button`
  padding: 2px;
  margin-right: 24px;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  font-size: 0;
  ${Clickable}
`

export const ArrowIcon = styled(ArrowIconSvg)`
  fill: ${({ theme }) => (theme as DefaultTheme).colors.onPrimary};
`

export const ContentWrapper = styled.div`
  font-size: 16px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.onPrimary};
  width: 100%;

  * {
    font-size: 16px;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.colors.onPrimary};
  }
`
