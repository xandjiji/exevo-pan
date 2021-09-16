import { ReactElement } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderResult, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { TranslationsProvider } from 'contexts/useTranslation'
import Themes from 'styles/themes'
import * as Locales from 'locales'

const translations = {} as Record<string, any>
Object.keys(Locales).forEach((locale) => {
  translations[locale] = Locales[locale as keyof typeof Locales].en
})

export const wrapWithProviders = (ui: ReactElement): ReactElement => (
  <TranslationsProvider value={{ translations }}>
    <ThemeProvider theme={Themes.default}>{ui}</ThemeProvider>
  </TranslationsProvider>
)

export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions,
): RenderResult => {
  const renderResult = render(wrapWithProviders(ui), options)

  return {
    ...renderResult,
    rerender: (rerenderedUi): void =>
      renderResult.rerender(wrapWithProviders(rerenderedUi)),
  }
}
