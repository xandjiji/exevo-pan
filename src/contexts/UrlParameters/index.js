import React from 'react';
import useUrlParams from './useUrlParams';

import UrlContext from './context';

const { search } = window.location;
const initialParams = new URLSearchParams(search);

export default ({ children }) => {

    const [params, setParams] = useUrlParams({
        nickname: getStringParam('nickname'),
        vocation: getNumberSetParam('vocation'),
        pvp: getNumberSetParam('pvp'),
        battleye: getBooleanSetParam('battleye'),
        location: getNumberSetParam('location'),
        server: getSetParam('serverSet'),
        minLevel: getNumberParam('minLevel'),
        minSkill: getNumberParam('minSkill'),
        skill: getSetParam('skillKey'),
        item: getSetParam('itemSet'),
        fav: getBooleanParam('fav'),
        rareNick: getBooleanParam('rareNick'),
        soulwar: getBooleanParam('soulwarFilter'),

        pageIndex: getNumberParam('pageIndex')
    });

    const setParamByKey = (key, value) => {
        setParams(prevKeys => {
            return {
                ...prevKeys,
                [key]: value
            }
        })
    }

    return (
        <UrlContext.Provider
            value={{
                params,
                setParamByKey
            }}
        >
            {children}
        </UrlContext.Provider>
    )
}

const getParamArray = (key) => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(key);

    if (!value) return [];

    const string = decodeURIComponent(value);
    const array = string.split(',');
    return array;
}
const convertToNumbers = (array) => array.map(item => Number(item));
const convertToBooleans = (array) => array.map(item => item === 'true' ? true : false);


const getStringParam = (key) => {
    return initialParams.get(key);
}
const getNumberSetParam = (key) => {
    const set = new Set(convertToNumbers(getParamArray(key)));
    return set.size === 0 ? null : set;
}
const getBooleanSetParam = (key) => {
    const set = new Set(convertToBooleans(getParamArray(key)));
    return set.size === 0 ? null : set;
}
const getSetParam = (key) => {
    const set = new Set(getParamArray(key));
    return set.size === 0 ? null : set;
}
const getNumberParam = (key) => {
    const value = initialParams.get(key);
    return value ? Number(value) : null;
}
const getBooleanParam = (key) => {
    const value = initialParams.get(key);
    return value ? Boolean(value) : null;
}