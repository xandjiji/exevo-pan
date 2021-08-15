import styled, { css } from 'styled-components'
import NextSvg from 'assets/svgs/next.svg'
import LastSvg from 'assets/svgs/last.svg'
import { Clickable } from 'styles'
import { CursorProps } from './types'

export const Wrapper = styled.div`
  text-align: right;
`
export const Tracker = styled.span`
  display: block;
  font-size: 12px;
  letter-spacing: 0.5px;
  color: var(--onSurface);
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
  fill: var(--onSurface);
  transition: opacity 0.2s ease-out;
`

export const NextIcon = styled(NextSvg)`
  ${iconStyle}
`

export const LastIcon = styled(LastSvg)`
  ${iconStyle}
`

export const Cursor = styled.button<CursorProps>`
  height: 32px;
  border-radius: 4px;
  cursor: pointer;

  ${Clickable}

  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'unset')};

  &[aria-disabled='true'] {
    pointer-events: none;

    ${NextIcon}, ${LastIcon} {
      opacity: 0.4;
    }
  }

  ${NextIcon}, ${LastIcon} {
    ${({ invert }) => invert && 'transform: rotate(180deg);'}
  }
`
