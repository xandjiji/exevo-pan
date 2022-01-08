import styled, { css } from 'styled-components'
import LanguageSvg from 'assets/svgs/language.svg'
import { Clickable, MaterialCard } from 'styles'

export const Wrapper = styled.div`
  height: 24px;
`

export const LanguageIcon = styled(LanguageSvg)`
  border-radius: 50%;
  fill: var(--onPrimary);
  ${Clickable}
`

const visibilityStyle = css`
  transition: opacity 0.2s ease-out;

  &[aria-hidden='true'] {
    opacity: 0;
    pointer-events: none;
  }
`

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.1);

  ${visibilityStyle}
`

export const Picker = styled.div`
  position: fixed;
  transform: translate(-50%, 6px);
  z-index: 10;

  ${MaterialCard}
  width: fit-content;

  > *:not(:last-child) {
    margin-bottom: 8px;
  }

  ${visibilityStyle}
`
