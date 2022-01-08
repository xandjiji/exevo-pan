import styled from 'styled-components'
import CheckSvg from 'assets/svgs/check.svg'
import { Smooth, Shadow } from 'styles'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  * {
    ${Smooth}
  }
`

export const Circle = styled.div`
  position: relative;
  display: grid;
  place-items: center;

  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--separator);

  font-size: 16px;
  font-weight: 700;
  color: var(--onSurface);

  svg {
    width: 19px;
    height: 19px;
    fill: var(--onSurface);
  }
`

export const Title = styled.h2`
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);

  font-size: 16px;
  letter-spacing: 0.5px;
  color: var(--onSurface);
  white-space: nowrap;
  font-weight: 300;
`

export const Separator = styled.div`
  margin: 0 16px;
  flex-grow: 1;
  height: 3px;
  width: 100%;
  background-color: var(--separator);
  opacity: 0.5;
`

export const StepItem = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;

  &[aria-current='step'],
  &[data-completed='true'] {
    ${Circle} {
      background-color: var(--primary);
      color: var(--onPrimary);

      svg {
        fill: var(--onPrimary);
      }
    }
  }

  &[aria-current='step'] {
    ${Title} {
      font-weight: 700;
    }

    ${Circle} {
      ${Shadow}
    }
  }

  &[data-completed='true'] {
    ${Separator} {
      background-color: var(--primary);
    }
  }
`

export const CompletedIcon = styled(CheckSvg)`
  fill: var(--onPrimary);
  animation-timing-function: ease-out;
  animation-duration: 0.5s;
  animation-name: fadeIn;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
