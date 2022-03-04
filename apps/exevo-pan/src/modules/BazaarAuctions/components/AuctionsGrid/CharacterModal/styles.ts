import styled, { css } from 'styled-components'
import { Tabs as BaseTabs } from 'components/Atoms'
import { MaterialCard, CustomScrollbar } from 'styles'

const LATERAL_MARGIN = 14
const CARD_FIXED_HEIGHT = 382

const negativeContainer = css`
  margin-left: -${LATERAL_MARGIN}px;
  margin-right: -${LATERAL_MARGIN}px;
  padding-left: ${LATERAL_MARGIN}px;
  padding-right: ${LATERAL_MARGIN}px;
`

export const Wrapper = styled.div`
  ${MaterialCard}
  padding: ${LATERAL_MARGIN}px;

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

  @media (min-width: 1100px) {
    max-width: 1012px;
  }
`

export const Backdrop = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 71;
  transform: translate(-50%, -50%);

  width: 101vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`

export const Spacer = styled.div`
  display: grid;
  gap: 16px;
`

export const Grid = styled(Spacer)`
  height: 60vh;
  overflow: auto;
  ${negativeContainer}
  ${CustomScrollbar}

  @media(min-width:768px) {
    display: flex;
    gap: 24px;
    height: ${CARD_FIXED_HEIGHT}px;
  }
`

const Column = styled(Spacer)`
  height: fit-content;
`

export const DesktopColumn = {
  Left: styled(Column)`
    padding-top: 3px;

    @media (min-width: 768px) {
      flex-shrink: 0;
      min-width: 280px;
      max-width: fit-content;

      position: sticky;
      top: 0;
    }
  `,
  Right: Column,
}

export const Section = styled(Spacer)`
  padding-bottom: 12px;
  border-bottom: solid 0.5px var(--separator);
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

  @media (min-width: 768px) {
    max-width: 400px;
  }
`

export const TabGroup = styled(BaseTabs.Group)`
  display: block;
  overflow: unset;

  [role='tablist'] {
    padding-top: 2px;

    position: sticky;
    top: 0px;
    z-index: 2;
    box-shadow: -${LATERAL_MARGIN - 6}px -6px 0px 6px var(--surface);
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
    padding-bottom: 0;
    border-bottom: none;
  }
`
