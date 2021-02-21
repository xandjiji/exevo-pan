import React, { useEffect, useReducer, useState } from 'react';
import CharacterDataContext from './context';
import { characterDataReducer } from './reducers';
import setupCharacterData from '../../utils/setupCharacterData';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';

const initialCharacterArray = getFromLocalStorage('initialCharacterData', []);

export default ({ children }) => {

    const [characterData, dispatchCharacterData] = useReducer(characterDataReducer, initialCharacterArray);
    const [initialData, dispatchInitialData] = useReducer(characterDataReducer, initialCharacterArray);

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
                setInitialCharacterData(setupedData);
                setUpdatedCharacterData(setupedData);

            } catch (error) {
                console.log(error);
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