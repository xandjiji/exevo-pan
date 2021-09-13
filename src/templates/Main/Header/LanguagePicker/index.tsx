import { useTranslation } from 'next-i18next'
import { memo, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { RadioButton } from 'components/Atoms'
import { setCookie } from 'utils'
import * as S from './styles'

const SECONDS_IN_A_YEAR = 31536000

const LanguagePicker = (): JSX.Element => {
  const { t } = useTranslation('common')

  const { locale, push, pathname } = useRouter()

  const [isVisible, setIsVisible] = useState(false)

  const handleLocaleSelect = (selectedLocale: 'en' | 'pt') => {
    push(pathname, pathname, { locale: selectedLocale })
    setIsVisible(false)
    setCookie('NEXT_LOCALE', selectedLocale, SECONDS_IN_A_YEAR)
  }

  const wrapperRef = useRef<HTMLButtonElement | null>()
  const absoluteWrapperPosition =
    wrapperRef.current?.getBoundingClientRect().right

  return (
    <S.Wrapper>
      <button
        aria-label={t('PreferredLanguageLabel')}
        type="button"
        ref={wrapperRef as React.RefObject<HTMLButtonElement>}
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <S.LanguageIcon />
      </button>
      <S.Picker
        role="dialog"
        aria-hidden={!isVisible}
        style={{
          left: absoluteWrapperPosition ? absoluteWrapperPosition - 12 : '100%',
        }}
      >
        <RadioButton
          active={locale === 'en'}
          onClick={() => handleLocaleSelect('en')}
          tabIndex={isVisible ? 1 : -1}
        >
          English
        </RadioButton>
        <RadioButton
          active={locale === 'pt'}
          onClick={() => handleLocaleSelect('pt')}
          tabIndex={isVisible ? 1 : -1}
        >
          Português
        </RadioButton>
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
