import * as S from './styles'

const Newsletter = (
  props: React.HTMLAttributes<HTMLDivElement>,
): JSX.Element => {
  console.log('Newsletter')
  return (
    <S.Wrapper {...props}>
      <h2>Newsletter</h2>
    </S.Wrapper>
  )
}

export default Newsletter
