import { generateIdentity } from '../utils'

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

export const tokensByCategory = {
  sharedGreaterGems: [
    '+2% Critical Extra Damage',
    '+2.2% Critical Extra Damage',
    '+2.4% Critical Extra Damage',
    '+3% Critical Extra Damage',

    '+0.28% Dodge',
    '+0.31% Dodge',
    '+0.34% Dodge',
    '+0.42% Dodge',

    '+2% Life Leech',
    '+2.2% Life Leech',
    '+2.4% Life Leech',
    '+3% Life Leech',

    '+0.8% Mana Leech',
    '+0.88% Mana Leech',
    '+0.96% Mana Leech',
    '+1.2% Mana Leech',

    'Revelation Mastery (+150 Gift of Life)',
    'Revelation Mastery (+165 Gift of Life)',
    'Revelation Mastery (+180 Gift of Life)',
    'Revelation Mastery (+225 Gift of Life)',
  ],
  vocationGreaterGems: {
    knight: [
      'Revelation Mastery (+150 Avatar of Steel)',
      'Revelation Mastery (+165 Avatar of Steel)',
      'Revelation Mastery (+180 Avatar of Steel)',
      'Revelation Mastery (+225 Avatar of Steel)',

      'Revelation Mastery (+150 Combat Mastery)',
      'Revelation Mastery (+165 Combat Mastery)',
      'Revelation Mastery (+180 Combat Mastery)',
      'Revelation Mastery (+225 Combat Mastery)',

      "Revelation Mastery (+150 Executioner's Throw)",
      "Revelation Mastery (+165 Executioner's Throw)",
      "Revelation Mastery (+180 Executioner's Throw)",
      "Revelation Mastery (+225 Executioner's Throw)",

      'Aug. Annihilation (+15% Critical Extra Damage)',
      'Aug. Annihilation (+16.5% Critical Extra Damage)',
      'Aug. Annihilation (+18% Critical Extra Damage)',
      'Aug. Annihilation (+22.5% Critical Extra Damage)',

      'Aug. Annihilation (+12% Base Damage)',
      'Aug. Annihilation (+13.2% Base Damage)',
      'Aug. Annihilation (+14.4% Base Damage)',
      'Aug. Annihilation (+18% Base Damage)',

      'Aug. Avatar of Steel (-900s Cooldown)',
      'Aug. Avatar of Steel (-900s Cooldown, +0.33% Momentum)',
      'Aug. Avatar of Steel (-900s Cooldown, +0.66% Momentum)',
      'Aug. Avatar of Steel (-900s Cooldown, +1% Momentum)',

      'Aug. Berserk (+18% Critical Extra Damage)',
      'Aug. Berserk (+18% Critical Extra Damage)',
      'Aug. Berserk (+18% Critical Extra Damage)',
      'Aug. Berserk (+18% Critical Extra Damage)',

      'Aug. Berserk (+5% Base Damage)',
      'Aug. Berserk (+5.5% Base Damage)',
      'Aug. Berserk (+6% Base Damage)',
      'Aug. Berserk (+7.5% Base Damage)',

      "Aug. Executioner's Throw (+12% Critical Extra Damage)",
      "Aug. Executioner's Throw (+13.2% Critical Extra Damage)",
      "Aug. Executioner's Throw (+14.4% Critical Extra Damage)",
      "Aug. Executioner's Throw (+18% Critical Extra Damage)",

      "Aug. Executioner's Throw (+6% Base Damage)",
      "Aug. Executioner's Throw (+6.6% Base Damage)",
      "Aug. Executioner's Throw (+7.2% Base Damage)",
      "Aug. Executioner's Throw (+9% Base Damage)",

      "Aug. Executioner's Throw (-2s Cooldown)",
      "Aug. Executioner's Throw (-2s Cooldown, +0.33% Momentum)",
      "Aug. Executioner's Throw (-2s Cooldown, +0.66% Momentum)",
      "Aug. Executioner's Throw (-2s Cooldown, +1% Momentum)",

      'Aug. Fair Wound Cleansing (+10% Base Healing)',
      'Aug. Fair Wound Cleansing (+11% Base Healing)',
      'Aug. Fair Wound Cleansing (+12% Base Healing)',
      'Aug. Fair Wound Cleansing (+15% Base Healing)',

      'Aug. Fierce Berserk (+8% Critical Extra Damage)',
      'Aug. Fierce Berserk (+8.8% Critical Extra Damage)',
      'Aug. Fierce Berserk (+9.6% Critical Extra Damage)',
      'Aug. Fierce Berserk (+12% Critical Extra Damage)',

      'Aug. Fierce Berserk (+5% Base Damage)',
      'Aug. Fierce Berserk (+5.5% Base Damage)',
      'Aug. Fierce Berserk (+6.6% Base Damage)',
      'Aug. Fierce Berserk (+7.5% Base Damage)',

      'Aug. Front Sweep (+12% Critical Extra Damage)',
      'Aug. Front Sweep (+13.2% Critical Extra Damage)',
      'Aug. Front Sweep (+14.4% Critical Extra Damage)',
      'Aug. Front Sweep (+18% Critical Extra Damage)',

      'Aug. Front Sweep (+8% Base Damage)',
      'Aug. Front Sweep (+8.8% Base Damage)',
      'Aug. Front Sweep (+9.6% Base Damage)',
      'Aug. Front Sweep (+12% Base Damage)',

      'Aug. Groundshaker (+12% Critical Extra Damage)',
      'Aug. Groundshaker (+13.2% Critical Extra Damage)',
      'Aug. Groundshaker (+14.4% Critical Extra Damage)',
      'Aug. Groundshaker (+18% Critical Extra Damage)',

      'Aug. Groundshaker (+6.5% Base Damage)',
      'Aug. Groundshaker (+7.15% Base Damage)',
      'Aug. Groundshaker (+7.8% Base Damage)',
      'Aug. Groundshaker (+9.75% Base Damage)',
    ],
    druid: [
      'Revelation Mastery (+150 Avatar of Nature)',
      'Revelation Mastery (+165 Avatar of Nature)',
      'Revelation Mastery (+180 Avatar of Nature)',
      'Revelation Mastery (+225 Avatar of Nature)',

      'Revelation Mastery (+150 Blessing of the Grove)',
      'Revelation Mastery (+165 Blessing of the Grove)',
      'Revelation Mastery (+180 Blessing of the Grove)',
      'Revelation Mastery (+225 Blessing of the Grove)',

      'Revelation Mastery (+150 Twin Bursts)',
      'Revelation Mastery (+165 Twin Bursts)',
      'Revelation Mastery (+180 Twin Bursts)',
      'Revelation Mastery (+225 Twin Bursts)',

      'Aug. Avatar of Nature (-900s Cooldown)',
      'Aug. Avatar of Nature (-900s Cooldown, +0.33% Momentum)',
      'Aug. Avatar of Nature (-900s Cooldown, +0.66% Momentum)',
      'Aug. Avatar of Nature (-900s Cooldown, +1% Momentum)',

      'Aug. Eternal Winter (+12% Critical Extra Damage)',
      'Aug. Eternal Winter (+13.2% Critical Extra Damage)',
      'Aug. Eternal Winter (+14.4% Critical Extra Damage)',
      'Aug. Eternal Winter (+18% Critical Extra Damage)',

      'Aug. Eternal Winter (+8% Base Damage)',
      'Aug. Eternal Winter (+8.8% Base Damage)',
      'Aug. Eternal Winter (+9.6% Base Damage)',
      'Aug. Eternal Winter (+12% Base Damage)',

      'Aug. Heal Friend (+5% Base Healing)',
      'Aug. Heal Friend (+5.5% Base Healing)',
      'Aug. Heal Friend (+6% Base Healing)',
      'Aug. Heal Friend (+7.5% Base Healing)',

      'Aug. Ice Burst (+12% Critical Extra Damage)',
      'Aug. Ice Burst (+13.2% Critical Extra Damage)',
      'Aug. Ice Burst (+14.4% Critical Extra Damage)',
      'Aug. Ice Burst (+18% Critical Extra Damage)',

      'Aug. Ice Burst (+7% Base Damage)',
      'Aug. Ice Burst (+7.7% Base Damage)',
      'Aug. Ice Burst (+8.4% Base Damage)',
      'Aug. Ice Burst (+10.5% Base Damage)',

      'Aug. Mass Healing (+5% Base Healing)',
      'Aug. Mass Healing (+5.5% Base Healing)',
      'Aug. Mass Healing (+6% Base Healing)',
      'Aug. Mass Healing (+7.5% Base Healing)',

      "Aug. Nature's Embrace (-10s Cooldown)",
      "Aug. Nature's Embrace (-10s Cooldown, +0.33% Momentum)",
      "Aug. Nature's Embrace (-10s Cooldown, +0.66% Momentum)",
      "Aug. Nature's Embrace (-10s Cooldown, +1% Momentum)",

      'Aug. Strong Ice Wave (+15% Critical Extra Damage)',
      'Aug. Strong Ice Wave (+16.5% Critical Extra Damage)',
      'Aug. Strong Ice Wave (+18% Critical Extra Damage)',
      'Aug. Strong Ice Wave (+22.5% Critical Extra Damage)',

      'Aug. Strong Ice Wave (+8% Base Damage)',
      'Aug. Strong Ice Wave (+8.8% Base Damage)',
      'Aug. Strong Ice Wave (+9.6% Base Damage)',
      'Aug. Strong Ice Wave (+12% Base Damage)',

      'Aug. Terra Burst (+12% Critical Extra Damage)',
      'Aug. Terra Burst (+13.2% Critical Extra Damage)',
      'Aug. Terra Burst (+14.4% Critical Extra Damage)',
      'Aug. Terra Burst (+18% Critical Extra Damage)',

      'Aug. Terra Burst (+7% Base Damage)',
      'Aug. Terra Burst (+7.7% Base Damage)',
      'Aug. Terra Burst (+8.4% Base Damage)',
      'Aug. Terra Burst (+10.5% Base Damage)',

      'Aug. Terra Wave (+12% Critical Extra Damage)',
      'Aug. Terra Wave (+13.2% Critical Extra Damage)',
      'Aug. Terra Wave (+14.4% Critical Extra Damage)',
      'Aug. Terra Wave (+18% Critical Extra Damage)',

      'Aug. Terra Wave (+5% Base Damage)',
      'Aug. Terra Wave (+5.5% Base Damage)',
      'Aug. Terra Wave (+6% Base Damage)',
      'Aug. Terra Wave (+7.5% Base Damage)',

      'Aug. Ultimate Healing (+5% Base Healing)',
      'Aug. Ultimate Healing (+5.5% Base Healing)',
      'Aug. Ultimate Healing (+6% Base Healing)',
      'Aug. Ultimate Healing (+7.5% Base Healing)',
    ],
    sorcerer: [
      'Revelation Mastery (+150 Avatar of Storm)',
      'Revelation Mastery (+165 Avatar of Storm)',
      'Revelation Mastery (+180 Avatar of Storm)',
      'Revelation Mastery (+225 Avatar of Storm)',

      'Revelation Mastery (+150 Beam Mastery)',
      'Revelation Mastery (+165 Beam Mastery)',
      'Revelation Mastery (+180 Beam Mastery)',
      'Revelation Mastery (+225 Beam Mastery)',

      'Revelation Mastery (+150 Drain Body)',
      'Revelation Mastery (+165 Drain Body)',
      'Revelation Mastery (+180 Drain Body)',
      'Revelation Mastery (+225 Drain Body)',

      'Aug. Avatar of Storm (-900s Cooldown)',
      'Aug. Avatar of Storm (-900s Cooldown, +0.33% Momentum)',
      'Aug. Avatar of Storm (-900s Cooldown, +0.66% Momentum)',
      'Aug. Avatar of Storm (-900s Cooldown, +1% Momentum)',

      'Aug. Energy Wave (+12% Critical Extra Damage)',
      'Aug. Energy Wave (+13.2% Critical Extra Damage)',
      'Aug. Energy Wave (+14.4% Critical Extra Damage)',
      'Aug. Energy Wave (+18% Critical Extra Damage)',

      'Aug. Energy Wave (+5% Base Damage)',
      'Aug. Energy Wave (+5.5% Base Damage)',
      'Aug. Energy Wave (+6% Base Damage)',
      'Aug. Energy Wave (+7.5% Base Damage)',

      'Aug. Energy Wave (-1s Cooldown)',
      'Aug. Energy Wave (-1s Cooldown, +0.33% Momentum)',
      'Aug. Energy Wave (-1s Cooldown, +0.66% Momentum)',
      'Aug. Energy Wave (-1s Cooldown, +1% Momentum)',

      'Aug. Great Death Beam (+15% Critical Extra Damage)',
      'Aug. Great Death Beam (+16.5% Critical Extra Damage)',
      'Aug. Great Death Beam (+18% Critical Extra Damage)',
      'Aug. Great Death Beam (+22.5% Critical Extra Damage)',

      'Aug. Great Death Beam (+10% Base Damage)',
      'Aug. Great Death Beam (+11% Base Damage)',
      'Aug. Great Death Beam (+12% Base Damage)',
      'Aug. Great Death Beam (+15% Base Damage)',

      'Aug. Great Energy Beam (+15% Critical Extra Damage)',
      'Aug. Great Energy Beam (+16.5% Critical Extra Damage)',
      'Aug. Great Energy Beam (+18% Critical Extra Damage)',
      'Aug. Great Energy Beam (+22.5% Critical Extra Damage)',

      'Aug. Great Energy Beam (+10% Base Damage)',
      'Aug. Great Energy Beam (+11% Base Damage)',
      'Aug. Great Energy Beam (+12% Base Damage)',
      'Aug. Great Energy Beam (+15% Base Damage)',

      'Aug. Great Fire Wave (+8% Critical Extra Damage)',
      'Aug. Great Fire Wave (+8.8% Critical Extra Damage)',
      'Aug. Great Fire Wave (+9.6% Critical Extra Damage)',
      'Aug. Great Fire Wave (+12% Critical Extra Damage)',

      'Aug. Great Fire Wave (+5% Base Damage)',
      'Aug. Great Fire Wave (+5.5% Base Damage)',
      'Aug. Great Fire Wave (+6% Base Damage)',
      'Aug. Great Fire Wave (+7.5% Base Damage)',

      "Aug. Hell's Core (+12% Critical Extra Damage)",
      "Aug. Hell's Core (+13.2% Critical Extra Damage)",
      "Aug. Hell's Core (+14.4% Critical Extra Damage)",
      "Aug. Hell's Core (+18% Critical Extra Damage)",

      "Aug. Hell's Core (+8% Base Damage)",
      "Aug. Hell's Core (+8.8% Base Damage)",
      "Aug. Hell's Core (+9.6% Base Damage)",
      "Aug. Hell's Core (+12% Base Damage)",

      'Aug. Rage of the Skies (+12% Critical Extra Damage)',
      'Aug. Rage of the Skies (+13.2% Critical Extra Damage)',
      'Aug. Rage of the Skies (+14.4% Critical Extra Damage)',
      'Aug. Rage of the Skies (+18% Critical Extra Damage)',

      'Aug. Rage of the Skies (+8% Base Damage)',
      'Aug. Rage of the Skies (+8.8% Base Damage)',
      'Aug. Rage of the Skies (+9.6% Base Damage)',
      'Aug. Rage of the Skies (+12% Base Damage)',

      'Aug. Ultimate Healing (+5% Base Healing)',
      'Aug. Ultimate Healing (+5.5% Base Healing)',
      'Aug. Ultimate Healing (+6% Base Healing)',
      'Aug. Ultimate Healing (+7.5% Base Healing)',
    ],
    paladin: [
      'Revelation Mastery (+150 Avatar of Light)',
      'Revelation Mastery (+165 Avatar of Light)',
      'Revelation Mastery (+180 Avatar of Light)',
      'Revelation Mastery (+225 Avatar of Light)',

      'Revelation Mastery (+150 Divine Empowerment)',
      'Revelation Mastery (+165 Divine Empowerment)',
      'Revelation Mastery (+180 Divine Empowerment)',
      'Revelation Mastery (+225 Divine Empowerment)',

      'Revelation Mastery (+150 Divine Grenade)',
      'Revelation Mastery (+165 Divine Grenade)',
      'Revelation Mastery (+180 Divine Grenade)',
      'Revelation Mastery (+225 Divine Grenade)',

      'Aug. Avatar of Light (-900s Cooldown)',
      'Aug. Avatar of Light (-900s Cooldown, +0.33% Momentum)',
      'Aug. Avatar of Light (-900s Cooldown, +0.66% Momentum)',
      'Aug. Avatar of Light (-900s Cooldown, +1% Momentum)',

      'Aug. Divine Caldera (+8% Critical Extra Damage)',
      'Aug. Divine Caldera (+8.8% Critical Extra Damage)',
      'Aug. Divine Caldera (+9.6% Critical Extra Damage)',
      'Aug. Divine Caldera (+12% Critical Extra Damage)',

      'Aug. Divine Caldera (+5% Base Damage)',
      'Aug. Divine Caldera (+5.5% Base Damage)',
      'Aug. Divine Caldera (+6% Base Damage)',
      'Aug. Divine Caldera (+7.5% Base Damage)',

      'Aug. Divine Dazzle (-4s Cooldown)',
      'Aug. Divine Dazzle (-4s Cooldown, +0.33% Momentum)',
      'Aug. Divine Dazzle (-4s Cooldown, +0.66% Momentum)',
      'Aug. Divine Dazzle (-4s Cooldown, +1% Momentum)',

      'Aug. Divine Empowerment (-6s Cooldown)',
      'Aug. Divine Empowerment (-6s Cooldown, +0.33% Momentum)',
      'Aug. Divine Empowerment (-6s Cooldown, +0.66% Momentum)',
      'Aug. Divine Empowerment (-6s Cooldown, +1% Momentum)',

      'Aug. Divine Grenade (-2s Cooldown)',
      'Aug. Divine Grenade (-2s Cooldown, +0.33% Momentum)',
      'Aug. Divine Grenade (-2s Cooldown, +0.66% Momentum)',
      'Aug. Divine Grenade (-2s Cooldown, +1% Momentum)',

      'Aug. Divine Grenade (+12% Critical Extra Damage)',
      'Aug. Divine Grenade (+13.2% Critical Extra Damage)',
      'Aug. Divine Grenade (+14.4% Critical Extra Damage)',
      'Aug. Divine Grenade (+18% Critical Extra Damage)',

      'Aug. Divine Grenade (+6% Base Damage)',
      'Aug. Divine Grenade (+6.6% Base Damage)',
      'Aug. Divine Grenade (+7.2% Base Damage)',
      'Aug. Divine Grenade (+9% Base Damage)',

      'Aug. Divine Missile (+12% Critical Extra Damage)',
      'Aug. Divine Missile (+13.2% Critical Extra Damage)',
      'Aug. Divine Missile (+14.4% Critical Extra Damage)',
      'Aug. Divine Missile (+18% Critical Extra Damage)',

      'Aug. Divine Missile (+8% Base Damage)',
      'Aug. Divine Missile (+8.8% Base Damage)',
      'Aug. Divine Missile (+9.6% Base Damage)',
      'Aug. Divine Missile (+12% Base Damage)',

      'Aug. Ethereal Spear (+15% Critical Extra Damage)',
      'Aug. Ethereal Spear (+16.5% Critical Extra Damage)',
      'Aug. Ethereal Spear (+18.5% Critical Extra Damage)',
      'Aug. Ethereal Spear (+22.5% Critical Extra Damage)',

      'Aug. Ethereal Spear (+10% Base Damage)',
      'Aug. Ethereal Spear (+11% Base Damage)',
      'Aug. Ethereal Spear (+12% Base Damage)',
      'Aug. Ethereal Spear (+15% Base Damage)',

      'Aug. Salvation (+6% Base Healing)',
      'Aug. Salvation (+6.6% Base Healing)',
      'Aug. Salvation (+7.2% Base Healing)',
      'Aug. Salvation (+9% Base Healing)',

      'Aug. Strong Ethereal Spear (+12% Critical Extra Damage)',
      'Aug. Strong Ethereal Spear (+13.2% Critical Extra Damage)',
      'Aug. Strong Ethereal Spear (+14.4% Critical Extra Damage)',
      'Aug. Strong Ethereal Spear (+18% Critical Extra Damage)',

      'Aug. Strong Ethereal Spear (+8% Base Damage)',
      'Aug. Strong Ethereal Spear (+8.8% Base Damage)',
      'Aug. Strong Ethereal Spear (+9.6% Base Damage)',
      'Aug. Strong Ethereal Spear (+12% Base Damage)',
    ],
  },
} as const

export const sharedGreaterGems = generateIdentity(
  tokensByCategory.sharedGreaterGems,
)

export const vocationGreaterGems = {
  knight: generateIdentity(tokensByCategory.vocationGreaterGems.knight),
  druid: generateIdentity(tokensByCategory.vocationGreaterGems.druid),
  sorcerer: generateIdentity(tokensByCategory.vocationGreaterGems.sorcerer),
  paladin: generateIdentity(tokensByCategory.vocationGreaterGems.paladin),
}
