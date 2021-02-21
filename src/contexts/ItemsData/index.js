import React, { useEffect, useState } from 'react';
import ItemDataContext from './context';
import setupItemData from '../../utils/setupItemData';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';

const initialItemObject = getFromLocalStorage('itemData', {});

export default ({ children }) => {

    const [itemData, setItemData] = useState(initialItemObject);

    useEffect(() => {
        const fetchSetupedData = async () => {
            let setupedData;
            try {
                const response = await fetch('https://exevopan-data.netlify.app/ItemsData.json');
                const data = await response.json();

                setupedData = setupItemData(data);
                saveToLocalStorage('itemData', setupedData);
                setItemData(setupedData);

            } catch (error) {
                console.log(error);
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