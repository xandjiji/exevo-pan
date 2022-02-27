import styled from 'styled-components'

export const BattleyeStatus = styled.div`
  margin-right: 4px;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: solid 1px #00000020;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.14);
  background-color: var(--battleYellow);

  &[data-battleye-protected='true'] {
    background-color: var(--battleGreen);
  }
`
