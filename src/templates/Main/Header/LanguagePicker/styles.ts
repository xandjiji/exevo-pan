import styled from 'styled-components'
import LanguageSvg from 'assets/svgs/language.svg'
import { Clickable, MaterialCard, Smooth } from 'styles'

export const LanguageIcon = styled(LanguageSvg)`
  border-radius: 50%;
  fill: var(--onPrimary);
  ${Clickable}
`

export const FixedWrapper = styled.div`
  position: fixed;
  z-index: 10;
  transform: translate(calc(-50% + 12px), -50%);
  height: 10px;
  width: 100px;
  ${Smooth}
`

export const Wrapper = styled.div`
  position: relative;
  height: 24px;

  :not(:hover) ${FixedWrapper} {
    opacity: 0;
    pointer-events: none;
  }
`

export const Picker = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  ${MaterialCard}
  width: fit-content;

  > *:not(:last-child) {
    margin-bottom: 6px;
  }
`

export const Item = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`
