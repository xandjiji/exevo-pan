import styled, { css } from 'styled-components'
import { Tabs as BaseTabs } from 'components/Atoms'
import { MaterialCard, CustomScrollbar } from 'styles'

const LATERAL_MARGIN = 14
const CARD_FIXED_HEIGHT = 450
const GRID_MOBILE_HEIGHT = '60vh'

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
    width: 1012px;
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
  height: ${GRID_MOBILE_HEIGHT};
  overflow-y: auto;
  /* overflow-x: hidden; */
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
      z-index: 4;
    }
  `,
  Right: styled(Column)`
    width: 100%;
  `,
}

export const Section = styled(Spacer)`
  padding-bottom: 12px;
  border-bottom: solid 0.5px var(--separator);
`

export const SectionText = styled.div`
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
    flex-wrap: wrap;
    gap: 8px;
    justify-content: space-evenly;

    position: sticky;
    top: 0px;
    z-index: 2;
    box-shadow: 0px -${LATERAL_MARGIN}px 0px ${LATERAL_MARGIN}px var(--surface);

    @media (min-width: 768px) {
      justify-content: unset;
    }

    @media (min-width: 1100px) {
      gap: unset;
    }
  }
`

export const PanelWrapper = styled.div`
  min-height: ${GRID_MOBILE_HEIGHT};

  @media (min-width: 768px) {
    min-height: unset;
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
