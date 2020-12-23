const fetch = require('node-fetch');
const cheerio = require('cheerio');

const colors = {
    reset:      '\x1b[0m',  // white
    fail:       '\x1b[31m', // red
    success:    '\x1b[32m', // green
    highlight:  '\x1b[33m', // yellow
    system:     '\x1b[35m', // magenta
    neutral:    '\x1b[36m', // cian
    control:    '\x1b[90m'  // gray
}

const timeStamp = (color) => {
    let time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' });

    if (color) {
        return `${colors[color]}[${time}]${colors['reset']}`;
    } else {
        return `[${time}]`;
    }
}

const fetchAndLoad = async (url) => {
    const response = await fetch(url);
    const html = await response.text();
    return cheerio.load(html);
}

const promiseAllInBatches = async (task, items, batchSize) => {
    let position = 0;
    let results = [];
    while (position < items.length) {
        const itemsForBatch = items.slice(position, position + batchSize);
        results = [...results, ...await Promise.all(itemsForBatch.map(item => task(item)))];
        position += batchSize;
    }
    return results;
}

const maxRetry = async (callback, retry) => {
    if (retry > 0) {
        try {
            return await callback();
        } catch (error) {
            console.log(`${timeStamp('fail')} ERROR! Trying again...`);
            return maxRetry(callback, retry - 1);
        }
    } else {
        console.log(`${timeStamp('control')} Max tries reached`);
        return null;
    }
}

module.exports = { fetchAndLoad, timeStamp, promiseAllInBatches, maxRetry };