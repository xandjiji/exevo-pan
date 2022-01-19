import styled from 'styled-components'
import ArrowSvg from 'assets/svgs/chevronDown.svg'

export const Wrapper = styled.div``

export const ArrowIcon = styled(ArrowSvg)`
  margin-left: auto;
  border-radius: 4px;
  flex-shrink: 0;
  fill: var(--onSurface);
  transition: transform 0.15s ease-out;
`

export const Button = styled.button`
  padding: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  cursor: pointer;
  transition: padding 0.15s ease-out;

  &[aria-expanded='true'] {
    padding: 8px 0;

    ${ArrowIcon} {
      transform: rotate(180deg);
    }
  }
`

export const Content = styled.div``
