import React, { useEffect, useState } from 'react';
import ItemDataContext from './context';
import setupItemData from '../../utils/setupItemData';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';

export default ({ children }) => {

    const [itemData, setItemData] = useState({});

    useEffect(() => {
        const fetchSetupedData = async () => {
            let setupedData;
            try {
                const response = await fetch('https://exevopan-data.netlify.app/ItemsData.json');
                const data = await response.json();

                setupedData = setupItemData(data);
                setItemData(setupedData);
                saveToLocalStorage('itemData', setupedData);

            } catch (error) {
                setupedData = getFromLocalStorage('itemData');
            } finally {
                setItemData(setupedData);
            }
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