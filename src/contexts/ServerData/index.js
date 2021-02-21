import React, { useEffect, useState } from 'react';
import ServerDataContext from './context';
import setupServerData from '../../utils/setupServerData';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';

export default ({ children }) => {

    const [serverData, setServerData] = useState({});
    const [indexedServerData, setIndexedServerData] = useState({});

    useEffect(() => {
        const fetchSetupedData = async () => {
            let setupedData;
            let data;
            try {
                const response = await fetch('https://exevopan-data.netlify.app/ServerData.json');
                data = await response.json();

                setupedData = setupServerData(data);
                saveToLocalStorage('serverData', data);
                saveToLocalStorage('indexedServerData', setupedData);

            } catch (error) {
                data = getFromLocalStorage('serverData', {});
                setupedData = getFromLocalStorage('indexedServerData', {});

            } finally {
                setServerData(data);
                setIndexedServerData(setupedData);
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