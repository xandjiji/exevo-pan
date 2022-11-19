import TitledCard from '../TitledCard'
import * as S from './atoms'
import { TableProps } from './types'

const Table = ({ title, subtitle, children, ...props }: TableProps) => (
  <TitledCard
    variant="squared"
    title={
      <>
        <span className="text-tsm block font-light">{subtitle}</span>
        {!!title && <h4 className="mt-1 tracking-wider">{title}</h4>}
      </>
    }
    {...props}
  >
    {children}
  </TitledCard>
)

Table.Element = S.Table
Table.Head = S.Head
Table.Row = S.Row
Table.HeadColumn = S.HeadColumn

Table.Body = S.Body
Table.Column = S.Column

export default Table
