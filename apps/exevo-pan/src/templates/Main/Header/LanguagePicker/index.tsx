import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { useRef, memo } from 'react'
import { useRouter } from 'next/router'
import { RadioButton } from 'components/Atoms'
import { setCookie, SECONDS_IN } from 'utils'
import { LanguageIcon } from 'assets/svgs'
import useHeaderPopup from '../useHeaderPopup'
import { LanguagePickerProps } from './types'

const LanguagePicker = ({ variant = 'onPrimary' }: LanguagePickerProps) => {
  const { common } = useTranslations()

  const { locale, push, pathname, query } = useRouter()

  const ref = useRef<HTMLButtonElement>(null)
  const { buttonBinders, Popup, action } = useHeaderPopup(ref)

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
        {...buttonBinders}
      >
        <LanguageIcon
          className={clsx(
            'clickable rounded-full',
            variant === 'onPrimary' && 'fill-onPrimary',
            variant === 'onSurface' && 'fill-onSurface',
          )}
        />
      </button>
      <Popup>
        <div className="grid gap-2 p-4" role="group">
          <RadioButton
            active={locale === 'en'}
            onClick={() => handleLocaleSelect('en')}
            role="menuitemradio"
          >
            English
          </RadioButton>
          <RadioButton
            active={locale === 'es'}
            onClick={() => handleLocaleSelect('es')}
            role="menuitemradio"
          >
            Español
          </RadioButton>
          <RadioButton
            active={locale === 'pt'}
            onClick={() => handleLocaleSelect('pt')}
            role="menuitemradio"
          >
            Português
          </RadioButton>
          <RadioButton
            active={locale === 'pl'}
            onClick={() => handleLocaleSelect('pl')}
            role="menuitemradio"
          >
            Polski
          </RadioButton>
        </div>
      </Popup>
    </div>
  )
}

export default memo(LanguagePicker)
