import React, { useReducer, useContext } from 'react';
import CharacterDataContext from './context';
import initialDataContext from './initialData';
import { characterDataReducer } from './reducers';


export default ({ children }) => {

    const initialData = useContext(initialDataContext);

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