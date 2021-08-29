import styled from 'styled-components'

export const Wrapper = styled.div``

export const GuildName = styled.h4`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 400;
  color: var(--onSurface);
  letter-spacing: 0.5px;
`

export const Kills = styled.span<{ winning: boolean }>`
  position: relative;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  font-size: 44px;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${({ winning }) => (winning ? 'var(--green)' : 'var(--red)')};
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
`

export const Label = styled.span`
  display: block;
  font-size: 10px;
  font-weight: 300;
  color: var(--onSurface);
  text-transform: uppercase;
  letter-spacing: 1px;
`
