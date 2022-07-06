import { useTranslations } from 'contexts/useTranslation'
import clsx from 'clsx'
import { memo, useRef } from 'react'
import { useRouter } from 'next/router'
import { RadioButton } from 'components/Atoms'
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

  const wrapperRef = useRef<HTMLButtonElement>(null)
  const absoluteWrapperPosition =
    wrapperRef.current?.getBoundingClientRect().right

  const isTabeable = isOpen ? 1 : -1
  const visibilityStyle = !isOpen && 'pointer-events-none opacity-0'

  return (
    <div className="h-6">
      <button
        aria-label={common.PreferredLanguageLabel}
        type="button"
        ref={wrapperRef}
        onClick={() => setLanguageOpen((prev) => !prev)}
      >
        <LanguageIcon className="fill-onPrimary clickable rounded-full" />
      </button>
      <div
        className={clsx(
          'card fixed top-[46] z-10 grid w-fit gap-2 transition-opacity',
          visibilityStyle,
        )}
        role="dialog"
        aria-hidden={!isOpen}
        style={{
          left: absoluteWrapperPosition ? absoluteWrapperPosition - 12 : '100%',
          transform: 'translate(-50%, 6px)',
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
      </div>

      <button
        type="button"
        className={clsx(
          'z-2 bg-backdrop fixed top-0 left-0 h-screen w-screen transition-opacity',
          visibilityStyle,
        )}
        aria-label={common.PopoverCloseLabel}
        aria-hidden={!isOpen}
        onClick={() => setLanguageOpen(false)}
        tabIndex={isOpen ? 1 : -1}
      />
    </div>
  )
}

export default memo(LanguagePicker)
