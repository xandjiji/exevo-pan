/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import styled from 'styled-components'
import { Smooth, InnerContainer } from 'styles'
import ErrorIconSvg from 'assets/svgs/error.svg'

export const Wrapper = styled.main`
  position: relative;
  z-index: 99;
  width: 100vw;
  height: 100%;

  * {
    ${Smooth}
  }
`

export const Top = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 50%;
  background-color: var(--surface);
`

export const Title = styled.span`
  font-size: 64px;
  font-weight: 700;
  letter-spacing: 8px;
  color: var(--primary);
`

export const Bottom = styled.div`
  padding-top: 6px;
  width: 100%;
  height: 50%;
  background-color: var(--primary);
  text-align: center;
`

export const ErrorIcon = styled(ErrorIconSvg)`
  margin-bottom: 32px;
  width: 128px;
  height: 128px;
  fill: var(--onPrimary);
`

export const Paragraph = styled.p`
  margin-bottom: 8px;
  font-size: 14px;
  letter-spacing: 1.5px;
  color: var(--onPrimary);
`

export const Nav = styled.nav`
  margin-top: 8px;
  ${InnerContainer}
`

export const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

export const Li = styled.li`
  margin-top: 12px;

  &:not(:last-child) {
    margin-right: 12px;

    &::after {
      content: '|';
      margin-left: 12px;
      font-size: 14px;
      color: var(--separator);
    }
  }
`

export const A = styled.a`
  font-size: 14px;
  letter-spacing: 0.5px;
  color: var(--onPrimary);
  cursor: pointer;
`
