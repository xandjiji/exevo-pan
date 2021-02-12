import serverData from '../../ServerData.json';

const indexedServerData = {};

let i = 0;
for (const key of Object.keys(serverData)) {
    indexedServerData[i] = serverData[key];
    i++;
}

export { serverData, indexedServerData};