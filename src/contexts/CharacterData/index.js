import React, { useEffect, useReducer, useState } from 'react';
import CharacterDataContext from './context';
import { characterDataReducer } from './reducers';
import setupCharacterData from '../../utils/setupCharacterData';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';

import LoadingIndicator from '../../components/LoadingIndicator';

const initialCharacterArray = getFromLocalStorage('initialCharacterData', []);
const initialFavCharacterArray = getFromLocalStorage('initialFavCharacterData', []);

export default ({ children }) => {

    const [characterData, dispatchCharacterData] = useReducer(characterDataReducer, initialCharacterArray);
    const [initialData, dispatchInitialData] = useReducer(characterDataReducer, initialCharacterArray);
    const [favCharacters, dispatchFavCharacters] = useReducer(characterDataReducer, initialFavCharacterArray);

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
            try {
                const response = await fetch('https://exevopan-data.netlify.app/LatestCharacterData.json');
                const data = await response.json();

                const setupedData = setupCharacterData(data);
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
                dispatchCharacterData,

                favCharacters,
                dispatchFavCharacters
            }}
        >
            <LoadingIndicator />
            {children}
        </CharacterDataContext.Provider>
    )
}