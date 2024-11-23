# bazaar-scraper 🤖

<p align="center">
    <img alt="logging" src="https://i.imgur.com/YX8sIY1.png">
</p>

# What's inside?

```
├── Output
├── src
│   ├── Constants
│   ├── Data
│   ├── Helpers
│   ├── Scripts
│   ├── services
│   └── utils
└── package.json
```

They are:

- `Output`: all scraped data will be saved here
- `Constants`: constants for filenames, maximum concurrent requests, delays, etc
- `Data`: classes responsible for CRUD operations on all of the `Output` data
- `Helpers`: classes responsible for parsing HTML and returning data
- `Scripts`: tasks that you can run from `package.json` scripts

# Scripts

## `yarn scrap:auctions`

Scrapes current auctions data and auctions with rare items.
The list rare items that are tracked can be found at [`items.ts`](src/Scripts/ScrapRareItems/items.ts).

It first checks for current auction ids on the [main list pages](https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades?currentpage=1) (starting at `?currentpage=1`). Then, it will scrape every id individually by fetching it's auction page and collecting all of the data.

Outputs:

- `ServerData.json`
- `CurrentAuctions.json`
- `ItemsData.json`

If you already have a `CurrentAuctions.json` and `ItemsData.json` file, running this script again will update them by removing finished/cancelled auctions, and also update all current bids. If new auctions are found, they will be individually scraped and their data will be appended to the list, sorted.

## `yarn scrap:history`

Scrapes past auctions data by incrementally checking individual auctions url (starting at `?auctionid=0`). It will do this until it reaches the highest auction id known (at the start of the script, it will try to discover a new highest id).

Since scraping the entire history takes days, all the collected data will be saved after every `100` ids checked. This means that the script can be then stopped without losing data, and, if started again, it will pick up from where it left.

Outputs:

- `ServerData.json`
- `ScrapHistoryData.json`
- `HistoryAuctions.jsonl`

Since the `HistoryAuctions.jsonl` file stores tons of data (currently it has over `600MB`), it uses a [JSON Lines format](https://jsonlines.org/). This allows you to easily read/write to this file using streams, which require much less memory.

## `yarn update:statistics`

Reads the history data and calculate statistics from it.

Input:

- `HistoryAuctions.jsonl`

Output:

- `HistoryStatistics.json`

# Data structure

Since the data types are used across multiple packages of this repository, they are centralized at this [package](../../packages/@types). Here are some data examples:

```typescript
const server: ServerObject = {
  serverId: 41,
  serverName: 'Lutabra',
  serverLocation: {
    string: 'BR',
    type: 2,
  },
  pvpType: {
    string: 'Retro Open',
    type: 2,
  },
  battleye: false,
  experimental: false,
}
```

```typescript
const character: PartialCharacterObject = {
  id: 1234567,
  nickname: 'Ksu',
  auctionEnd: 1641643200,
  currentBid: 3401,
  hasBeenBidded: true,
  outfitId: '133_3',
  serverId: 83,
  transfer: true,
  vocationId: 1,
  sex: false,
  level: 466,
  items: [28724, 30397, 31633, 32617],
  skills: {
    magic: 10.89,
    club: 87.04,
    fist: 15.08,
    sword: 37.85,
    fishing: 10,
    axe: 102.47,
    distance: 23.65,
    shielding: 98.62,
  },
  imbuements: ['Critical Hit', 'Mana Leech'],
  quests: ['Feaster of Souls', 'Grimvale'],
  outfits: [
    {
      name: 'Citizen',
      type: 1,
    },
    {
      name: 'Hunter',
      type: 2,
    },
  ],
  storeOutfits: [
    {
      name: 'Herbalist',
      type: 3,
    },
  ],
  mounts: ['Donkey', 'War Horse'],
  storeMounts: ['Desert King'],
  rareAchievements: ['His True Face'],
  achievementPoints: 201,
  huntingSlot: false,
  preySlot: true,
  charmInfo: { total: 4546, expansion: true },
  hirelings: { count: 2, jobs: 2, outfits: 0 },
  storeItems: [
    {
      name: 'hireling lamp',
      amount: 2,
    },
  ],
}
```

# Config

You can tune way requests are made to the official [Tibia](https://tibia.com/) website, to prevent their servers from rate-limiting you. Here is the default [config file](src/Constants/requests.ts):

```typescript
export const requests = {
  DELAY: 250, // uses a exponential backoff strategy
  MAX_RETRIES: 5, // if MAX_RETRIES is reached, the process will exit
  MAX_CONCURRENT_REQUESTS: 2,
}
```

# Environment

I use [`pm2`](https://www.npmjs.com/package/pm2) to keep all my scraping jobs running. Most of the scripts and tasks configurations can be found at the [`automations`](../../automations) directory.

Although these scripts aren't very CPU intensive, some of them require loading a lot of data to memory (up to `4GB` of ram). I use a Raspberry Pi 4 Model B with 8GB RAM and 32GB SD Card to run everything with no problems 😄

<p align="center">
    <img alt="Raspberry Pi 4" src="https://i.imgur.com/37OKY3z.png">
</p>
