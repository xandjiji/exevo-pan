// @ts-nocheck
import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/calculators'
/* @ ToDo: i18n-es */

export default defaultComposer(defaultTranslations, {
  Meta: {
    Main: {
      title: 'Calculadoras',
      description:
        'Todo tipo de calculadoras y herramientas de Tibia para ayudarte!',
    },
    ExerciseWeapons: {
      title: 'Exercise weapons',
      description:
        'Averigua cuantas exercise weapons, tiempo y dinero necesitas para llegar a tu skill deseado',
    },
    Stamina: {
      title: 'Stamina',
      description: 'Calcula cuánto tiempo hace falta para recuperar tu stamina',
    },
    CharmDamage: {
      title: 'Charm Damage',
      description:
        'Compara el daño medio entre diferentes charms para ver cual es mejor',
    },
  },
  none: 'Nada',
  ExerciseWeapons: {
    labels: {
      vocation: 'Vocación',
      currentSkill: 'Skill actual',
      targetSkill: 'Skill deseado',
      percentageLeft: '% para subir',
      loyaltyPoints: 'puntos',
      weaponCharges: 'Cargas de la varita',
      results: 'Resultados',
      moneyCost: 'Coste de dinero',
      weapons: 'Varitas',
      time: 'Tiempo necesario',
    },
    moneyTooltip: {
      a: 'Si el precio de las TC es',
      b: 'mayor',
      c: 'que',
      d: 'entonces deberías comprar las varitas usando',
      e: 'gold',
    },
  },
  Stamina: {
    currentStamina: 'Stamina actual',
    desiredStamina: 'Stamina deseada',
    track: 'Seguimiento',
    restTime: 'Tiempo de descanso',
    newCharacter: 'Nombre del personaje',
    removeItem: 'Eliminar',
  },
  CharmDamage: {
    thisArticle: 'este artículo',
  },
  AuctionEstimation: {},
  ImbuementsCost: {},
  LootSplit: {},
})
