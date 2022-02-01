import styled from 'styled-components'

export const UnfilledState = styled.div`
  display: none;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  mix-blend-mode: overlay;
`

export const Wrapper = styled.div<{ estimatedHeight: number }>`
  min-height: ${({ estimatedHeight }) => estimatedHeight}px;

  > * {
    margin: 0 auto;
    flex: none;
    flex-shrink: 0;
  }

  ins[data-ad-status='unfilled'] {
    display: none !important;

    ${UnfilledState} {
      display: block;
      opacity: 1;
    }
  }
`
