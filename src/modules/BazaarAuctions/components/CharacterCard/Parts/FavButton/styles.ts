import styled, { css } from 'styled-components'
import { ReactComponent as HeartIconComponent } from 'assets/svgs/heart.svg'
import { Shadow, Clickable, Smooth } from 'styles'
import { FavButtonStyleProps } from './types'

const activeIconStyle = css`
  .hollow {
    opacity: 0;
  }
  .filled {
    opacity: 0.65;
  }
`

export const HeartIcon = styled(HeartIconComponent)`
  padding: 6px;
  width: 36px;
  height: 36px;
  fill: ${({ theme }) => theme.colors.onSurface};
  ${Smooth}

  path {
    transition: opacity 0.12s ease-out;
  }

  .filled {
    fill: ${({ theme }) => theme.colors.red};
    opacity: 0;
  }
`

const activeShadow = css`
  box-shadow: inset 2px 2px rgba(0, 0, 0, 0.14) !important;
`

export const FavButton = styled.button<FavButtonStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.surface};
  user-select: none;

  ${Smooth}
  ${Shadow}
  ${Clickable}

  ${({ active }) => active && activeShadow}
  &:active {
    ${activeShadow}
  }

  &:hover {
    box-shadow: 3px 3px 5px 3px rgba(0, 0, 0, 0.14);
  }

  ${HeartIcon} {
    ${({ active }) => active && activeIconStyle}
  }
`
