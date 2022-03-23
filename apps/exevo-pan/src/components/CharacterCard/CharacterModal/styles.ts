import styled, { css } from 'styled-components'
import { Tabs as BaseTabs, Dialog as BaseDialog } from 'components/Atoms'
import { CustomScrollbar } from 'styles'
import OutfitSvg from 'assets/svgs/outfit.svg'
import HorseSvg from 'assets/svgs/horse.svg'
import InboxSvg from 'assets/svgs/inbox.svg'

const LATERAL_MARGIN = 14
const CARD_FIXED_HEIGHT = 450
const CARD_MAX_MOBILE_WIDTH = 368

const GRID_MOBILE_HEIGHT = '60vh'
const SCROLLBAR_WIDTH = 6

const negativeContainer = css`
  margin-left: -${LATERAL_MARGIN}px;
  margin-right: -${LATERAL_MARGIN}px;
  padding-left: ${LATERAL_MARGIN}px;
  padding-right: ${LATERAL_MARGIN}px;
`

export const Dialog = styled(BaseDialog)`
  padding: ${LATERAL_MARGIN}px;

  width: 100%;
  max-width: ${CARD_MAX_MOBILE_WIDTH}px;
  outline: none;

  @media (min-width: 768px) {
    width: fit-content;
    max-width: calc(100% - 80px);
  }

  @media (min-width: 1100px) {
    width: 1029px;
  }
`

export const Spacer = styled.div`
  display: grid;
  gap: 16px;
`

export const ScrollableContainer = styled.div`
  overflow-y: auto;
  ${CustomScrollbar}
  ${negativeContainer}

  height: ${GRID_MOBILE_HEIGHT};

  @media (min-width: 768px) {
    height: ${CARD_FIXED_HEIGHT}px;
  }
`

export const Grid = styled(Spacer)`
  width: 100%;

  @media (min-width: 768px) {
    display: flex;
    gap: 24px;
  }
`

const Column = styled(Spacer)`
  height: fit-content;
`

export const DesktopColumn = {
  Left: styled(Column)`
    padding-top: 6px;

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
  min-height: ${GRID_MOBILE_HEIGHT};

  @media (min-width: 768px) {
    min-height: unset;
  }

  [role='tablist'] {
    padding-top: 2px;
    width: calc(100vw - ${2 * LATERAL_MARGIN + SCROLLBAR_WIDTH}px);
    max-width: calc(
      ${CARD_MAX_MOBILE_WIDTH}px - ${2 * LATERAL_MARGIN + SCROLLBAR_WIDTH}px
    );

    position: sticky;
    top: 0px;
    z-index: 2;
    box-shadow: 0px -${LATERAL_MARGIN}px 0px ${LATERAL_MARGIN}px var(--surface);

    @media (min-width: 768px) {
      width: unset;
      max-width: calc(100vw - 440px);
    }

    @media (min-width: 900px) {
      max-width: unset;
      box-shadow: 0px -${LATERAL_MARGIN}px 0px ${LATERAL_MARGIN - 2}px var(--surface);
    }
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

export const SpriteSectionDivisor = styled.div`
  padding: 6px 0;
  border-bottom: solid 1px var(--separator);
`

const iconStyle = css``

export const Icons = {
  Outfit: styled(OutfitSvg)`
    ${iconStyle}
  `,
  Mount: styled(HorseSvg)`
    ${iconStyle}
  `,
  Store: styled(InboxSvg)`
    ${iconStyle}
  `,
}
