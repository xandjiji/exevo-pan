import React, { useEffect, useReducer, useState } from 'react';
import CharacterDataContext from './context';
import { characterDataReducer } from './reducers';
import setupCharacterData from '../../utils/setupCharacterData';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';

export default ({ children }) => {

    const [characterData, dispatch] = useReducer(characterDataReducer, []);

    const [initialCharacterData, setinitialCharacterData] = useState([]);

    useEffect(() => {
        const fetchSetupedData = async () => {
            let setupedData;
            try {
                const response = await fetch('https://exevopan-data.netlify.app/LatestCharacterData.json');
                const data = await response.json();

                setupedData = setupCharacterData(data);
                saveToLocalStorage('initialCharacterData', setupedData);

            } catch (error) {
                setupedData = getFromLocalStorage('initialCharacterData');

            } finally {
                setinitialCharacterData(setupedData);
            }
        }

        fetchSetupedData();
    }, [])

    return (
        <CharacterDataContext.Provider
            value={{
                initialCharacterData,
                characterData,
                dispatch
            }}
        >
            {children}
        </CharacterDataContext.Provider>
    )
}