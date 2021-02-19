import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import SideDrawer from './SideDrawer.styled';
import FilterGroup from '../FilterGroup';
import Chip from '../Chip';
import AutocompleteInput from '../AutocompleteInput';
import RangeSlider from '../RangeSlider';
import DrawerFooter from '../DrawerFooter';
import InformationBadge from '../InformationBadge';

import { ReactComponent as ArrowIcon } from '../../assets/svgs/arrowBack.svg';

import CharacterDataContext from '../../contexts/CharacterData/context';
import ServerDataContext from '../../contexts/ServerData/context';
import ItemsDataContext from '../../contexts/ItemsData/context';

export default ({ backAction }) => {

    const { initialCharacterData, dispatchCharacterData } = useContext(CharacterDataContext);
    const { serverData, indexedServerData } = useContext(ServerDataContext);
    const { itemData } = useContext(ItemsDataContext);

    const serverNamesArray = useMemo(() => Object.keys(serverData), [serverData]);
    const itemNamesArray = useMemo(() => Object.keys(itemData), [itemData]);

    const [filters, setFilters] = useState({
        vocation: new Set(),
        pvp: new Set([]),
        battleye: new Set([]),
        location: new Set([]),
        serverSet: new Set([]),
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

    const toggleInFilterSet = useCallback((key, value) => {
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

    const addToFilterSet = useCallback((key, value) => {
        setFilters(prevFilters => {
            prevFilters[key].add(value);
            return {
                ...prevFilters,
                [key]: prevFilters[key]
            }
        })
    }, []);

    const deleteFromFilterSet = useCallback((key, value) => {
        setFilters(prevFilters => {
            prevFilters[key].delete(value);
            return {
                ...prevFilters,
                [key]: prevFilters[key]
            }
        })
    }, []);

    const onAutocompleteChange = useCallback((key, value, object) => {
        if (objectHasKeys(object, value)) {
            addToFilterSet(key, value);
        }
    }, [addToFilterSet]);


    useEffect(() => {
        dispatchCharacterData({
            type: 'APPLY_FILTERS',
            filterState: filters,
            initialData: {
                initialCharacterData,
                itemData,
                indexedServerData
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, initialCharacterData]);

    const isAllItemsSelected = useCallback(() => {
        if (filters.itemSet.size === itemNamesArray.length) {
            return true;
        } else {
            return false;
        }
    }, [filters, itemNamesArray]);

    const handleAllItemsToggle = useCallback(() => {
        if (isAllItemsSelected()) {
            updateFilterValue('itemSet', new Set([]));
        } else {
            updateFilterValue('itemSet', new Set(itemNamesArray));
        }
    }, [isAllItemsSelected, updateFilterValue, itemNamesArray]);

    return (
        <SideDrawer className="shadow">
            <div className="drawer-header inner-container shadow">
                <ArrowIcon className="clickable" onClick={backAction} />
                Filters
            </div>

            <div className="items-wrapper inner-container custom-scrollbar">
                <FilterGroup title="Vocation" display="flex">
                    <Chip clickable onClick={useCallback(() => toggleInFilterSet('vocation', 0), [toggleInFilterSet])}>None</Chip>
                    <Chip clickable onClick={useCallback(() => toggleInFilterSet('vocation', 1), [toggleInFilterSet])}>Knight</Chip>
                    <Chip clickable onClick={useCallback(() => toggleInFilterSet('vocation', 2), [toggleInFilterSet])}>Paladin</Chip>
                    <Chip clickable onClick={useCallback(() => toggleInFilterSet('vocation', 3), [toggleInFilterSet])}>Sorcerer</Chip>
                    <Chip clickable onClick={useCallback(() => toggleInFilterSet('vocation', 4), [toggleInFilterSet])}>Druid</Chip>
                </FilterGroup>

                <FilterGroup title="PvP" display="flex">
                    <Chip clickable onClick={useCallback(() => toggleInFilterSet('pvp', 0), [toggleInFilterSet])}>Optional</Chip>
                    <Chip clickable onClick={useCallback(() => toggleInFilterSet('pvp', 1), [toggleInFilterSet])}>Open</Chip>
                    <Chip clickable onClick={useCallback(() => toggleInFilterSet('pvp', 2), [toggleInFilterSet])}>Retro Open</Chip>
                    <Chip clickable onClick={useCallback(() => toggleInFilterSet('pvp', 3), [toggleInFilterSet])}>Hardcore</Chip>
                    <Chip clickable onClick={useCallback(() => toggleInFilterSet('pvp', 4), [toggleInFilterSet])}>Retro Hardcore</Chip>
                </FilterGroup>

                <FilterGroup className="battleye-wrapper" title="BattlEye" display="flex">
                    <Chip clickable onClick={useCallback(() => toggleInFilterSet('battleye', true), [toggleInFilterSet])}>
                        <span
                            className="battleye-icon"
                            style={{ backgroundColor: `var(--battleGreen)` }}
                        >
                        </span>
                            Green
                    </Chip>
                    <Chip clickable onClick={useCallback(() => toggleInFilterSet('battleye', false), [toggleInFilterSet])}>
                        <span
                            className="battleye-icon"
                            style={{ backgroundColor: `var(--battleYellow)` }}
                        >
                        </span>
                            Yellow
                    </Chip>
                </FilterGroup>

                <FilterGroup title="Server location" display="flex">
                    <Chip clickable onClick={useCallback(() => toggleInFilterSet('location', 0), [toggleInFilterSet])}>EU</Chip>
                    <Chip clickable onClick={useCallback(() => toggleInFilterSet('location', 1), [toggleInFilterSet])}>NA</Chip>
                    <Chip clickable onClick={useCallback(() => toggleInFilterSet('location', 2), [toggleInFilterSet])}>BR</Chip>
                </FilterGroup>

                <FilterGroup title="Server" display="flex">
                    <label htmlFor="Server-input" className="invisible-label">Server</label>
                    <AutocompleteInput
                        labelFor="Server-input"
                        placeholder="Choose a server"
                        clearAfterSucessful
                        items={allItemsNotInSet(serverNamesArray, filters.serverSet)}
                        onChange={useCallback((value) => onAutocompleteChange('serverSet', value, serverData), [onAutocompleteChange, serverData])}
                    />

                    <div className="chips-wrapper">
                        {[...filters.serverSet].map((serverName, index) =>
                            <Chip
                                key={index}
                                closeable
                                onClose={() => deleteFromFilterSet('serverSet', serverName)}>
                                {serverName}
                            </Chip>
                        )}
                    </div>
                </FilterGroup>

                <FilterGroup title="Level" display="flex">
                    <label htmlFor="Level-input" className="invisible-label">Level</label>
                    <label htmlFor="Level-counter" className="invisible-label">Level value</label>
                    <RangeSlider
                        labelFor="Level-input"
                        counterLabel="Level-counter"
                        initialValue={2}
                        min={2}
                        max={1000}
                        onChange={useCallback((value) => updateFilterValue('minLevel', value), [updateFilterValue])}
                    />
                </FilterGroup>

                <FilterGroup title="Skill" display="block">
                    <label htmlFor="Skill-input" className="invisible-label">Skill</label>
                    <label htmlFor="Skill-counter" className="invisible-label">Skill value</label>
                    <RangeSlider
                        labelFor="Skill-input"
                        counterLabel="Skill-counter"
                        initialValue={10}
                        min={10}
                        max={130}
                        onChange={useCallback((value) => updateFilterValue('minSkill', value), [updateFilterValue])}
                    />

                    <div className="skills-wrapper">
                        <Chip clickable onClick={useCallback(() => toggleInFilterSet('skillKey', 'magic'), [toggleInFilterSet])}>Magic</Chip>
                        <Chip clickable onClick={useCallback(() => toggleInFilterSet('skillKey', 'distance'), [toggleInFilterSet])}>Distance</Chip>
                        <Chip clickable onClick={useCallback(() => toggleInFilterSet('skillKey', 'club'), [toggleInFilterSet])}>Club</Chip>
                        <Chip clickable onClick={useCallback(() => toggleInFilterSet('skillKey', 'sword'), [toggleInFilterSet])}>Sword</Chip>
                        <Chip clickable onClick={useCallback(() => toggleInFilterSet('skillKey', 'axe'), [toggleInFilterSet])}>Axe</Chip>
                    </div>
                </FilterGroup>

                <FilterGroup
                    className="rare-items-wrapper"
                    title="Rare items"
                    display="flex"
                    badge={<InformationBadge icon="!" text="If a rare item is not on this list it means that there are no auctions available with it." />}
                >
                    <label htmlFor="Items-input" className="invisible-label">Items</label>
                    <AutocompleteInput
                        labelFor="Items-input"
                        placeholder="Choose an item"
                        clearAfterSucessful
                        items={allItemsNotInSet(itemNamesArray, filters.itemSet)}
                        onChange={useCallback((value) => onAutocompleteChange('itemSet', value, itemData), [onAutocompleteChange, itemData])}
                    />

                    <Chip
                        clickable
                        overrideStatus={isAllItemsSelected() ? true : false}
                        onClick={handleAllItemsToggle}>
                        All items
                    </Chip>

                    <div className="chips-wrapper">
                        {[...filters.itemSet].map((itemName, index) =>
                            <Chip
                                key={index}
                                closeable
                                onClose={() => deleteFromFilterSet('itemSet', itemName)}>
                                {itemName}
                            </Chip>
                        )}
                    </div>
                </FilterGroup>
            </div>

            <DrawerFooter />
        </SideDrawer>
    )
}

const allItemsNotInSet = (array, set) => {

    const newArray = [];
    for (const item of array) {
        if (!set.has(item)) newArray.push(item);
    }

    return newArray;
}

const objectHasKeys = (object, key) => {
    if (object[key]) {
        return true;
    } else {
        return false;
    }
}