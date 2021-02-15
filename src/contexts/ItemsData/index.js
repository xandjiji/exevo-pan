import React, { useEffect, useState } from 'react';
import ItemDataContext from './context';
import setupItemData from '../../utils/setupItemData';

export default ({ children }) => {

    const [itemData, setItemData] = useState({});

    useEffect(() => {
        const fetchSetupedData = async () => {
            const response = await fetch('https://exevopan-data.netlify.app/ItemsData.json');
            const data = await response.json();

            const setupedData = setupItemData(data);

            setItemData(setupedData);
        }

        fetchSetupedData();
    }, [])

    return (
        <ItemDataContext.Provider
            value={{ itemData }}
        >
            {children}
        </ItemDataContext.Provider>
    )
}