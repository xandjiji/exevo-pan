import { useTranslations } from 'contexts/useTranslation'
import { memo, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { RadioButton } from 'components/Atoms'
import { setCookie } from 'utils'
import * as S from './styles'

const SECONDS_IN_A_YEAR = 31536000

const LanguagePicker = (): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const { locale, push, pathname } = useRouter()

  const [isVisible, setIsVisible] = useState(false)

  const handleLocaleSelect = (selectedLocale: RegisteredLocale) => {
    push(pathname, window.location.search, { locale: selectedLocale })
    setIsVisible(false)
    setCookie('NEXT_LOCALE', selectedLocale, SECONDS_IN_A_YEAR)
  }

  const wrapperRef = useRef<HTMLButtonElement>()
  const absoluteWrapperPosition =
    wrapperRef.current?.getBoundingClientRect().right

  const isTabeable = isVisible ? 1 : -1

  return (
    <S.Wrapper>
      <button
        aria-label={common.PreferredLanguageLabel}
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
          tabIndex={isTabeable}
        >
          English
        </RadioButton>
        <RadioButton
          active={locale === 'es'}
          onClick={() => handleLocaleSelect('es')}
          tabIndex={isTabeable}
        >
          Español
        </RadioButton>
        <RadioButton
          active={locale === 'pt'}
          onClick={() => handleLocaleSelect('pt')}
          tabIndex={isTabeable}
        >
          Português
        </RadioButton>
      </S.Picker>
      <S.Backdrop
        aria-label={common.PopoverCloseLabel}
        aria-hidden={!isVisible}
        onClick={() => setIsVisible(false)}
      />
    </S.Wrapper>
  )
}

export default memo(LanguagePicker)
