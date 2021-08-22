import styled from 'styled-components'
import { InnerContainer, Shadow, CustomScrollbar, Smooth } from 'styles'

export const Aside = styled.aside`
  ${InnerContainer}
  padding-top: 8px;
  padding-bottom: 8px;
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 10;
  width: 100%;
  background-color: var(--darkerPrimary);
  ${Shadow}

  @media (min-width: 768px) {
    position: sticky;
    top: 60px;
    left: 0;
    padding: 0;
    box-shadow: none;
  }
`

export const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    display: unset;
    position: absolute;
    right: 100%;
    margin-right: 24px;
  }
`

export const Title = styled.span`
  margin-right: 24px;
  display: block;
  font-size: 16px;
  color: var(--onPrimary);

  @media (min-width: 768px) {
    margin: 0 0 12px 0;
    color: var(--onSurface);
  }
`

export const Ul = styled.ul`
  position: relative;
  padding: 8px 0;
  margin: -8px 0;
  display: flex;
  overflow: auto;
  scroll-behavior: smooth;
  ${CustomScrollbar}

  > *:not(:last-child) {
    margin: 0 24px 0 0;
  }

  &::after {
    content: '';
    position: fixed;
    right: 0;
    top: 60px;
    z-index: 1;
    height: 36px;
    width: 32px;
    background-image: linear-gradient(
      to left,
      var(--darkerPrimary),
      rgba(0, 0, 0, 0)
    );
    pointer-events: none;
  }

  @media (min-width: 768px) {
    padding: 6px 12px;
    margin: 0;
    display: block;
    border-left: solid 1px var(--separator);

    > *:not(:last-child) {
      margin: 0 0 12px 0;
    }

    &::after {
      display: none;
    }
  }
`

export const Li = styled.li`
  ${Smooth}

  a {
    font-size: 12px;
    font-weight: 300;
    line-height: 1.6;
    white-space: nowrap;
  }

  &::before {
    content: '·';
    margin-right: 6px;
    font-weight: 700;
    opacity: 0;
  }

  a,
  &::before {
    color: var(--onPrimary);
    ${Smooth}
  }

  &[aria-current='step'] {
    &::before {
      opacity: 1;
    }
  }

  @media (min-width: 768px) {
    a,
    &::before {
      color: var(--onSurface);
    }

    a {
      white-space: nowrap;

      &:hover {
        color: var(--primary);
      }
    }

    &[aria-current='step'] {
      a,
      &::before {
        color: var(--primary);
        filter: brightness(130%);
      }
    }
  }
`
