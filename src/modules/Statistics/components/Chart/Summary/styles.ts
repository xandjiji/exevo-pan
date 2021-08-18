import styled from 'styled-components'
import { Smooth } from 'styles'
import TrendingIconSvg from 'assets/svgs/trending.svg'
import { PositiveStyleProps } from './types'

export const Wrapper = styled.div`
  * {
    ${Smooth}
  }
`

export const Title = styled.h4`
  font-size: 14px;
  font-weight: 300;
  color: var(--onSurface);
`

export const Value = styled.span`
  margin: 6px 0 4px 0;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: var(--onSurface);
`

export const TrendIcon = styled(TrendingIconSvg)`
  margin-right: 4px;
  width: 16px;
  height: 16px;
`

export const Percentage = styled.span<PositiveStyleProps>`
  display: flex;
  align-items: center;

  font-size: 12px;
  font-weight: 600;
  color: ${({ positive }) => (positive ? 'var(--green)' : 'var(--red)')};

  ${TrendIcon} {
    fill: ${({ positive }) => (positive ? 'var(--green)' : 'var(--red)')};
    transform: ${({ positive }) => (positive ? 'none' : 'scaleY(-1)')};
  }
`
