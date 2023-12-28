export const ignoreList = new Set<string>([
  /* POTIONS */
  'mana potion',
  'strong mana potion',
  'great mana potion',
  'ultimate mana potion',
  'health potion',
  'strong health potion',
  'great health potion',
  'ultimate health potion',
  'supreme health potion',
  'great spirit potion',
  'ultimate spirit potion',
  /* KEGS */
  'health keg',
  'strong health keg',
  'great health keg',
  'ultimate health keg',
  'supreme health keg',
  'mana keg',
  'strong mana keg',
  'great mana keg',
  'ultimate mana keg',
  'great spririt keg',
  'ultimate spirit keg',
  /* CASKS */
  'mana cask',
  'strong mana cask',
  'great mana cask',
  'ultimate mana cask',
  'health cask',
  'strong health cask',
  'great health cask',
  'ultimate health cask',
  'supreme health cask',
  'great spirit cask',
  'ultimate spirit cask',
  /* RUNES */
  'energy bomb rune',
  'convince creature rune',
  'chameleon rune',
  'magic wall rune',
  'sudden death rune',
  'avalanche rune',
  'fire wall rune',
  'ultimate healing rune',
  'energy field rune',
  'fire bomb rune',
  'intense healing rune',
  'animate dead rune',
  'great fireball rune',
  'disintegrate rune',
  'thunderstorm rune',
  'paralyse rune',
  'explosion rune',
  'soulfire rune',
  'fire field rune',
  'fireball rune',
  'energy wall rune',
  'wild growth rune',
  'poison bomb rune',
  'stone shower rune',
  'poison wall rune',
  'icicle rune',
  'cure poison rune',
  /* EXERCISE */
  'training rod',
  'training axe',
  'training wand',
  'training sword',
  'training bow',
  'training club',
  'exercise axe',
  'exercise bow',
  'exercise club',
  'exercise sword',
  'exercise rod',
  'exercise wand',
  'exercise shield',
  'durable exercise axe',
  'durable exercise bow',
  'durable exercise club',
  'durable exercise sword',
  'durable exercise rod',
  'durable exercise wand',
  'durable exercise shield',
  'lasting exercise axe',
  'lasting exercise bow',
  'lasting exercise club',
  'lasting exercise sword',
  'lasting exercise rod',
  'lasting exercise wand',
  'lasting exercise shield',
  /* CONSUMABLE */
  'gold converter',
  'magic gold converter',
  'temporary gold converter',
  'temple teleport scroll',
  /* FOOD */
  'tropical marinated tiger',
  'roasted wyvern wings',
  'overcooked noodles',
  'delicatessen salad',
  'svargrond salmon filet',
  'consecrated beef',
  'chilli con carniphila',
  'carrion casserole',
  'carrot pie',
])

export const storeItems: Record<string, StoreItem> = {
  'gold pouch': {
    name: 'Gold Pouch',
    value: 900,
  },
  'ferumbras exercise dummy': {
    name: 'Ferumbras Exercise Dummy',
    value: 900,
  },
  'monk exercise dummy': {
    name: 'Monk Exercise Dummy',
    value: 900,
  },
  'demon exercise dummy': {
    name: 'Demon Exercise Dummy',
    value: 900,
  },
  'reward shrine': {
    name: 'Daily Reward Shrine',
    value: 150,
  },
  'shiny reward shrine': {
    name: 'Shiny Daily Reward Shrine',
    value: 200,
  },
  'imbuing shrine': {
    name: 'Imbuing Shrine',
    value: 150,
  },
  'gilded imbuing shrine': {
    name: 'Gilded Imbuing Shrine',
    value: 200,
  },
  mailbox: {
    name: 'Mailbox',
    value: 150,
  },
  'ornate mailbox': {
    name: 'Ornate Mailbox',
    value: 200,
  },
  'hireling lamp': {
    name: 'Hireling Lamp',
    value: 150,
  },
  'hireling name change scroll': {
    name: 'Hireling Name Change Scroll',
    value: 250,
  },
  'hireling sex change rune': {
    name: 'Hireling Sex Change Rune',
    value: 120,
  },
  /* BEDS */
  'sleeping mat': {
    name: 'Sleeping Mat',
    value: 120,
  },
  'kraken bed': {
    name: 'Kraken Bed',
    value: 150,
  },
  'log bed': {
    name: 'Log Bed',
    value: 150,
  },
  'grandiose bed': {
    name: 'Grandiose Bed',
    value: 150,
  },
  'magnificent bed': {
    name: 'Magnificent Bed',
    value: 180,
  },
  'ornate bed': {
    name: 'Ornate Bed',
    value: 180,
  },
  'vengothic bed': {
    name: 'Vengothic Bed',
    value: 180,
  },
  'verdant bed': {
    name: 'Verdant Bed',
    value: 150,
  },
  'wrought-iron bed': {
    name: 'Wrought-Iron Bed',
    value: 150,
  },
  'homely bed': {
    name: 'Homely Bed',
    value: 120,
  },
  'knightly bed': {
    name: 'Knightly Bed',
    value: 180,
  },
  'seafarer bed': {
    name: 'Seafarer Bed',
    value: 180,
  },
  /* DECORATIONS */
  'marble tiles': {
    name: 'Marble Floor',
    value: 30,
  },
  'pile of stone tiles': {
    name: 'Stone Tiles',
    value: 25,
  },
  'wooden planks': {
    name: 'Wooden Planks',
    value: 25,
  },
  'rolled-up white fur carpet': {
    name: 'White Fur Carpet',
    value: 30,
  },
  grass: {
    name: 'Grass',
    value: 30,
  },
  'incomprehensible riches': {
    name: 'Incomprehensible Riches',
    value: 90,
  },
  'rolled-up azure carpet': {
    name: 'Azure Carpet',
    value: 35,
  },
  'Zaoan divider': {
    name: 'Zaoan Divider',
    value: 60,
  },
  'dark parquet planks': {
    name: 'Dark Parquet',
    value: 30,
  },
  'red roses': {
    name: 'Red Roses',
    value: 50,
  },
  'pink roses': {
    name: 'Pink Roses',
    value: 50,
  },
  'Zaoan bamboo tiles': {
    name: 'Zaoan Bamboo Tiles',
    value: 30,
  },
  'Zaoan panel': {
    name: 'Zaoan Panel',
    value: 50,
  },
  'Zaoan panel base': {
    name: 'Zaoan Panel Base',
    value: 50,
  },
  'blank Zaoan panel': {
    name: 'Blank Zaoan Panel',
    value: 50,
  },
  'bath tub': {
    name: 'Bath Bub',
    value: 250,
  },
  'rolled-up crimson carpet': {
    name: 'Crimson Carpet',
    value: 35,
  },
  'sculpture of a fox': {
    name: 'Sculpture of a Fox',
    value: 180,
  },
  'light parquet planks': {
    name: 'Light Parquet',
    value: 30,
  },
  'rolled-up crested carpet': {
    name: 'Crested Carpet',
    value: 25,
  },
  'violet square cushion': {
    name: 'Violet Square Cushion',
    value: 50,
  },
  'rolled-up decorated carpet': {
    name: 'Decorated Carpet',
    value: 35,
  },
  'bitter-smack leaf': {
    name: 'Bitter-Smack Leaf',
    value: 50,
  },
  'Ferumbras portrait': {
    name: 'Ferumbras Portrait',
    value: 100,
  },
  'yellow roses': {
    name: 'Yellow Roses',
    value: 50,
  },
  'rolled-up emerald carpet': {
    name: 'Emerald Carpet',
    value: 35,
  },
  'filled kraken shelf': {
    name: 'Kraken Shelf',
    value: 100,
  },
  'empty kraken shelf': {
    name: 'Kraken Shelf',
    value: 100,
  },
  'midnight panther rug': {
    name: 'Midnight Panther Rug',
    value: 30,
  },
  'Zaoan pot bamboo': {
    name: 'Zaoan Pot Bamboo',
    value: 50,
  },
  'Zaoan wall lamps': {
    name: 'Zaoan Wall Lamps',
    value: 60,
  },
  'Zaoan wall lamp': {
    name: 'Zaoan Wall Lamp',
    value: 60,
  },
  'blue round cushion': {
    name: 'Blue Round Cushion',
    value: 50,
  },
  'blue square cushion': {
    name: 'Blue Square Cushion',
    value: 50,
  },
  'podium of renown': {
    name: 'Podium of Renown',
    value: 500,
  },
  'rolled-up yalaharian carpet': {
    name: 'Yalaharian Carpet',
    value: 35,
  },
  'chest of abundance': {
    name: 'Chest of Abundance',
    value: 120,
  },
  'grandiose carpet': {
    name: 'Grandiose Carpet',
    value: 35,
  },
  'kraken buoy lamp': {
    name: 'Kraken Buoy Lamp',
    value: 60,
  },
  'lit kraken buoy lamp': {
    name: 'Kraken Buoy Lamp',
    value: 60,
  },
  'rolled-up shaggy carpet': {
    name: 'Shaggy Carpet',
    value: 30,
  },
  'volcanic spire': {
    name: 'Volcanic Spire',
    value: 80,
  },
  'alchemistic cupboard': {
    name: 'Alchemistic Cupboard',
    value: 50,
  },
  'gloomy dungeon scene': {
    name: 'Dungeon Scene Painting',
    value: 100,
  },
  fennec: {
    name: 'Fennec',
    value: 150,
  },
  'festive filled shoes': {
    name: 'Festive Filled Shoes',
    value: 50,
  },
  'fish in a tank': {
    name: 'Fish Tank',
    value: 180,
  },
  'rolled-up fur carpet': {
    name: 'Fur Carpet',
    value: 30,
  },
  'kraken watcher lamp': {
    name: 'Kraken Watcher Lamp',
    value: 80,
  },
  'lit kraken watcher lamp': {
    name: 'Kraken Watcher Lamp',
    value: 80,
  },
  'light of change': {
    name: 'Light of Change',
    value: 180,
  },
  'owin rug': {
    name: 'Owin Rug',
    value: 30,
  },
  'portable aqueduct': {
    name: 'Portable Aqueduct',
    value: 250,
  },
  'romantic carpet': {
    name: 'Romantic Carpet',
    value: 30,
  },
  'sword tapestry': {
    name: 'Sword Tapestry',
    value: 60,
  },
  'torch of change': {
    name: 'Torch of Change',
    value: 120,
  },
  'volcanic bulb': {
    name: 'Volcanic Bulb',
    value: 80,
  },
  'Zaoan bonsai': {
    name: 'Zaoan Bonsai',
    value: 50,
  },
  'all-seeing tapestry': {
    name: 'All-seeing tapestry',
    value: 60,
  },
  'knightly decorative shield': {
    name: 'Knightly Decorative Shield',
    value: 60,
  },
  'knightly fire bowl': {
    name: 'Knightly Fire Bowl',
    value: 80,
  },
  'knightly wall lamp': {
    name: 'Knightly Wall Lamp',
    value: 60,
  },
  'knightly bench': {
    name: 'Knightly Bench',
    value: 140,
  },
  'knightly sword lamp': {
    name: 'Knightly Sword Lamp',
    value: 60,
  },
  'knightly chest': {
    name: 'Knightly Chest',
    value: 60,
  },
  'knightly candelabra': {
    name: 'Knightly Candelabra',
    value: 60,
  },
  'knightly guard': {
    name: 'Knightly Guard',
    value: 250,
  },
  'knightly cabinet': {
    name: 'Knightly Cabinet',
    value: 100,
  },
  'knightly chair': {
    name: 'Knightly Chair',
    value: 70,
  },
  'well-laid knightly table': {
    name: 'Knightly Table',
    value: 60,
  },
  'knightly table': {
    name: 'Knightly Table',
    value: 60,
  },
  'knightly candle holder': {
    name: 'Knightly Candle Holder',
    value: 60,
  },
  'brocade tapestry': {
    name: 'Brocade Tapestry',
    value: 50,
  },
  'cat in a basket': {
    name: 'Cat in a Basket',
    value: 150,
  },
  'dog house': {
    name: 'Dog House',
    value: 150,
  },
  'drawing board': {
    name: 'Drawing Board',
    value: 100,
  },
  glowworms: {
    name: 'Glowworms',
    value: 180,
  },
  'golden demon skull': {
    name: 'Golden Demon Skull',
    value: 80,
  },
  'green square cushion': {
    name: 'Green Square Cushion',
    value: 50,
  },
  'kraken tentacle lamp': {
    name: 'Kraken Tentacle Lamp',
    value: 60,
  },
  'lit kraken tentacle lamp': {
    name: 'Kraken Tentacle Lamp',
    value: 60,
  },
  'lilac carpet': {
    name: 'Lilac Carpet',
    value: 60,
  },
  'protectress lamp': {
    name: 'Protectress Lamp',
    value: 90,
  },
  'lit protectress lamp': {
    name: 'Protectress Lamp',
    value: 90,
  },
  'painting of Tibiasula': {
    name: 'Painting of Tibiasula',
    value: 250,
  },
  'stuffed teddy display': {
    name: 'Stuffed Teddy Display',
    value: 50,
  },
  'wooden sandals': {
    name: 'Wooden Sandals',
    value: 40,
  },
  'yellow shroom lamp': {
    name: 'Yellow Shroom Lamp',
    value: 60,
  },
  'lit yellow shroom lamp': {
    name: 'Yellow Shroom Lamp',
    value: 60,
  },
  'Zaoan drawing': {
    name: 'Zaoan Drawing',
    value: 50,
  },
  'alchemistic bookstand': {
    name: 'Alchemistic Bookstand',
    value: 100,
  },
  'alchemistic scales': {
    name: 'Alchemistic Scales',
    value: 120,
  },
  'anglerfish lamp': {
    name: 'Anglerfish Lamp',
    value: 120,
  },
  'lit anglerfish lamp': {
    name: 'Anglerfish Lamp',
    value: 120,
  },
  anvil: {
    name: 'Anvil',
    value: 120,
  },
  'baby bonelord': {
    name: 'Baby Bonelord',
    value: 250,
  },
  bat: {
    name: 'Bat',
    value: 180,
  },
  chameleon: {
    name: 'Chameleon',
    value: 250,
  },
  'rolled-up colourful carpet': {
    name: 'Colourful Carpet',
    value: 35,
  },
  'colourful pom-pom carpet': {
    name: 'Colourful Carpet',
    value: 35,
  },
  'demon statue': {
    name: 'Demon Statue',
    value: 100,
  },
  'rolled-up diamond carpet': {
    name: 'Diamond Carpet',
    value: 25,
  },
  'fluorescent fungi': {
    name: 'Fluorescent Fungi',
    value: 60,
  },
  'gloomy poisonous fungi': {
    name: 'Gloomy Poisonous Fungi',
    value: 60,
  },
  'golden dragon tapestry': {
    name: 'Golden Dragon Tapestry',
    value: 70,
  },
  'grandiose painting': {
    name: 'Grandiose Painting',
    value: 50,
  },
  'green round cushion': {
    name: 'Green Round Cushion',
    value: 50,
  },
  'grinding wheel': {
    name: 'Grinding Wheel',
    value: 80,
  },
  'kitchen shelf': {
    name: 'Kitchen Shelf',
    value: 50,
  },
  'skull lamp': {
    name: 'Skull Lamp',
    value: 90,
  },
  'lit skull lamp': {
    name: 'Skull Lamp',
    value: 90,
  },
  'little big flower lamp': {
    name: 'Little Big Flower Lamp',
    value: 80,
  },
  'lit little big flower lamp': {
    name: 'Little Big Flower Lamp',
    value: 80,
  },
  monkey: {
    name: 'Monkey',
    value: 180,
  },
  'moon carpet': {
    name: 'Moon Carpet',
    value: 25,
  },
  'rolled-up mystic carpet': {
    name: 'Mystic Carpet',
    value: 35,
  },
  'rolled-up night sky carpet': {
    name: 'Night Sky Carpet',
    value: 25,
  },
  oven: {
    name: 'Oven',
    value: 120,
  },
  parrot: {
    name: 'Parrot',
    value: 180,
  },
  'pile of alchemistic books': {
    name: 'Pile of Alchemistic Books',
    value: 120,
  },
  'pirate flag': {
    name: 'Pirate Flag',
    value: 50,
  },
  'exalted sarcophagus': {
    name: 'Sarcophagus',
    value: 120,
  },
  terrarium: {
    name: 'Terrarium Snake',
    value: 180,
  },
  'the streets of Tibia': {
    name: 'Tibia Streets Painting',
    value: 100,
  },
  'vengothic lamp': {
    name: 'Vengothic Lamp',
    value: 180,
  },
  'lit vengothic lamp': {
    name: 'Vengothic Lamp',
    value: 180,
  },
  'violet round cushion': {
    name: 'Violet Round Cushion',
    value: 50,
  },
  'volcanic mirror': {
    name: 'Volcanic Mirror',
    value: 120,
  },
  wallcupboard: {
    name: 'Wallcupboard',
    value: 50,
  },
  'Zaoan paravent': {
    name: 'Zaoan Paravent',
    value: 60,
  },
  'arrival at Thais': {
    name: 'Arrival at Thais Painting',
    value: 50,
  },
  'baby dragon': {
    name: 'Baby Dragon',
    value: 250,
  },
  'baby elephant': {
    name: 'Baby Elephant',
    value: 250,
  },
  'baby polar bear': {
    name: 'Baby Polar Bear',
    value: 250,
  },
  'baby rotworm': {
    name: 'Baby Rotworm',
    value: 150,
  },
  'baby seal': {
    name: 'Baby Seal',
    value: 250,
  },
  'baby unicorn': {
    name: 'Baby Unicorn',
    value: 250,
  },
  'rolled-up bamboo mat': {
    name: 'Bamboo Mat',
    value: 25,
  },
  barrel: {
    name: 'Barrel',
    value: 60,
  },
  'barrel and anchor lamp': {
    name: 'Barror & Anchor Lamp',
    value: 80,
  },
  bellflower: {
    name: 'Bellflower',
    value: 50,
  },
  'blooming cactus': {
    name: 'Blooming Cactus',
    value: 50,
  },
  'carnivorous plant': {
    name: 'Carnivorous Plant',
    value: 150,
  },
  'crystal lamp': {
    name: 'Crystal Lamp',
    value: 80,
  },
  'lit crystal lamp': {
    name: 'Crystal Lamp',
    value: 80,
  },
  'curly hortensis lamp': {
    name: 'Curly Hortensis Lamp',
    value: 120,
  },
  'lit curly hortensis lamp': {
    name: 'Curly Hortensis Lamp',
    value: 120,
  },
  'demon baller': {
    name: 'Demon Baller',
    value: 250,
  },
  demon: {
    name: 'Demon Pet',
    value: 250,
  },
  'demon skull': {
    name: 'Demon Skull',
    value: 50,
  },
  'dragon plant': {
    name: 'Dragon Plant',
    value: 180,
  },
  'Ferumbras bust': {
    name: 'Ferumbras Bust',
    value: 70,
  },
  "Ferumbras' snowman": {
    name: 'Ferumbras Snowman',
    value: 100,
  },
  'festive fireplace ': {
    name: 'Festive Fireplace',
    value: 180,
  },
  'festive pile of presents': {
    name: 'Festive Pile of Presents',
    value: 50,
  },
  'festive pyramide': {
    name: 'Festive Pyramid',
    value: 120,
  },
  'festive rocking chair': {
    name: 'Festive Rocking Chair',
    value: 50,
  },
  'festive sack of presents': {
    name: 'Festive Sack of Presents',
    value: 50,
  },
  'festive sleigh': {
    name: 'Festive Sleigh',
    value: 50,
  },
  'festive table': {
    name: 'Festive Table',
    value: 100,
  },
  'festive tree': {
    name: 'Festive Tree',
    value: 180,
  },
  'rolled-up flowery carpet': {
    name: 'Flowery Carpet',
    value: 35,
  },
  forge: {
    name: 'Forge',
    value: 120,
  },
  'forget-me-not': {
    name: 'Forget-Me-Not',
    value: 50,
  },
  'four hearts lamp': {
    name: 'Four Hearts Lamp',
    value: 120,
  },
  'lit four hearts lamp': {
    name: 'Four Hearts Lamp',
    value: 120,
  },
  'glowing sulphur fungi': {
    name: 'Glowing Sulphur Fungi',
    value: 60,
  },
  'golden minotaur skull': {
    name: 'Golden Minotaur Skull',
    value: 100,
  },
  'grandiose lamp': {
    name: 'Grandiose Lamp',
    value: 80,
  },
  'lit grandiose lamp': {
    name: 'Grandiose Lamp',
    value: 80,
  },
  'hamster in a wheel': {
    name: 'Hamster in a Wheel',
    value: 180,
  },
  'heart lamp': {
    name: 'Heart Lamp',
    value: 180,
  },
  'lit heart lamp': {
    name: 'Heart Lamp',
    value: 180,
  },
  'baby hedgehog': {
    name: 'Hedgehog',
    value: 150,
  },
  'hrodmiran weapons rack': {
    name: 'Hrodmiran Weapons Rack',
    value: 90,
  },
  'ice chandelier': {
    name: 'Ice Chandelier',
    value: 180,
  },
  'idol lamp': {
    name: 'Idol Lamp',
    value: 80,
  },
  'lit idol lamp': {
    name: 'Idol Lamp',
    value: 80,
  },
  'King Tibianus bust': {
    name: 'King Tibianus Bust',
    value: 50,
  },
  'kitchen clock': {
    name: 'Kitchen Clock',
    value: 80,
  },
  'kitchen lamp': {
    name: 'Kitchen Lamp',
    value: 80,
  },
  'lit kitchen lamp': {
    name: 'Kitchen Lamp',
    value: 80,
  },
  'predator lamp': {
    name: 'Predator Lamp',
    value: 60,
  },
  'lit predator lamp': {
    name: 'Predator Lamp',
    value: 60,
  },
  'lordly tapestry': {
    name: 'Lordly Tapestry',
    value: 50,
  },
  'luminescent fungi': {
    name: 'Luminescent Fungi',
    value: 60,
  },
  'menacing tapestry': {
    name: 'Menacing Tapestry',
    value: 70,
  },
  'mermaid figure head': {
    name: 'Mermaid Figure Head',
    value: 120,
  },
  'metal wall lamp': {
    name: 'Metal Wall Lamp',
    value: 80,
  },
  'minotaur skull': {
    name: 'Minotaur Skull',
    value: 70,
  },
  'model ship lamp': {
    name: 'Model Ship Lamp',
    value: 80,
  },
  'natural pom-pom carpet': {
    name: 'Natural Pom-Pom Carpet',
    value: 30,
  },
  octoputz: {
    name: 'Octoputz',
    value: 180,
  },
  'pair of bellows': {
    name: 'Pair of Bellows',
    value: 50,
  },
  'rolled-up patterned carpet': {
    name: 'Patterned Carpet',
    value: 30,
  },
  'pink shroom lamp': {
    name: 'Pink Shroom Lamp',
    value: 80,
  },
  'pirate ship ballista': {
    name: 'Pirate Ship Ballista',
    value: 120,
  },
  'skeleton in a cage': {
    name: 'Pirate Skeleton Cage',
    value: 120,
  },
  'pirate treasure chest': {
    name: 'Pirate Treasure Chest',
    value: 120,
  },
  'pirate treasure map': {
    name: 'Pirate Treasure Map',
    value: 50,
  },
  'treasure map': {
    name: 'Pirate Treasure Map',
    value: 50,
  },
  'Queen Eloise bust': {
    name: 'Queen Eloise Bust',
    value: 50,
  },
  'red geranium': {
    name: 'Red Geranium',
    value: 50,
  },
  'sabretooth skull': {
    name: 'Sabertooth Skull',
    value: 100,
  },
  'sculpture of a noblewoman': {
    name: 'Sculpture of a Noblewoman',
    value: 120,
  },
  'sculpture of an octoputz': {
    name: 'Sculpture of an Octoputz',
    value: 120,
  },
  "ship's wheel": {
    name: "Ship's Wheel",
    value: 50,
  },
  'small hearts lamp': {
    name: 'Small Hearts Lamp',
    value: 90,
  },
  'rolled-up star carpet': {
    name: 'Star Carpet',
    value: 25,
  },
  'rolled-up striped carpet': {
    name: 'Striped Carpet',
    value: 30,
  },
  'stuffed bear display': {
    name: 'Stuffed Bear Display',
    value: 90,
  },
  'sulphur blossom lamp': {
    name: 'Sulphur Blossom Lamp',
    value: 80,
  },
  'spider in a terrarium': {
    name: 'Terrarium Spider',
    value: 180,
  },
  'vegetable basket': {
    name: 'Vegetable  Basket',
    value: 50,
  },
  'venorean table clock': {
    name: 'Venorean Table Clock',
    value: 120,
  },
  'rolled-up verdant carpet': {
    name: 'Verdant Carpet',
    value: 30,
  },
  'volcanic basin': {
    name: 'Volcanic Basin',
    value: 90,
  },
  'volcanic sphere': {
    name: 'Volcanic Sphere',
    value: 90,
  },
  'volcanic table': {
    name: 'Volcanic Table',
    value: 50,
  },
  'water bucket': {
    name: 'Water Bucket',
    value: 60,
  },
  'rolled-up wheat carpet': {
    name: 'Wheat Carpet',
    value: 30,
  },
  'white shark trophy': {
    name: 'White Shark Trophy',
    value: 80,
  },
  /* FURNITURE */
  'grandiose cupboard': {
    name: 'Grandiose Cupboard',
    value: 100,
  },
  'grandiose chair': {
    name: 'Grandiose Chair',
    value: 60,
  },
  'grandiose gilded chest': {
    name: 'Grandiose Gilded Chest',
    value: 90,
  },
  'grandiose couch middle': {
    name: 'Grandiose Couch Middle',
    value: 60,
  },
  'grandiose couch right': {
    name: 'Grandiose Couch Right',
    value: 60,
  },
  'grandiose couch left': {
    name: 'Grandiose Couch Left',
    value: 60,
  },
  'grandiose couch': {
    name: 'Grandiose Couch',
    value: 180,
  },
  'grandiose refined chest': {
    name: 'Grandiose Refined Chest',
    value: 170,
  },
  'stump table': {
    name: 'Stump Table',
    value: 50,
  },
  'comfy chair': {
    name: 'Comfy Chair',
    value: 70,
  },
  'grandiose table': {
    name: 'Grandiose Table',
    value: 50,
  },
  'katana display': {
    name: 'Katana Display',
    value: 70,
  },
  'kraken chair': {
    name: 'Kraken Chair',
    value: 60,
  },
  'ice chest': {
    name: 'Ice Chest',
    value: 80,
  },
  'vengothic chair': {
    name: 'Vengothic Chair',
    value: 50,
  },
  'Zaoan hassock': {
    name: 'Zaoan Hassock',
    value: 60,
  },
  'magnificent trunk': {
    name: 'Magnificent Trunk',
    value: 70,
  },
  'round side table': {
    name: 'Round Side Table',
    value: 50,
  },
  'Zaoan side table': {
    name: 'Zaoan Side Table',
    value: 60,
  },
  'log chest': {
    name: 'Log Chest',
    value: 50,
  },
  'ornate table': {
    name: 'Ornate Table',
    value: 50,
  },
  'rustic table': {
    name: 'Rustic Table',
    value: 50,
  },
  'rustic cabinet': {
    name: 'Rustic Cabinet',
    value: 100,
  },
  'rustic chair': {
    name: 'Rustic Chair',
    value: 50,
  },
  'rustic trunk': {
    name: 'Rustic Trunk',
    value: 80,
  },
  workbench: {
    name: 'Workbench',
    value: 90,
  },
  'alchemistic chair': {
    name: 'Alchemistic Chair',
    value: 50,
  },
  'alchemistic cabinet': {
    name: 'Alchemistic Cabinet',
    value: 100,
  },
  'alchemistic table': {
    name: 'Alchemistic Table',
    value: 80,
  },
  'artist table': {
    name: 'Artist Table',
    value: 80,
  },
  'artist chair': {
    name: 'Artist Chair',
    value: 50,
  },
  'artist shelf': {
    name: 'Artist Shelf',
    value: 110,
  },
  'artist chest': {
    name: 'Artist Chest',
    value: 50,
  },
  'hrodmiran table': {
    name: 'Hrodmir Table',
    value: 50,
  },
  'kraken cabinet': {
    name: 'Kraken Cabinet',
    value: 100,
  },
  'kraken chest': {
    name: 'Kraken Chest',
    value: 70,
  },
  'kraken table': {
    name: 'Kraken Table',
    value: 60,
  },
  'square side table': {
    name: 'Square Side Table',
    value: 50,
  },
  toolbox: {
    name: 'Toolbox',
    value: 50,
  },
  'verdant table': {
    name: 'Verdant Table',
    value: 80,
  },
  'wooden bookcase': {
    name: 'Wooden Bookcase',
    value: 80,
  },
  'Zaoan cabinet': {
    name: 'Zaoan Cabinet',
    value: 100,
  },
  'comfy chest': {
    name: 'Comfy Chest',
    value: 60,
  },
  'comfy table': {
    name: 'Comfy Table',
    value: 60,
  },
  'dwarven stone chair': {
    name: 'Dwarven Stone Chair',
    value: 50,
  },
  'leaf chair': {
    name: 'Leaf Chair',
    value: 80,
  },
  'magnificent chair': {
    name: 'Magnificent Chair',
    value: 60,
  },
  'sculptor chair': {
    name: 'Sculptor Chair',
    value: 50,
  },
  'sculptor table': {
    name: 'Sculptor Table',
    value: 80,
  },
  'sculptor shelf': {
    name: 'Sculptor Shelf',
    value: 110,
  },
  'sculptor chest': {
    name: 'Sculptor Chest',
    value: 50,
  },
  'shroom cupboard': {
    name: 'Shroom Cupboard',
    value: 100,
  },
  'vengothic chest': {
    name: 'Vengothic Chest',
    value: 80,
  },
  'comfy cabinet': {
    name: 'Comfy Cabinet',
    value: 100,
  },
  cupboard: {
    name: 'Cupboard',
    value: 90,
  },
  'dwarven stone cabinet': {
    name: 'Dwarven Stone Cabinet',
    value: 100,
  },
  'dwarven stone chest': {
    name: 'Dwarven Stone Chest',
    value: 80,
  },
  'dwarven stone table': {
    name: 'Dwarven Stone Table',
    value: 50,
  },
  'ferocious cabinet': {
    name: 'Ferocious Cabinet',
    value: 110,
  },
  'ferocious chair': {
    name: 'Ferocious Chair',
    value: 50,
  },
  'ferocious table': {
    name: 'Ferocious Table',
    value: 50,
  },
  'ferocious trunk': {
    name: 'Ferocious Trunk',
    value: 80,
  },
  'heart cabinet': {
    name: 'Heart Cabinet',
    value: 100,
  },
  'heart chair': {
    name: 'Heart Chair',
    value: 50,
  },
  'heart table': {
    name: 'Heart Table',
    value: 50,
  },
  'heart chest': {
    name: 'Heart Chest',
    value: 80,
  },
  'hrodmiran chair': {
    name: 'Hrodmir Chair',
    value: 50,
  },
  'hrodmiran chest': {
    name: 'Hrodmir Chest',
    value: 80,
  },
  'hrodmiran cupboard': {
    name: 'Hrodmir Cupboard',
    value: 100,
  },
  'ice cabinet': {
    name: 'Ice Cabinet',
    value: 100,
  },
  'ice stool': {
    name: 'Ice Stool',
    value: 50,
  },
  'ice table': {
    name: 'Ice Table',
    value: 60,
  },
  'kitchen chair': {
    name: 'Kitchen Chair',
    value: 50,
  },
  'kitchen chest': {
    name: 'Kitchen Chest',
    value: 50,
  },
  'kitchen table': {
    name: 'Kitchen Table',
    value: 100,
  },
  'knightly chess table': {
    name: 'Knightly Chess Table',
    value: 60,
  },
  'magnificent table': {
    name: 'Magnificent Table',
    value: 60,
  },
  'magnificent cabinet': {
    name: 'Magnificent Cabinet',
    value: 100,
  },
  'ornate chair': {
    name: 'Ornate Chair',
    value: 50,
  },
  'ornate cabinet': {
    name: 'Ornate Cabinet',
    value: 100,
  },
  'ornate chest': {
    name: 'Ornate Chest',
    value: 80,
  },
  'skeletal table': {
    name: 'Skeletal Table',
    value: 50,
  },
  'skeletal chair': {
    name: 'Skeletal Chair',
    value: 50,
  },
  'skeletal chest': {
    name: 'Skeletal Chest',
    value: 80,
  },
  'skeletal cabinet': {
    name: 'Skeletal Cabinet',
    value: 100,
  },
  'vengothic table': {
    name: 'Vengothic Table',
    value: 50,
  },
  'vengothic cabinet': {
    name: 'Vengothic Cabinet',
    value: 100,
  },
  'verdant chair': {
    name: 'Verdant Chair',
    value: 50,
  },
  'verdant cabinet': {
    name: 'Verdant Cabinet',
    value: 100,
  },
  'verdant trunk': {
    name: 'Verdant Trunk',
    value: 50,
  },
  'volcanic chest': {
    name: 'Volcanic Chest',
    value: 80,
  },
  'volcanic shelf': {
    name: 'Volcanic Shelf',
    value: 100,
  },
  'volcanic chair': {
    name: 'Volcanic Chair',
    value: 60,
  },
  'wooden cabinet': {
    name: 'Wooden Cabinet',
    value: 90,
  },
  'wooden stool': {
    name: 'Wooden Stool',
    value: 50,
  },
  tendrils: {
    name: 'Tendrils',
    value: 50,
  },
  'wall leaves': {
    name: 'Wall Leaves',
    value: 50,
  },
  'wall flowers': {
    name: 'Wall Flowers',
    value: 50,
  },
  'flowery grass': {
    name: 'Flowery Grass',
    value: 30,
  },
  'flower bed': {
    name: 'Flower Bed',
    value: 150,
  },
  'flower chest': {
    name: 'Flower Chest',
    value: 60,
  },
  'flower cabinet': {
    name: 'Flower Cabinet',
    value: 90,
  },
  'water nymph': {
    name: 'Water Nymph',
    value: 180,
  },
  'blooming tendrils': {
    name: 'Blooming Tendrils',
    value: 50,
  },
  'flowering wall leaves': {
    name: 'Flowering Wall Leaves',
    value: 50,
  },
  'purple flower lamp': {
    name: 'Purple Flower Lamp',
    value: 80,
  },
  'turquoise flower lamp': {
    name: 'Turquoise Flower Lamp',
    value: 60,
  },
  'flower chair': {
    name: 'Flower Chair',
    value: 60,
  },
  'flower table': {
    name: 'Flower Table',
    value: 80,
  },
  'wall fern': {
    name: 'Wall Fern',
    value: 50,
  },
  'Captain Crab': {
    name: 'Captain Crab',
    value: 180,
  },
  'seashell lamp': {
    name: 'Seashell Lamp',
    value: 80,
  },
  'sea-devil wall lamp': {
    name: 'Sea-devil Wall Lamp',
    value: 60,
  },
  'pile of wooden planks': {
    name: 'Pile of Wooden Planks',
    value: 25,
  },
  'pile of riches': {
    name: 'Pile of Riches',
    value: 90,
  },
  'djinn lamp': {
    name: 'Djinn Lamp',
    value: 180,
  },
  'podium of tenacity': {
    name: 'Podium of Tenacity',
    value: 375,
  },
  'opulent kline': {
    name: 'Opulent Kline',
    value: 120,
  },
  'opulent table': {
    name: 'Opulent Table',
    value: 70,
  },
  'opulent chair': {
    name: 'Opulent Chair',
    value: 60,
  },
  'rolled-up opulent carpet': {
    name: 'Opulent Carpet',
    value: 30,
  },
  'merchant portrait': {
    name: 'Merchant Portrait',
    value: 100,
  },
  'loose opulent floor intarsia': {
    name: 'Opulent Floor Intarsia',
    value: 30,
  },
  'opulent book case': {
    name: 'Opulent Book Case',
    value: 100,
  },
  'opulent chest': {
    name: 'Opulent Chest',
    value: 60,
  },
  'opulent wood floor planks': {
    name: 'Opulent Wooden Floor',
    value: 30,
  },
  'opulent item stand': {
    name: 'Opulent Item Stand',
    value: 50,
  },
  'opulent floor lamp': {
    name: 'Opulent Floor Lamp',
    value: 60,
  },
  'witchcraft scroll': {
    name: 'Witchcraft Scroll',
    value: 50,
  },
  'witchcraft cage': {
    name: 'Witchcraft Cage',
    value: 80,
  },
  'witchcraft bookstand': {
    name: 'Witchcraft Bookstand',
    value: 50,
  },
  'witchcraft fireplace': {
    name: 'Witchcraft Fireplace',
    value: 80,
  },
  'witchcraft portal': {
    name: 'Witchcraft Portal',
    value: 120,
  },
  'witchcraft cabinet': {
    name: 'Witchcraft Cabinet',
    value: 90,
  },
  'witchcraft chair': {
    name: 'Witchcraft Chair',
    value: 50,
  },
  'chest full of witchcraft': {
    name: 'Witchcraft Chest',
    value: 50,
  },
  table: {
    name: 'Witchcraft Table',
    value: 100,
  },
  'table with candles': {
    name: 'Witchcraft Table',
    value: 100,
  },
  'table with burning candles': {
    name: 'Witchcraft Table',
    value: 100,
  },
  cauldron: {
    name: 'Witchcraft Cauldron',
    value: 180,
  },
  'witchcraft bed': {
    name: 'Witchcraft Bed',
    value: 150,
  },
  'witchcraft sweet herbs': {
    name: 'Witchcraft Sweet Herbs',
    value: 50,
  },
  'witchcraft forest herbs': {
    name: 'Witchcraft Forest Herbs',
    value: 50,
  },
  'witchcraft summoning circle': {
    name: 'Witchcraft Summoning Circle',
    value: 80,
  },
  'witchcraft cupboard': {
    name: 'Witchcraft Cupboard',
    value: 50,
  },
  'seafarer cabinet': {
    name: 'Seafarer Cabinet',
    value: 100,
  },
  'life buoy': {
    name: 'Life Buoy',
    value: 50,
  },
  'seafarer chair': {
    name: 'Seafarer Chair',
    value: 60,
  },
  'seafarer chest': {
    name: 'Seafarer Chest',
    value: 60,
  },
  'seafarer table': {
    name: 'Seafarer Table',
    value: 70,
  },
  'fish hook board': {
    name: 'Fish Hook Board',
    value: 50,
  },
  'ship bell': {
    name: 'Ship Bell',
    value: 50,
  },
  'tentacle lamp': {
    name: 'Tentacle Lamp',
    value: 80,
  },
  'seafood bucket': {
    name: 'Seafood Bucket',
    value: 60,
  },
  'opulent spice rack': {
    name: 'Opulent Spice Rack',
    value: 100,
  },
  skelaptor: {
    name: 'Skelaptor',
    value: 180,
  },
  'cave bed': {
    name: 'Cave Bed',
    value: 120,
  },
  'cave fireplace': {
    name: 'Cave Fireplace',
    value: 100,
  },
  'cave panel border': {
    name: 'Cave Panel Border',
    value: 25,
  },
  'scales wall lamp': {
    name: 'Scales Wall Lamp',
    value: 60,
  },
  'cave chest': {
    name: 'Cave Chest',
    value: 70,
  },
  'crystal bed': {
    name: 'Crystal Bed',
    value: 150,
  },
  'crystal cabinet': {
    name: 'Crystal Cabinet',
    value: 100,
  },
  'gnome baby': {
    name: 'Gnome Baby',
    value: 150,
  },
  'cave rampart': {
    name: 'Cave Rampart',
    value: 60,
  },
  'crystal chair': {
    name: 'Crystal Chair',
    value: 50,
  },
  'crystal table': {
    name: 'Crystal Table',
    value: 80,
  },
  'crystal chest': {
    name: 'Crystal Chest',
    value: 60,
  },
  'crystal floor lamp': {
    name: 'Crystal Floor Lamp',
    value: 120,
  },
  'cave floor lamp': {
    name: 'Cave Floor Lamp',
    value: 80,
  },
  'cave rampart border': {
    name: 'Cave Rampart Border',
    value: 25,
  },
  'cave wall panel': {
    name: 'Cave Wall Panel',
    value: 50,
  },
  'cave wall border': {
    name: 'Cave Wall Border',
    value: 25,
  },
  'cave fence': {
    name: 'Cave Fence',
    value: 60,
  },
  'gathered cave floor earth': {
    name: 'Cave Floor Earth',
    value: 25,
  },
  'cave firewood': {
    name: 'Cave Firewood',
    value: 60,
  },
  'cave remains': {
    name: 'Cave Remains',
    value: 50,
  },
  'cave bones': {
    name: 'Cave Bones',
    value: 50,
  },
  'cave bench': {
    name: 'Cave Bench',
    value: 120,
  },
  'cave wall lamp': {
    name: 'Cave Wall Lamp',
    value: 60,
  },
  'cave weapon display': {
    name: 'Cave Weapon Display',
    value: 60,
  },
  'low cave panel': {
    name: 'Low Cave Panel',
    value: 60,
  },
  'cave mural': {
    name: 'Cave Mural',
    value: 60,
  },
  'low cave mural': {
    name: 'Low Cave Mural',
    value: 60,
  },
  'low cave fence': {
    name: 'Low Cave Fence',
    value: 60,
  },
  /* RASCACOON */
  'blue shark trophy': {
    name: 'Blue Shark Trophy',
    value: 0,
  },
  'brown shark trophy': {
    name: 'Brown Shark Trophy',
    value: 0,
  },
  'golden shark trophy': {
    name: 'Golden Shark Trophy',
    value: 0,
  },
  'hammerhead trophy': {
    name: 'Hammerhead Trophy',
    value: 0,
  },
  'striped shark trophy': {
    name: 'Stripped Shark Trophy',
    value: 0,
  },
  'shark jaws': {
    name: 'Shark Jaws',
    value: 0,
  },
  /* TOURNAMENT */
  'gold cup': {
    name: 'Gold Cup',
    value: 0,
  },
  'silver cup': {
    name: 'Silver Cup',
    value: 0,
  },
  'bronze cup': {
    name: 'Bronze Cup',
    value: 0,
  },
  'gold deed': {
    name: 'Gold Deed',
    value: 0,
  },
  'silver deed': {
    name: 'Silver Deed',
    value: 0,
  },
  'bronze deed': {
    name: 'Bronze Deed',
    value: 0,
  },
  'papyrus deed': {
    name: 'Papyrus Deed',
    value: 0,
  },
  'tournament accolade': {
    name: 'Tournament Accolade',
    value: 0,
  },
  'sublime tournament accolade': {
    name: 'Sublime Tournament Accolade',
    value: 0,
  },
  'the golden outfit display': {
    name: 'The Golden Outfit Display',
    value: 0,
  },
  'sublime tournament carpet': {
    name: 'Sublime Tournament Carpet',
    value: 30,
  },
  'tournament carpet': {
    name: 'Tournament Carpet',
    value: 30,
  },
  'carved table': {
    name: 'Carved Table',
    value: 60,
  },
  'carved table centre': {
    name: 'Carved Table Centre',
    value: 60,
  },
  'carved table corner': {
    name: 'Carved Table Corner',
    value: 60,
  },
  'cozy couch': {
    name: 'Cozy Couch',
    value: 60,
  },
  'cozy couch round': {
    name: 'Cozy Couch Round',
    value: 60,
  },
  'cozy couch corner': {
    name: 'Cozy Couch Corner',
    value: 60,
  },
  'cozy couch left end': {
    name: 'Cozy Couch Left End',
    value: 60,
  },
  'cozy couch right end': {
    name: 'Cozy Couch Right End',
    value: 60,
  },
  'mask of the defiler': {
    name: 'Mask of the Defiler',
    value: 500,
  },
  'baby brain squid': {
    name: 'Baby Brain Squid',
    value: 180,
  },
  'cerberus champion puppy': {
    name: 'Cerberus Champion Puppy',
    value: 0,
  },
  'demon doll': {
    name: 'Demon Doll',
    value: 0,
  },
  'jousting eagle baby': {
    name: 'Jousting Eagle Baby',
    value: 0,
  },
  'baby vulcongra': {
    name: 'Baby Vulcongra',
    value: 180,
  },
  'guzzlemaw grub': {
    name: 'Guzzlemaw Grub',
    value: 180,
  },
  'vexclaw doll': {
    name: 'Vexclaw Doll',
    value: 0,
  },
  'retching horror doll': {
    name: 'Retching Horror Doll',
    value: 0,
  },
  'gilded blessed shield': {
    name: 'Gilded Blessed Shield',
    value: 250,
  },
  'gilded horned helmet': {
    name: 'Gilded Horned Helmet',
    value: 250,
  },
  'gilded crown': {
    name: 'Gilded Crown',
    value: 250,
  },
  'gilded magic longsword': {
    name: 'Gilded Magic Longsword',
    value: 250,
  },
  'gilded warlord sword': {
    name: 'Gilded Warlord Sword',
    value: 250,
  },
  /* HUNTING TASKS */
  'bronze hunter trophy': {
    name: 'Bronze Hunter Trophy',
    value: 0,
  },
  'silver hunter trophy': {
    name: 'Silver Hunter Trophy',
    value: 0,
  },
  'gold hunter trophy': {
    name: 'Gold Hunter Trophy',
    value: 0,
  },
  'gozzler trophy': {
    name: 'Gozzler Trophy',
    value: 0,
  },
  'many faces trophy': {
    name: 'Many Faces Trophy',
    value: 0,
  },
  'brachiodemon trophy': {
    name: 'Brachiodemon Trophy',
    value: 0,
  },
  'sea serpent trophy': {
    name: 'Sea Serpent Trophy',
    value: 0,
  },
  'hellflayer trophy': {
    name: 'Hellflayer Trophy',
    value: 0,
  },
  'bone bed': {
    name: 'Bone Bed',
    value: 0,
  },
  'bone headboard': {
    name: 'Bone Bed',
    value: 0,
  },
  'bone footboard': {
    name: 'Bone Bed',
    value: 0,
  },
  'falcon pet': {
    name: 'Falcon Pet',
    value: 0,
  },
  /* FESTIVE POINTS */
  'blue traditional rack': {
    name: 'Traditional Rack',
    value: 0,
  },
  'green traditional rack': {
    name: 'Traditional Rack',
    value: 0,
  },
  'red traditional rack': {
    name: 'Traditional Rack',
    value: 0,
  },
  'blue traditional chair': {
    name: 'Traditional Chair',
    value: 0,
  },
  'green traditional chair': {
    name: 'Traditional Chair',
    value: 0,
  },
  'red traditional chair': {
    name: 'Traditional Chair',
    value: 0,
  },
  'blue traditional table': {
    name: 'Traditional Table',
    value: 0,
  },
  'green traditional table': {
    name: 'Traditional Table',
    value: 0,
  },
  'red traditional table': {
    name: 'Traditional Table',
    value: 0,
  },
  'blue wooden candelabra': {
    name: 'Wooden Candelabra',
    value: 0,
  },
  'green wooden candelabra': {
    name: 'Wooden Candelabra',
    value: 0,
  },
  'red wooden candelabra': {
    name: 'Wooden Candelabra',
    value: 0,
  },
  'beer barrel': {
    name: 'Beer Barrel',
    value: 0,
  },
  'red wall hangings': {
    name: 'Red Wall Hangings',
    value: 0,
  },
  'blue wall hangings': {
    name: 'Blue Wall Hangings',
    value: 0,
  },
  'green wall hangings': {
    name: 'Green Wall Hangings',
    value: 0,
  },
  /* TIBIADROME */
  'arena badge replica': {
    name: 'Arena Badge Replica',
    value: 0,
  },
  'plushie of a domestikion': {
    name: 'Plushie of a Domestikion',
    value: 0,
  },
  'plushie of a hoodinion': {
    name: 'Plushie of a Hoodinion',
    value: 0,
  },
  'plushie of a mearidion': {
    name: 'Plushie of a Mearidion',
    value: 0,
  },
  'plushie of a murmillion': {
    name: 'Plushie of a Murmillion',
    value: 0,
  },
  'plushie of a scissorion': {
    name: 'Plushie of a Scissorion',
    value: 0,
  },
  'ogre rowdy doll': {
    name: 'Ogre Rowdy Doll',
    value: 0,
  },
  /* BOSSTIARY */
  'podium of vigour': {
    name: 'Podium of Vigour',
    value: 0,
  },
}

export const scrapingTokens = Object.keys(storeItems)
