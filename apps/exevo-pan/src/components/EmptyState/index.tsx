import { Button } from 'components/Atoms'
import { useOnImageLoad } from 'hooks'
import * as S from './styles'
import { EmptyStateProps } from './types'

const EmptyState = ({
  height,
  text,
  button,
  children,
  ...props
}: EmptyStateProps): JSX.Element => {
  const [loaded, onLoad] = useOnImageLoad()
  return (
    <S.Wrapper {...props}>
      <S.NotFoundWrapper data-loaded={loaded}>
        <S.NotFound alt={text.content} height={height} onLoad={onLoad} />
      </S.NotFoundWrapper>

      <S.ContentWrapper>
        <S.Text size={text.size}>{text.content}</S.Text>
        {children}
        {button && (
          <Button type="button" onClick={button.action}>
            {button.content}
          </Button>
        )}
      </S.ContentWrapper>
    </S.Wrapper>
  )
}

export default EmptyState
