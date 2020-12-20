import { createContext } from 'react';
import data from '../../AllCharacterData.json';

const AllCharacterData = createContext(data);

export default AllCharacterData;