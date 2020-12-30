import React, { useState, useEffect, useContext } from 'react';
import SideDrawer from './SideDrawer.styled';
import FilterGroup from '../FilterGroup';
import Tag from '../Tag';
import AutocompleteInput from '../AutocompleteInput';
import RangeSlider from '../RangeSlider';

import ArrowIcon from '../../assets/svgs/arrowBack.svg';

import ServerNames from '../../../serverNames.json';

import CharacterDataContext from '../../contexts/CharacterData/context';

export default ({ backAction }) => {

    const context = useContext(CharacterDataContext);

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

    const updateFilterValue = (key, value) => {
        setFilters({
            ...filters,
            [key]: value
        });
    }

    const updateFilterSet = (key, value) => {
        if (filters[key].has(value)) {
            filters[key].delete(value);
        } else {
            filters[key].add(value);
        }

        setFilters({
            ...filters,
            [key]: filters[key]
        });
    }

    useEffect(() => {
        context.dispatch({ type: 'APPLY_FILTERS', filterState: filters });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    return (
        <SideDrawer className="shadow">
            <div className="drawer-header inner-container shadow">
                <ArrowIcon className="clickable" onClick={backAction} />
                Filters
            </div>

            <div className="items-wrapper inner-container">
                <FilterGroup title="Vocation" display="flex">
                    <Tag clickable onClick={() => updateFilterSet('vocation', 0)}>None</Tag>
                    <Tag clickable onClick={() => updateFilterSet('vocation', 1)}>Knight</Tag>
                    <Tag clickable onClick={() => updateFilterSet('vocation', 2)}>Paladin</Tag>
                    <Tag clickable onClick={() => updateFilterSet('vocation', 3)}>Sorcerer</Tag>
                    <Tag clickable onClick={() => updateFilterSet('vocation', 4)}>Druid</Tag>
                </FilterGroup>

                <FilterGroup title="PvP" display="flex">
                    <Tag clickable onClick={() => updateFilterSet('pvp', 0)}>Optional</Tag>
                    <Tag clickable onClick={() => updateFilterSet('pvp', 1)}>Open</Tag>
                    <Tag clickable onClick={() => updateFilterSet('pvp', 2)}>Retro Open</Tag>
                    <Tag clickable onClick={() => updateFilterSet('pvp', 3)}>Hardcore</Tag>
                    <Tag clickable onClick={() => updateFilterSet('pvp', 4)}>Retro Hardcore</Tag>
                </FilterGroup>

                <FilterGroup title="BattlEye" display="flex">
                    <div className="battleye-wrapper">
                        <Tag clickable onClick={() => updateFilterSet('battleye', true)}>
                            <span
                                className="battleye-icon"
                                style={{ backgroundColor: `var(--battleGreen)` }}
                            >
                            </span>
                        Green
                    </Tag>
                        <Tag clickable onClick={() => updateFilterSet('battleye', false)}>
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
                    <Tag clickable onClick={() => updateFilterSet('location', 0)}>EU</Tag>
                    <Tag clickable onClick={() => updateFilterSet('location', 1)}>NA</Tag>
                    <Tag clickable onClick={() => updateFilterSet('location', 2)}>BR</Tag>
                </FilterGroup>

                <FilterGroup title="Server" display="flex">
                    <AutocompleteInput items={ServerNames} placeholder="Choose a server" onChange={(value) => updateFilterValue('serverName', value)} />
                </FilterGroup>

                <FilterGroup title="Level" display="flex">
                    <RangeSlider initialValue={2} min={2} max={1000} onChange={(value) => updateFilterValue('minLevel', value)} />
                </FilterGroup>

                <FilterGroup title="Skill" display="block">
                    <RangeSlider initialValue={10} min={10} max={130} onChange={(value) => updateFilterValue('minSkill', value)} />

                    <div className="skills-wrapper">
                        <Tag clickable onClick={() => updateFilterSet('skillKey', 'magic')}>Magic</Tag>
                        <Tag clickable onClick={() => updateFilterSet('skillKey', 'distance')}>Distance</Tag>
                        <Tag clickable onClick={() => updateFilterSet('skillKey', 'club')}>Club</Tag>
                        <Tag clickable onClick={() => updateFilterSet('skillKey', 'sword')}>Sword</Tag>
                        <Tag clickable onClick={() => updateFilterSet('skillKey', 'axe')}>Axe</Tag>
                    </div>
                </FilterGroup>
            </div>
        </SideDrawer>
    )
}