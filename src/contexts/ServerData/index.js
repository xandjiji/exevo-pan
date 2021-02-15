import React, { useEffect, useState } from 'react';
import ServerDataContext from './context';
import setupServerData from '../../utils/setupServerData';

export default ({ children }) => {

    const [serverData, setServerData] = useState({});
    const [indexedServerData, setIndexedServerData] = useState({});

    useEffect(() => {
        const fetchSetupedData = async () => {
            const response = await fetch('https://exevopan-data.netlify.app/ServerData.json');
            const data = await response.json();

            const setupedData = setupServerData(data);

            setServerData(data);
            setIndexedServerData(setupedData);
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