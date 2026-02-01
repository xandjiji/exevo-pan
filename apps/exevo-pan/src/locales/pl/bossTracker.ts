// @ts-nocheck
import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/bossTracker'
/* @ ToDo: i18n-pl */

export default defaultComposer(defaultTranslations, {
  Meta: {
    title: 'Tibia Boss Tracker',
    description:
      'Śledź bossy w Tibii według serwera, timerów i szans na spawn.',
  },
})
