import styled, { css } from 'styled-components'
import { Tabs as BaseTabs } from 'components/Atoms'
import { MaterialCard, CustomScrollbar } from 'styles'

export const Wrapper = styled.div`
  ${MaterialCard}
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 72;
  transform: translate(-50%, -50%);

  width: 100%;
  max-width: 400px;

  @media (min-width: 768px) {
    width: fit-content;
    max-width: calc(100% - 80px);
  }
`

export const Backdrop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 71;
  transform: translate(-50%, -50%);

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`

export const ScrollableContainer = styled.div`
  margin: 0 -12px;
  padding: 0 12px;
  max-height: 60vh;
  overflow: auto;
  ${CustomScrollbar}

  @media(min-width: 768px) {
    max-height: unset;
    overflow: unset;
  }
`

const layoutSpacing = css`
  display: grid;
  gap: 16px;
`

export const Grid = styled.div`
  padding-top: 3px;
  ${layoutSpacing}

  @media(min-width: 768px) {
    display: flex;
    height: 382px;

    overflow: auto;
    ${CustomScrollbar}
  }
`

const Column = styled.div`
  ${layoutSpacing}
`

export const DesktopColumn = {
  Left: styled(Column)`
    flex-shrink: 0;
    max-width: 360px;

    @media (min-width: 768px) {
      position: sticky;
      top: 3px;
    }
  `,
  Right: styled(Column)`
    max-width: 470px;
  `,
}

export const Section = styled.div`
  padding-bottom: 12px;
  border-bottom: solid 0.5px var(--separator);

  ${layoutSpacing}
`

export const SectionText = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;

  font-size: 12px;
  font-weight: 400;
`

export const CoinsValue = styled.strong`
  font-weight: 400;

  &[data-active='true'] {
    color: var(--primary);
    filter: brightness(130%);
    font-weight: 700;
  }
`

export const CheckboxWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 8px;
  grid-auto-flow: column;
`

export const Tabs = styled(BaseTabs)`
  display: flex;
  flex-direction: column;

  [role='tablist'] {
    flex-shrink: 0;
  }
`

export const SpriteSection = styled(Section)`
  padding-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  border-bottom: none;
`

export const TooltipSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 8px;

  > * {
    width: fit-content;
  }

  @media (min-width: 768px) {
    border-bottom: none;
  }
`
