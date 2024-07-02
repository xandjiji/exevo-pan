const fromTo: Record<string, string> = {
  '+1.5% Critical Extra Damage': '+2% Critical Extra Damage',
  '+0.25% Dodge': '+0.28% Dodge',
  '+1.2% Life Leech': '+2% Life Leech',
  '+0.4% Mana Leech': '+0.8% Mana Leech',

  // knight
  'Aug. Annihilation (+8% Critical Extra Damage)':
    'Aug. Annihilation (+15% Critical Extra Damage)',
  'Aug. Annihilation (Damage Increase)': 'Aug. Annihilation (+12% Base Damage)',
  'Aug. Avatar of Steel (-300s Cooldown)':
    'Aug. Avatar of Steel (-900s Cooldown)',
  'Aug. Berserk (+8% Critical Extra Damage)':
    'Aug. Berserk (+5% Critical Extra Damage)',
  'Aug. Berserk (Damage Increase)': 'Aug. Berserk (+5% Base Damage)',
  "Aug. Executioner's Throw (+8% Critical Extra Damage)":
    "Aug. Executioner's Throw (+12% Critical Extra Damage)",
  "Aug. Executioner's Throw (Damage Increase)":
    "Aug. Executioner's Throw (+6% Base Damage)",
  "Aug. Executioner's Throw (-1s Cooldown)":
    "Aug. Executioner's Throw (-2s Cooldown)",
  'Aug. Fair Wound Cleansing (Healing Increase)':
    'Aug. Fair Wound Cleansing (+10% Base Healing)',
  'Aug. Fierce Berserk (Damage Increase)':
    'Aug. Fierce Berserk (+5% Base Damage)',
  'Aug. Front Sweep (+8% Critical Extra Damage)':
    'Aug. Front Sweep (+12% Critical Extra Damage)',
  'Aug. Front Sweep (Damage Increase)': 'Aug. Front Sweep (+8% Base Damage)',
  'Aug. Groundshaker (+8% Critical Extra Damage)':
    'Aug. Groundshaker (+12% Critical Extra Damage)',
  'Aug. Groundshaker (Damage Increase)':
    'Aug. Groundshaker (+6.5% Base Damage)',

  // druid
  'Aug. Avatar of Nature (-300s Cooldown)':
    'Aug. Avatar of Nature (-900s Cooldown)',
  'Aug. Eternal Winter (+8% Critical Extra Damage)':
    'Aug. Eternal Winter (+12% Critical Extra Damage)',
  'Aug. Eternal Winter (Damage Increase)':
    'Aug. Eternal Winter (+8% Base Damage)',
  'Aug. Heal Friend (Healing Increase)': 'Aug. Heal Friend (+5% Base Healing)',
  'Aug. Ice Burst (+8% Critical Extra Damage)':
    'Aug. Ice Burst (+12% Critical Extra Damage)',
  'Aug. Ice Burst (Damage Increase)': 'Aug. Ice Burst (+7% Base Damage)',
  'Aug. Mass Healing (Healing Increase)':
    'Aug. Mass Healing (+5% Base Healing)',
  "Aug. Nature's Embrace (-5s Cooldown)":
    "Aug. Nature's Embrace (-10s Cooldown)",
  'Aug. Strong Ice Wave (+8% Critical Extra Damage)':
    'Aug. Strong Ice Wave (+15% Critical Extra Damage)',
  'Aug. Strong Ice Wave (Damage Increase)':
    'Aug. Strong Ice Wave (+8% Base Damage)',
  'Aug. Terra Burst (+8% Critical Extra Damage)':
    'Aug. Terra Burst (+12% Critical Extra Damage)',
  'Aug. Terra Burst (Damage Increase)': 'Aug. Terra Burst (+7% Base Damage)',
  'Aug. Terra Wave (+8% Critical Extra Damage)':
    'Aug. Terra Wave (+12% Critical Extra Damage)',
  'Aug. Terra Wave (Damage Increase)': 'Aug. Terra Wave (+5% Base Damage)',
  'Aug. Ultimate Healing (Healing Increase)':
    'Aug. Ultimate Healing (+5% Base Healing)',

  // sorcerer
  'Revelation Mastery (+150 Avatar of Storm)':
    'Revelation Mastery (+225 Avatar of Storm)',
  'Revelation Mastery (+150 Beam Mastery)':
    'Revelation Mastery (+225 Beam Mastery)',
  'Revelation Mastery (+150 Drain Body)':
    'Revelation Mastery (+225 Drain Body)',
  'Aug. Avatar of Storm (-300s Cooldown)':
    'Aug. Avatar of Storm (-900s Cooldown, +1% Momentum)',
  'Aug. Energy Wave (+8% Critical Extra Damage)':
    'Aug. Energy Wave (+18% Critical Extra Damage)',
  'Aug. Energy Wave (Damage Increase)': 'Aug. Energy Wave (+7.5% Base Damage)',
  'Aug. Energy Wave (-1s Cooldown)':
    'Aug. Energy Wave (-1s Cooldown, +1% Momentum)',
  'Aug. Great Death Beam (+8% Critical Extra Damage)':
    'Aug. Great Death Beam (+22.5% Critical Extra Damage)',
  'Aug. Great Death Beam (Damage Increase)':
    'Aug. Great Death Beam (+15% Base Damage)',
  'Aug. Great Energy Beam (+8% Critical Extra Damage)':
    'Aug. Great Energy Beam (+22.5% Critical Extra Damage)',
  'Aug. Great Energy Beam (Damage Increase)':
    'Aug. Great Energy Beam (+15% Base Damage)',
  'Aug. Great Fire Wave (+8% Critical Extra Damage)':
    'Aug. Great Fire Wave (+12% Critical Extra Damage)',
  'Aug. Great Fire Wave (Damage Increase)':
    'Aug. Great Fire Wave (+7.5% Base Damage)',
  "Aug. Hell's Core (+8% Critical Extra Damage)":
    "Aug. Hell's Core (+18% Critical Extra Damage)",
  "Aug. Hell's Core (Damage Increase)": "Aug. Hell's Core (+12% Base Damage)",
  'Aug. Rage of the Skies (+8% Critical Extra Damage)':
    'Aug. Rage of the Skies (+18% Critical Extra Damage)',
  'Aug. Rage of the Skies (Damage Increase)':
    'Aug. Rage of the Skies (+12% Base Damage)',

  // paladin
  'Revelation Mastery (+150 Avatar of Light)':
    'Revelation Mastery (+225 Avatar of Light)',
  'Revelation Mastery (+150 Divine Empowerment)':
    'Revelation Mastery (+225 Divine Empowerment)',
  'Revelation Mastery (+150 Divine Grenade)':
    'Revelation Mastery (+225 Divine Grenade)',
  'Aug. Avatar of Light (-300s Cooldown)':
    'Aug. Avatar of Light (-900s Cooldown, +1% Momentum)',
  'Aug. Divine Caldera (+8% Critical Extra Damage)':
    'Aug. Divine Caldera (+12% Critical Extra Damage)',
  'Aug. Divine Caldera (Damage Increase)':
    'Aug. Divine Caldera (+7.5% Base Damage)',
  'Aug. Divine Dazzle (-2s Cooldown)':
    'Aug. Divine Dazzle (-4s Cooldown, +1% Momentum)',
  'Aug. Divine Empowerment (-3s Cooldown)':
    'Aug. Divine Empowerment (-6s Cooldown, +1% Momentum)',
  'Aug. Divine Grenade (-1s Cooldown)':
    'Aug. Divine Grenade (-2s Cooldown, +1% Momentum)',
  'Aug. Divine Grenade (+8% Critical Extra Damage)':
    'Aug. Divine Grenade (+18% Critical Extra Damage)',
  'Aug. Divine Grenade (Damage Increase)':
    'Aug. Divine Grenade (+9% Base Damage)',
  'Aug. Divine Missile (+8% Critical Extra Damage)':
    'Aug. Divine Missile (+18% Critical Extra Damage)',
  'Aug. Divine Missile (Damage Increase)':
    'Aug. Divine Missile (+12% Base Damage)',
  'Aug. Ethereal Spear (+8% Critical Extra Damage)':
    'Aug. Ethereal Spear (+22.5% Critical Extra Damage)',
  'Aug. Ethereal Spear (Damage Increase)':
    'Aug. Ethereal Spear (+15% Base Damage)',
  'Aug. Salvation (Healing Increase)': 'Aug. Salvation (+9% Base Healing)',
  'Aug. Strong Ethereal Spear (+8% Critical Extra Damage)':
    'Aug. Strong Ethereal Spear (+18% Critical Extra Damage)',
  'Aug. Strong Ethereal Spear (Damage Increase)':
    'Aug. Strong Ethereal Spear (+12% Base Damage)',
}

export const updateGemToken = (token: string): string => fromTo[token] ?? token
