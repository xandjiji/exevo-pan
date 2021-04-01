import React, { useEffect, useReducer, useState } from 'react';
import HistoryDataContext from './context';

import { characterDataReducer } from '../CharacterData/reducers';

import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';
import { minifiedToObject } from '../../utils/dataDictionary';
import { historyEndpoint } from '../../dataEnpoint';

import Dexie from 'dexie';

import LoadingIndicator from '../../components/LoadingIndicator';

export default ({ children }) => {

    const [characterData, dispatchCharacterData] = useReducer(characterDataReducer, []);
    const [initialData, dispatchInitialData] = useReducer(characterDataReducer, []);

    const [initialCharacterData, setInitialCharacterData] = useState(initialData);
    const [updatedCharacterData, setUpdatedCharacterData] = useState(characterData);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchSetupedData = async () => {
            try {
                const response = await fetch(`${historyEndpoint}/hash.json`);
                const data = await response.json();

                const parsedHistoryData = [];
                for (const [index, hash] of data.entries()) {
                    const dataPage = await checkAndHash(hash, index);
                    parsedHistoryData.push(dataPage);
                }

                const setupedArray = [].concat.apply([], parsedHistoryData);
                const setupedData = setupedArray.sort((a, b) => b.auctionEnd - a.auctionEnd);

                setInitialCharacterData(setupedData);
                setUpdatedCharacterData(setupedData);
                setLoaded(true);

            } catch (error) {
                console.log(error);
            }
        }

        fetchSetupedData();
    }, []);

    useEffect(() => {
        setUpdatedCharacterData(characterData);
    }, [characterData]);

    useEffect(() => {
        setInitialCharacterData(initialData);
    }, [initialData]);

    return (
        <HistoryDataContext.Provider
            value={{
                initialCharacterData,
                dispatchInitialData,

                characterData: updatedCharacterData,
                dispatchCharacterData
            }}
        >
            {loaded ? null : <LoadingIndicator />}
            {children}
        </HistoryDataContext.Provider>
    )
}

const checkAndHash = async (hash, index) => {
    const pageName = `historyHash${index}`;
    const pageHash = getFromLocalStorage(pageName, null);

    if (pageHash !== hash) {
        const response = await fetch(`${historyEndpoint}/historyData${index}.json`);
        const data = await response.json();
        const parsedDataArray = await buildDb(index, data);

        saveToLocalStorage(pageName, hash);

        return parsedDataArray;
    } else {
        return await getFromDb(index);
    }
}

const buildDb = async (index, data) => {
    const parsedDataArray = data.map(minifiedToObject);

    let db = new Dexie(`historyData${index}`);
    await db.delete();
    db = new Dexie(`historyData${index}`);

    db.version(1).stores({
        characters: 'id, nickname, auctionEnd, currentBid, hasBeenBidded, outfitId, serverId, vocationId, level, skills, items, charms, transfer, imbuements, hasSoulWar'
    });

    await db.characters.bulkAdd(parsedDataArray);

    return parsedDataArray;
}

const getFromDb = async (index) => {
    const db = new Dexie(`historyData${index}`);
    db.version(1).stores({
        characters: 'id, nickname, auctionEnd, currentBid, hasBeenBidded, outfitId, serverId, vocationId, level, skills, items, charms, transfer, imbuements, hasSoulWar'
    });
    return await db.characters.toArray();
}