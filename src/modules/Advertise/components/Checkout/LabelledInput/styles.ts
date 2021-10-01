import styled, { css } from 'styled-components'
import { Input as BaseInput } from 'components/Atoms'
import InvalidSvg from 'assets/svgs/invalid.svg'
import ValidSvg from 'assets/svgs/valid.svg'
import { Smooth, Spinner, RollInAnimation } from 'styles'

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
  ${RollInAnimation}
  fill: var(--green);
`

export const Loading = styled(Spinner)`
  ${IconStyle}

  &::after {
    background-color: var(--surface);
  }
`
