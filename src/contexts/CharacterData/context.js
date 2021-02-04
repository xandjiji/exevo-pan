import { createContext } from 'react';
import initialData from './initialData';

export default createContext({
    characterData: initialData,
    applyFilter: () => { }
});