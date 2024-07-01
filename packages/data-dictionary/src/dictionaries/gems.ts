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

export const sharedGreaterGems = {
  '+3% Critical Extra Damage': '+3% Critical Extra Damage',
  '+0.42% Dodge': '+0.42% Dodge',
  '+3% Life Leech': '+3% Life Leech',
  '+1.2% Mana Leech': '+1.2% Mana Leech',
  'Revelation Mastery (+225 Gift of Life)':
    'Revelation Mastery (+225 Gift of Life)',
}

export const vocationGreaterGems = {
  knight: {
    'Revelation Mastery (+225 Avatar of Steel)':
      'Revelation Mastery (+225 Avatar of Steel)',
    'Revelation Mastery (+225 Combat Mastery)':
      'Revelation Mastery (+225 Combat Mastery)',
    "Revelation Mastery (+225 Executioner's Throw)":
      "Revelation Mastery (+225 Executioner's Throw)",
    'Aug. Annihilation (+22.5% Critical Extra Damage)':
      'Aug. Annihilation (+22.5% Critical Extra Damage)',
    'Aug. Annihilation (+18% Base Damage)':
      'Aug. Annihilation (+18% Base Damage)',
    'Aug. Avatar of Steel (-900s Cooldown, +1% Momentum)':
      'Aug. Avatar of Steel (-900s Cooldown, +1% Momentum)',
    'Aug. Berserk (+18% Critical Extra Damage)':
      'Aug. Berserk (+18% Critical Extra Damage)',
    'Aug. Berserk (+7.5% Base Damage)': 'Aug. Berserk (+7.5% Base Damage)',
    "Aug. Executioner's Throw (+18% Critical Extra Damage)":
      "Aug. Executioner's Throw (+18% Critical Extra Damage)",
    "Aug. Executioner's Throw (+9% Base Damage)":
      "Aug. Executioner's Throw (+9% Base Damage)",
    "Aug. Executioner's Throw (-2s Cooldown, +1% Momentum)":
      "Aug. Executioner's Throw (-2s Cooldown, +1% Momentum)",
    'Aug. Fair Wound Cleansing (+15% Base Healing)':
      'Aug. Fair Wound Cleansing (+15% Base Healing)',
    'Aug. Fierce Berserk (+12% Critical Extra Damage)':
      'Aug. Fierce Berserk (+12% Critical Extra Damage)',
    'Aug. Fierce Berserk (+7.5% Base Damage)':
      'Aug. Fierce Berserk (+7.5% Base Damage)',
    'Aug. Front Sweep (+18% Critical Extra Damage)':
      'Aug. Front Sweep (+18% Critical Extra Damage)',
    'Aug. Front Sweep (+12% Base Damage)':
      'Aug. Front Sweep (+12% Base Damage)',
    'Aug. Groundshaker (+18% Critical Extra Damage)':
      'Aug. Groundshaker (+18% Critical Extra Damage)',
    'Aug. Groundshaker (+9.75% Base Damage)':
      'Aug. Groundshaker (+9.75% Base Damage)',
  },
  druid: {
    'Revelation Mastery (+225 Avatar of Nature)':
      'Revelation Mastery (+225 Avatar of Nature)',
    'Revelation Mastery (+225 Blessing of the Grove)':
      'Revelation Mastery (+225 Blessing of the Grove)',
    'Revelation Mastery (+225 Twin Bursts)':
      'Revelation Mastery (+225 Twin Bursts)',
    'Aug. Avatar of Nature (-900s Cooldown, +1% Momentum)':
      'Aug. Avatar of Nature (-900s Cooldown, +1% Momentum)',
    'Aug. Eternal Winter (+18% Critical Extra Damage)':
      'Aug. Eternal Winter (+18% Critical Extra Damage)',
    'Aug. Eternal Winter (+12% Base Damage)':
      'Aug. Eternal Winter (+12% Base Damage)',
    'Aug. Heal Friend (+7.5% Base Healing)':
      'Aug. Heal Friend (+7.5% Base Healing)',
    'Aug. Ice Burst (+18% Critical Extra Damage)':
      'Aug. Ice Burst (+18% Critical Extra Damage)',
    'Aug. Ice Burst (+10.5% Base Damage)':
      'Aug. Ice Burst (+10.5% Base Damage)',
    'Aug. Mass Healing (+7.5% Base Healing)':
      'Aug. Mass Healing (+7.5% Base Healing)',
    "Aug. Nature's Embrace (-10s Cooldown, +1% Momentum)":
      "Aug. Nature's Embrace (-10s Cooldown, +1% Momentum)",
    'Aug. Strong Ice Wave (+22.5% Critical Extra Damage)':
      'Aug. Strong Ice Wave (+22.5% Critical Extra Damage)',
    'Aug. Strong Ice Wave (+12% Base Damage)':
      'Aug. Strong Ice Wave (+12% Base Damage)',
    'Aug. Terra Burst (+18% Critical Extra Damage)':
      'Aug. Terra Burst (+18% Critical Extra Damage)',
    'Aug. Terra Burst (+10.5% Base Damage)':
      'Aug. Terra Burst (+10.5% Base Damage)',
    'Aug. Terra Wave (+18% Critical Extra Damage)':
      'Aug. Terra Wave (+18% Critical Extra Damage)',
    'Aug. Terra Wave (+7.5% Base Damage)':
      'Aug. Terra Wave (+7.5% Base Damage)',
    'Aug. Ultimate Healing (+7.5% Base Healing)':
      'Aug. Ultimate Healing (+7.5% Base Healing)',
  },
  sorcerer: {
    'Revelation Mastery (+225 Avatar of Storm)':
      'Revelation Mastery (+225 Avatar of Storm)',
    'Revelation Mastery (+225 Beam Mastery)':
      'Revelation Mastery (+225 Beam Mastery)',
    'Revelation Mastery (+225 Drain Body)':
      'Revelation Mastery (+225 Drain Body)',
    'Aug. Avatar of Storm (-900s Cooldown, +1% Momentum)':
      'Aug. Avatar of Storm (-900s Cooldown, +1% Momentum)',
    'Aug. Energy Wave (+18% Critical Extra Damage)':
      'Aug. Energy Wave (+18% Critical Extra Damage)',
    'Aug. Energy Wave (+7.5% Base Damage)':
      'Aug. Energy Wave (+7.5% Base Damage)',
    'Aug. Energy Wave (-1s Cooldown, +1% Momentum)':
      'Aug. Energy Wave (-1s Cooldown, +1% Momentum)',
    'Aug. Great Death Beam (+22.5% Critical Extra Damage)':
      'Aug. Great Death Beam (+22.5% Critical Extra Damage)',
    'Aug. Great Death Beam (+15% Base Damage)':
      'Aug. Great Death Beam (+15% Base Damage)',
    'Aug. Great Energy Beam (+22.5% Critical Extra Damage)':
      'Aug. Great Energy Beam (+22.5% Critical Extra Damage)',
    'Aug. Great Energy Beam (+15% Base Damage)':
      'Aug. Great Energy Beam (+15% Base Damage)',
    'Aug. Great Fire Wave (+12% Critical Extra Damage)':
      'Aug. Great Fire Wave (+12% Critical Extra Damage)',
    'Aug. Great Fire Wave (+7.5% Base Damage)':
      'Aug. Great Fire Wave (+7.5% Base Damage)',
    "Aug. Hell's Core (+18% Critical Extra Damage)":
      "Aug. Hell's Core (+18% Critical Extra Damage)",
    "Aug. Hell's Core (+12% Base Damage)":
      "Aug. Hell's Core (+12% Base Damage)",
    'Aug. Rage of the Skies (+18% Critical Extra Damage)':
      'Aug. Rage of the Skies (+18% Critical Extra Damage)',
    'Aug. Rage of the Skies (+12% Base Damage)':
      'Aug. Rage of the Skies (+12% Base Damage)',
    'Aug. Ultimate Healing (+7.5% Base Healing)':
      'Aug. Ultimate Healing (+7.5% Base Healing)',
  },
  paladin: {
    'Revelation Mastery (+225 Avatar of Light)':
      'Revelation Mastery (+225 Avatar of Light)',
    'Revelation Mastery (+225 Divine Empowerment)':
      'Revelation Mastery (+225 Divine Empowerment)',
    'Revelation Mastery (+225 Divine Grenade)':
      'Revelation Mastery (+225 Divine Grenade)',
    'Aug. Avatar of Light (-900s Cooldown, +1% Momentum)':
      'Aug. Avatar of Light (-900s Cooldown, +1% Momentum)',
    'Aug. Divine Caldera (+12% Critical Extra Damage)':
      'Aug. Divine Caldera (+12% Critical Extra Damage)',
    'Aug. Divine Caldera (+7.5% Base Damage)':
      'Aug. Divine Caldera (+7.5% Base Damage)',
    'Aug. Divine Dazzle (-4s Cooldown, +1% Momentum)':
      'Aug. Divine Dazzle (-4s Cooldown, +1% Momentum)',
    'Aug. Divine Empowerment (-6s Cooldown, +1% Momentum)':
      'Aug. Divine Empowerment (-6s Cooldown, +1% Momentum)',
    'Aug. Divine Grenade (-2s Cooldown, +1% Momentum)':
      'Aug. Divine Grenade (-2s Cooldown, +1% Momentum)',
    'Aug. Divine Grenade (+18% Critical Extra Damage)':
      'Aug. Divine Grenade (+18% Critical Extra Damage)',
    'Aug. Divine Grenade (+9% Base Damage)':
      'Aug. Divine Grenade (+9% Base Damage)',
    'Aug. Divine Missile (+18% Critical Extra Damage)':
      'Aug. Divine Missile (+18% Critical Extra Damage)',
    'Aug. Divine Missile (+12% Base Damage)':
      'Aug. Divine Missile (+12% Base Damage)',
    'Aug. Ethereal Spear (+22.5% Critical Extra Damage)':
      'Aug. Ethereal Spear (+22.5% Critical Extra Damage)',
    'Aug. Ethereal Spear (+15% Base Damage)':
      'Aug. Ethereal Spear (+15% Base Damage)',
    'Aug. Salvation (+9% Base Healing)': 'Aug. Salvation (+9% Base Healing)',
    'Aug. Strong Ethereal Spear (+18% Critical Extra Damage)':
      'Aug. Strong Ethereal Spear (+18% Critical Extra Damage)',
    'Aug. Strong Ethereal Spear (+12% Base Damage)':
      'Aug. Strong Ethereal Spear (+12% Base Damage)',
  },
}
