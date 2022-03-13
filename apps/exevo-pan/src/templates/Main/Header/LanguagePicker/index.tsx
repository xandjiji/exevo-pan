import { useTranslations } from 'contexts/useTranslation'
import { memo, useRef } from 'react'
import { useRouter } from 'next/router'
import { RadioButton } from 'components/Atoms'
import { setCookie } from 'utils'
import * as S from './styles'
import { LanguagePickerProps } from './type'

const SECONDS_IN_A_YEAR = 31536000

const LanguagePicker = ({
  isOpen,
  setLanguageOpen,
}: LanguagePickerProps): JSX.Element => {
  const {
    translations: { common },
  } = useTranslations()

  const { locale, push, pathname, query } = useRouter()

  const handleLocaleSelect = (selectedLocale: RegisteredLocale) => {
    push(
      {
        pathname,
        query,
      },
      window.location.search,
      { locale: selectedLocale },
    )
    setLanguageOpen(false)
    setCookie('NEXT_LOCALE', selectedLocale, SECONDS_IN_A_YEAR)
  }

  const wrapperRef = useRef<HTMLButtonElement>()
  const absoluteWrapperPosition =
    wrapperRef.current?.getBoundingClientRect().right

  const isTabeable = isOpen ? 1 : -1

  return (
    <S.Wrapper>
      <button
        aria-label={common.PreferredLanguageLabel}
        type="button"
        ref={wrapperRef as React.RefObject<HTMLButtonElement>}
        onClick={() => setLanguageOpen((prev) => !prev)}
      >
        <S.LanguageIcon />
      </button>
      <S.Picker
        role="dialog"
        aria-hidden={!isOpen}
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
        <RadioButton
          active={locale === 'pl'}
          onClick={() => handleLocaleSelect('pl')}
          tabIndex={isTabeable}
        >
          Polski
        </RadioButton>
      </S.Picker>
      <S.Backdrop
        aria-label={common.PopoverCloseLabel}
        aria-hidden={!isOpen}
        onClick={() => setLanguageOpen(false)}
      />
    </S.Wrapper>
  )
}

export default memo(LanguagePicker)
