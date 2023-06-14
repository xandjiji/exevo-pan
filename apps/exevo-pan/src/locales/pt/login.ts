import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/login'

export default defaultComposer(defaultTranslations, {
  Meta: {
    title: 'Login',
    description: 'Logue em sua conta do Exevo Pan',
  },
})
