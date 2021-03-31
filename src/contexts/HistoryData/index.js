import React, { useEffect, useReducer, useState } from 'react';
import HistoryDataContext from './context';

import { getFromLocalStorage } from '../../utils/localStorage';
import Dexie from 'dexie';
import { historyEndpoint } from '../../dataEnpoint';

import LoadingIndicator from '../../components/LoadingIndicator';


export default ({ children }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchSetupedData = async () => {
            try {
                const response = await fetch(`${historyEndpoint}/hash.json`);
                const data = await response.json();

                await Promise.all(data.map(checkAndHash));

                /* const setupedData = setupCharacterData(data);

                saveToLocalStorage('initialCharacterData', setupedData);
                setInitialCharacterData(setupedData);
                setUpdatedCharacterData(setupedData);
                setLoaded(true); */

            } catch (error) {
                console.log(error);
            }
        }

        fetchSetupedData();
    }, []);

    return (
        <HistoryDataContext.Provider>
            {loaded ? null : <LoadingIndicator />}
            {children}
        </HistoryDataContext.Provider>
    )
}

const checkAndHash = async (hash, index) => {
    const dataPage = getFromLocalStorage('historyHash', []);

    if(!dataPage[index] || dataPage[index] !== hash) {
        const response = await fetch(`${historyEndpoint}/historyData${index}.json`);
        const data = await response.json();

        /* create database with index name and set items */
    }
}