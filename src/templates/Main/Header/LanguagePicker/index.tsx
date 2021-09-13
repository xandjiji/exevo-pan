import { useRouter } from 'next/router'
import { RadioButton } from 'components/Atoms'
import * as S from './styles'

const LanguagePicker = (): JSX.Element => {
  const { locale, push, pathname } = useRouter()

  const handleLocaleSelect = (selectedLocale: 'en' | 'pt') =>
    push(pathname, pathname, { locale: selectedLocale })

  return (
    <S.Wrapper>
      <S.LanguageIcon aria-label="Select preferred language" />
      <S.FixedWrapper>
        <S.Picker>
          <S.Item onClick={() => handleLocaleSelect('en')}>
            <RadioButton active={locale === 'en'} />
            English
          </S.Item>
          <S.Item onClick={() => handleLocaleSelect('pt')}>
            <RadioButton active={locale === 'pt'} />
            Português
          </S.Item>
        </S.Picker>
      </S.FixedWrapper>
    </S.Wrapper>
  )
}

export default LanguagePicker
