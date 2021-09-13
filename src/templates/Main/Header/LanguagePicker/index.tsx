import { useTranslation } from 'next-i18next'
import { memo, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { RadioButton } from 'components/Atoms'
import * as S from './styles'

const LanguagePicker = (): JSX.Element => {
  const { t } = useTranslation('common')

  const { locale, push, pathname } = useRouter()

  const [isVisible, setIsVisible] = useState(false)

  const handleLocaleSelect = (selectedLocale: 'en' | 'pt') => {
    push(pathname, pathname, { locale: selectedLocale })
    setIsVisible(false)
  }

  const wrapperRef = useRef<HTMLDivElement | null>()
  const absoluteWrapperPosition =
    wrapperRef.current?.getBoundingClientRect().right

  return (
    <S.Wrapper ref={wrapperRef as React.RefObject<HTMLDivElement>}>
      <S.LanguageIcon
        aria-label={t('PreferredLanguageLabel')}
        onClick={() => setIsVisible(true)}
      />
      <S.Picker
        role="dialog"
        aria-hidden={!isVisible}
        style={{
          left: absoluteWrapperPosition ? absoluteWrapperPosition - 12 : '100%',
        }}
      >
        <S.Item onClick={() => handleLocaleSelect('en')}>
          <RadioButton active={locale === 'en'} />
          English
        </S.Item>
        <S.Item onClick={() => handleLocaleSelect('pt')}>
          <RadioButton active={locale === 'pt'} />
          Português
        </S.Item>
      </S.Picker>
      <S.Backdrop
        aria-label={t('PopoverCloseLabel')}
        aria-hidden={!isVisible}
        onClick={() => setIsVisible(false)}
      />
    </S.Wrapper>
  )
}

export default memo(LanguagePicker)
