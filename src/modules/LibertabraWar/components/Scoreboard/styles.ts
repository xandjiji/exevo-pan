import styled from 'styled-components'
import { MaterialCard } from 'styles'
import CrossIconSvg from 'assets/svgs/cross.svg'

export const Wrapper = styled.section`
  ${MaterialCard}
  padding: 20px;
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
  letter-spacing: 0.5px;
`

export const ScoreCount = styled.span<{ winning: boolean }>`
  display: flex;
  align-items: center;
  font-size: 44px;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${({ winning }) => (winning ? 'var(--green)' : 'var(--red)')};
`

export const DiffCount = styled.span`
  padding: 4px 8px;
  margin-left: 8px;
  display: flex;
  align-items: center;

  background-color: var(--alert);
  border-radius: 4px;

  font-size: 12px;
  color: #000;
`

export const Label = styled.span`
  display: block;
  font-size: 10px;
  font-weight: 300;
  color: var(--onSurface);
  text-transform: uppercase;
  letter-spacing: 1px;
`

export const VsIcon = styled(CrossIconSvg)`
  margin: 8px 24px;
  fill: var(--onSurface);
  opacity: 0.4;
`
