import styled from 'styled-components'
import { Clickable, Shadow } from 'styles'
import ExternalIconSvg from 'assets/svgs/external.svg'

export const Wrapper = styled.div``

export const GuildName = styled.h4`
  margin: 0 auto;
  width: fit-content;
  position: relative;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 400;
  color: var(--onSurface);
  letter-spacing: 0.5px;

  @media (min-width: 1024px) {
    font-size: 24px;
  }
`

export const Link = styled.a`
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  font-size: 0;

  @media (min-width: 1024px) {
    left: calc(100% + 6px);
  }
`

export const ExternalIcon = styled(ExternalIconSvg)`
  padding: 2px;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  fill: var(--onSurface);
  ${Clickable}
`

export const DisplayNumber = styled.span<{ winning: boolean }>`
  position: relative;
  font-size: 44px;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${({ winning }) => (winning ? 'var(--green)' : 'var(--red)')};

  @media (min-width: 1024px) {
    font-size: 80px;
  }
`

export const Diff = styled.span`
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);

  padding: 4px 8px;
  margin-left: 8px;
  background-color: var(--alert);
  border-radius: 4px;
  font-size: 12px;
  color: #000;
  ${Shadow}

  @media (min-width: 1024px) {
    margin-left: 16px;
    font-size: 20px;
  }
`

export const Label = styled.span`
  display: block;
  font-size: 10px;
  font-weight: 300;
  color: var(--onSurface);
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`
