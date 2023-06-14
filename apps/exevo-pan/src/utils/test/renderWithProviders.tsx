import { ReactElement } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, RenderResult, RenderOptions } from '@testing-library/react'
import { TranslationsProvider } from 'contexts/useTranslation'
import { Toaster } from 'templates'
import * as translationFiles from 'locales'

const translations = {} as any
Object.keys(translationFiles).forEach((file) => {
  translations[file] =
    translationFiles[file as keyof typeof translationFiles].en
})

export const wrapWithProviders = (ui: ReactElement): ReactElement => (
  <TranslationsProvider value={translations}>
    <Toaster />
    {ui}
  </TranslationsProvider>
)

export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions,
): RenderResult => {
  const renderResult = render(wrapWithProviders(ui), options)

  return {
    ...renderResult,
    rerender: (rerenderedUi) =>
      renderResult.rerender(wrapWithProviders(rerenderedUi as ReactElement)),
  }
}
