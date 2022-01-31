import { useEffect } from 'react'
import { google } from 'Constants'
import * as S from './styles'

const HorizontalBanner = (
  props: React.HTMLAttributes<HTMLDivElement>,
): JSX.Element => {
  useEffect(() => {
    try {
      ;(window as any).adsbygoogle = ((window as any).adsbygoogle || []).push(
        {} as any,
      )
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <S.Wrapper {...props}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={google.ADSENSE_ID}
        data-ad-slot="3330190597"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </S.Wrapper>
  )
}

export default HorizontalBanner
