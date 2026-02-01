import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/bossTracker'
/* @ ToDo: i18n-es */

export default defaultComposer(defaultTranslations, {
  Meta: {
    title: 'Rastreador de Bosses de Tibia',
    description:
      'Rastrea spawns de bosses de Tibia por servidor, tiempos y probabilidades.',
  },
})
