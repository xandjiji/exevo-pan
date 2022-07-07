import { useTranslations } from 'contexts/useTranslation'
import { memo } from 'react'
import { useRouter } from 'next/router'
import { RadioButton, Dialog } from 'components/Atoms'
import { setCookie, SECONDS_IN } from 'utils'
import LanguageIcon from 'assets/svgs/language.svg'
import { LanguagePickerProps } from './type'

const LanguagePicker = ({ isOpen, setLanguageOpen }: LanguagePickerProps) => {
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
    setCookie('NEXT_LOCALE', selectedLocale, SECONDS_IN.YEAR)
  }

  return (
    <div className="h-6">
      <button
        aria-label={common.PreferredLanguageLabel}
        type="button"
        onClick={() => setLanguageOpen((prev) => !prev)}
      >
        <LanguageIcon className="fill-onPrimary clickable rounded-full" />
      </button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setLanguageOpen(false)}
        noCloseButton
        className="grid gap-2"
      >
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
      </Dialog>
    </div>
  )
}

export default memo(LanguagePicker)
