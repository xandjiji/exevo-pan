// https://www.tibia.com/community/?subtopic=wheelofdestinyplanner
//
// var getOptions = () => {
//   const names = []
//   const tokens = {}
//
//   document
//     .querySelector('[name="wod-selection-box-gem-mod3-dropdown"]')
//     .childNodes.forEach((el) => {
//       const name = el.text
//       if (!name) return
//       if (name === '(no Mod)') return
//       names.push(name)
//       tokens[name] = name
//     })
//
//   return { names, tokens }
// }

export const greaterGems = {
  knight: {
    'Revelation Mastery (+150 Avatar of Steel)':
      'Revelation Mastery (+150 Avatar of Steel)',
    'Revelation Mastery (+150 Combat Mastery)':
      'Revelation Mastery (+150 Combat Mastery)',
    "Revelation Mastery (+150 Executioner's Throw)":
      "Revelation Mastery (+150 Executioner's Throw)",
    'Revelation Mastery (+150 Gift of Life)':
      'Revelation Mastery (+150 Gift of Life)',
    'Aug. Annihilation (+8% Critical Extra Damage)':
      'Aug. Annihilation (+8% Critical Extra Damage)',
    'Aug. Annihilation (Damage Increase)':
      'Aug. Annihilation (Damage Increase)',
    'Aug. Avatar of Steel (-300s Cooldown)':
      'Aug. Avatar of Steel (-300s Cooldown)',
    'Aug. Berserk (+8% Critical Extra Damage)':
      'Aug. Berserk (+8% Critical Extra Damage)',
    'Aug. Berserk (Damage Increase)': 'Aug. Berserk (Damage Increase)',
    "Aug. Executioner's Throw (+8% Critical Extra Damage)":
      "Aug. Executioner's Throw (+8% Critical Extra Damage)",
    "Aug. Executioner's Throw (Damage Increase)":
      "Aug. Executioner's Throw (Damage Increase)",
    "Aug. Executioner's Throw (-1s Cooldown)":
      "Aug. Executioner's Throw (-1s Cooldown)",
    'Aug. Fair Wound Cleansing (Healing Increase)':
      'Aug. Fair Wound Cleansing (Healing Increase)',
    'Aug. Fierce Berserk (+8% Critical Extra Damage)':
      'Aug. Fierce Berserk (+8% Critical Extra Damage)',
    'Aug. Fierce Berserk (Damage Increase)':
      'Aug. Fierce Berserk (Damage Increase)',
    'Aug. Front Sweep (+8% Critical Extra Damage)':
      'Aug. Front Sweep (+8% Critical Extra Damage)',
    'Aug. Front Sweep (Damage Increase)': 'Aug. Front Sweep (Damage Increase)',
    'Aug. Groundshaker (+8% Critical Extra Damage)':
      'Aug. Groundshaker (+8% Critical Extra Damage)',
    'Aug. Groundshaker (Damage Increase)':
      'Aug. Groundshaker (Damage Increase)',
    '+1.5% Critical Extra Damage': '+1.5% Critical Extra Damage',
    '+0.25% Dodge': '+0.25% Dodge',
    '+1.2% Life Leech': '+1.2% Life Leech',
    '+0.4% Mana Leech': '+0.4% Mana Leech',
  },
  druid: {
    'Revelation Mastery (+150 Avatar of Nature)':
      'Revelation Mastery (+150 Avatar of Nature)',
    'Revelation Mastery (+150 Blessing of the Grove)':
      'Revelation Mastery (+150 Blessing of the Grove)',
    'Revelation Mastery (+150 Gift of Life)':
      'Revelation Mastery (+150 Gift of Life)',
    'Revelation Mastery (+150 Twin Bursts)':
      'Revelation Mastery (+150 Twin Bursts)',
    'Aug. Avatar of Nature (-300s Cooldown)':
      'Aug. Avatar of Nature (-300s Cooldown)',
    'Aug. Eternal Winter (+8% Critical Extra Damage)':
      'Aug. Eternal Winter (+8% Critical Extra Damage)',
    'Aug. Eternal Winter (Damage Increase)':
      'Aug. Eternal Winter (Damage Increase)',
    'Aug. Heal Friend (Healing Increase)':
      'Aug. Heal Friend (Healing Increase)',
    'Aug. Ice Burst (+8% Critical Extra Damage)':
      'Aug. Ice Burst (+8% Critical Extra Damage)',
    'Aug. Ice Burst (Damage Increase)': 'Aug. Ice Burst (Damage Increase)',
    'Aug. Mass Healing (Healing Increase)':
      'Aug. Mass Healing (Healing Increase)',
    "Aug. Nature's Embrace (-5s Cooldown)":
      "Aug. Nature's Embrace (-5s Cooldown)",
    'Aug. Strong Ice Wave (+8% Critical Extra Damage)':
      'Aug. Strong Ice Wave (+8% Critical Extra Damage)',
    'Aug. Strong Ice Wave (Damage Increase)':
      'Aug. Strong Ice Wave (Damage Increase)',
    'Aug. Terra Burst (+8% Critical Extra Damage)':
      'Aug. Terra Burst (+8% Critical Extra Damage)',
    'Aug. Terra Burst (Damage Increase)': 'Aug. Terra Burst (Damage Increase)',
    'Aug. Terra Wave (+8% Critical Extra Damage)':
      'Aug. Terra Wave (+8% Critical Extra Damage)',
    'Aug. Terra Wave (Damage Increase)': 'Aug. Terra Wave (Damage Increase)',
    'Aug. Ultimate Healing (Healing Increase)':
      'Aug. Ultimate Healing (Healing Increase)',
    '+1.5% Critical Extra Damage': '+1.5% Critical Extra Damage',
    '+0.25% Dodge': '+0.25% Dodge',
    '+1.2% Life Leech': '+1.2% Life Leech',
    '+0.4% Mana Leech': '+0.4% Mana Leech',
  },
  sorcerer: {
    'Revelation Mastery (+150 Avatar of Storm)':
      'Revelation Mastery (+150 Avatar of Storm)',
    'Revelation Mastery (+150 Beam Mastery)':
      'Revelation Mastery (+150 Beam Mastery)',
    'Revelation Mastery (+150 Drain Body)':
      'Revelation Mastery (+150 Drain Body)',
    'Revelation Mastery (+150 Gift of Life)':
      'Revelation Mastery (+150 Gift of Life)',
    'Aug. Avatar of Storm (-300s Cooldown)':
      'Aug. Avatar of Storm (-300s Cooldown)',
    'Aug. Energy Wave (+8% Critical Extra Damage)':
      'Aug. Energy Wave (+8% Critical Extra Damage)',
    'Aug. Energy Wave (Damage Increase)': 'Aug. Energy Wave (Damage Increase)',
    'Aug. Energy Wave (-1s Cooldown)': 'Aug. Energy Wave (-1s Cooldown)',
    'Aug. Great Death Beam (+8% Critical Extra Damage)':
      'Aug. Great Death Beam (+8% Critical Extra Damage)',
    'Aug. Great Death Beam (Damage Increase)':
      'Aug. Great Death Beam (Damage Increase)',
    'Aug. Great Energy Beam (+8% Critical Extra Damage)':
      'Aug. Great Energy Beam (+8% Critical Extra Damage)',
    'Aug. Great Energy Beam (Damage Increase)':
      'Aug. Great Energy Beam (Damage Increase)',
    'Aug. Great Fire Wave (+8% Critical Extra Damage)':
      'Aug. Great Fire Wave (+8% Critical Extra Damage)',
    'Aug. Great Fire Wave (Damage Increase)':
      'Aug. Great Fire Wave (Damage Increase)',
    "Aug. Hell's Core (+8% Critical Extra Damage)":
      "Aug. Hell's Core (+8% Critical Extra Damage)",
    "Aug. Hell's Core (Damage Increase)": "Aug. Hell's Core (Damage Increase)",
    'Aug. Rage of the Skies (+8% Critical Extra Damage)':
      'Aug. Rage of the Skies (+8% Critical Extra Damage)',
    'Aug. Rage of the Skies (Damage Increase)':
      'Aug. Rage of the Skies (Damage Increase)',
    'Aug. Ultimate Healing (Healing Increase)':
      'Aug. Ultimate Healing (Healing Increase)',
    '+1.5% Critical Extra Damage': '+1.5% Critical Extra Damage',
    '+0.25% Dodge': '+0.25% Dodge',
    '+1.2% Life Leech': '+1.2% Life Leech',
    '+0.4% Mana Leech': '+0.4% Mana Leech',
  },
  paladin: {
    'Revelation Mastery (+150 Avatar of Light)':
      'Revelation Mastery (+150 Avatar of Light)',
    'Revelation Mastery (+150 Divine Empowerment)':
      'Revelation Mastery (+150 Divine Empowerment)',
    'Revelation Mastery (+150 Divine Grenade)':
      'Revelation Mastery (+150 Divine Grenade)',
    'Revelation Mastery (+150 Gift of Life)':
      'Revelation Mastery (+150 Gift of Life)',
    'Aug. Avatar of Light (-300s Cooldown)':
      'Aug. Avatar of Light (-300s Cooldown)',
    'Aug. Divine Caldera (+8% Critical Extra Damage)':
      'Aug. Divine Caldera (+8% Critical Extra Damage)',
    'Aug. Divine Caldera (Damage Increase)':
      'Aug. Divine Caldera (Damage Increase)',
    'Aug. Divine Dazzle (-2s Cooldown)': 'Aug. Divine Dazzle (-2s Cooldown)',
    'Aug. Divine Empowerment (-3s Cooldown)':
      'Aug. Divine Empowerment (-3s Cooldown)',
    'Aug. Divine Grenade (-1s Cooldown)': 'Aug. Divine Grenade (-1s Cooldown)',
    'Aug. Divine Grenade (+8% Critical Extra Damage)':
      'Aug. Divine Grenade (+8% Critical Extra Damage)',
    'Aug. Divine Grenade (Damage Increase)':
      'Aug. Divine Grenade (Damage Increase)',
    'Aug. Divine Missile (+8% Critical Extra Damage)':
      'Aug. Divine Missile (+8% Critical Extra Damage)',
    'Aug. Divine Missile (Damage Increase)':
      'Aug. Divine Missile (Damage Increase)',
    'Aug. Ethereal Spear (+8% Critical Extra Damage)':
      'Aug. Ethereal Spear (+8% Critical Extra Damage)',
    'Aug. Ethereal Spear (Damage Increase)':
      'Aug. Ethereal Spear (Damage Increase)',
    'Aug. Salvation (Healing Increase)': 'Aug. Salvation (Healing Increase)',
    'Aug. Strong Ethereal Spear (+8% Critical Extra Damage)':
      'Aug. Strong Ethereal Spear (+8% Critical Extra Damage)',
    'Aug. Strong Ethereal Spear (Damage Increase)':
      'Aug. Strong Ethereal Spear (Damage Increase)',
    '+1.5% Critical Extra Damage': '+1.5% Critical Extra Damage',
    '+0.25% Dodge': '+0.25% Dodge',
    '+1.2% Life Leech': '+1.2% Life Leech',
    '+0.4% Mana Leech': '+0.4% Mana Leech',
  },
}
