import * as S from './styles'

const Table = (props: React.HTMLAttributes<HTMLTableElement>): JSX.Element => (
  <S.Wrapper>
    <S.BaseTable {...props} />
  </S.Wrapper>
)

export default Table
