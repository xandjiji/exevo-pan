import styled from 'styled-components'
import { Smooth } from 'styles'

export const Li = styled.li`
  flex: none;
  height: min-content;
  ${Smooth}

  &:not(:last-child) {
    margin: 0 24px 0 0;
  }

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

  @media (min-width: 1024px) {
    &:not(:last-child) {
      margin: 0 0 12px 0;
    }

    a,
    &::before {
      color: var(--onSurface);
    }

    a {
      white-space: unset;

      &:hover {
        color: var(--primary);
      }
    }

    &[aria-current='step'] {
      a,
      &::before {
        color: var(--primaryHighlight);
      }
    }
  }
`
