import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/error'

export default defaultComposer(defaultTranslations, {
  Meta: {
    title: '404',
    description: 'Oops! Página não encontrada!',
  },
})
