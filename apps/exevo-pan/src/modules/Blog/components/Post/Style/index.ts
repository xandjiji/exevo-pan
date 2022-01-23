import styled from 'styled-components'
import { MaterialCard, InnerPadding, Smooth } from 'styles'
import { headings } from './headings'
import { bold } from './bold'
import { link } from './link'
import { code } from './code'
import { lists } from './lists'
import { blockquote } from './blockquote'

export const ContentWrapper = styled.main`
  ${MaterialCard}
  ${InnerPadding}

  padding-top: 32px;
  padding-bottom: 32px;

  position: relative;
  z-index: 1;
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;

  display: flex;
  flex-direction: column;
  gap: 16px;

  font-size: 16px;
  line-height: 1.6;
  font-weight: 300;
  color: var(--onSurface);

  ${Smooth}

  * {
    ${Smooth}
  }

  ${headings}
  ${bold}
  ${link}
  ${code}
  ${lists}
  ${blockquote}
`

export { default as HeadingSection } from './HeadingSection'
export { default as Table } from './Table'
