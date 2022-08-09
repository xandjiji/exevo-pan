import { dateToDateObject } from 'utils'

const { year, month, day } = dateToDateObject(new Date())
const date = `${year}-${month + 1}-${day}`

export const defaultValue = `Session data: From ${date}, 11:21:07 to ${date}, 13:44:36
Session: 01:23h
Loot Type: Market
Loot: 624,317
Supplies: 566,829
Balance: 57488
Lord'Paulistinha (Leader)
	Loot: 349,363
	Supplies: 98,318
	Balance: 251,045
	Damage: 215,683
	Healing: 117,408
Mateusz Dragon Wielki
	Loot: 205,479
	Supplies: 123,737
	Balance: 81,742
	Damage: 885,460
	Healing: 332,423
Cachero
	Loot: 46,904
	Supplies: 174,424
	Balance: -127,520
	Damage: 628,303
	Healing: 223
Lightbringer
	Loot: 22,571
	Supplies: 170,350
	Balance: -147,779
	Damage: 564,848
	Healing: 104,877`
