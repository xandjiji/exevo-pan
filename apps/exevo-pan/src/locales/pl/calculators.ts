// @ts-nocheck
import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/calculators'
/* @ ToDo: i18n-pl */

export default defaultComposer(defaultTranslations, {
  Meta: {
    Main: {
      title: 'Kalkulatory Tibia',
      description:
        'Kalkulatory i narzędzia do Tibii: Char Bazaar, skille, loot split, imbuements i stamina.',
    },
    ExerciseWeapons: {
      title: 'Kalkulator Exercise Weapons Tibia',
      description:
        'Oblicz koszt, czas i liczbę exercise weapons do treningu skilli w Tibii.',
    },
    Stamina: {
      title: 'Kalkulator Staminy Tibia',
      description:
        'Sprawdź czas regeneracji staminy i trening offline w Tibii.',
    },
    CharmDamage: {
      title: 'Kalkulator Dmg Charmów Tibia',
      description: 'Porównaj średnie obrażenia charmów w Tibii.',
    },
    ImbuementsCost: {
      title: 'Kalkulator Imbuements Tibia',
      description:
        'Oblicz najtańszy zakup materiałów i gold tokenów na imbuements.',
    },
    LootSplit: {
      title: 'Kalkulator Loot Split Tibia',
      description: 'Podziel loot z party w Tibii i oblicz zysk na osobę.',
    },
    AuctionEstimation: {
      title: 'Estimator Cen Char Bazaar Tibia',
      description:
        'Oszacuj ceny aukcji Char Bazaar na podstawie ostatnich sprzedaży.',
    },
  },
})
