import { memo } from 'react'
import { useTranslations } from 'contexts/useTranslation'
import Image from 'next/image'
import { useOnImageLoad } from 'hooks'
import * as S from './styles'
import { SpritePortraitProps } from './types'

const SpritePortrait = ({
  offset = false,
  src,
  alt,
  width,
  height,
  onError,
  ...props
}: SpritePortraitProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const [loaded, onLoad] = useOnImageLoad()

  return (
    <S.Wrapper {...props} data-offset={offset} data-loaded={loaded}>
      <Image
        alt={alt}
        src={src}
        layout="fixed"
        width={width}
        height={height}
        onLoad={onLoad}
        onError={onError}
        unoptimized
      />
      {!loaded && (
        <S.Spinner
          role="alert"
          aria-label={common.LoadingLabel}
          aria-busy="true"
        />
      )}
    </S.Wrapper>
  )
}

export default memo(SpritePortrait)
