import * as S from './styles'
import { CharacterModalProps } from './types'

const CharacterModal = ({
  open,
  characterData,
}: CharacterModalProps): JSX.Element | null => {
  if (!open || !characterData) return null

  return <S.Wrapper>modal</S.Wrapper>
}

export default CharacterModal
