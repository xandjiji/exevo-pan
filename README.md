
# Exevo Pan

This application is 100% free and open-source. Run it in any device through a web-browser! Designed for both Mobile and Desktop.

You can find the application [here](https://exevopan.com/).

<p align="center">
	<img src="https://exevopan.netlify.app/icons/favicon-96x96.png">
</p>

## Current Features

- List all available character auctions
- List all past character auctions
- Analytics and summary data about the Bazaar
- Search by nickname
- Filter by server types, character stats and more!
- Rare items finder
- Bookmark auctions
- Dark Theme
<p align="center">
	<img src="https://i.imgur.com/A5Pk3jL.png">
</p>

## Future Features

- Notifications for auctions close to ending

## Char Bazaar Data

Since there is no official API from Cipsoft, all the data used in this app is scraped from the official [Tibia](https://www.tibia.com/) website. You can check the scraping scripts [here](https://github.com/xandjiji/tibia-bazaar-scraper).

All live data is fetched from these endpoints:

`https://exevopan-data.netlify.app/MinifiedCharacterData.json`

`https://exevopan-data.netlify.app/ItemsData.json`

`https://exevopan-data.netlify.app/ServerData.json`

`https://exevopan-history-data.netlify.app/hash.json`

`https://exevopan-history-data.netlify.app/historyData{index}.json`

They are being updated around every 10 minutes

## More informations

This project was done using [React.js](https://reactjs.org/).
If you have any suggestions, questions or need any help, feel free to contact me :-)
