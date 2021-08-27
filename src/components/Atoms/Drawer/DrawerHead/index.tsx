import { useTranslation } from 'next-i18next'
import * as S from './styles'
import { DrawerHeadProps } from './types'

const DrawerHead = ({
  onClose,
  children,
  ...props
}: DrawerHeadProps): JSX.Element => {
  const { t } = useTranslation('common')

  return (
    <S.DrawerHead {...props}>
      {onClose && (
        <S.BackButton
          tabIndex={0}
          aria-label={t('CloseDrawerLabel')}
          onClick={onClose}
        >
          <S.ArrowIcon />
        </S.BackButton>
      )}
      <S.ContentWrapper>{children}</S.ContentWrapper>
    </S.DrawerHead>
  )
}

export default DrawerHead
