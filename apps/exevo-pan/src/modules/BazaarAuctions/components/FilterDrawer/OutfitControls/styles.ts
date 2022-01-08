import styled from 'styled-components'
import { Switch as BaseSwitch } from 'components/Atoms'

export const Wrapper = styled.div`
  margin-top: 2px;
  margin-bottom: 8px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  width: 100%;
`

export const SwitchWrapper = styled.div`
  margin-right: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;

  font-size: 12px;
  cursor: pointer;

  @media (min-width: 450px) {
    width: unset;
  }
`

export const Switch = styled(BaseSwitch)`
  > * {
    margin: 0;
  }
`
