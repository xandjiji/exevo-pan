import * as S from './styles'
import { TableProps } from './types'

const Table = ({
  title,
  subtitle,
  children,
  ...props
}: TableProps): JSX.Element => (
  <S.Wrapper {...props}>
    {subtitle || title ? (
      <S.CardHead>
        {subtitle}
        {!!title && <S.Title>{title}</S.Title>}
      </S.CardHead>
    ) : null}

    <S.Table>{children}</S.Table>
  </S.Wrapper>
)

Table.Head = S.Head
Table.Row = S.Row
Table.HeadColumn = S.HeadColumn

Table.Body = S.Body
Table.Column = S.Column

export default Table
