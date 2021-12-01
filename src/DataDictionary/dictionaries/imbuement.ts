import { dictionaryFactory } from '../utils'

export const scrapingTokens = {
  'Powerful Strike': 'Critical Hit',
  'Powerful Vampirism': 'Life Leech',
  'Powerful Void': 'Mana Leech',
  'Powerful Bash': 'Club Skill',
  'Powerful Blockade': 'Shield Skill',
  'Powerful Chop': 'Axe Skill',
  'Powerful Epiphany': 'Magic Level',
  'Powerful Precision': 'Distance Skill',
  'Powerful Slash': 'Sword Skill',
  'Powerful Featherweight': 'Capacity',
  'Powerful Swiftness': 'Speed',
  'Powerful Vibrancy': 'Paralize Removal',
  'Powerful Electrify': 'Energy Damage',
  'Powerful Frost': 'Ice Damage',
  'Powerful Reap': 'Death Damage',
  'Powerful Scorch': 'Fire Damage',
  'Powerful Venom': 'Earth Damage',
  'Powerful Cloud Fabric': 'Energy Protection',
  'Powerful Demon Presence': 'Holy Protection',
  'Powerful Dragon Hide': 'Fire Protection',
  'Powerful Lich Shroud': 'Death Protection',
  'Powerful Quara Scale': 'Ice Protection',
  'Powerful Snake Skin': 'Earth Protection',
}

export const tokens = Object.values(scrapingTokens)

export const dictionary = dictionaryFactory(tokens)
