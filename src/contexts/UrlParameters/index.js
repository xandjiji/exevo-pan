import React, { useCallback } from 'react';
import useUrlParams from './useUrlParams';

import UrlContext from './context';

const { search } = window.location;
const initialParams = new URLSearchParams(search);

export default ({ children }) => {

    const [params, setParams] = useUrlParams({
        nicknameFilter: getStringParam('nicknameFilter'),
        vocation: getNumberSetParam('vocation'),
        pvp: getNumberSetParam('pvp'),
        battleye: getBooleanSetParam('battleye'),
        location: getNumberSetParam('location'),
        serverSet: getSetParam('serverSet'),
        minLevel: getNumberParam('minLevel'),
        minSkill: getNumberParam('minSkill'),
        skillKey: getSetParam('skillKey'),
        itemSet: getSetParam('itemSet'),
        fav: getBooleanParam('fav'),
        rareNick: getBooleanParam('rareNick'),
        soulwarFilter: getBooleanParam('soulwarFilter'),
        imbuementsSet: getSetParam('imbuementsSet'),

        pageIndex: getNumberParam('pageIndex'),

        initialSort: getNumberParam('initialSort'),
        initialOrder: getStringParam('initialOrder') === null ? null : getStringParam('initialOrder') === 'true',

        statsPage: getStringParam('statsPage')
    });

    const setParamByKey = useCallback((key, value) => {
        setParams(prevKeys => {
            let validatedValue = value;
            if (typeof value === 'object' && value?.size === 0) validatedValue = null;
            if (typeof value === 'string' && value.length === 0) validatedValue = null;
            if (typeof value === 'boolean' && value === false) validatedValue = null;
            if (typeof value === 'number') {
                if (key === 'minLevel' && value === 2) validatedValue = null;
                if (key === 'minSkill' && value === 10) validatedValue = null;
                if (key === 'pageIndex' && value === 0) validatedValue = null;
            }

            if(key === 'initialOrder' && value !== null) {
                validatedValue = value === 'true';
            }

            return {
                ...prevKeys,
                [key]: validatedValue
            }
        })
    }, [setParams]);

    const resetParams = useCallback(() => {
        setParams({
            nicknameFilter: null,
            vocation: null,
            pvp: null,
            battleye: null,
            location: null,
            serverSet: null,
            minLevel: null,
            minSkill: null,
            skillKey: null,
            itemSet: null,
            fav: null,
            rareNick: null,
            soulwarFilter: null,

            pageIndex: null,

            initialSort: null,
            initialOrder: null,

            statsPage: null
        })
    }, [setParams])

    return (
        <UrlContext.Provider
            value={{
                params,
                setParamByKey,
                resetParams
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