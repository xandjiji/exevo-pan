import React, { useReducer } from 'react';
import CharacterDataContext from './context';
import initialData from './initialData';
import { characterDataReducer } from './reducers';


export default ({ children }) => {

    const [characterData, dispatch] = useReducer(characterDataReducer, initialData);
    
    return (
        <CharacterDataContext.Provider
            value={{
                characterData,
                dispatch
            }}
        >
            {children}
        </CharacterDataContext.Provider>
    )
}