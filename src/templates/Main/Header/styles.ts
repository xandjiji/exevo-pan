import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import ExevoPanLogoImage from 'assets/logo.png'
import { ReactComponent as MoonIconSvg } from 'assets/svgs/moon.svg'
import { InnerContainer, CustomScrollbar, Clickable } from 'styles'

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
  ${CustomScrollbar}

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
  margin-right: 24px;
  display: flex;
`

export const Ul = styled.ul`
  display: flex;
  align-items: center;
`

export const Li = styled.li`
  &:not(:last-child) {
    margin-right: 8px;
  }
`

export const Navigation = styled(NavLink)`
  padding: 8px 16px;
  font-size: 14px;
  letter-spacing: 0.5px;
  border-radius: 9px;
  color: ${({ theme }) => theme.colors.onPrimary};
  white-space: nowrap;

  ${Clickable}
  &.active {
    box-shadow: inset 3px 3px rgb(0 0 0 / 14%);
  }
`

export const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const MoonIcon = styled(MoonIconSvg)``
