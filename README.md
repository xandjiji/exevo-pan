
# Exevo Pan

This application is 100% free and open-source. Run it in any device through a web-browser! Designed for both Mobile and Desktop.

You can find the application [here](https://exevopan.netlify.app/).

<p align="center">
	<img src="https://exevopan.netlify.app/icons/favicon-96x96.png">
</p>

## Current Features

- List all available character auctions
- Filter by server types and character stats
<p align="center">
	<img src="https://i.imgur.com/aT5xhiU.png">
</p>

## Future Features

- Sorting filters
- More detailed information (items, imbuiments, achievements)
- Search
- Dark Theme
- Bookmark characters

## Char Bazaar Data

Since there is no official API from Cipsoft, all the data used in this app is scraped from the official [Tibia](https://www.tibia.com/) website. You can check the scraping scripts [here](https://github.com/xandjiji/tibia-bazaar-scraper).

The data file needs to be located at:
`exevo-pan/src/LatestCharacterData.json`
`exevo-pan/src/serverNames.json`

Here is a sample of how the `LatestCharacterData.json` should be structured:
```javascript
[
	{
		id: 304269,
		nickname: "Ununubio",
		href: "https://www.tibia.com/charactertrade/?subtopic=currentcharactertrades&page=details&auctionid=304269&source=overview",
		auctionEnd: 1611658800,
		currentBid: 181,
		hasBeenBidded: true,
		outfitId: "128_1.gif",
		server: {
			serverName: "Serdebra",
			serverLocation: {
				string: "BR",
				type: 2
			},
			pvpType: {
				string: "Open",
				type: 1
			},
			battleye: false,
			experimental: false
		},
		vocationId: 3,
		vocation: "Master Sorcerer",
		sex: "Male",
		level: 135,
		skills: {
			magic: {
				level: 73,
				percentage: 86.05
			},
			club: {
				level: 11,
				percentage: 58
			},
			fist: {
				level: 11,
				percentage: 53.33
			},
			sword: {
				level: 18,
				percentage: 20.03
			},
			fishing: {
				level: 10,
				percentage: 0
			},
			axe: {
				level: 11,
				percentage: 53
			},
			distance: {
				level: 18,
				percentage: 11.39
			},
			shielding: {
				level: 32,
				percentage: 20.39
			}
		},
		items: [
			{
				name: "an arbalest",
				src: "5803.gif",
				amount: 0
			},
			{
				name: "a paladin armor",
				src: "8063.gif",
				amount: 0
			},
			{
				name: "a royal star",
				src: "25759.gif",
				amount: 100
			},
			null
		],
		charms: ["Adrenaline Burst", "Freeze", "Zap"]
	},

	/* more data */
]
```

Here is a sample of how the `serverNames.json` should be structured:
```javascript
["Adra","Antica","Assombra","Astera","Belluma","Belobra","Bona", /* more servers */]
```

## More informations

This project was done using [React.js](https://reactjs.org/).
If you have any suggestions, questions or need any help, feel free to contact me :-)