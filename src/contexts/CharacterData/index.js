import React, { useEffect, useReducer, useState } from 'react';
import CharacterDataContext from './context';
import { characterDataReducer } from './reducers';
import setupCharacterData from '../../utils/setupCharacterData';

export default ({ children }) => {

    const [characterData, dispatch] = useReducer(characterDataReducer, []);

    const [initialData, setInitialData] = useState([]);

    useEffect(() => {
        const fetchSetupedData = async () => {
            const response = await fetch('https://exevopan-data.netlify.app/LatestCharacterData.json');
            const data = await response.json();

            const setupedData = setupCharacterData(data);

            setInitialData(setupedData);
        }

        fetchSetupedData();
    }, [])

    return (
        <CharacterDataContext.Provider
            value={{
                initialData,
                characterData,
                dispatch
            }}
        >
            {children}
        </CharacterDataContext.Provider>
    )
}