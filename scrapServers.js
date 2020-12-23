const { timeStamp, fetchAndLoad } = require('./utils');
const cheerio = require('cheerio');
const fs = require('fs').promises;

const baseUrl = 'https://www.tibia.com/community/?subtopic=worlds';

const main = async () => {
    console.log(`${timeStamp('highlight')} Scraping server list`);
    const $ = await fetchAndLoad(baseUrl);

    const tableContent = $('.TableContent tbody');
    tableContent[2].children.shift();
    tableContent[2].children.pop();
    const serverData = tableContent[2].children.map(scrapServer);

    await fs.writeFile('serverData.json', JSON.stringify(serverData));
    console.log(`${timeStamp('success')} All single data saved to 'allSingleData.json'`);
}

const scrapServer = (element) => {

    const item = cheerio('td', element);
    const serverName = item[0].children[0].children[0].data;

    let serverLocation;
    switch (item[2].children[0].data) {
        case 'Europe':
            serverLocation = {
                string: 'EU',
                type: 0
            };
            break;

        case 'North America':
            serverLocation = {
                string: 'NA',
                type: 1
            };
            break;

        case 'South America':
            serverLocation = {
                string: 'BR',
                type: 2
            };
            break;

        default:
            serverLocation = {
                string: 'BR',
                type: 2
            };
            break;
    }

    let pvpType;
    switch (item[3].children[0].data) {
        case 'Optional PvP':
            pvpType = {
                string: 'Optional',
                type: 0
            };
            break;

        case 'Open PvP':
            pvpType = {
                string: 'Open',
                type: 1
            };
            break;

        case 'Retro Open PvP':
            pvpType = {
                string: 'Retro Open',
                type: 2
            };
            break;

        case 'Hardcore PvP':
            pvpType = {
                string: 'Hardcore',
                type: 3
            };
            break;

        case 'Retro Hardcore PvP':
            pvpType = {
                string: 'Retro Hardcore',
                type: 4
            };
            break;

        default:
            pvpType = {
                string: 'Optional',
                type: 0
            };
            break;
    }

    let battleye = false;
    if(item[4].children[0] !== undefined) {
        if(item[4].children[1].children[0].children[0].children[0].attribs.src === 'https://static.tibia.com/images/global/content/icon_battleyeinitial.gif') {
            battleye = true;
        }
    }

    return {
        serverName,
        serverLocation,
        pvpType,
        battleye,
        experimental: (serverName === 'Zuna' || serverName === 'Zunera' ? true : false)
    }
}

main();