import styled from 'styled-components'
import LanguageSvg from 'assets/svgs/language.svg'
import { Clickable, MaterialCard } from 'styles'

export const Wrapper = styled.div`
  position: relative;
  height: 24px;
`

export const LanguageIcon = styled(LanguageSvg)`
  border-radius: 50%;
  fill: var(--onPrimary);
  ${Clickable}
`

export const Picker = styled.div`
  position: absolute;
  position: fixed;
  top: 50%;
  right: calc(100% + 8px);
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translateY(-50%);
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
