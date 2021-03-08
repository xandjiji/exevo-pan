import React, { useEffect, useReducer, useState } from 'react';
import CharacterDataContext from './context';
import { characterDataReducer } from './reducers';
import setupCharacterData from '../../utils/setupCharacterData';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';
import { checkCharObjectStructure } from '../../utils/checkObjectStructures';
import dataEndpoint from '../../dataEnpoint';

import LoadingIndicator from '../../components/LoadingIndicator';

let initialCharacterArray = getFromLocalStorage('initialCharacterData', []);
let initialFavCharacterArray = getFromLocalStorage('initialFavCharacterData', []);

if (!checkCharObjectStructure(initialCharacterArray[0])) {
    initialCharacterArray = [];
    saveToLocalStorage('initialCharacterData', [])
}

if (!checkCharObjectStructure(initialFavCharacterArray[0])) {
    initialFavCharacterArray = [];
    saveToLocalStorage('initialFavCharacterData', []);
}

export default ({ children }) => {

    const [characterData, dispatchCharacterData] = useReducer(characterDataReducer, initialCharacterArray);
    const [initialData, dispatchInitialData] = useReducer(characterDataReducer, initialCharacterArray);
    const [favCharacters, dispatchFavCharacters] = useReducer(characterDataReducer, initialFavCharacterArray);

    const [initialCharacterData, setInitialCharacterData] = useState(initialData);
    const [updatedCharacterData, setUpdatedCharacterData] = useState(characterData);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setUpdatedCharacterData(characterData);
    }, [characterData]);

    useEffect(() => {
        setInitialCharacterData(initialData);
    }, [initialData]);

    useEffect(() => {
        const fetchSetupedData = async () => {
            try {
                const response = await fetch(`${dataEndpoint}/MinifiedCharacterData.json`);
                const data = await response.json();

                const setupedData = setupCharacterData(data);

                saveToLocalStorage('initialCharacterData', setupedData);
                setInitialCharacterData(setupedData);
                setUpdatedCharacterData(setupedData);
                setLoaded(true);

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
            {loaded ? null : <LoadingIndicator />}
            {children}
        </CharacterDataContext.Provider>
    )
}