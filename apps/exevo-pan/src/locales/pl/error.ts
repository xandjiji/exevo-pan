// @ts-nocheck
import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/error'
/* @ ToDo: i18n-pl */

export default defaultComposer(defaultTranslations, {
  Meta: {
    title: '404',
    description: 'Ojej! Nie znaleziono strony!',
  },
})
