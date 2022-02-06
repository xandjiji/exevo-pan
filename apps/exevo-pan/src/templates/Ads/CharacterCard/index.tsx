import { useEffect } from 'react'
import { google } from 'Constants'
import * as S from './styles'
import { CharacterCardProps } from './types'

const CharacterCard = ({
  height,
  ...props
}: CharacterCardProps): JSX.Element => {
  useEffect(() => {
    try {
      ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
      ;(window as any).adsbygoogle.push({} as any)
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <S.Wrapper {...props} estimatedHeight={height}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: 320,
          height,
        }}
        data-ad-client={google.ADSENSE_ID}
        data-ad-slot="6250183199"
      />
    </S.Wrapper>
  )
}

export default CharacterCard
