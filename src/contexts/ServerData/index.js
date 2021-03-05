import React, { useEffect, useState } from 'react';
import ServerDataContext from './context';
import setupServerData from '../../utils/setupServerData';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';
import dataEndpoint from '../../dataEnpoint';

const initialServerObject = getFromLocalStorage('serverData', {});
const initialIndexedServerObject = getFromLocalStorage('indexedServerData', {});

export default ({ children }) => {

    const [serverData, setServerData] = useState(initialServerObject);
    const [indexedServerData, setIndexedServerData] = useState(initialIndexedServerObject);

    useEffect(() => {
        const fetchSetupedData = async () => {
            try {
                const response = await fetch(`${dataEndpoint}/ServerData.json`);
                const data = await response.json();

                const setupedData = setupServerData(data);
                saveToLocalStorage('serverData', data);
                saveToLocalStorage('indexedServerData', setupedData);
                setServerData(data);
                setIndexedServerData(setupedData);

            } catch (error) {
                console.log(error);

            }
        }

        fetchSetupedData();
    }, [])

    return (
        <ServerDataContext.Provider
            value={{
                serverData,
                indexedServerData
            }}
        >
            {children}
        </ServerDataContext.Provider>
    )
}