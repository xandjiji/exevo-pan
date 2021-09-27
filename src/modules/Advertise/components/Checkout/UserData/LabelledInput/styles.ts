import styled, { css } from 'styled-components'
import { Input as BaseInput } from 'components/Atoms'
import InvalidSvg from 'assets/svgs/invalid.svg'
import ValidSvg from 'assets/svgs/valid.svg'
import { Smooth, Spinner } from 'styles'

export const Label = styled.label`
  margin-bottom: 6px;
  display: block;
  font-size: 12px;
`

export const Input = styled(BaseInput)`
  input {
    padding-right: 30px;
  }
`

export const Wrapper = styled.div<{ valid: boolean }>`
  position: relative;

  ${({ valid }) =>
    valid &&
    css`
      ${Input} > div {
        border-color: var(--green);
      }
    `}
`

const IconStyle = css`
  position: absolute;
  bottom: 24px;
  right: 8px;

  width: 16px;
  height: 16px;
  ${Smooth}

  &[aria-hidden='true'] {
    opacity: 0;
    visibility: hidden;
  }
`

export const InvalidIcon = styled(InvalidSvg)`
  ${IconStyle}
  fill: var(--red);
`

export const ValidIcon = styled(ValidSvg)`
  ${IconStyle}
  fill: var(--green);

  animation-timing-function: ease-in;
  animation-duration: 0.8s;
  animation-name: rollIn;

  @keyframes rollIn {
    from {
      opacity: 0;
      transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 200deg);
    }
    20% {
      transform: translate3d(75%, 0, 0) rotate3d(0, 0, 1, 150deg);
    }
    40% {
      opacity: 1;
      transform: translate3d(-10%, 0, 0) rotate3d(0, 0, 1, -30deg);
    }
    60% {
      transform: translate3d(5%, 0, 0) rotate3d(0, 0, 1, 15deg);
    }
    to {
      transform: none;
    }
  }
`

export const Loading = styled(Spinner)`
  ${IconStyle}

  &::after {
    background-color: var(--surface);
  }
`
