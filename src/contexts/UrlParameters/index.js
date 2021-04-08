import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import UrlContext from './context';

const { search } = window.location;
const initialParams = new URLSearchParams(search);

const defaultParams = {
    nickname: '',
    vocation: new Set([]),
    pvp: new Set([]),
    battleye: new Set([]),
    location: new Set([]),
    server: new Set([]),
    minLevel: 2,
    minSkill: 10,
    skill: new Set([]),
    item: new Set([]),
    fav: false,
    rareNick: false,
    soulwar: false,

    pageIndex: 0
}

export default ({ children }) => {

    const history = useHistory();

    const [params, setParams] = useState({
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

    console.log(params);

    useEffect(() => {
        /* const { search, pathname } = window.location;
        const currentParams = new URLSearchParams(search);

        for (const key in params) {
            const value = params[key];
            const defaultValue = defaultParams[key];

            if (defaultValue === value || (defaultValue.size === value.size && typeof defaultValue === 'object')) {
                currentParams.delete(key);
                continue;
            }

            if (typeof value === 'object') {
                const setArray = Array.from(value);
                currentParams.set(key, setArray.join(','));
            } else {
                currentParams.set(key, value);
            }
        }

        history.replace(`${pathname}?${currentParams.toString()}`); */
    }, [params, history])

    return (
        <UrlContext.Provider
            value={{
                params,
                setParams
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