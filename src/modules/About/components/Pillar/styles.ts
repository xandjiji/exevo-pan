import styled from 'styled-components'

export const Aside = styled.aside`
  position: sticky;
  top: 60px;
  left: 0;
`

export const Nav = styled.nav`
  position: absolute;
  right: 100%;
  margin-right: 32px;
`

export const Title = styled.h3`
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 400;
  color: var(--onSurface);
`

export const Ul = styled.ul`
  padding: 6px 12px;
  border-left: solid 1px var(--separator);

  > *:not(:last-child) {
    margin-bottom: 12px;
  }
`

export const Li = styled.li`
  font-size: 12px;
  font-weight: 300;
  color: var(--onSurface);
`
