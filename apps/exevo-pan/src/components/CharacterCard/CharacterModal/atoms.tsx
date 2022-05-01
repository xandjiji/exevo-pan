import clsx from 'clsx'
import styled from 'styled-components'
import { Tabs as BaseTabs } from 'components/Atoms'
import { SectionProps } from './types'

const LATERAL_MARGIN = 14
const CARD_MAX_MOBILE_WIDTH = 368

const GRID_MOBILE_HEIGHT = '60vh'
const SCROLLBAR_WIDTH = 6

/*
    --lateralMargin: 14;
    --cardFixedHeight: 450;
    --cardMaxMobileWidth: 368;
    --gridMobileHeight: '60vh';
    --scrollbarWidth: 6;
*/

export const Spacer = ({
  className,
  ...props
}: JSX.IntrinsicElements['div']) => (
  <div className={clsx('grid gap-4', className)} {...props} />
)

export const Section = ({
  border = false,
  className,
  style,
  ...props
}: SectionProps) => (
  <Spacer
    className={clsx('border-b-separator pb-3', className)}
    style={{
      borderBottomStyle: 'solid',
      borderBottomWidth: border ? '0.5px' : 0,
      ...style,
    }}
    {...props}
  />
)

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
    color: var(--primaryHighlight);
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

export const SpriteSection = (args: JSX.IntrinsicElements['div']) => (
  <Section className="!flex w-full flex-wrap !gap-3 pt-3" {...args} />
)

export const TooltipSection = (args: JSX.IntrinsicElements['div']) => (
  <Section
    border
    className="child:w-fit grid grid-cols-1 !gap-2 md:border-b-transparent md:pb-0"
    {...args}
  />
)

export const SpriteSectionDivisor = (args: JSX.IntrinsicElements['div']) => (
  <div
    className="border-b-separator text-tsm py-[6px]"
    style={{
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
    }}
    {...args}
  />
)
