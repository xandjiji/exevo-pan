import { createContext, useContext } from 'react'
import { TranslationsContextValues } from './types'

const TranslationsContext = createContext<TranslationsContextValues>({
  translations: {},
})

export const TranslationsProvider = TranslationsContext.Provider

export const useTranslations = (): TranslationsContextValues =>
  useContext(TranslationsContext)
