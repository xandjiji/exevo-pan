import styled from 'styled-components'
import { MaterialCard } from 'styles'
import CrossIconSvg from 'assets/svgs/cross.svg'

export const Wrapper = styled.section`
  ${MaterialCard}
  text-align: center;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const GuildWrapper = styled.div`
  text-align: center;
`

export const GuildName = styled.h4`
  font-size: 16px;
  font-weight: 400;
  color: var(--onSurface);
`

export const ScoreCount = styled.span<{ winning: boolean }>`
  font-size: 32px;
  font-weight: 700;
  color: ${({ winning }) => (winning ? 'var(--green)' : 'var(--red)')};
`

export const VsIcon = styled(CrossIconSvg)`
  margin: 8px 24px;
  fill: var(--onSurface);
  opacity: 0.4;
`
