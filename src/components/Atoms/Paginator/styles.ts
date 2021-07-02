import styled, { css } from 'styled-components'
import { ReactComponent as NextSvg } from 'assets/svgs/next.svg'
import { ReactComponent as LastSvg } from 'assets/svgs/last.svg'
import { Clickable } from 'styles'

interface CursorProps {
  invert?: boolean
}

export const Wrapper = styled.div`
  text-align: right;
`
export const Tracker = styled.span`
  display: block;
  font-size: 12px;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.onSurface};
`

export const CursorWrapper = styled.div`
  margin-top: 8px;
  display: flex;

  > *:not(:last-child) {
    margin-right: 16px;
  }
`
const iconStyle = css`
  width: 32px;
  fill: ${({ theme }) => theme.colors.onSurface};
  transition: opacity 0.2s ease-out;
`

export const NextIcon = styled(NextSvg)`
  ${iconStyle}
`

export const LastIcon = styled(LastSvg)`
  ${iconStyle}
`

export const Cursor = styled.div<CursorProps>`
  padding: 0;
  height: 32px;
  cursor: pointer;

  ${Clickable}

  ${NextIcon}, ${LastIcon} {
    ${({ invert }) => invert && 'transform: rotate(180deg);'}
  }
`
