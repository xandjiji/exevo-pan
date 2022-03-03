import styled from 'styled-components'
import { SpritePortrait as BaseSpritePortrait } from 'components/Atoms'
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
    filter: brightness(130%) saturate(80%);
  }
`

export const SpritePortrait = styled(BaseSpritePortrait)`
  pointer-events: none;
`

export const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`
