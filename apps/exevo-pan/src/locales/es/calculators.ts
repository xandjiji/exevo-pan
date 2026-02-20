// @ts-nocheck
import { defaultComposer } from 'default-composer'
import defaultTranslations from '../en/calculators'
/* @ ToDo: i18n-es */

export default defaultComposer(defaultTranslations, {
  Meta: {
    Main: {
      title: 'Calculadoras de Tibia',
      description:
        'Calculadoras y herramientas de Tibia para Char Bazaar, skills, loot split, imbuements y stamina.',
    },
    ExerciseWeapons: {
      title: 'Calculadora de Exercise Weapons de Tibia',
      description:
        'Calcula costo, tiempo y cantidad de exercise weapons para entrenar skills en Tibia.',
    },
    Stamina: {
      title: 'Calculadora de Stamina de Tibia',
      description:
        'Calcula el tiempo de recuperación de stamina y entrenamiento offline en Tibia.',
    },
    CharmDamage: {
      title: 'Calculadora de Daño de Charms de Tibia',
      description:
        'Compara el daño medio de charms en Tibia para elegir el mejor.',
    },
    ImbuementsCost: {
      title: 'Calculadora de Imbuements de Tibia',
      description:
        'Calcula la forma más barata de comprar materiales y gold tokens para imbuements.',
    },
    LootSplit: {
      title: 'Calculadora de Reparto de Loot en Tibia',
      description:
        'Divide el loot de la party en Tibia y calcula la ganancia por miembro.',
    },
    AuctionEstimation: {
      title: 'Estimador de Precio del Char Bazaar de Tibia',
      description:
        'Estima precios de subastas del Char Bazaar con ventas recientes.',
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
