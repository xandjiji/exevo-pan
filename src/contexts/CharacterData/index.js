import React, { useEffect, useReducer, useState } from 'react';
import CharacterDataContext from './context';
import { characterDataReducer } from './reducers';
import setupCharacterData from '../../utils/setupCharacterData';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';

export default ({ children }) => {

    const [characterData, dispatchCharacterData] = useReducer(characterDataReducer, []);
    const [initialData, dispatchInitialData] = useReducer(characterDataReducer, []);

    const [initialCharacterData, setInitialCharacterData] = useState(initialData);
    const [updatedCharacterData, setUpdatedCharacterData] = useState(characterData);

    useEffect(() => {
        setUpdatedCharacterData(characterData);
    }, [characterData]);

    useEffect(() => {
        setInitialCharacterData(initialData);
    }, [initialData]);

    useEffect(() => {
        const fetchSetupedData = async () => {
            let setupedData;
            try {
                const response = await fetch('https://exevopan-data.netlify.app/LatestCharacterData.json');
                const data = await response.json();

                setupedData = setupCharacterData(data);
                saveToLocalStorage('initialCharacterData', setupedData);

            } catch (error) {
                setupedData = getFromLocalStorage('initialCharacterData', []);

            } finally {
                setInitialCharacterData(setupedData);
                setUpdatedCharacterData(setupedData);
            }
        }

        fetchSetupedData();
    }, []);

    return (
        <CharacterDataContext.Provider
            value={{
                initialCharacterData,
                dispatchInitialData,

                characterData: updatedCharacterData,
                dispatchCharacterData
            }}
        >
            {children}
        </CharacterDataContext.Provider>
    )
}