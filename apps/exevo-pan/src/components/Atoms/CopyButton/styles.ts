import styled, { css } from 'styled-components'
import CopySvg from 'assets/svgs/copy.svg'
import CheckSvg from 'assets/svgs/valid.svg'
import { Clickable, RollInAnimation } from 'styles'

export const Button = styled.button`
  ${Clickable}
  display: grid;
  place-items: center;
  border-radius: 4px;
  background-color: var(--surface);
  overflow: hidden;
`

const IconStyle = css`
  width: 24px;
  height: 24px;
  padding: 3px;
`

export const CopyIcon = styled(CopySvg)`
  ${IconStyle}
  fill: var(--onSurface);
`

export const ValidIcon = styled(CheckSvg)`
  ${IconStyle}
  ${RollInAnimation}
  fill: var(--green);
`
