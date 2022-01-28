import { memo } from 'react'
import Image from 'next/image'
import { useOnImageLoad } from 'hooks'
import * as S from './styles'
import { FadeImageProps } from './types'

const FadeImage = ({
  className,
  id,
  ...props
}: FadeImageProps): JSX.Element => {
  const [loaded, onLoad] = useOnImageLoad()

  return (
    <S.Wrapper className={className} id={id} data-loaded={loaded}>
      <Image {...props} onLoad={onLoad} />
    </S.Wrapper>
  )
}

export default memo(FadeImage)
