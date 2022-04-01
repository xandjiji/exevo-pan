import styled from 'styled-components'
import { ActiveCount } from 'components/Atoms'

export const Ul = styled.ul`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
`

export const Li = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  white-space: nowrap;

  &&:before {
    content: none;
  }
`

export const SpriteWrapper = styled.div`
  position: relative;
  width: min-content;
`

export const Percentage = styled(ActiveCount)`
  padding: 2px 4px;
  border-radius: 4px;
  width: fit-content;
  height: unset;
  position: absolute;
  top: -6px;
  right: 0;
  transform: translateX(50%);
  z-index: 2;
`
