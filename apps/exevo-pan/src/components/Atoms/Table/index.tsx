import clsx from 'clsx'
import * as S from './atoms'
import { TableProps } from './types'

const Table = ({
  title,
  subtitle,
  className,
  children,
  ...props
}: TableProps) => (
  <section
    className={clsx(
      'card custom-scrollbar overflow-auto py-[18px] px-6 transition-colors',
      className,
    )}
    {...props}
  >
    {subtitle || title ? (
      <div className="text-tsm bg-primary text-onPrimary -mx-6 mt-[-18px] mb-[18px] py-[18px] px-6 font-light shadow">
        {subtitle}
        {!!title && (
          <h4 className="text-onPrimary mt-1 text-2xl font-bold tracking-wider">
            {title}
          </h4>
        )}
      </div>
    ) : null}
    {children}
  </section>
)

Table.Element = S.Table
Table.Head = S.Head
Table.Row = S.Row
Table.HeadColumn = S.HeadColumn

Table.Body = S.Body
Table.Column = S.Column

export default Table
