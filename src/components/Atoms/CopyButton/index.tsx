import { useState, useCallback } from 'react'
import { copyToClipboard } from 'utils'
import * as S from './styles'
import { CopyButtonProps } from './types'

const CopyButton = ({ copyString, ...props }: CopyButtonProps): JSX.Element => {
  const [clicked, setClicked] = useState(false)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { onClick } = props
      copyToClipboard(copyString)
      onClick?.(event)
      setClicked(true)
    },
    [copyString],
  )

  return (
    <S.Button
      type="button"
      aria-label="Copy to clipboard"
      onClick={handleClick}
      {...props}
    >
      <S.CopyIcon />
    </S.Button>
  )
}

export default CopyButton
