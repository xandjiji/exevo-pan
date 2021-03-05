import React, { useEffect, useState } from 'react';
import ItemDataContext from './context';
import setupItemData from '../../utils/setupItemData';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';
import dataEndpoint from '../../dataEnpoint';

const initialItemObject = getFromLocalStorage('itemData', {});

export default ({ children }) => {

    const [itemData, setItemData] = useState(initialItemObject);

    useEffect(() => {
        const fetchSetupedData = async () => {
            try {
                const response = await fetch(`${dataEndpoint}/ItemsData.json`);
                const data = await response.json();

                const setupedData = setupItemData(data);
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