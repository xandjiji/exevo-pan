import * as S from './styles'
import { CharacterModalProps } from './types'

const CharacterModal = ({
  open,
  characterData,
  onClose,
}: CharacterModalProps): JSX.Element | null => {
  if (!open || !characterData) return null

  return (
    <>
      <S.Wrapper>modal</S.Wrapper>
      <S.Backdrop onClick={onClose} />
    </>
  )
}

export default CharacterModal
