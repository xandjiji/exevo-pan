import styled, { css } from 'styled-components'
import { ActiveCount } from 'components/Atoms'

const largeStyle = css`
  margin-left: auto;
  margin-right: auto;
  width: min-content;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`

export const Ul = styled.ul`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 520px) and (max-width: 1023px), (min-width: 1200px) {
    &[data-mounts='false'] {
      ${largeStyle}
    }
  }

  @media (min-width: 620px) and (max-width: 767px), (min-width: 1600px) {
    &[data-mounts='true'] {
      ${largeStyle}
    }
  }
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
