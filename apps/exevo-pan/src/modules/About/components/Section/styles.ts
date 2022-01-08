import styled from 'styled-components'
import { Smooth, Clickable } from 'styles'
import AnchorSvg from 'assets/svgs/anchor.svg'

export const Section = styled.section`
  position: relative;

  &:not(:last-child) {
    margin-bottom: 64px;

    &::after {
      content: '';
      position: absolute;
      top: calc(100% + 32px);
      left: 0;
      width: 30%;
      min-width: 200px;
      max-width: 400px;
      height: 1px;
      background-color: var(--separator);
      opacity: 0.7;
    }
  }

  p,
  span {
    font-size: 16px;
    line-height: 1.6;
    font-weight: 300;

    strong {
      font-weight: 400;
    }

    a {
      position: relative;
      color: var(--primary);
      filter: brightness(130%);

      ${Smooth}

      &::selection {
        background: var(--primary);
        color: var(--onPrimary);
      }

      &:hover {
        opacity: 0.75;
      }

      &::after {
        content: '';
        position: absolute;
        top: calc(100% - 1px);
        left: 0;
        width: 16px;
        height: 1px;
        background-color: var(--primary);
        opacity: 0.75;
      }
    }

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    [role='img'] {
      font-size: 19px;
    }
  }
`

export const Title = styled.h2`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: 300;
  letter-spacing: 0.5px;

  a {
    color: var(--primary);
    filter: brightness(130%);
  }
`

export const AnchorIcon = styled(AnchorSvg)`
  padding: 2px;
  margin-top: 1px;
  margin-left: 8px;
  border-radius: 4px;
  fill: var(--separator);
  cursor: pointer;
  ${Clickable}
`
