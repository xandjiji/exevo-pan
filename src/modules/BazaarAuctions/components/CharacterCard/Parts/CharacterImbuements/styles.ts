import styled from 'styled-components'
import MagicSvg from 'assets/svgs/magic.svg'
import { ImbuementStyleProps } from './types'

export const Wrapper = styled.div`
  margin-bottom: 12px;
  font-size: 12px;
`

export const Icon = styled(MagicSvg)`
  margin-right: 4px;
  width: 18px;
  height: 18px;
  transform: translateY(3px);
  fill: var(--onSurface);
`

export const Imbuement = styled.span<ImbuementStyleProps>`
  display: block;
  font-size: 12px;
  text-align: left;

  font-weight: ${({ highlight }) => (highlight ? 600 : 400)};
  color: ${({ highlight }) =>
    highlight ? 'var(--primary)' : 'var(--onSurface)'};

  &::before {
    content: '·';
    margin-right: 4px;
    font-weight: 800;
    color: ${({ highlight }) =>
      highlight ? 'var(--primary)' : 'var(--onSurface)'};
  }

  &:not(:last-child) {
    margin-bottom: 2px;
  }
`
