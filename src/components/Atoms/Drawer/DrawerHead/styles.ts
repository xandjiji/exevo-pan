import styled from 'styled-components'
import { InnerPadding, Shadow, Clickable } from 'styles'
import ArrowIconSvg from 'assets/svgs/arrowBack.svg'

export const DrawerHead = styled.div`
  display: flex;
  align-items: center;
  flex: none;
  height: 60px;
  background-color: var(--primary);

  ${InnerPadding}
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
  fill: var(--onPrimary);
`

export const ContentWrapper = styled.div`
  font-size: 16px;
  letter-spacing: 0.5px;
  color: var(--onPrimary);
  width: 100%;

  * {
    font-size: 16px;
    letter-spacing: 0.5px;
    color: var(--onPrimary);
  }
`
