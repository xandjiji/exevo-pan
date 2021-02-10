import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import SideDrawer from './SideDrawer.styled';
import FilterGroup from '../FilterGroup';
import Tag from '../Tag';
import AutocompleteInput from '../AutocompleteInput';
import RangeSlider from '../RangeSlider';
import DrawerFooter from '../DrawerFooter';

import { ReactComponent as ArrowIcon } from '../../assets/svgs/arrowBack.svg';

import CharacterDataContext from '../../contexts/CharacterData/context';
import ServerDataContext from '../../contexts/ServerData/context';
import ItemsDataContext from '../../contexts/ItemsData/context';

export default ({ backAction }) => {

    const charContext = useContext(CharacterDataContext);
    const serverContext = useContext(ServerDataContext);
    const itemsContext = useContext(ItemsDataContext);

    const serverKeyValues = useRef({});
    useEffect(() => {
        for (let i = 0; i < serverContext.length; i++) {
            serverContext[i].serverId = i;
            serverKeyValues.current[serverContext[i].serverName] = serverContext[i];
        }
    }, [serverContext]);

    const itemsKeyValues = useRef([]);
    useEffect(() => {
        for(const itemKey in itemsContext) {
            if(itemsContext[itemKey].length > 0) {
                itemsKeyValues.current.push(itemKey);
            }
        }
    }, [itemsContext]);

    const [filters, setFilters] = useState({
        vocation: new Set(),
        pvp: new Set([]),
        battleye: new Set([]),
        location: new Set([]),
        serverName: '',
        minLevel: 2,
        minSkill: 10,
        skillKey: new Set([]),
        itemSet: new Set([]),
    });

    const updateFilterValue = useCallback((key, value) => {
        setFilters(prevFilters => {
            return { ...prevFilters, [key]: value };
        });
    }, []);

    const updateServerValue = useCallback((key, value) => {
        const currentServerValue = serverKeyValues.current[value];
        const newValue = (currentServerValue ? currentServerValue.serverId : '');
        updateFilterValue(key, newValue);
    }, [updateFilterValue]);

    const onServerAutocompleteChange = useCallback((value) => {
        updateServerValue('serverName', value);
    }, [updateServerValue]);

    const updateItemValue = useCallback((key, value) => {
        const currentItemValue = itemsContext[value];
        const newValue = (currentItemValue ? new Set(itemsContext[value]) : new Set([]));
        updateFilterValue(key, newValue);
    }, [updateFilterValue, itemsContext]);

    const onItemAutocompleteChange = useCallback((value) => {
        updateItemValue('itemSet', value);
    }, [updateItemValue]);

    const updateFilterSet = useCallback((key, value) => {
        if (filters[key].has(value)) {
            filters[key].delete(value);
        } else {
            filters[key].add(value);
        }

        setFilters({
            ...filters,
            [key]: filters[key]
        });
    }, [filters]);

    useEffect(() => {
        charContext.dispatch({ type: 'APPLY_FILTERS', filterState: filters });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    return (
        <SideDrawer className="shadow">
            <div className="drawer-header inner-container shadow">
                <ArrowIcon className="clickable" onClick={backAction} />
                Filters
            </div>

            <div className="items-wrapper inner-container custom-scrollbar">
                <FilterGroup title="Vocation" display="flex">
                    <Tag clickable onClick={useCallback(() => updateFilterSet('vocation', 0), [updateFilterSet])}>None</Tag>
                    <Tag clickable onClick={useCallback(() => updateFilterSet('vocation', 1), [updateFilterSet])}>Knight</Tag>
                    <Tag clickable onClick={useCallback(() => updateFilterSet('vocation', 2), [updateFilterSet])}>Paladin</Tag>
                    <Tag clickable onClick={useCallback(() => updateFilterSet('vocation', 3), [updateFilterSet])}>Sorcerer</Tag>
                    <Tag clickable onClick={useCallback(() => updateFilterSet('vocation', 4), [updateFilterSet])}>Druid</Tag>
                </FilterGroup>

                <FilterGroup title="PvP" display="flex">
                    <Tag clickable onClick={useCallback(() => updateFilterSet('pvp', 0), [updateFilterSet])}>Optional</Tag>
                    <Tag clickable onClick={useCallback(() => updateFilterSet('pvp', 1), [updateFilterSet])}>Open</Tag>
                    <Tag clickable onClick={useCallback(() => updateFilterSet('pvp', 2), [updateFilterSet])}>Retro Open</Tag>
                    <Tag clickable onClick={useCallback(() => updateFilterSet('pvp', 3), [updateFilterSet])}>Hardcore</Tag>
                    <Tag clickable onClick={useCallback(() => updateFilterSet('pvp', 4), [updateFilterSet])}>Retro Hardcore</Tag>
                </FilterGroup>

                <FilterGroup title="BattlEye" display="flex">
                    <div className="battleye-wrapper">
                        <Tag clickable onClick={useCallback(() => updateFilterSet('battleye', true), [updateFilterSet])}>
                            <span
                                className="battleye-icon"
                                style={{ backgroundColor: `var(--battleGreen)` }}
                            >
                            </span>
                            Green
                        </Tag>
                        <Tag clickable onClick={useCallback(() => updateFilterSet('battleye', false), [updateFilterSet])}>
                            <span
                                className="battleye-icon"
                                style={{ backgroundColor: `var(--battleYellow)` }}
                            >
                            </span>
                            Yellow
                        </Tag>
                    </div>
                </FilterGroup>

                <FilterGroup title="Server location" display="flex">
                    <Tag clickable onClick={useCallback(() => updateFilterSet('location', 0), [updateFilterSet])}>EU</Tag>
                    <Tag clickable onClick={useCallback(() => updateFilterSet('location', 1), [updateFilterSet])}>NA</Tag>
                    <Tag clickable onClick={useCallback(() => updateFilterSet('location', 2), [updateFilterSet])}>BR</Tag>
                </FilterGroup>

                <FilterGroup title="Server" display="flex">
                    <label htmlFor="Server-input" className="invisible-label">Server</label>
                    <AutocompleteInput labelFor="Server-input" items={Object.keys(serverKeyValues.current)} placeholder="Choose a server" onChange={onServerAutocompleteChange} />
                </FilterGroup>

                <FilterGroup title="Level" display="flex">
                    <label htmlFor="Level-input" className="invisible-label">Level</label>
                    <label htmlFor="Level-counter" className="invisible-label">Level value</label>
                    <RangeSlider labelFor="Level-input" counterLabel="Level-counter" initialValue={2} min={2} max={1000} onChange={useCallback((value) => updateFilterValue('minLevel', value), [updateFilterValue])} />
                </FilterGroup>

                <FilterGroup title="Skill" display="block">
                    <label htmlFor="Skill-input" className="invisible-label">Skill</label>
                    <label htmlFor="Skill-counter" className="invisible-label">Skill value</label>
                    <RangeSlider labelFor="Skill-input" counterLabel="Skill-counter" initialValue={10} min={10} max={130} onChange={useCallback((value) => updateFilterValue('minSkill', value), [updateFilterValue])} />

                    <div className="skills-wrapper">
                        <Tag clickable onClick={useCallback(() => updateFilterSet('skillKey', 'magic'), [updateFilterSet])}>Magic</Tag>
                        <Tag clickable onClick={useCallback(() => updateFilterSet('skillKey', 'distance'), [updateFilterSet])}>Distance</Tag>
                        <Tag clickable onClick={useCallback(() => updateFilterSet('skillKey', 'club'), [updateFilterSet])}>Club</Tag>
                        <Tag clickable onClick={useCallback(() => updateFilterSet('skillKey', 'sword'), [updateFilterSet])}>Sword</Tag>
                        <Tag clickable onClick={useCallback(() => updateFilterSet('skillKey', 'axe'), [updateFilterSet])}>Axe</Tag>
                    </div>
                </FilterGroup>

                <FilterGroup title="Items" display="flex">
                    <label htmlFor="Items-input" className="invisible-label">Items</label>
                    <AutocompleteInput labelFor="Items-input" items={itemsKeyValues.current} placeholder="Choose an item" onChange={onItemAutocompleteChange} />
                </FilterGroup>
            </div>

            <DrawerFooter />
        </SideDrawer>
    )
}