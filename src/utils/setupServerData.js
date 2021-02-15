const setupServerData = (serverData) => {
    const indexedServerData = {};

    let i = 0;
    for (const key of Object.keys(serverData)) {
        indexedServerData[i] = serverData[key];
        i++;
    }

    return indexedServerData;
}

export default setupServerData;