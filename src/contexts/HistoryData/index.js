import React, { useEffect, useReducer, useState } from 'react';
import HistoryDataContext from './context';

import { characterDataReducer } from '../CharacterData/reducers';

import { saveToLocalStorage, getFromLocalStorage } from 'utils';
import { minifiedToObject } from '../../utils/dataDictionary';
import { historyEndpoint } from '../../dataEnpoint';

import { get, set } from 'idb-keyval';

import LoadingIndicator from '../../components/LoadingIndicator';

import { useLocation } from 'react-router-dom';

export default ({ children }) => {

    const { pathname } = useLocation();

    const [characterData, dispatchCharacterData] = useReducer(characterDataReducer, []);
    const [initialData, dispatchInitialData] = useReducer(characterDataReducer, []);

    const [initialCharacterData, setInitialCharacterData] = useState(initialData);
    const [updatedCharacterData, setUpdatedCharacterData] = useState(characterData);

    const [interacted, setInteracted] = useState(pathname === '/bazaar-history');
    const [loaded, setLoaded] = useState(false);

    const [percentage, setPercentage] = useState('0%');

    useEffect(() => {
        if (pathname === '/bazaar-history' && !interacted) {
            setInteracted(true);
        }
    }, [pathname, interacted]);

    useEffect(() => {
        const fetchSetupedData = async () => {
            try {
                const response = await fetch(`${historyEndpoint}/hash.json`);
                const data = await response.json();

                const parsedHistoryData = [];
                for (const [index, hash] of data.entries()) {
                    const dataPage = await checkAndHash(hash, index);
                    parsedHistoryData.push(dataPage);
                    setPercentage(getPercentage(index, data.length));
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

        if (interacted && !loaded) fetchSetupedData();
    }, [interacted, loaded]);

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
            {!loaded && interacted ? <LoadingIndicator>{`Updating data...  ${percentage}`}</LoadingIndicator> : null}
            {children}
        </HistoryDataContext.Provider>
    )
}

const getPercentage = (part, whole) => {
    const percentage = Math.round((part / whole) * 100);
    return `${percentage}%`
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
    const stringfiedData = JSON.stringify(data);

    await set(`historyData${index}`, stringfiedData);

    return parsedDataArray;
}

const getFromDb = async (index) => {
    const stringfiedData = await get(`historyData${index}`);

    const parsedData = JSON.parse(stringfiedData);
    return parsedData.map(minifiedToObject);;
}