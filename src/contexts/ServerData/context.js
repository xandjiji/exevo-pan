import { createContext } from 'react';
import { serverData, indexedServerData } from './initialData';

export default createContext({ serverData, indexedServerData });