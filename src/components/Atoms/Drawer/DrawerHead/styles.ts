import styled, { DefaultTheme } from 'styled-components'
import { InnerContainer, Shadow, Clickable } from 'styles'
import { ReactComponent as ArrowIconSvg } from 'assets/svgs/arrowBack.svg'

export const DrawerHead = styled.div`
  padding-top: 22px;
  padding-bottom: 18px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};

  ${InnerContainer}
  ${Shadow}
`

export const ArrowIcon = styled(ArrowIconSvg)`
  ${Clickable}

  margin-right: 24px;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  fill: ${({ theme }) => (theme as DefaultTheme).colors.onPrimary};
`

export const ContentWrapper = styled.div`
  font-size: 16px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.onPrimary};

  * {
    font-size: 16px;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.colors.onPrimary};
  }
`
