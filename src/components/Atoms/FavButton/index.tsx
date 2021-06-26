import { useState } from 'react'
import * as S from './styles'
import { FavButtonProps } from './types'

const FavButton = ({
  characterObject,
  ...props
}: FavButtonProps): JSX.Element => {
  const [active, setActive] = useState<boolean>(false)
  return (
    <S.FavButton
      active={active}
      onClick={() => setActive(prev => !prev)}
      {...props}
    >
      <S.HeartIcon />
    </S.FavButton>
  )
}

export default FavButton
