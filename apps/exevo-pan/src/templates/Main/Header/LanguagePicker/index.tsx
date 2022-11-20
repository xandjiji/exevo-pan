import { useTranslations } from 'contexts/useTranslation'
import { useRef, memo } from 'react'
import { useRouter } from 'next/router'
import { RadioButton } from 'components/Atoms'
import { setCookie, SECONDS_IN } from 'utils'
import { LanguageIcon } from 'assets/svgs'
import useHeaderPopup from '../useHeaderPopup'

const LanguagePicker = () => {
  const {
    translations: { common },
  } = useTranslations()

  const { locale, push, pathname, query } = useRouter()

  const ref = useRef<HTMLButtonElement>(null)
  const { Popup, action } = useHeaderPopup(ref)

  const handleLocaleSelect = (selectedLocale: RegisteredLocale) => {
    push(
      {
        pathname,
        query,
      },
      window.location.search,
      { locale: selectedLocale },
    )
    action.close()
    setCookie('NEXT_LOCALE', selectedLocale, SECONDS_IN.YEAR)
  }

  return (
    <div className="h-6">
      <button
        ref={ref}
        aria-label={common.PreferredLanguageLabel}
        type="button"
        onClick={action.open}
      >
        <LanguageIcon className="fill-onPrimary clickable rounded-full" />
      </button>
      <Popup>
        <div className="grid gap-2">
          <RadioButton
            active={locale === 'en'}
            onClick={() => handleLocaleSelect('en')}
          >
            English
          </RadioButton>
          <RadioButton
            active={locale === 'es'}
            onClick={() => handleLocaleSelect('es')}
          >
            Español
          </RadioButton>
          <RadioButton
            active={locale === 'pt'}
            onClick={() => handleLocaleSelect('pt')}
          >
            Português
          </RadioButton>
          <RadioButton
            active={locale === 'pl'}
            onClick={() => handleLocaleSelect('pl')}
          >
            Polski
          </RadioButton>
        </div>
      </Popup>
    </div>
  )
}

export default memo(LanguagePicker)
