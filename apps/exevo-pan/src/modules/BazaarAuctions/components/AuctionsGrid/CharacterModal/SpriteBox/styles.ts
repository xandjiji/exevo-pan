import styled from 'styled-components'
import { Shadow } from 'styles'

export const Wrapper = styled.div`
  &[data-show-addon='true'] {
    border-radius: 5px;
    padding-bottom: 8px;
    background-color: var(--primaryVariant);
    ${Shadow}

    * {
      box-shadow: none;
    }
  }

  &[data-rare='true'] {
    --primaryVariant: var(--primary);
  }
`

export const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`
