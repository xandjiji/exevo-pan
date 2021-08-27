import { useTranslation } from 'next-i18next'
import { useRef, useState, useEffect } from 'react'
import { useOnScreen } from 'hooks'
import * as S from './styles'

const SpritePortrait = ({
  src,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element => {
  const { t } = useTranslation('common')

  const ref = useRef<HTMLDivElement | null>()

  const [loaded, setLoaded] = useState<boolean>(!src)
  const [currentSrc, setCurrentSrc] = useState<string | undefined>()

  const onScreen = useOnScreen<HTMLDivElement>(ref)
  useEffect(() => {
    if (src && onScreen) setCurrentSrc(src)
  }, [onScreen])

  return (
    <S.Wrapper ref={ref as React.RefObject<HTMLDivElement>}>
      {src && (
        <S.Img
          src={currentSrc}
          aria-hidden={!currentSrc || !loaded}
          hidden={!currentSrc}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
          {...props}
        />
      )}

      {currentSrc && !loaded && (
        <S.Spinner
          role="alert"
          aria-label={t('LoadingLabel')}
          aria-busy="true"
        />
      )}
    </S.Wrapper>
  )
}

export default SpritePortrait
