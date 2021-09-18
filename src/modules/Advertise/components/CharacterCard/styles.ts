import styled from 'styled-components'
import BaseCharacterCard, {
  CardSkeleton as BaseCardSkeleton,
} from 'components/CharacterCard'

export const CharacterCard = styled(BaseCharacterCard)`
  button {
    display: none;
  }
`

export const CardSkeleton = styled(BaseCardSkeleton)`
  button {
    display: none;
  }
`
