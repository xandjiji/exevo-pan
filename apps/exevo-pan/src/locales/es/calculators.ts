export default {
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
    /* @ ToDo: */
    ImbuementsCost: {
      title: 'Imbuements Cost',
      description:
        'Calculate the cheapest way to buy materials for your imbuements',
    },
    /* @ ToDo: */
    LootSplit: {
      title: 'Loot Split',
      description: 'Manage and split your party hunt loots',
    },
  },
  Header: {
    Main: 'Principal',
    ExerciseWeapons: 'Exercise weapons',
    CharmDamage: 'Charm Damage',
    Stamina: 'Stamina',
    /* @ ToDo: */
    ImbuementsCost: 'Imbuements Cost',
    /* @ ToDo: */
    LootSplit: 'Loot Split',
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
    moreInfo: 'Para más información acerca de los charms, revisa',
    thisArticle: 'este artículo',
  },
  /* @ ToDo: */
  ImbuementsCost: {
    labels: {
      configurations: 'Configurations',
      goldToken: 'Gold Token price',
    },
    totalCost: 'Total cost',
    goldTokenOnly: 'Gold Tokens only',
    marketOnly: 'Market only',
    tooltipInfo: '(Includes: base price + 100% success fee)',
    pricePlaceholder: 'Current price',
    buyIconTooltip: 'Should be bought using',
  },
}
