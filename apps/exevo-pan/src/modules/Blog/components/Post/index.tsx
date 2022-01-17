import styled from 'styled-components'
import { MaterialCard, Smooth } from 'styles'
import { headings } from './headings'
import { bold } from './bold'
import { link } from './link'
import { code } from './code'
import { lists } from './lists'
import { blockquote } from './blockquote'
import { table } from './table'

export const Wrapper = styled.div`
  ${MaterialCard}
  padding: 32px 40px;
  margin: 0 auto;
  max-width: clamp(45ch, 50%, 75ch);

  display: grid;
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
  ${table}
`
