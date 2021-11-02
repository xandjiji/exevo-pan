import { memo, forwardRef } from 'react'
import * as S from './styles'

type ListViewProps = React.HTMLAttributes<HTMLDivElement>

const ListView = forwardRef<HTMLDivElement, ListViewProps>(
  ({ children, ...props }: ListViewProps, ref) => (
    <S.Grid ref={ref} {...props}>
      {children}
    </S.Grid>
  ),
)

export default memo(ListView)
