import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import ExevoPanLogoImage from 'assets/logo.png'
import { InnerContainer } from 'styles'

export const Wrapper = styled.header`
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
  background-color: ${({ theme }) => theme.colors.primary};
  ${InnerContainer}

  &::after {
    content: '';
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1;
    height: 60px;
    width: 32px;
    background-image: linear-gradient(
      to left,
      ${({ theme }) => theme.colors.primary},
      rgba(0, 0, 0, 0)
    );
    pointer-events: none;
  }
`

export const ExevoPanLogo = styled.img.attrs({
  src: ExevoPanLogoImage as string,
  alt: 'Exevo Pan',
  width: 36,
  height: 36,
})`
  margin-right: 18px;
`

export const Nav = styled.nav`
  display: flex;
`

export const Ul = styled.ul`
  display: flex;
  align-items: center;
`

export const Li = styled.li``

export const Navigation = styled(NavLink)`
  padding: 8px 16px;
  font-size: 14px;
  letter-spacing: 0.5px;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.onPrimary};
  white-space: nowrap;
`
