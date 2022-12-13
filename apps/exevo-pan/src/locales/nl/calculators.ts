export default {
  Meta: {
    Main: {
      title: 'Calculators',
      description: 'Allerhande nuttige Tibia-tools en calculators!',
    },
    ExerciseWeapons: {
      title: 'Exercise weapons',
      description:
        'Ontdek hoeveel exercise weapons, tijd, en geld het kost om je gewenste skill te bereiken',
    },
    Stamina: {
      title: 'Stamina',
      description:
        'Bereken en track hoeveel tijd het kost om je stamina te herstellen',
    },
    CharmDamage: {
      title: 'Charm damage',
      description:
        'Vergelijk de gemiddelde damage tussen verschillende charms om te zien welke beter is',
    },
    ImbuementsCost: {
      title: 'Imbuements-kostprijs',
      description:
        'Beereken de goedkoopste manier om imbuement-items te kopen',
    },
    LootSplit: {
      title: 'Loot Split',
      description: 'Beheer en split loot van je party-hunt',
    },
  },
  Header: {
    Main: 'Main',
    ExerciseWeapons: 'Exercise weapons',
    CharmDamage: 'Charm damage',
    Stamina: 'Stamina',
    ImbuementsCost: 'Imbuements-kostprijs',
    LootSplit: 'Loot Split',
  },
  none: 'Geen',
  ExerciseWeapons: {
    labels: {
      vocation: 'Vocation',
      currentSkill: 'Huidige skill',
      targetSkill: 'Gewenste skill',
      percentageLeft: '% te gaan',
      loyaltyPoints: 'punten',
      weaponCharges: 'weapon charges',
      results: 'Resultaten',
      moneyCost: 'Kostprijs',
      weapons: 'Weapons',
      time: 'Benodigde tijd',
    },
    moneyTooltip: {
      a: 'Als de TC-prijs',
      b: 'hoger',
      c: 'dan',
      d: 'dan koop je beter exercise weapons met',
      e: 'gold coins',
    },
  },
  Stamina: {
    currentStamina: 'Huidige stamina',
    desiredStamina: 'Gewenste stamina',
    track: 'Track',
    restTime: 'Rust-tijd',
    newCharacter: 'Nieuw karakter',
    removeItem: 'Verwijder item',
  },
  CharmDamage: {
    moreInfo: 'Meer informatie over Charms vind je in',
    thisArticle: 'dit artikel',
  },
  ImbuementsCost: {
    labels: {
      configurations: 'Instellingen',
      goldToken: 'Gold Token-prijs',
    },
    totalCost: 'Totale kostprijs',
    goldTokenOnly: 'Enkel Gold Tokens',
    marketOnly: 'Enkel Market',
    tooltipInfo: '(Inclusief: basisprijs + 100% success rate fee)',
    pricePlaceholder: 'Huidige prijs',
    buyIconTooltip: 'Koop met',
  },
  LootSplit: {
    tabs: {
      newSession: 'Nieuwe sessie',
      history: 'Geschiedenis',
    },
    labels: {
      textArea: 'Plak je party hunt session',
      tooltipClipboard: 'Party Hunt session analyser',
      summary: 'Samenvatting',
      teamSession: 'Team-sessie',
      transfers: 'Transfers',
      total: {
        waste: 'Totaal verlies',
        profit: 'Totale winst',
      },
    },
    each: 'elk',
    emptyState: 'Geen sessie',
    actions: {
      save: 'Opslaan',
      delete: 'Verwijderen',
      data: 'Data',
      done: 'Gedaan',
    },
    advancedOptions: 'Geavanceerde opties',
    AdvancedOptionsDialog: {
      addExtraExpenses: 'Voeg extra uitgaven toe',
      extraCostPlaceholder: 'Extra kosten (in gold coins)',
      removePlayer: 'Verwijder speler',
    },
    SessionDialog: {
      originalSession: 'Originele hunt-sessie',
      extraExpenses: 'Extra uitgaven',
      removedPlayers: 'Verwijderde spelers',
    },
    Clipboard: {
      teamSession: 'Team-sessie',
      partyMembers: 'Party-leden',
      bankTransfers: 'Bank-transfers',
      shouldTransfer: 'transfert',
      to: 'naar',
    },
  },
}
