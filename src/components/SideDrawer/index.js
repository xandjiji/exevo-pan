import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import SideDrawer from './SideDrawer.styled';
import FilterGroup from '../FilterGroup';
import Tag from '../Tag';
import AutocompleteInput from '../AutocompleteInput';
import RangeSlider from '../RangeSlider';
import DrawerFooter from '../DrawerFooter';

import { ReactComponent as ArrowIcon } from '../../assets/svgs/arrowBack.svg';

import ServerDataContext from '../../contexts/ServerData/context';
import CharacterDataContext from '../../contexts/CharacterData/context';

export default ({ backAction }) => {

    const charContext = useContext(CharacterDataContext);
    const serverContext = useContext(ServerDataContext);

    const serverKeyValues = useRef({});
    useEffect(() => {
        for (let i = 0; i < serverContext.length; i++) {
            serverContext[i].serverId = i;
            serverKeyValues.current[serverContext[i].serverName] = serverContext[i];
        }
    }, [serverContext]);

    const [filters, setFilters] = useState({
        vocation: new Set(),
        pvp: new Set([]),
        battleye: new Set([]),
        location: new Set([]),
        serverName: '',
        minLevel: 2,
        minSkill: 10,
        skillKey: new Set([])
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
    }, [updateFilterValue])

    const onAutocompleteChange = useCallback((value) => {
        updateServerValue('serverName', value);
    }, [updateServerValue]);

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
                    <AutocompleteInput items={Object.keys(serverKeyValues.current)} placeholder="Choose a server" onChange={onAutocompleteChange} />
                </FilterGroup>

                <FilterGroup title="Level" display="flex">
                    <RangeSlider initialValue={2} min={2} max={1000} onChange={useCallback((value) => updateFilterValue('minLevel', value), [updateFilterValue])} />
                </FilterGroup>

                <FilterGroup title="Skill" display="block">
                    <RangeSlider initialValue={10} min={10} max={130} onChange={useCallback((value) => updateFilterValue('minSkill', value), [updateFilterValue])} />

                    <div className="skills-wrapper">
                        <Tag clickable onClick={useCallback(() => updateFilterSet('skillKey', 'magic'), [updateFilterSet])}>Magic</Tag>
                        <Tag clickable onClick={useCallback(() => updateFilterSet('skillKey', 'distance'), [updateFilterSet])}>Distance</Tag>
                        <Tag clickable onClick={useCallback(() => updateFilterSet('skillKey', 'club'), [updateFilterSet])}>Club</Tag>
                        <Tag clickable onClick={useCallback(() => updateFilterSet('skillKey', 'sword'), [updateFilterSet])}>Sword</Tag>
                        <Tag clickable onClick={useCallback(() => updateFilterSet('skillKey', 'axe'), [updateFilterSet])}>Axe</Tag>
                    </div>
                </FilterGroup>
            </div>

            <DrawerFooter />
        </SideDrawer>
    )
}