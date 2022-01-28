import styled from 'styled-components'
import { InnerContainer } from 'styles'
import UnlicenseSvg from 'assets/svgs/unlicense.svg'

export const Wrapper = styled.footer`
  ${InnerContainer}
  padding-top: 24px;
  padding-bottom: 24px;

  position: relative;
  z-index: 71;

  background-color: var(--primary);
  transition: background-color 0.2s ease-out;

  &,
  a {
    font-size: 10px;
    letter-spacing: 0.5px;
    color: var(--onPrimary);
  }
`

export const Title = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const UnlicenseIcon = styled(UnlicenseSvg)`
  margin: 0 4px;
  width: 12px;
  height: 12px;
  path {
    fill: var(--onPrimary);
  }
`

export const Nav = styled.nav`
  ${InnerContainer}
`

export const Ul = styled.ul`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

export const Li = styled.li`
  &:not(:last-child)::after {
    content: '|';
    margin-left: 12px;
    font-size: 14px;
    color: var(--onPrimary);
    opacity: 0.5;
  }
`

export const A = styled.a`
  && {
    font-size: 14px;
    letter-spacing: 0.5px;
    color: var(--onPrimary);
    cursor: pointer;

    @media (min-width: 768px) {
      font-size: 16px;
    }
  }
`
