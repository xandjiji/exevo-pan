import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import SideDrawer from './SideDrawer.styled';
import FilterGroup from '../FilterGroup';
import Chip from '../Chip';
import AutocompleteInput from '../AutocompleteInput';
import RangeSlider from '../RangeSlider';
import DrawerFooter from '../DrawerFooter';
import InformationBadge from '../InformationBadge';

import { ReactComponent as ArrowIcon } from '../../assets/svgs/arrowBack.svg';
import Rook from '../../assets/rook.png'
import Knight from '../../assets/knight.png'
import Paladin from '../../assets/paladin.png'
import Sorcerer from '../../assets/sorcerer.png'
import Druid from '../../assets/druid.png'
import Magic from '../../assets/magic.png';
import Distance from '../../assets/distance.png';
import Club from '../../assets/club.png';
import Sword from '../../assets/sword.png';
import Axe from '../../assets/axe.png';
import Dove from '../../assets/dove.png';
import OrangeSkull from '../../assets/orangeSkull.png';
import WhiteSkull from '../../assets/whiteSkull.png';
import RedSkull from '../../assets/redSkull.png';
import BlackSkull from '../../assets/blackSkull.png';
import BrFlag from '../../assets/br-flag.png';
import EuFlag from '../../assets/eu-flag.png';
import NaFlag from '../../assets/na-flag.png';

import CharacterDataContext from '../../contexts/CharacterData/context';
import ServerDataContext from '../../contexts/ServerData/context';
import ItemsDataContext from '../../contexts/ItemsData/context';

export default ({ backAction }) => {

    const { initialCharacterData, favCharacters, dispatchCharacterData } = useContext(CharacterDataContext);
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
        fav: false
    });

    const updateFilterValue = useCallback((key, value) => {
        setFilters(prevFilters => {
            return { ...prevFilters, [key]: value };
        });
    }, []);

    const toggleFilterValue = useCallback((key) => {
        setFilters(prevFilters => {
            return { ...prevFilters, [key]: !prevFilters[key] }
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
                indexedServerData,
                favCharacters
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
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('vocation', 0), [toggleInFilterSet])}
                    >
                        <img className="chip-icon" src={Rook} alt="None" title="None" />
                        None
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('vocation', 1), [toggleInFilterSet])}
                    >
                        <img className="chip-icon" src={Knight} alt="Knight" title="Knight" />
                        Knight
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('vocation', 2), [toggleInFilterSet])}
                    >
                        <img className="chip-icon" src={Paladin} alt="Paladin" title="Paladin" />
                        Paladin
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('vocation', 3), [toggleInFilterSet])}
                    >
                        <img className="chip-icon" src={Sorcerer} alt="Sorcerer" title="Sorcerer" />
                        Sorcerer
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('vocation', 4), [toggleInFilterSet])}
                    >
                        <img className="chip-icon" src={Druid} alt="Druid" title="Druid" />
                        Druid
                    </Chip>
                </FilterGroup>

                <FilterGroup title="PvP" display="flex">
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('pvp', 0), [toggleInFilterSet])}
                    >
                        <img className="chip-icon" src={Dove} alt="Optional PvP" title="Optional PvP" />
                        Optional
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('pvp', 1), [toggleInFilterSet])}
                    >
                        <img className="chip-icon" src={WhiteSkull} alt="Open PvP" title="Open PvP" />
                        Open
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('pvp', 2), [toggleInFilterSet])}
                    >
                        <img className="chip-icon" src={OrangeSkull} alt="Retro Open PvP" title="Retro Open PvP" />
                        Retro Open
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('pvp', 3), [toggleInFilterSet])}
                    >
                        <img className="chip-icon" src={RedSkull} alt="Hardcore PvP" title="Hardcore PvP" />
                        Hardcore
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('pvp', 4), [toggleInFilterSet])}
                    >
                        <img className="chip-icon" src={BlackSkull} alt="Retro Hardcore PvP" title="Retro Hardcore PvP" />
                        Retro Hardcore
                    </Chip>
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
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('location', 0), [toggleInFilterSet])}
                    >
                        <img className="flag chip-icon" alt="Europe" title="Europe" src={EuFlag} />
                        EU
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('location', 1), [toggleInFilterSet])}
                    >
                        <img className="flag chip-icon" alt="North America" title="North America" src={NaFlag} />
                        NA
                    </Chip>
                    <Chip
                        clickable
                        onClick={useCallback(() => toggleInFilterSet('location', 2), [toggleInFilterSet])}
                    >
                        <img className="flag chip-icon" alt="Brazil" title="Brazil" src={BrFlag} />
                        BR
                    </Chip>
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
                        <Chip
                            clickable
                            onClick={useCallback(() => toggleInFilterSet('skillKey', 'magic'), [toggleInFilterSet])}
                        >
                            <img className="chip-icon" src={Magic} alt="Magic Level" title="Magic Level" />
                            Magic
                        </Chip>
                        <Chip
                            clickable
                            onClick={useCallback(() => toggleInFilterSet('skillKey', 'distance'), [toggleInFilterSet])}
                        >
                            <img className="chip-icon" src={Distance} alt="Distance fighting" title="Distance fighting" />
                            Distance
                        </Chip>
                        <Chip
                            clickable
                            onClick={useCallback(() => toggleInFilterSet('skillKey', 'club'), [toggleInFilterSet])}
                        >
                            <img className="chip-icon" src={Club} alt="Club fighting" title="Club fighting" />
                            Club
                        </Chip>
                        <Chip
                            clickable
                            onClick={useCallback(() => toggleInFilterSet('skillKey', 'sword'), [toggleInFilterSet])}
                        >
                            <img className="chip-icon" src={Sword} alt="Sword fighting" title="Sword fighting" />
                            Sword
                        </Chip>
                        <Chip
                            clickable
                            onClick={useCallback(() => toggleInFilterSet('skillKey', 'axe'), [toggleInFilterSet])}
                        >
                            <img className="chip-icon" src={Axe} alt="Axe fighting" title="Axe fighting" />
                            Axe
                        </Chip>
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

                <FilterGroup title="Misc" display="flex">
                    <Chip clickable onClick={useCallback(() => toggleFilterValue('fav'), [toggleFilterValue])}>Favorited ❤️</Chip>
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