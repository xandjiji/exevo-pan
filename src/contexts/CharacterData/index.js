import React, { useEffect, useReducer, useState } from 'react';
import { LoadingAlert } from 'components/Atoms';
import CharacterDataContext from './context';
import { characterDataReducer } from './reducers';
import setupCharacterData from '../../utils/setupCharacterData';
import { saveToLocalStorage, getFromLocalStorage, verifyCharacterObjectShape } from 'utils'
import { BASE_DATA_ENDPOINT, CHARACTER_DATA_PATH } from '../../constants';

let initialCharacterArray = getFromLocalStorage('initialCharacterData', []);

if (!initialCharacterArray[0] || !verifyCharacterObjectShape(initialCharacterArray[0])) {
    initialCharacterArray = [];
    saveToLocalStorage('initialCharacterData', [])
}

export default ({ children }) => {

    const [characterData, dispatchCharacterData] = useReducer(characterDataReducer, initialCharacterArray);
    const [initialData, dispatchInitialData] = useReducer(characterDataReducer, initialCharacterArray);

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
                const response = await fetch(`${BASE_DATA_ENDPOINT}${CHARACTER_DATA_PATH}`);
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
                dispatchCharacterData
            }}
        >
            {loaded ? null : <LoadingAlert aria-label="Updating auction data" >Updating data...</LoadingAlert>}
            {children}
        </CharacterDataContext.Provider>
    )
}